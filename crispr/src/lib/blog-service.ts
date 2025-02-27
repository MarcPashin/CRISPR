// Types for blog data
export interface BlogAuthor {
    name: string;
    image?: string;
    bio?: string;
  }
  
  export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    date: string;
    readingTime?: string;
    image?: string;
    published: boolean;
    author: BlogAuthor;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Tag {
    name: string;
    count: number;
  }
  
  // Service functions to fetch blog data
  export async function getAllPosts(): Promise<BlogPost[]> {
    try {
      // For client components
      const response = await fetch('/api/posts', { 
        next: { revalidate: 3600 } 
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch posts');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error in getAllPosts:', err);
      throw err;
    }
  }
  
  export async function getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`/api/posts/${slug}`, { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return await response.json();
  }
  
  export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const response = await fetch(`/api/posts?tag=${encodeURIComponent(tag)}`, { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts by tag');
    }
    
    return await response.json();
  }
  
  export async function getAllTags(): Promise<Tag[]> {
    const response = await fetch('/api/posts/tags', { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    
    return await response.json();
  }
  
  // Get related posts based on tags
  export async function getRelatedPosts(currentPostSlug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
    // We'll fetch all posts and filter them on the client side for simplicity
    const allPosts = await getAllPosts();
    
    return allPosts
      .filter(post => 
        post.slug !== currentPostSlug && 
        post.tags.some(tag => tags.includes(tag))
      )
      .sort((a, b) => {
        // Sort by number of matching tags
        const aMatches = a.tags.filter(tag => tags.includes(tag)).length;
        const bMatches = b.tags.filter(tag => tags.includes(tag)).length;
        return bMatches - aMatches;
      })
      .slice(0, limit);
  }