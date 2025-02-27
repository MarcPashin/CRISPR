import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPostsServerAction, getAllTagsServerAction } from '@/lib/blog-actions';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles, research findings, and community highlights from the BioCurious CRISPR Project.',
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    getAllPostsServerAction(),
    getAllTagsServerAction()
  ]);

  return (
    <div className="bg-dark-surface min-h-screen pb-20 text-dark-primary">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-dark-surface-light to-dark-surface py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-4">CRISPR Project Blog</h1>
          <p className="text-xl text-dark-secondary max-w-3xl mx-auto">
            Latest updates, research findings, and community highlights from our BioCurious CRISPR Project
          </p>
        </div>
      </div>

      {/* Popular Tags Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-dark-surface-light rounded-lg shadow-dark p-6 border border-dark-border/40">
          <h2 className="text-lg font-medium text-dark-primary mb-4">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link
                key={tag.name}
                href={`/blog/tag/${tag.name}`}
                className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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
          <div className="text-center py-12 bg-dark-surface-light rounded-lg shadow-dark border border-dark-border/40">
            <h3 className="text-xl font-medium text-dark-primary mb-2">No blog posts found</h3>
            <p className="text-dark-secondary">Check back soon for new content!</p>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-dark-surface-light rounded-lg shadow-dark p-8 text-center border border-dark-border/40">
          <h2 className="text-2xl font-bold text-dark-primary mb-2">Stay Updated</h2>
          <p className="text-dark-secondary mb-6">
            Subscribe to our newsletter to get the latest updates from our CRISPR community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-dark-border rounded-md focus:ring-primary focus:border-primary bg-dark-surface text-dark-primary"
            />
            <button className="bg-primary hover:bg-primary/80 text-dark-surface-light px-6 py-2 rounded-md font-medium transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
