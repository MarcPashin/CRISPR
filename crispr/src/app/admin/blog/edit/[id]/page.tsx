'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PostEditor from '@/components/admin/PostEditor';
import { getPostBySlug, BlogPost } from '@/lib/blog-service';
import { Loader2 } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: PageProps) {
  const { id } = params;
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?callbackUrl=/admin/blog/edit/${id}`);
    },
  });

  // Check if user is admin
  const isUserAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    if (status === 'loading') return;

    if (!isUserAdmin) {
      router.push('/');
      return;
    }

    async function loadPost() {
      try {
        setIsLoading(true);
        // In a real app, you would have an API endpoint to get a post by ID
        // For now, we'll just get it by slug (assuming id === slug for simplicity)
        const postData = await getPostBySlug(id);
        setPost(postData);
      } catch (err) {
        console.error('Failed to load post:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [id, status, isUserAdmin, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-crispr-blue" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!isUserAdmin) {
    return null;
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/admin/blog')}
              className="text-crispr-blue hover:underline"
            >
              Back to Blog Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Post not found
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/admin/blog')}
              className="text-crispr-blue hover:underline"
            >
              Back to Blog Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <PostEditor post={post} isEdit={true} />
        </div>
      </div>
    </div>
  );
}