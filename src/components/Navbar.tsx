'use client';

import { useState, useEffect } from 'react';
import {
  Zap,
  Globe,
  Moon,
  Sun,
  Heart,
  Scale,
  Menu,
  X,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LangContext';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';

interface NavbarProps {
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({ onOpenFavorites, onOpenCompare, onOpenAuth }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const { favorites, compare } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { href: '#kesfet', label: t('nav.explore') },
    { href: '#kategoriler', label: t('nav.categories') },
    { href: '/blog', label: 'Blog' },
    { href: '#liderler', label: t('nav.leaders') },
    { href: '#hakkinda', label: t('nav.about') },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith('#')) {
      setMobileOpen(false);
      return;
    }

    e.preventDefault();
    const id = href.replace('#', '');
    
    if (window.location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', window.location.pathname);
    }

    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
          className="flex items-center gap-2 font-display font-bold text-xl flex-shrink-0 cursor-pointer"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </span>
          <span className="gradient-text hidden sm:inline">AI Compare</span>
        </a>

        {/* Masaüstü linkler */}
        <div className="hidden lg:flex items-center gap-7 text-sm text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Sağ taraf */}
        <div className="flex items-center gap-2">
          {/* Dil */}
          <button onClick={toggleLang} className="icon-btn" aria-label="Dil değiştir">
            <Globe size={14} />
            <span className="text-xs font-semibold">{lang.toUpperCase()}</span>
          </button>

          {/* Tema */}
          <button onClick={toggleTheme} className="icon-btn" aria-label="Tema değiştir">
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Favoriler */}
          <button onClick={onOpenFavorites} className="icon-btn" aria-label="Favoriler">
            <Heart size={16} />
            {favorites.length > 0 && <span className="badge-count">{favorites.length}</span>}
          </button>

          {/* Karşılaştır */}
          <button onClick={onOpenCompare} className="icon-btn" aria-label="Karşılaştır">
            <Scale size={16} />
            {compare.length > 0 && <span className="badge-count">{compare.length}</span>}
          </button>

          {/* Giriş / Çıkış ve Profil */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-xs font-bold text-white uppercase">
                  {user.email?.charAt(0) || 'U'}
                </div>
                <span className="text-sm text-gray-300 max-w-[120px] truncate">
                  {user.email?.split('@')[0]}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 transition p-2 rounded-full hover:bg-red-500/10 cursor-pointer"
                title="Çıkış Yap"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-glow hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-sm font-medium hover:scale-105 transition cursor-pointer text-white"
            >
              <LogIn size={14} />
              <span>Giriş Yap</span>
            </button>
          )}

          {/* Mobil menü butonu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-2xl ml-1 text-white"
            aria-label="Menü"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-3 text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link block cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
             {user ? (
              <button onClick={handleLogout} className="text-red-400 font-semibold">Çıkış Yap</button>
             ) : (
              <button onClick={() => { onOpenAuth(); setMobileOpen(false); }} className="text-neon-cyan font-semibold">Giriş Yap</button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}