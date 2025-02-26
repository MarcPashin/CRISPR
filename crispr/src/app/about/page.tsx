import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, imageSrc }) => (
  <div className="flex flex-col items-center">
    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative">
      <Image 
        src={imageSrc} 
        alt={name} 
        layout="fill" 
        objectFit="cover"
        className="rounded-full"
      />
    </div>
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-crispr-blue font-medium mb-2">{role}</p>
    <p className="text-gray-600 text-center">{bio}</p>
  </div>
);

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ year, title, description }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-crispr-blue text-white font-bold">
        {year}
      </div>
      <div className="h-full w-0.5 bg-gray-300 mt-2"></div>
    </div>
    <div className="pb-8">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>About | BioCurious CRISPR Project</title>
        <meta 
          name="description" 
          content="Learn about the BioCurious CRISPR project, our mission, team, and history." 
        />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Our Project</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The BioCurious CRISPR Project is a community-driven initiative aimed at democratizing access to 
            synthetic biology tools and knowledge. We believe that everyone should have the opportunity to 
            understand and participate in the biotechnology revolution.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We're working to build an inclusive, educated community around CRISPR technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <CalendarDays className="w-8 h-8 text-crispr-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-gray-600">
                Develop curricula, workshops, and resources to make complex CRISPR concepts 
                accessible to people from diverse backgrounds.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Clock className="w-8 h-8 text-crispr-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Research</h3>
              <p className="text-gray-600">
                Conduct open, transparent citizen science projects that advance our
                understanding of CRISPR applications and safety considerations.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <MapPin className="w-8 h-8 text-crispr-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                Build a diverse, inclusive community where knowledge is freely shared
                and collaborative projects can flourish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Meet the scientists, educators, and community organizers behind the project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TeamMember 
              name="Jane Doe" 
              role="Project Lead"
              bio="PhD in Molecular Biology with 10+ years experience in gene editing technologies."
              imageSrc="/api/placeholder/200/200" 
            />
            <TeamMember 
              name="John Smith" 
              role="Education Coordinator"
              bio="Science educator specializing in making complex concepts accessible to all ages."
              imageSrc="/api/placeholder/200/200" 
            />
            <TeamMember 
              name="Alex Johnson" 
              role="Lab Manager"
              bio="Biosafety specialist ensuring all experiments follow proper protocols and safety standards."
              imageSrc="/api/placeholder/200/200" 
            />
            <TeamMember 
              name="Sam Williams" 
              role="Community Outreach"
              bio="Focused on building partnerships and engaging diverse communities in synthetic biology."
              imageSrc="/api/placeholder/200/200" 
            />
          </div>
        </div>
      </div>

      {/* History/Timeline Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">
              The evolution of the BioCurious CRISPR Project
            </p>
          </div>
          
          <div className="space-y-4">
            <TimelineEvent 
              year="2018"
              title="Project Inception"
              description="A small group of BioCurious members came together to explore the possibility of running CRISPR experiments in a community lab setting."
            />
            <TimelineEvent 
              year="2019"
              title="First Workshop Series"
              description="Launched our inaugural CRISPR education workshops, introducing the basics of gene editing to community members."
            />
            <TimelineEvent 
              year="2020"
              title="Protocol Development"
              description="Created our first set of simplified CRISPR protocols specifically designed for community lab settings with limited equipment."
            />
            <TimelineEvent 
              year="2021"
              title="Community Expansion"
              description="Expanded our team and began collaborating with other community biology labs around the world."
            />
            <TimelineEvent 
              year="2022"
              title="Educational Resources"
              description="Published our open-source educational materials and protocols online for other community labs to use."
            />
            <TimelineEvent 
              year="2023"
              title="Today and Beyond"
              description="Continuing to grow our community, develop new protocols, and explore the ethical applications of CRISPR technology."
            />
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="bg-crispr-blue py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Whether you're a scientist, educator, student, or just curious about CRISPR technology, 
            there's a place for you in our community.
          </p>
          <button className="px-8 py-3 bg-white text-crispr-blue font-medium rounded-md hover:bg-blue-50 transition-colors duration-300">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;