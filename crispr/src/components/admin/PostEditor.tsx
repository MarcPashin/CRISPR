'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/blog-service';
import { createPost, updatePost, getAllUsers, PostFormData } from '@/lib/admin-service';
import { Loader2, Save, X } from 'lucide-react';

// Rich text editor - in a real app you would use a library like TipTap, Editor.js, etc.
// For this example, we'll use a simple textarea

interface PostEditorProps {
  post?: BlogPost;
  isEdit?: boolean;
}

const PostEditor: React.FC<PostEditorProps> = ({ post, isEdit = false }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  
  // Form state
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || '',
    slug: post?.slug || '',
    summary: post?.summary || '',
    content: post?.content || '',
    image: post?.image || '',
    readingTime: post?.readingTime || '',
    tags: post?.tags || [],
    published: post?.published || false,
    authorId: post?.author ? (post.author as any).id : '',
  });

  // Tag input state
  const [tagInput, setTagInput] = useState('');

  // Load users for author selector
  useEffect(() => {
    async function loadUsers() {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
        
        // If creating a new post and we have users, set the first one as default
        if (!isEdit && userData.length > 0 && !formData.authorId) {
          setFormData(prev => ({ ...prev, authorId: userData[0].id }));
        }
      } catch (err) {
        console.error('Failed to load users:', err);
        setError('Failed to load authors. Please try again.');
      }
    }
    
    loadUsers();
  }, [isEdit, formData.authorId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle adding tags
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // Handle removing tags
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setFormData(prev => ({ ...prev, slug }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isEdit && post?.id) {
        await updatePost(post.id, formData);
      } else {
        await createPost(formData);
      }
      
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to save post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
          />
        </div>

        {/* Slug with generator button */}
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="flex-grow block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
            />
            <button
              type="button"
              onClick={generateSlug}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Author selector */}
        <div>
          <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <select
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
          >
            <option value="">Select an author</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div className="col-span-2">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
          />
        </div>

        {/* Content */}
        <div className="col-span-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content (HTML)
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={15}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue font-mono text-sm"
          />
        </div>

        {/* Image URL */}
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Featured Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
          />
        </div>

        {/* Reading time */}
        <div>
          <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700">
            Reading Time (e.g. "5 min read")
          </label>
          <input
            type="text"
            id="readingTime"
            name="readingTime"
            value={formData.readingTime || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
          />
        </div>

        {/* Tags */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-grow block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:ring-crispr-blue focus:border-crispr-blue"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Published checkbox */}
        <div className="col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-crispr-blue focus:ring-crispr-blue border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
              Publish post (if unchecked, post will be saved as draft)
            </label>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crispr-blue"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-crispr-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crispr-blue"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update Post' : 'Create Post'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PostEditor;