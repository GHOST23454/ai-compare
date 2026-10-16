'use client';

import { useEffect } from 'react';
import {
  X,
  Heart,
  Star,
  Trash2,
  MessageSquare,
  Brain,
  Image as ImageIcon,
  Palette,
  Code,
  Terminal,
  Music,
  Mic,
  Video,
} from 'lucide-react';
import { tools } from '@/data/tools';
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

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, toggleFavorite } = useApp();
  const { t, lang } = useLang();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const favTools = tools.filter((tool) => favorites.includes(tool.id));

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box glass max-w-2xl">
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          <X size={18} />
        </button>

        <h2 className="font-display font-bold text-2xl mb-6 text-white flex items-center gap-2">
          <Heart size={20} className="text-neon-pink" fill="currentColor" />
          {t('modal.favorites')}
        </h2>

        {favTools.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Heart size={40} className="mx-auto mb-3 opacity-50" />
            <p>{t('toast.noFav')}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {favTools.map((tool) => {
              const Icon = iconMap[tool.icon] || MessageSquare;
              return (
                <div
                  key={tool.id}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate text-white">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {tool.desc[lang]}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm flex-shrink-0 text-white">
                    <Star size={12} className="text-yellow-400" fill="currentColor" />
                    <span className="font-semibold">{tool.rating}</span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(tool.id)}
                    className="text-red-400 hover:text-red-300 transition p-2"
                    aria-label={t('modal.remove')}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}