import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CalendarIcon, Tag, Clock, ChevronLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

// In a real implementation, this would come from your content layer
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: {
    name: string;
    bio: string;
    image?: string;
  };
  summary: string;
  tags: string[];
  image?: string;
  readingTime: string;
  content: string;
}

// Sample post for demonstration
const samplePost: BlogPost = {
  slug: 'introduction-to-crispr',
  title: 'Introduction to CRISPR at BioCurious',
  date: '2023-04-01',
  author: {
    name: 'Jane Doe',
    bio: 'PhD in Molecular Biology with 10+ years experience in gene editing technologies.',
    image: '/api/placeholder/80/80'
  },
  summary: 'Learn about our community CRISPR project, its goals, and how you can get involved.',
  tags: ['crispr', 'introduction', 'community science'],
  image: '/api/placeholder/1200/600',
  readingTime: '8 min read',
  content: `
  <h2>Introduction to CRISPR at BioCurious</h2>
  
  <p>CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) represents one of the most significant breakthroughs in modern biotechnology. At BioCurious, we believe this powerful gene-editing technology should be accessible to citizen scientists, educators, and curious minds.</p>
  
  <h3>What is CRISPR?</h3>
  
  <p>CRISPR is a revolutionary gene-editing technology that allows scientists to make precise edits to DNA sequences. Originally discovered as part of the bacterial immune system, it has been adapted as a tool that can:</p>
  
  <ul>
    <li>Delete specific genes</li>
    <li>Insert new genetic material</li>
    <li>Modify existing sequences</li>
  </ul>
  
  <p>The basic components include:</p>
  
  <ol>
    <li><strong>Cas9 protein</strong> - Acts like molecular scissors that cut DNA</li>
    <li><strong>Guide RNA (gRNA)</strong> - Directs Cas9 to the specific DNA sequence to edit</li>
  </ol>
  
  <h3>Our Community Project</h3>
  
  <p>At BioCurious, we're developing protocols and educational materials to make CRISPR experiments accessible to community lab members. Our goals include:</p>
  
  <ul>
    <li>Creating simplified protocols that can be performed in a community lab setting</li>
    <li>Developing educational workshops for various skill levels</li>
    <li>Exploring responsible applications of gene editing</li>
    <li>Building a knowledge base for citizen science CRISPR experiments</li>
  </ul>
  
  <h3>How to Get Involved</h3>
  
  <p>Whether you're a seasoned biologist or just curious about genetic engineering, there are many ways to participate:</p>
  
  <ul>
    <li>Attend our monthly CRISPR workshops</li>
    <li>Join our online community discussions</li>
    <li>Contribute to our open-source protocols</li>
    <li>Participate in hands-on lab sessions</li>
  </ul>
  
  <p>Stay tuned for more updates as our project develops!</p>
  `
};

interface RelatedPostProps {
  title: string;
  slug: string;
  image?: string;
}

const RelatedPost: React.FC<RelatedPostProps> = ({ title, slug, image }) => {
  const router = useRouter();
  
  return (
    <button 
      className="flex items-center space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300 text-left w-full"
      onClick={() => router.push(`/blog/${slug}`)}
    >
      {image && (
        <div 
          className="h-16 w-16 rounded bg-cover bg-center flex-shrink-0" 
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <h4 className="font-medium text-gray-900 hover:text-crispr-blue">{title}</h4>
    </button>
  );
};

// In a real app, this would be a dynamic server-side rendered page
const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  // In a real app, we would fetch the post based on slug
  // For now, we'll just use our sample post
  const post = samplePost;
  
  // Related posts (in a real app, these would be determined by tags, category, etc.)
  const relatedPosts = [
    {
      title: 'Safety First: CRISPR Lab Protocols for Community Labs',
      slug: 'crispr-safety-protocols',
      image: '/api/placeholder/80/80'
    },
    {
      title: 'Ethical Considerations in Community Gene Editing',
      slug: 'gene-editing-ethics',
      image: '/api/placeholder/80/80'
    },
    {
      title: 'DIY Gel Electrophoresis Setup for Under $100',
      slug: 'diy-gel-electrophoresis',
      image: '/api/placeholder/80/80'
    }
  ];

  if (router.isFallback) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <button 
          className="flex items-center text-crispr-blue hover:underline"
          onClick={() => router.push('/blog')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all posts
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <Head>
        <title>{post.title} | BioCurious CRISPR Project</title>
        <meta name="description" content={post.summary} />
      </Head>

      {/* Hero Section with Image */}
      {post.image && (
        <div className="w-full h-96 bg-cover bg-center relative" style={{ backgroundImage: `url(${post.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 pt-8">
        {/* Navigation */}
        <div className="mb-8">
          <button 
            className="flex items-center text-gray-500 hover:text-crispr-blue"
            onClick={() => router.push('/blog')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to all posts
          </button>
        </div>

        {/* Main Content + Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Only show title here if no image */}
            {!post.image && (
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center space-x-6 text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <div key={tag} className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Social Share */}
            <div className="border-t border-b py-6 mb-12">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 font-medium">Share this article</div>
                <div className="flex space-x-4">
                  <button className="text-gray-500 hover:text-crispr-blue">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-crispr-blue">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-crispr-blue">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <div className="flex items-center">
                {post.author.image && (
                  <img 
                    src={post.author.image} 
                    alt={post.author.name} 
                    className="h-16 w-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{post.author.name}</h3>
                  <p className="text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Related Posts */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-2">
                  {relatedPosts.map(post => (
                    <RelatedPost 
                      key={post.slug}
                      title={post.title}
                      slug={post.slug}
                      image={post.image}
                    />
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with the latest developments in our CRISPR community project.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-crispr-blue focus:border-crispr-blue text-sm"
                  />
                  <button className="w-full bg-crispr-blue hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;