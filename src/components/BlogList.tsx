'use client';

import { useLang } from '@/context/LangContext';
import { useRouter } from 'next/navigation';

export default function BlogList({ posts }: { posts: any[] }) {
  const { lang } = useLang();
  const router = useRouter();

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <div 
          key={post.slug}
          onClick={() => router.push(`/blog/${post.slug}`)}
          className="glass rounded-2xl p-6 hover:bg-white/5 transition cursor-pointer block"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">
            {lang === 'tr' ? post.title_tr : post.title_en}
          </h2>
          <p className="text-gray-400">
            {lang === 'tr' ? post.excerpt_tr : post.excerpt_en}
          </p>
          <div className="text-sm text-neon-cyan mt-4">{post.date}</div>
        </div>
      ))}
    </div>
  );
}