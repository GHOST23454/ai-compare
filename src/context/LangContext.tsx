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
import { Lang } from '@/types';
import { translations } from '@/data/translations';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved) setLang(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'tr' ? 'en' : 'tr'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, toggleLang, t }),
    [lang, toggleLang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}