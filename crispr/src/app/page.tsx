import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dna, Microscope, Users } from 'lucide-react';

// Feature Card Component
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-dark-surface-light rounded-lg shadow-dark p-6 transition-all duration-300 hover:shadow-dark-lg border border-dark-border/40 hover:border-primary/20">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-primary/10 rounded-full">
        <Icon className="w-8 h-8 text-primary" />
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-center text-dark-primary">{title}</h3>
    <p className="text-dark-secondary text-center">{description}</p>
  </div>
);

// Project Stat Component
interface ProjectStatProps {
  value: string;
  label: string;
  color?: string;
}

const ProjectStat = ({ value, label, color = "primary" }: ProjectStatProps) => (
  <div className="text-center bg-dark-surface-light p-6 rounded-lg shadow-dark border border-dark-border/40">
    <p className={`text-3xl font-bold text-${color} mb-1`}>{value}</p>
    <p className="text-dark-secondary">{label}</p>
  </div>
);

// Blog Preview Card Component
interface BlogPreviewProps {
  title: string;
  date: string;
  summary: string;
  slug: string;
}

const BlogPreview = ({ title, date, summary, slug }: BlogPreviewProps) => (
  <div className="bg-dark-surface-light rounded-lg shadow-dark overflow-hidden border border-dark-border/40 hover:border-primary/20 transition-all duration-300">
    <div className="h-48 bg-dark-surface relative">
      <Image 
        src="/api/placeholder/600/400" 
        alt={title} 
        fill 
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-80"
      />
    </div>
    <div className="p-6">
      <p className="text-sm text-dark-secondary">{date}</p>
      <h3 className="text-xl font-bold mb-2 text-dark-primary">{title}</h3>
      <p className="text-dark-secondary mb-4">{summary}</p>
      <Link
        href={`/blog/${slug}`}
        className="text-primary font-medium hover:underline"
      >
        Read more →
      </Link>
    </div>
  </div>
);

// Main Home Page Component
export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-dark-surface text-dark-primary">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center py-24 bg-gradient-to-r from-dark-surface via-dark-surface-light to-dark-surface overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl tracking-tight font-extrabold text-dark-primary sm:text-5xl md:text-6xl">
            <span className="block">BioCurious</span>
            <span className="block text-primary">CRISPR Project</span>
          </h1>
          <p className="mt-6 text-lg text-dark-secondary sm:text-xl max-w-2xl mx-auto">
            Democratizing synthetic biology through open-source research, education, and community participation.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link 
              href="/projects"
              className="px-8 py-3 bg-primary hover:bg-primary/80 text-dark-primary rounded-md font-medium transition-colors duration-300"
            >
              Explore Projects
            </Link>
            <Link 
              href="/community"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 rounded-md font-medium transition-colors duration-300"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature Section */}
      <div className="bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-primary">What We Do</h2>
            <p className="mt-4 text-xl text-dark-secondary">Making CRISPR technology accessible through community science</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Dna} 
              title="Open Source Protocols" 
              description="Develop and share accessible CRISPR protocols that can be performed in community lab settings."
            />
            <FeatureCard 
              icon={Microscope} 
              title="Educational Resources" 
              description="Create hands-on workshops and learning materials to teach synthetic biology concepts to diverse audiences."
            />
            <FeatureCard 
              icon={Users} 
              title="Community Research" 
              description="Collaborate on citizen science projects that explore responsible applications of gene editing technology."
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-dark-surface-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProjectStat value="12+" label="Active Projects" color="primary" />
            <ProjectStat value="250+" label="Community Members" color="secondary" />
            <ProjectStat value="45+" label="Workshop Hours" color="tertiary" />
            <ProjectStat value="4" label="Published Protocols" color="accent" />
          </div>
        </div>
      </div>

      {/* Latest Blog Section */}
      <div className="bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-primary">Latest Updates</h2>
            <p className="mt-4 text-xl text-dark-secondary">News and insights from our research team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog preview cards - would be generated from actual data in production */}
            <BlogPreview 
              title="Introduction to CRISPR"
              date="April 1, 2023"
              summary="Learn about our community CRISPR project, its goals, and how you can get involved."
              slug="introduction-to-crispr"
            />
            <BlogPreview 
              title="Safety First: CRISPR Lab Protocols"
              date="April 15, 2023"
              summary="A comprehensive guide to maintaining safety standards when working with CRISPR in community labs."
              slug="crispr-safety-protocols"
            />
            <BlogPreview 
              title="Ethical Considerations in Gene Editing"
              date="May 1, 2023"
              summary="Exploring the ethical dimensions of gene editing and how community labs can navigate these complex questions."
              slug="gene-editing-ethics"
            />
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="px-6 py-2 border border-primary text-primary hover:bg-primary/10 rounded-md font-medium transition-colors duration-300 inline-block"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-primary mb-6">Join Our Community</h2>
          <p className="text-xl text-dark-secondary mb-10 max-w-3xl mx-auto">
            Whether you're a scientist, educator, student, or simply curious about CRISPR technology, 
            there's a place for you in our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/join"
              className="px-8 py-3 bg-primary hover:bg-primary/80 text-dark-primary rounded-md font-medium transition-colors duration-300"
            >
              Become a Member
            </Link>
            <Link 
              href="/community/events"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary/20 rounded-md font-medium transition-colors duration-300"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}