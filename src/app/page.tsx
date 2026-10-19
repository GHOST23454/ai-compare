'use client';

import { useState } from 'react';
import { Tool } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ToolsGrid from '@/components/ToolsGrid';
import Leaders from '@/components/Leaders';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import ToolModal from '@/components/ToolModal';
import FavoritesModal from '@/components/FavoritesModal';
import CompareModal from '@/components/CompareModal';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [externalCategory, setExternalCategory] = useState<string>('all');
  const [favOpen, setFavOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false); 

  const handleSelectCategory = (cat: string) => {
    setExternalCategory(cat);
    setTimeout(() => {
      document.getElementById('kesfet')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <Navbar
        onOpenFavorites={() => setFavOpen(true)}
        onOpenCompare={() => setCompareOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
      />
      <Hero />
      <Categories onSelectCategory={handleSelectCategory} />
      <ToolsGrid
        onOpenDetail={setSelectedTool}
        externalCategory={externalCategory}
        onClearExternalCategory={() => setExternalCategory('all')}
      />
      <Leaders />
      <Newsletter />
      <Footer />

      <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      <FavoritesModal isOpen={favOpen} onClose={() => setFavOpen(false)} />
      <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}