'use client';

import { useLang } from '@/context/LangContext';
import { useState, useEffect } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

export default function BlogPost({ post }: { post: any }) {
  const { lang } = useLang();
  const [contentHtml, setContentHtml] = useState('');

  useEffect(() => {
    async function processMarkdown() {
      let contentToRender = '';
      
      if (lang === 'tr') {
        const trMatch = post.content.match(/<!-- TR_CONTENT_START -->([\s\S]*?)<!-- TR_CONTENT_END -->/);
        contentToRender = trMatch ? trMatch[1] : post.content;
      } else {
        const enMatch = post.content.match(/<!-- EN_CONTENT_START -->([\s\S]*?)<!-- EN_CONTENT_END -->/);
        contentToRender = enMatch ? enMatch[1] : post.content;
      }

      const processed = await remark().use(html).process(contentToRender);
      setContentHtml(processed.toString());
    }
    processMarkdown();
  }, [post.content, lang]);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="text-neon-cyan mb-2">{post.date}</div>
        <h1 className="font-display font-bold text-4xl text-white">
          {lang === 'tr' ? post.title_tr : post.title_en}
        </h1>
      </div>
      
      <div 
        className="prose prose-invert prose-lg text-gray-300"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
    </main>
  );
}