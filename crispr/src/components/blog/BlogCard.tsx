'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog-service';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
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
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;