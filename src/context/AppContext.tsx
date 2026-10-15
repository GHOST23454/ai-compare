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

  // Çeviri fonksiyonu (dil değişince toast'lar da güncel dilde gelsin)
  const { t } = useLang();

  // localStorage'dan oku
  useEffect(() => {
    const savedFav = localStorage.getItem('favorites');
    const savedComp = localStorage.getItem('compare');
    if (savedFav) setFavorites(JSON.parse(savedFav));
    if (savedComp) setCompare(JSON.parse(savedComp));
    setMounted(true);
  }, []);

  // localStorage'a yaz
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('compare', JSON.stringify(compare));
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
    (id: string) => {
      const exists = favorites.includes(id);
      if (exists) {
        setFavorites((prev) => prev.filter((f) => f !== id));
        showToast(t('toast.favRemoved'), 'info');
      } else {
        setFavorites((prev) => [...prev, id]);
        showToast(t('toast.favAdded'), 'success');
      }
    },
    [favorites, showToast, t]
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

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const isCompared = useCallback(
    (id: string) => compare.includes(id),
    [compare]
  );

  const value = useMemo(
    () => ({
      favorites,
      compare,
      toasts,
      toggleFavorite,
      toggleCompare,
      showToast,
      removeToast,
      isFavorite,
      isCompared,
    }),
    [
      favorites,
      compare,
      toasts,
      toggleFavorite,
      toggleCompare,
      showToast,
      removeToast,
      isFavorite,
      isCompared,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}