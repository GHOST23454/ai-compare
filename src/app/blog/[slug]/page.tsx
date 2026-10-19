import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPost from '@/components/BlogPost';

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return (
      <div className="text-white pt-32 text-center text-2xl flex flex-col items-center">
        <p>Yazı bulunamadı. (404)</p>
        <p className="text-sm text-gray-400 mt-2">Aranan dosya: {slug}.md</p>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return <BlogPost post={{ ...data, content }} />;
}