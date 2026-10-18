import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    contentHtml,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+ için params'ı await ile bekliyoruz
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="text-neon-cyan mb-2">{post.date}</div>
        <h1 className="font-display font-bold text-4xl text-white">{post.title}</h1>
      </div>
      
      <div 
        className="prose prose-invert prose-lg text-gray-300"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </main>
  );
}