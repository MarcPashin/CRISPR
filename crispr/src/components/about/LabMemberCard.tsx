'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export interface LabMember {
  id: string;
  name: string;
  role: string;
  image?: string | null;
  shortBio: string;
  slug: string;
}

interface LabMemberCardProps {
  member: LabMember;
}

const LabMemberCard: React.FC<LabMemberCardProps> = ({ member }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  
  const handleClick = () => {
    router.push(`/about/${member.slug}`);
  };
  
  // Default image fallback if no image or error loading
  const imageUrl = imageError || !member.image ? 
    '/images/profile-placeholder.jpg' : // Replace with your actual placeholder image path
    (member.image.startsWith('/') ? member.image : `/${member.image}`);
  
  return (
    <div 
      onClick={handleClick}
      className="bg-dark-surface-light rounded-lg shadow-dark border border-dark-border/30 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary/50"
    >
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={imageUrl}
          alt={`${member.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/70 to-transparent" />
      </div>
      
      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-dark-primary mb-1">{member.name}</h3>
        <p className="text-primary mb-3 font-medium">{member.role}</p>
        <p className="text-dark-secondary line-clamp-3 mb-4">{member.shortBio}</p>
        
        <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
          <span className="mr-1">View Profile</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default LabMemberCard;