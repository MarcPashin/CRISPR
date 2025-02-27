import React from 'react';
import Head from 'next/head';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-dark-surface min-h-screen text-dark-primary">
      <Head>
        <title>About | BioCurious CRISPR Project</title>
        <meta 
          name="description" 
          content="Learn about the BioCurious CRISPR project, our mission, team, and history." 
        />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dark-surface-light to-dark-surface py-20 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-6">About Our Project</h1>
          <p className="text-xl text-dark-secondary max-w-3xl mx-auto">
            The BioCurious CRISPR Project is a community-driven initiative aimed at democratizing access to 
            synthetic biology tools and knowledge. We believe everyone should have the opportunity to 
            understand and participate in the biotechnology revolution.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-primary mb-4">Our Mission</h2>
          <p className="text-lg text-dark-secondary">
            Building an inclusive, educated community around CRISPR technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {[
              { icon: CalendarDays, title: "Education", desc: "Develop curricula, workshops, and resources..." },
              { icon: Clock, title: "Research", desc: "Conduct open, transparent citizen science projects..." },
              { icon: MapPin, title: "Community", desc: "Build a diverse, inclusive community..." }
            ].map(({ icon: Icon, title, desc }, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-dark-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-dark-surface-light py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-primary mb-4">Our Team</h2>
          <p className="text-lg text-dark-secondary mb-12">
            Meet the scientists, educators, and community organizers behind the project
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Jane Doe", "John Smith", "Alex Johnson", "Sam Williams"].map((name, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center mb-4 mx-auto">
                  <span className="text-3xl font-bold text-dark-surface-light">{name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-primary font-medium mb-2">Role Placeholder</p>
                <p className="text-dark-secondary">Brief bio goes here.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 py-16 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-primary mb-6">Join Our Community</h2>
          <p className="text-xl text-dark-secondary mb-8 max-w-3xl mx-auto">
            Whether you're a scientist, educator, student, or just curious about CRISPR technology, 
            there's a place for you in our community.
          </p>
          <button className="px-8 py-3 bg-primary hover:bg-primary/80 text-dark-surface-light font-medium rounded-md transition-colors">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;