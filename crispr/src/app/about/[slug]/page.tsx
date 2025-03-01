import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LabMember } from '@/components/about/LabMemberCard';

// In a real app, this would come from your database
// For now, we'll use hardcoded data that you can replace later
const labMembersData: Record<string, LabMember & { 
  fullBio: string;
  education: string[];
  publications?: string[];
  research: string[];
  projects?: string[];
  email?: string;
}> = {
  'marc-pashin': {
    id: '1',
    name: 'Marc Pashin',
    role: 'Project Leader',
    image: '/images/team/marc-pashin.png',
    shortBio: 'Project leader at BioCurious and Stanford research intern specializing in CRISPR gene editing and computational biology.',
    slug: 'marc-pashin',
    fullBio: `Marc Pashin is a project leader at BioCurious and a research intern at Stanford University's Curtis Lab, where he focuses on computational models for spatial proteomics. His work spans CRISPR-Cas9 gene editing, AI-driven bioinformatics, and innovative approaches to disease modeling.

    At BioCurious, Marc has been leading projects since 2022, performing gene knockouts on A549 human lung cancer cells under the mentorship of Dr. Eric Espinosa. His research also includes studying Hudson-Gilford Progeria Syndrome, focusing on optimizing Lonafarnib medication. He has extensive experience in protein purification, cell culturing, and PCR, contributing to BioCurious's mission of making advanced biotech research accessible to a wider community.

    In his role at Stanford's Curtis Lab, Marc is developing machine learning models to predict spatial proteomics data from H&E-stained Whole Slide Images (WSI). His research enhances doctors' ability to classify cell types and analyze cellular activity efficiently using standard clinical biopsy data. By leveraging convolutional neural networks (CNNs), he integrates cell type predictions with spatial relationships to infer protein expression, advancing computational pathology.

    With a strong background in both experimental and computational biology, Marc is dedicated to advancing gene editing technologies and computational methods for biomedical research.`,
    education: [
      'Bellarmine College Preparatory, Expected Graduation: May 2026'
    ],
    research: [
      'CRISPR-Cas9 gene editing',
      'Genetic therapies for rare diseases',
      'AI-driven bioinformatics',
      'Spatial proteomics analysis'
    ],
    projects: [
      'Gene knockout research on A549 human lung cancer cells (BioCurious)',
      'Hudson-Gilford Progeria Syndrome therapeutic research (BioCurious)',
      'Machine learning for spatial proteomics analysis (Curtis Lab, Stanford)',
      'AI applications in clinical biopsy data analysis (Stanford)'
    ],
    email: 'marc.pashin@biocurious.org'
  },
  'luke-jun': {
    id: '2',
    name: 'Luke Jun',
    role: 'Project Leader',
    image: '/images/team/blank-profile.png',
    shortBio: 'Project leader at BioCurious specializing in CRISPR applications and molecular biology.',
    slug: 'luke-jun',
    fullBio: `Luke Jun leads innovative CRISPR research projects at BioCurious, focusing on developing novel gene editing applications and protocols. His work combines practical laboratory expertise with creative problem-solving approaches to advance accessible biotechnology.`,
    education: [
      'Bellarmine College Preparatory, Expected Graduation: May 2026'
    ],
    research: [
      'CRISPR gene editing protocols',
      'Molecular biology techniques',
      'Biotechnology education',
      'Laboratory protocol development'
    ],
    email: 'luke.jun@biocurious.org'
  },
  'avi-lekkelapudi': {
    id: '3',
    name: 'Avi Lekkelapudi',
    role: 'Project Leader',
    image: '/images/team/blank-profile.png',
    shortBio: 'Project leader focused on CRISPR technology implementation and genetic research.',
    slug: 'avi-lekkelapudi',
    fullBio: `Avi Lekkelapudi leads key projects at BioCurious, bringing expertise in CRISPR technology and genetic research. His work emphasizes practical applications of gene editing techniques and developing accessible protocols for the community.`,
    education: [
      'Bellarmine College Preparatory, Expected Graduation: May 2026'
    ],
    research: [
      'CRISPR implementation strategies',
      'Genetic research methods',
      'Protocol optimization',
      'Community science education'
    ],
    email: 'avi.lekkelapudi@biocurious.org'
  },
  'seoho-lee': {
    id: '4',
    name: 'Seoho Lee',
    role: 'Project Leader',
    image: '/images/team/blank-profile.png',
    shortBio: 'Project leader specializing in CRISPR applications and biotechnology research.',
    slug: 'seoho-lee',
    fullBio: `Seoho Lee directs crucial projects at BioCurious, combining technical expertise with innovative approaches to CRISPR research. His work focuses on making advanced biotechnology accessible and practical for community science applications.`,
    education: [
      'Bellarmine College Preparatory, Expected Graduation: May 2026'
    ],
    research: [
      'CRISPR technology applications',
      'Biotechnology research',
      'Laboratory techniques',
      'Research methodology'
    ],
    email: 'seoho.lee@biocurious.org'
  },
  'david-dolivo': {
    id: '5',
    name: 'David Dolivo',
    role: 'Research Mentor',
    image: '/images/team/blank-profile.png',
    shortBio: 'Research mentor providing guidance and expertise in CRISPR and molecular biology.',
    slug: 'david-dolivo',
    fullBio: `David Dolivo serves as a research mentor at BioCurious, providing essential guidance and expertise to project teams. His experience in molecular biology and CRISPR technology helps shape the direction of research projects and ensures scientific rigor in all endeavors.`,
    education: [
      'Ph.D. in Molecular Biology',
      'B.S. in Biological Sciences'
    ],
    research: [
      'CRISPR research mentorship',
      'Molecular biology techniques',
      'Research project design',
      'Scientific methodology'
    ],
    email: 'david.dolivo@biocurious.org'
  }
};

