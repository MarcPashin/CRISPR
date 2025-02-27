import { BlogPost } from './blog-service';

// Type for creating/updating blog posts
export interface PostFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  readingTime?: string;
  tags: string[];
  published: boolean;
  authorId: string;
}

// Admin service functions
export async function createPost(postData: PostFormData): Promise<BlogPost> {
  const response = await fetch('/api/admin/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create post');
  }

  return response.json();
}

export async function updatePost(id: string, postData: PostFormData): Promise<BlogPost> {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update post');
  }

  return response.json();
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete post');
  }
}

// Get list of all users for the author selector
export async function getAllUsers(): Promise<{id: string, name: string}[]> {
  const response = await fetch('/api/admin/users', {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

// Get drafts (unpublished posts)
export async function getDraftPosts(): Promise<BlogPost[]> {
  const response = await fetch('/api/admin/drafts', {
    next: { revalidate: 60 }, // Shorter cache for drafts
  });

  if (!response.ok) {
    throw new Error('Failed to fetch draft posts');
  }

  return response.json();
}