'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BlogPostImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}

const BlogPostImage: React.FC<BlogPostImageProps> = ({ src, alt, fallbackSrc }) => {
  const [imgSrc, setImgSrc] = useState<string>(
    src.startsWith('/') ? src : `/${src}`
  );

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority
      className="object-cover"
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default BlogPostImage;