// Type definition to match what Next.js is expecting in your environment
type PageParams = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// Update the metadata generation function
export async function generateMetadata(
  props: PageParams
): Promise<Metadata> {
  // Resolve the promise to get the actual params
  const params = await props.params;
  const { slug } = params;
  
  const member = labMembersData[slug];
  
  if (!member) {
    return {
      title: 'Team Member Not Found',
      description: 'The requested team member profile could not be found.',
    };
  }
  
  return {
    title: `${member.name} | BioCurious CRISPR Project`,
    description: member.shortBio,
  };
}

// Update the page component
export default async function LabMemberDetailPage(
  props: PageParams
) {
  // Resolve the promise to get the actual params
  const params = await props.params;
  const { slug } = params;
  
  const member = labMembersData[slug];
  
  if (!member) {
    notFound();
  }

  return (
    <div className="bg-dark-surface min-h-screen pb-20">
      {/* Member Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-dark-surface-light rounded-lg shadow-dark overflow-hidden border border-dark-border/40">
          <div className="p-6 md:p-10">
            {/* Back Button */}
            <Link 
              href="/about"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to team
            </Link>

            {/* Name, Role & Image */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1 pr-6">
                <h1 className="text-3xl md:text-4xl font-bold text-dark-primary mb-2">
                  {member.name}
                </h1>
                <p className="text-xl text-primary">{member.role}</p>
              </div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                {member.image ? (
                  <Image
                    src={member.image.startsWith('/') ? member.image : `/${member.image}`}
                    alt={member.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 128px, 160px"
                    className="rounded-full object-cover border-4 border-dark-border/40 shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/40 to-primary/10" />
                )}
              </div>
            </div>

            {/* Biography */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-dark-primary">Biography</h2>
              <div className="text-dark-secondary whitespace-pre-line">
                {member.fullBio}
              </div>
            </div>
            
            {/* Research Interests */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-dark-primary">Research Focus</h2>
              <ul className="list-disc pl-5 space-y-1 text-dark-secondary">
                {member.research.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-dark-primary">Education</h2>
              <ul className="list-disc pl-5 space-y-1 text-dark-secondary">
                {member.education.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Publications (if available) */}
            {member.publications && member.publications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-dark-primary">Selected Publications</h2>
                <ul className="list-disc pl-5 space-y-2 text-dark-secondary">
                  {member.publications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Contact Information */}
            {member.email && (
              <div className="mt-12 pt-8 border-t border-dark-border/40">
                <h2 className="text-xl font-semibold mb-4 text-dark-primary">Contact</h2>
                <p className="text-dark-secondary">
                  <span className="font-medium">Email: </span>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {member.email}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Links */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-dark-surface-light rounded-lg shadow-dark overflow-hidden border border-dark-border/40 p-6">
          <h2 className="text-xl font-bold text-dark-primary mb-6">Additional Resources</h2>
          <div className="flex flex-col space-y-4">
            <Link href="/blog" className="text-primary hover:text-primary/80">
              Read our latest research blog posts →
            </Link>
            <Link href="/projects" className="text-primary hover:text-primary/80">
              Explore CRISPR projects →
            </Link>
            <Link href="/about" className="text-primary hover:text-primary/80">
              Meet more team members →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}