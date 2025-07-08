import React from 'react';
import { Metadata } from 'next';
import LabMemberCard, { LabMember } from '@/components/about/LabMemberCard';

export const metadata: Metadata = {
  title: 'About Us | BioCurious CRISPR Project',
  description: 'Meet our team of researchers, scientists, and biotech enthusiasts behind the BioCurious CRISPR Project.',
};

// In a real app, this would come from your database
// For now, we'll use hardcoded data that you can replace later
const labMembers: LabMember[] = [
  {
    id: '1',
    name: 'Marc Pashin',
    role: 'Project Leader',
    image: '/images/team/marc-pashin.png',
    shortBio: 'Project leader at BioCurious and Stanford research intern specializing in CRISPR gene editing and computational biology.',
    slug: 'marc-pashin'
  },
  {
    id: '2',
    name: 'Luke Jun',
    role: 'Project Leader',
    image: '/images/team/Luke-Jun.jpeg',
    shortBio: 'Project leader at BioCurious specializing in CRISPR applications and molecular biology.',
    slug: 'luke-jun'
  },
  {
    id: '3',
    name: 'Avi Lekkelapudi',
    role: 'Project Leader',
    image: '/images/team/Avi-Lek.jpeg',
    shortBio: 'Project leader focused on CRISPR technology implementation and genetic research.',
    slug: 'avi-lekkelapudi'
  },
  {
    id: '4',
    name: 'Seoho Lee',
    role: 'Project Leader',
    image: '/images/team/blank-profile.png',
    shortBio: 'Project leader specializing in CRISPR applications and biotechnology research.',
    slug: 'seoho-lee'
  },
  {
    id: '5',
    name: 'David Dolivo',
    role: 'Research Mentor',
    image: '/images/team/david-dolivo.jpeg',
    shortBio: 'Research mentor providing guidance and expertise in CRISPR and molecular biology.',
    slug: 'david-dolivo'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-dark-surface min-h-screen pb-20 text-dark-primary">
      {/* About Header */}
      <div className="bg-gradient-to-r from-dark-surface-light to-dark-surface py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
            
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-dark-surface-light rounded-lg shadow-dark p-8 border border-dark-border/40 mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-dark-secondary mb-4">
            At BioCurious, our CRISPR Project aims to educate the local community about gene editing technology while providing access to essential laboratory materials and equipment. Through hands-on workshops, open-source research, and community collaboration, we're making CRISPR technology more accessible to students and enthusiasts. We believe that by removing barriers to entry and providing practical experience, we can accelerate innovation in biotechnology and empower the next generation of scientists.
          </p>
          <p className="text-dark-secondary">
            Our team brings together experts from diverse backgrounds in molecular biology, bioinformatics, ethics, and education to create a holistic approach to advancing CRISPR research while promoting responsible use of gene editing technologies.
          </p>
        </div>

        

        {/* Team Grid */}
        <h2 className="text-2xl font-bold text-primary mb-8">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labMembers.map((member) => (
            <LabMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Join Our Team Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-dark-surface-light rounded-lg shadow-dark p-8 border border-dark-border/40 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Join Our Team</h2>
          <p className="text-dark-secondary mb-6">
            Passionate about biotech and CRISPR technology? We're always looking for curious minds to join our community and contribute to groundbreaking research.
          </p>
          <button className="bg-primary hover:bg-primary/80 text-dark-surface-light px-6 py-3 rounded-md font-medium transition-colors duration-300">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}