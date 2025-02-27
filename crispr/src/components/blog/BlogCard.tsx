'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog-service';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Use the default DNA image if no image provided or if there was an error loading
  const imageUrl = imageError || !post.image ? 
    '/images/DNA.jpg' : 
    (post.image.startsWith('/') ? post.image : `/${post.image}`);
    
  const handleCardClick = () => {
    router.push(`/blog/${post.slug}`);
  };
  
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    router.push(`/blog/tag/${tag}`);
  };
  
  return (
    <div 
      className="bg-dark-surface-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image section */}
      <div className="h-48 relative">
        <Image 
          src={imageUrl}
          alt={post.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          onError={() => setImageError(true)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <CalendarIcon className="h-4 w-4 text-gray-200 mr-2" />
          <span className="text-sm text-gray-200 font-medium">
            {formattedDate}
          </span>
        </div>
        
        <h2 className="text-xl font-bold mb-2 text-gray-200 hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h2>
        
        <p className="text-gray-300 mb-4 line-clamp-3">{post.summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {post.author?.name ? (
              <span className="text-sm font-medium text-gray-300">{post.author.name}</span>
            ) : (
              <span className="text-sm font-medium text-gray-300">Unknown Author</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                onClick={(e) => handleTagClick(e, tag)}
                className="inline-flex items-center text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1 font-medium hover:bg-blue-200 transition-colors cursor-pointer"
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

export default BlogCard;