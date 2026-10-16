'use client';

import {
  MessageSquare,
  Brain,
  Image as ImageIcon,
  Palette,
  Code,
  Terminal,
  Music,
  Mic,
  Video,
  Star,
  Heart,
  Scale,
  ArrowRight,
} from 'lucide-react';
import { Tool } from '@/types';
import { useApp } from '@/context/AppContext';
import { useLang } from '@/context/LangContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare,
  Brain,
  Image: ImageIcon,
  Palette,
  Code,
  Terminal,
  Music,
  Mic,
  Video,
};

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const { isFavorite, isCompared, toggleFavorite, toggleCompare } = useApp();
  const { t, lang } = useLang();

  const Icon = iconMap[tool.icon] || MessageSquare;
  const fav = isFavorite(tool.id);
  const comp = isCompared(tool.id);

  return (
    <div
      onClick={onClick}
      className="card-glow glass rounded-3xl p-6 cursor-pointer relative"
    >
      {/* Favori butonu */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(tool.id);
        }}
        className={`fav-toggle ${fav ? 'active' : ''}`}
        aria-label="Favorilere ekle"
      >
        <Heart size={12} fill={fav ? 'currentColor' : 'none'} />
      </button>

      {/* Karşılaştır butonu */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleCompare(tool.id);
        }}
        className={`compare-toggle ${comp ? 'active' : ''}`}
        aria-label="Karşılaştır"
      >
        <Scale size={12} />
      </button>

      {/* Üst kısım */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}
        >
          <Icon size={20} className="text-white" />
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 mr-16">
          {tool.tag}
        </span>
      </div>

      {/* İçerik */}
      <h3 className="font-display font-bold text-lg mb-1 text-white">
        {tool.name}
      </h3>
      <p className="text-xs text-neon-cyan mb-3">{tool.cat}</p>
      <p className="text-sm text-gray-400 mb-5 leading-relaxed">
        {tool.desc[lang]}
      </p>

      {/* Alt kısım */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-sm text-white">
          <Star size={12} className="text-yellow-400" fill="currentColor" />
          <span className="font-semibold">{tool.rating}</span>
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          {t('explore.detail')} <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}