'use client';

import { useEffect, useRef, useState } from 'react';
import { Compass, Trophy } from 'lucide-react';
import { useLang } from '@/context/LangContext';

interface CounterProps {
  target: number;
  suffix: string;
}

function Counter({ target, suffix }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const duration = 1500;

            const update = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              setCount(Math.floor(progress * target));
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-number">
      {count}
      {suffix}
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <header className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-gray-300 mb-6 animate-glow">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span>{t('hero.badge')}</span>
        </div>

        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 hero-title">
          {t('hero.title1')}
          <br />
          <span className="gradient-text">{t('hero.title2')}</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#kesfet"
            className="btn-glow w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan font-medium hover:scale-105 transition text-white"
          >
            <Compass size={16} className="inline mr-2" />
            {t('hero.cta1')}
          </a>
          <a
            href="#liderler"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass font-medium hover:bg-white/10 transition text-white"
          >
            <Trophy size={16} className="inline mr-2 text-neon-cyan" />
            {t('hero.cta2')}
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto">
          <div>
            <Counter target={500} suffix="+" />
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {t('stats.tools')}
            </div>
          </div>
          <div>
            <Counter target={50} suffix="K+" />
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {t('stats.users')}
            </div>
          </div>
          <div>
            <Counter target={12} suffix="" />
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {t('stats.categories')}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}