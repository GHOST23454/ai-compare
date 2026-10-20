'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { ToastItem } from '@/types';
import { useLang } from '@/context/LangContext';
import { supabase } from '@/lib/supabase';

interface AppContextType {
  favorites: string[];
  compare: string[];
  toasts: ToastItem[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  showToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: number) => void;
  isFavorite: (id: string) => boolean;
  isCompared: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { t } = useLang();

  useEffect(() => {
    // Oturum kontrolü
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      
      if (data.session?.user) {
        // Kullanıcı giriş yaptıysa favorilerini veritabanından çek
        const { data: favs } = await supabase
          .from('favorites')
          .select('tool_id')
          .eq('user_id', data.session.user.id);
        
        if (favs) setFavorites(favs.map((f) => f.tool_id));
      }
    };
    checkUser();

    // Oturum değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (!session?.user) {
        setFavorites([]); // Çıkış yapınca favorileri temizle
      }
    });

    // LocalStorage'dan karşılaştırmayı çek (bunu tarayıcıda tutabiliriz)
    const savedComp = localStorage.getItem('compare');
    if (savedComp) setCompare(JSON.parse(savedComp));
    
    setMounted(true);

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('compare', JSON.stringify(compare));
  }, [compare, mounted]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastItem['type'] = 'info') => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 2500);
    },
    [removeToast]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!user) {
        showToast('Favorilere eklemek için giriş yapmalısın', 'warning');
        return;
      }

      const exists = favorites.includes(id);
      
      if (exists) {
        setFavorites((prev) => prev.filter((f) => f !== id));
        showToast(t('toast.favRemoved'), 'info');
        // Veritabanından sil
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('tool_id', id);
      } else {
        setFavorites((prev) => [...prev, id]);
        showToast(t('toast.favAdded'), 'success');
        // Veritabanına ekle
        await supabase.from('favorites').insert({ user_id: user.id, tool_id: id });
      }
    },
    [favorites, showToast, t, user]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      const exists = compare.includes(id);
      if (exists) {
        setCompare((prev) => prev.filter((c) => c !== id));
        showToast(t('toast.compareRemoved'), 'info');
      } else {
        if (compare.length >= 3) {
          showToast(t('toast.compareFull'), 'warning');
          return;
        }
        setCompare((prev) => [...prev, id]);
        showToast(t('toast.compareAdded'), 'success');
      }
    },
    [compare, showToast, t]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const isCompared = useCallback((id: string) => compare.includes(id), [compare]);

  const value = useMemo(
    () => ({
      favorites, compare, toasts, toggleFavorite, toggleCompare,
      showToast, removeToast, isFavorite, isCompared,
    }),
    [favorites, compare, toasts, toggleFavorite, toggleCompare, showToast, removeToast, isFavorite, isCompared]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}