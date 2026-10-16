'use client';

import { useEffect } from 'react';
import {
  X,
  Scale,
  Star,
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

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({ isOpen, onClose }: CompareModalProps) {
  const { compare, toggleCompare } = useApp();
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

  const compareTools = compare
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as typeof tools;

  const rows = [
    {
      label: t('modal.rating'),
      render: (tool: typeof tools[0]) => (
        <div className="flex items-center gap-1 justify-center text-white">
          <Star size={12} className="text-yellow-400" fill="currentColor" />
          <span className="font-semibold">{tool.rating}</span>
        </div>
      ),
    },
    {
      label: t('modal.category'),
      render: (tool: typeof tools[0]) => (
        <span className="text-white">{tool.cat}</span>
      ),
    },
    {
      label: t('modal.price'),
      render: (tool: typeof tools[0]) => (
        <span className="text-white">{tool.price}</span>
      ),
    },
    {
      label: t('modal.features'),
      render: (tool: typeof tools[0]) => (
        <div className="flex flex-wrap gap-1 justify-center">
          {tool.features[lang].map((f: string) => (
            <span
              key={f}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300"
            >
              {f}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: t('modal.pros'),
      render: (tool: typeof tools[0]) => (
        <div className="space-y-1">
          {tool.pros[lang].map((p: string) => (
            <div key={p} className="text-xs text-emerald-400">
              + {p}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: t('modal.cons'),
      render: (tool: typeof tools[0]) => (
        <div className="space-y-1">
          {tool.cons[lang].map((c: string) => (
            <div key={c} className="text-xs text-red-400">
              − {c}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box glass max-w-5xl">
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          <X size={18} />
        </button>

        <h2 className="font-display font-bold text-2xl mb-6 text-white flex items-center gap-2">
          <Scale size={20} className="text-neon-cyan" />
          {t('modal.compare')}
        </h2>

        {compareTools.length < 2 ? (
          <div className="text-center py-12 text-gray-500">
            <Scale size={40} className="mx-auto mb-3 opacity-50" />
            <p>{t('toast.needTwo')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-3 w-32"></th>
                  {compareTools.map((tool) => {
                    const Icon = iconMap[tool.icon] || MessageSquare;
                    return (
                      <th key={tool.id} className="p-3 text-center">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mx-auto mb-2`}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <div className="font-display font-bold text-white">
                          {tool.name}
                        </div>
                        <button
                          onClick={() => toggleCompare(tool.id)}
                          className="text-xs text-red-400 hover:text-red-300 mt-2 flex items-center gap-1 mx-auto"
                        >
                          <X size={12} /> {t('modal.remove')}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-3 font-semibold text-gray-400 align-top">
                      {row.label}
                    </td>
                    {compareTools.map((tool) => (
                      <td key={tool.id} className="p-3 text-center align-top">
                        {row.render(tool)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}