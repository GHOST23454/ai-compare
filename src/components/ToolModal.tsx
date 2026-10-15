'use client';

import { useEffect } from 'react';
import {
  X,
  Heart,
  Star,
  ExternalLink,
  CheckCircle2,
  XCircle,
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

interface ToolModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const { t } = useLang();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (tool) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [tool, onClose]);

  if (!tool) return null;

  const Icon = iconMap[tool.icon] || MessageSquare;
  const fav = isFavorite(tool.id);

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

        <div className="flex items-start gap-5 mb-6 pr-10">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0`}
          >
            <Icon size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-2xl mb-1 text-white">
              {tool.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-neon-cyan">{tool.cat}</span>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-1 text-white">
                <Star size={12} className="text-yellow-400" fill="currentColor" />
                <span className="font-semibold">{tool.rating}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                {tool.tag}
              </span>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`fav-toggle ${fav ? 'active' : ''} !static !top-auto !right-auto`}
            aria-label="Favorilere ekle"
          >
            <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="text-gray-400 leading-relaxed mb-6">{tool.longDesc}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">{t('modal.price')}</div>
            <div className="font-semibold text-sm text-white">{tool.price}</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">{t('modal.category')}</div>
            <div className="font-semibold text-sm text-white">{tool.cat}</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-display font-semibold mb-3 text-white">
            {t('modal.features')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-display font-semibold mb-3 text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={14} /> {t('modal.pros')}
            </h3>
            <ul className="space-y-1 text-sm text-gray-400">
              {tool.pros.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-3 text-red-400 flex items-center gap-1">
              <XCircle size={14} /> {t('modal.cons')}
            </h3>
            <ul className="space-y-1 text-sm text-gray-400">
              {tool.cons.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan font-medium hover:scale-105 transition text-white"
        >
          <ExternalLink size={14} /> {t('modal.visit')}
        </a>
      </div>
    </div>
  );
}