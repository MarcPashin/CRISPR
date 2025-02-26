"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Activity, Users, Calendar, ArrowRight, Search, Filter } from 'lucide-react';

// In a real implementation, this would come from your content layer
interface Project {
  slug: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  team: string[];
  startDate: string;
  tags: string[];
  image?: string;
  progress?: number;
}

// Sample data for demonstration
const sampleProjects: Project[] = [
  {
    slug: 'community-crispr-protocols',
    title: 'Community CRISPR Protocols',
    description: 'Developing simplified CRISPR protocols that can be performed in community lab settings with minimal equipment.',
    status: 'active',
    team: ['Jane Doe', 'John Smith', 'Alex Johnson'],
    startDate: '2023-01-15',
    tags: ['protocols', 'education', 'lab-techniques'],
    image: '/api/placeholder/800/400',
    progress: 65
  },
  {
    slug: 'crispr-education-curriculum',
    title: 'CRISPR Education Curriculum',
    description: 'Creating comprehensive educational materials to teach CRISPR concepts to high school and college students.',
    status: 'active',
    team: ['Sam Williams', 'Jane Doe'],
    startDate: '2023-02-10',
    tags: ['education', 'curriculum', 'outreach'],
    image: '/api/placeholder/800/400',
    progress: 80
  },
  {
    slug: 'gene-drive-safety',
    title: 'Gene Drive Safety Analysis',
    description: 'Investigating safety mechanisms and containment strategies for gene drive experiments in community settings.',
    status: 'planned',
    team: ['John Smith', 'Alex Johnson'],
    startDate: '2023-08-01',
    tags: ['safety', 'gene-drives', 'research'],
    image: '/api/placeholder/800/400'
  },
  {
    slug: 'diy-gene-sequencing',
    title: 'DIY Gene Sequencing Tools',
    description: 'Building affordable tools for DNA sequencing that can be assembled in community labs or classrooms.',
    status: 'active',
    team: ['Alex Johnson', 'Sam Williams'],
    startDate: '2023-03-20',
    tags: ['diy', 'equipment', 'sequencing'],
    image: '/api/placeholder/800/400',
    progress: 40
  },
  {
    slug: 'crispr-visualization',
    title: 'CRISPR Process Visualization',
    description: 'Creating interactive visualizations to help people understand how CRISPR-Cas9 works at the molecular level.',
    status: 'completed',
    team: ['Jane Doe', 'Sam Williams'],
    startDate: '2022-11-05',
    tags: ['visualization', 'education', 'interactive'],
    image: '/api/placeholder/800/400',
    progress: 100
  },
  {
    slug: 'ethical-framework',
    title: 'Community Ethics Framework',
    description: 'Developing a framework for ethical decision-making in community synthetic biology projects.',
    status: 'active',
    team: ['John Smith', 'Jane Doe', 'Alex Johnson'],
    startDate: '2023-04-10',
    tags: ['ethics', 'governance', 'community'],
    image: '/api/placeholder/800/400',
    progress: 25
  }
];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();
  
  // Status badge styling
  const statusStyles = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    planned: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {project.image && (
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${project.image})` }}
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        {project.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-crispr-blue h-2 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>{project.team.length} Members</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Started {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Activity className="h-4 w-4 mr-1" />
            <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="inline-block text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="inline-block text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                +{project.tags.length - 2} more
              </span>
            )}
          </div>
          <button
            className="flex items-center text-crispr-blue hover:underline text-sm font-medium"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            View Details <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter projects based on search term and status filter
  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === null || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Head>
        <title>Projects | BioCurious CRISPR Project</title>
        <meta 
          name="description" 
          content="Explore our ongoing and completed CRISPR-related projects at BioCurious." 
        />
      </Head>

      {/* Projects Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Projects</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore the various CRISPR-related initiatives we're working on at BioCurious
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-crispr-blue focus:border-crispr-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 text-sm mr-2">Filter by status:</span>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusFilter === null
                    ? 'bg-crispr-blue text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setStatusFilter(null)}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusFilter === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setStatusFilter('active')}
              >
                Active
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusFilter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusFilter === 'planned'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setStatusFilter('planned')}
              >
                Planned
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Get Involved CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Want to Start a New Project?</h2>
              <p className="text-gray-600">
                Have an idea for a CRISPR-related project? We welcome community contributions and new project proposals.
              </p>
            </div>
            <button className="px-6 py-3 bg-crispr-blue hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-300 whitespace-nowrap">
              Propose a Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;