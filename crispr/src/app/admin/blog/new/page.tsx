'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PostEditor from '../../../../components/admin/PostEditor';

export default function NewPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login?callbackUrl=/admin/blog/new');
    },
  });

  // Check if user is admin
  const isUserAdmin = session?.user?.role === 'ADMIN';

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isUserAdmin) {
    router.push('/');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Create New Blog Post</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <PostEditor />
        </div>
      </div>
    </div>
  );
}