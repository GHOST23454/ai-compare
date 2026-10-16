'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Ghost } from 'lucide-react';
import { tools } from '@/data/tools';
import { Tool } from '@/types';
import { useLang } from '@/context/LangContext';
import ToolCard from './ToolCard';

interface ToolsGridProps {
  onOpenDetail: (tool: Tool) => void;
  externalCategory?: string;
  onClearExternalCategory?: () => void;
}

export default function ToolsGrid({
  onOpenDetail,
  externalCategory,
  onClearExternalCategory,
}: ToolsGridProps) {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // Dış kategori değişince iç state'e yansıt
  useEffect(() => {
    if (externalCategory && externalCategory !== 'all') {
      setCategory(externalCategory);
    }
  }, [externalCategory]);

  // Filtre butonuna tıklanınca: iç state güncelle + dış state'i sıfırla
  const handleFilterClick = (value: string) => {
    setCategory(value);
    if (onClearExternalCategory) {
      onClearExternalCategory();
    }
  };

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchSearch =
        !s ||
        tool.name.toLowerCase().includes(s) ||
        tool.cat.toLowerCase().includes(s) ||
        tool.desc.toLowerCase().includes(s);
      const matchCat = category === 'all' || tool.cat === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const filterOptions = [
    { value: 'all', label: t('filter.all') },
    { value: 'Yazı', label: t('cat.writing') },
    { value: 'Görsel', label: t('cat.visual') },
    { value: 'Ses', label: t('cat.audio') },
    { value: 'Kod', label: t('cat.code') },
    { value: 'Video', label: t('cat.video') },
    { value: 'Analiz', label: t('cat.analytics') },
    { value: 'İş', label: t('cat.business') },
    { value: 'Eğitim', label: t('cat.education') },
  ];

  return (
    <section id="kesfet" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-3 text-white">
              {t('explore.title1')}{' '}
              <span className="gradient-text">{t('explore.title2')}</span>
            </h2>
            <p className="text-gray-400">{t('explore.subtitle')}</p>
          </div>

          {/* Arama */}
          <div className="relative w-full md:w-80">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('explore.search')}
              className="w-full pl-11 pr-4 py-3 rounded-full glass text-sm focus:outline-none focus:border-neon-purple/50 text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Filtre butonları */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterClick(opt.value)}
              className={`filter-btn ${category === opt.value ? 'active' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Ghost size={40} className="mx-auto mb-3" />
            <p>{t('explore.noResult')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => onOpenDetail(tool)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}