import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  });

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">
        Blog <span className="gradient-text">Yazıları</span>
      </h1>
      
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="glass rounded-2xl p-6 hover:bg-white/5 transition cursor-pointer block"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
            <p className="text-gray-400">{post.excerpt}</p>
            <div className="text-sm text-neon-cyan mt-4">{post.date}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}