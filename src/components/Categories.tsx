'use client';

import {
  PenTool,
  Image as ImageIcon,
  Music,
  Code,
  Video,
  LineChart,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useLang } from '@/context/LangContext';

interface CategoriesProps {
  onSelectCategory: (cat: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const { t } = useLang();

  const categories = [
    { cat: 'Yazı', icon: PenTool, color: 'text-neon-purple', label: t('cat.writing'), sample: 'ChatGPT, Claude...' },
    { cat: 'Görsel', icon: ImageIcon, color: 'text-neon-pink', label: t('cat.visual'), sample: 'Midjourney, DALL·E...' },
    { cat: 'Ses', icon: Music, color: 'text-neon-cyan', label: t('cat.audio'), sample: 'Suno, ElevenLabs...' },
    { cat: 'Kod', icon: Code, color: 'text-neon-purple', label: t('cat.code'), sample: 'Copilot, Cursor...' },
    { cat: 'Video', icon: Video, color: 'text-neon-pink', label: t('cat.video'), sample: 'Runway, Sora...' },
    { cat: 'Analiz', icon: LineChart, color: 'text-neon-cyan', label: t('cat.analytics'), sample: 'DataRobot...' },
    { cat: 'İş', icon: Briefcase, color: 'text-neon-purple', label: t('cat.business'), sample: 'Otomasyon...' },
    { cat: 'Eğitim', icon: GraduationCap, color: 'text-neon-pink', label: t('cat.education'), sample: 'Öğrenme...' },
  ];

  return (
    <section id="kategoriler" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-white">
            {t('cat.title1')} <span className="gradient-text">{t('cat.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{t('cat.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ cat, icon: Icon, color, label, sample }) => (
            <div
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="card-glow glass rounded-2xl p-6 cursor-pointer"
            >
              <Icon size={24} className={`${color} mb-3`} />
              <h3 className="font-display font-semibold text-white">{label}</h3>
              <p className="text-xs text-gray-500 mt-1">{sample}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}