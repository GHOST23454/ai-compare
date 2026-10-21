'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';
import { tools } from '@/data/tools';
import { useLang } from '@/context/LangContext';
import { ArrowLeft, Heart, LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { favorites } = useApp();
  const { lang } = useLang();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.push('/'); // Giriş yapmamışsa ana sayfaya at
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className="text-white text-center pt-32">Yükleniyor...</div>;
  if (!user) return null;

  const favoriteTools = tools.filter((tool) => favorites.includes(tool.id));

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">
      {/* Geri Dön */}
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
        <ArrowLeft size={16} /> Ana Sayfaya Dön
      </Link>

      {/* Profil Kartı */}
      <div className="glass rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-2xl font-bold text-white uppercase">
            {user.email?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.email?.split('@')[0]}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
        >
          <LogOut size={16} /> Çıkış Yap
        </button>
      </div>

      {/* Favoriler Bölümü */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="text-neon-pink" size={20} fill="currentColor" /> 
          Favori Araçlarım ({favoriteTools.length})
        </h2>
        
        {favoriteTools.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-gray-400">
            Henüz favori aracın yok. Keşfet sayfasından araçları favorilerine ekleyebilirsin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteTools.map((tool) => (
              <Link 
                href={`/?tool=${tool.id}`} // Ana sayfada o aracı açmak için (şimdilik ana sayfaya atar)
                key={tool.id}
                className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                   <UserIcon size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{tool.name}</h3>
                  <p className="text-xs text-gray-400">{tool.cat}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}