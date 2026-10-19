import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogList from '@/components/BlogList';

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      title_tr: data.title_tr,
      title_en: data.title_en,
      date: data.date,
      excerpt_tr: data.excerpt_tr,
      excerpt_en: data.excerpt_en,
    };
  });

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">
        Blog <span className="gradient-text">Yazıları</span>
      </h1>
      
      <BlogList posts={posts} />
    </main>
  );
}