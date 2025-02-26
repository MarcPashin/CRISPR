import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Tag } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Latest Updates from Our CRISPR Community',
  description: 'Read the latest articles, research findings, and community highlights from the BioCurious CRISPR Project.',
};

// In a real implementation, this would come from your content layer/API
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  summary: string;
  tags: string[];
  image?: string;
}

// Sample data for demonstration
const samplePosts: BlogPost[] = [
  {
    slug: 'introduction-to-crispr',
    title: 'Introduction to CRISPR at BioCurious',
    date: '2023-04-01',
    author: {
      name: 'Jane Doe',
      image: '/api/placeholder/40/40'
    },
    summary: 'Learn about our community CRISPR project, its goals, and how you can get involved.',
    tags: ['crispr', 'introduction', 'community'],
    image: '/api/placeholder/800/400'
  },
  {
    slug: 'crispr-safety-protocols',
    title: 'Safety First: CRISPR Lab Protocols for Community Labs',
    date: '2023-04-15',
    author: {
      name: 'John Smith',
      image: '/api/placeholder/40/40'
    },
    summary: 'A comprehensive guide to maintaining safety standards when working with CRISPR in community lab environments.',
    tags: ['safety', 'protocols', 'lab-practices'],
    image: '/api/placeholder/800/400'
  },
  {
    slug: 'gene-editing-ethics',
    title: 'Ethical Considerations in Community Gene Editing',
    date: '2023-05-01',
    author: {
      name: 'Alex Johnson',
      image: '/api/placeholder/40/40'
    },
    summary: 'Exploring the ethical dimensions of gene editing and how community labs can navigate these complex questions.',
    tags: ['ethics', 'community', 'discussion'],
    image: '/api/placeholder/800/400'
  },
  {
    slug: 'diy-gel-electrophoresis',
    title: 'DIY Gel Electrophoresis Setup for Under $100',
    date: '2023-05-15',
    author: {
      name: 'Sam Williams',
      image: '/api/placeholder/40/40'
    },
    summary: 'How to build an affordable gel electrophoresis system for DNA analysis in your community lab or classroom.',
    tags: ['diy', 'equipment', 'tutorial'],
    image: '/api/placeholder/800/400'
  },
  {
    slug: 'crispr-workshop-recap',
    title: 'Recap: Spring 2023 CRISPR Workshop Series',
    date: '2023-06-01',
    author: {
      name: 'Jane Doe',
      image: '/api/placeholder/40/40'
    },
    summary: 'Highlights and learnings from our spring workshop series on CRISPR basics for beginners.',
    tags: ['workshop', 'education', 'recap'],
    image: '/api/placeholder/800/400'
  },
  {
    slug: 'gene-drive-research',
    title: 'Understanding Gene Drives: Potential and Precautions',
    date: '2023-06-15',
    author: {
      name: 'John Smith',
      image: '/api/placeholder/40/40'
    },
    summary: 'An overview of gene drive technology, its potential applications, and the important precautions needed.',
    tags: ['gene-drives', 'research', 'biosafety'],
    image: '/api/placeholder/800/400'
  }
];

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {post.image && (
        <div className="h-48 relative">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center mb-3">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 hover:text-crispr-blue transition-colors duration-300">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {post.author.image && (
              <Image 
                src={post.author.image} 
                alt={post.author.name} 
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-sm text-gray-700">{post.author.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BlogPage() {
  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(samplePosts.flatMap(post => post.tags))
  ).sort();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">CRISPR Project Blog</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Latest updates, research findings, and community highlights from our BioCurious CRISPR Project
          </p>
        </div>
      </div>

      {/* Popular Tags Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to get the latest updates from our CRISPR community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-crispr-blue focus:border-crispr-blue"
            />
            <button className="bg-crispr-blue hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}