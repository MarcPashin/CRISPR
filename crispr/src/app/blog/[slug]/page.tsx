import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog-service';
import BlogCard from '../../../components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | Latest Updates from Our CRISPR Community',
  description: 'Read the latest articles, research findings, and community highlights from the BioCurious CRISPR Project.',
}; 

export default async function BlogPage() {
  // Fetch posts and tags
  const posts = await getAllPosts();
  const tags = await getAllTags();

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
            {tags.map(tag => (
              <Link
                key={tag.name}
                href={`/blog/tag/${tag.name}`}
                className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {tag.name} ({tag.count})
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600">
              Check back soon for new content!
            </p>
          </div>
        )}
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