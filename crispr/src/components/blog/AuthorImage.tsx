'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AuthorImageProps {
  src?: string | null;
  name: string;
}

const AuthorImage: React.FC<AuthorImageProps> = ({ src, name }) => {
  const [imgError, setImgError] = useState(false);
  
  // If no image or error loading image, show a placeholder
  if (!src || imgError) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 font-medium">
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }
  
  // Format image URL correctly
  const imageUrl = src.startsWith('/') ? src : `/${src}`;
  
  return (
    <Image
      src={imageUrl}
      alt={`${name}'s profile picture`}
      width={48}
      height={48}
      className="rounded-full"
      onError={() => setImgError(true)}
    />
  );
};

export default AuthorImage;