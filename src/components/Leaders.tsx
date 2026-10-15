'use client';

import { Brain, Sparkles, Wand2, Star, Trophy } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export default function Leaders() {
  const { t } = useLang();

  return (
    <section id="liderler" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-white">
            {t('leaders.title1')}{' '}
            <span className="gradient-text">{t('leaders.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{t('leaders.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 2. sıra */}
          <div className="card-glow glass rounded-3xl p-8 md:mt-12">
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl">🥈</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400">
                #2
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center mb-4">
              <Brain size={24} className="text-white" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-white">
              Claude 3.5 Sonnet
            </h3>
            <p className="text-gray-400 text-sm mb-6">{t('leaders.claude')}</p>
            <div className="flex items-center gap-2 text-sm text-white">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="font-semibold">4.8</span>
              <span className="text-gray-500">/ 5</span>
            </div>
          </div>

          {/* 1. sıra - şampiyon */}
          <div className="card-glow glass rounded-3xl p-8 border-neon-purple/40 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-xs font-semibold text-white flex items-center gap-1">
              <Trophy size={12} /> {t('leaders.champion')}
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl">🥇</span>
              <span className="text-xs px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple">
                #1
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-white" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-white">
              GPT-4 Turbo
            </h3>
            <p className="text-gray-400 text-sm mb-6">{t('leaders.gpt')}</p>
            <div className="flex items-center gap-2 text-sm text-white">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="font-semibold">4.9</span>
              <span className="text-gray-500">/ 5</span>
            </div>
          </div>

          {/* 3. sıra */}
          <div className="card-glow glass rounded-3xl p-8 md:mt-12">
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl">🥉</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400">
                #3
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mb-4">
              <Wand2 size={24} className="text-white" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-white">
              Midjourney v6
            </h3>
            <p className="text-gray-400 text-sm mb-6">{t('leaders.midjourney')}</p>
           cd ai-compare <div className="flex items-center gap-2 text-sm text-white">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="font-semibold">4.7</span>
              <span className="text-gray-500">/ 5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}