import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlugServerAction } from '@/lib/blog-actions';
import BlogPostImage from '@/components/blog/BlogPostImage';
import AuthorImage from '@/components/blog/AuthorImage';

// Updated PageProps to match what Next.js expects
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlugServerAction(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | BioCurious CRISPR Project`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlugServerAction(slug);
  
  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-dark-surface min-h-screen pb-20">
      {/* Featured Image */}
      <div className="w-full h-80 md:h-96 relative">
        {post.image ? (
          <BlogPostImage
            src={post.image}
            alt={post.title}
            fallbackSrc="/images/DNA.jpg"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/40 to-primary/10"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/70 to-transparent" />
      </div>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="bg-dark-surface-light rounded-lg shadow-dark overflow-hidden border border-dark-border/40">
          <div className="p-6 md:p-10">
            {/* Back Button */}
            <Link 
              href="/blog"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all posts
            </Link>

            {/* Title & Meta */}
            <h1 className="text-3xl md:text-4xl font-bold text-dark-primary mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center text-dark-secondary mb-8">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.readingTime || '5 min read'}</span>
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* Post Content - Using Tailwind Typography for better readability */}
            <article className="prose prose-dark max-w-none text-dark-primary">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Author */}
            {post.author && (
              <div className="mt-12 pt-8 border-t border-dark-border/40">
                <h2 className="text-xl font-semibold mb-4 text-dark-primary">About the Author</h2>
                <div className="flex items-start">
                  <div className="mr-4">
                    <AuthorImage 
                      src={post.author.image} 
                      name={post.author.name} 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-primary">{post.author.name}</h3>
                    {post.author.bio && (
                      <p className="text-dark-secondary mt-1">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Articles */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-dark-surface-light rounded-lg shadow-dark overflow-hidden border border-dark-border/40 p-6">
          <h2 className="text-xl font-bold text-dark-primary mb-6">More from BioCurious</h2>
          <div className="flex flex-col space-y-4">
            <Link href="/projects" className="text-primary hover:text-primary/80">
              Explore our CRISPR Projects →
            </Link>
            <Link href="/resources" className="text-primary hover:text-primary/80">
              Access Educational Resources →
            </Link>
            <Link href="/community" className="text-primary hover:text-primary/80">
              Join our Community →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// We now use Tailwind's typography plugin instead of custom markdown formatting
// This function is kept for reference but is no longer used
function formatMarkdown(content: string): string {
  return content; // Content is now directly used with the prose classes
}