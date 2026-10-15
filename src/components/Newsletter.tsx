'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export default function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setShowMsg(true);
    setEmail('');
    setTimeout(() => setShowMsg(false), 4000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-neon-purple/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-neon-cyan/30 blur-3xl" />

        <div className="relative">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-white">
            {t('cta.title1')}{' '}
            <span className="gradient-text">{t('cta.title2')}</span>{' '}
            {t('cta.title3')}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            {t('cta.subtitle')}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@ornek.com"
              className="flex-1 px-5 py-3 rounded-full glass text-sm focus:outline-none focus:border-neon-purple/50 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="btn-glow px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan font-medium hover:scale-105 transition text-white flex items-center justify-center gap-2"
            >
              {t('cta.join')} <ArrowRight size={14} />
            </button>
          </form>

          {showMsg && (
            <p className="text-sm text-neon-cyan mt-4 animate-pulse">
              {t('cta.thanks')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}