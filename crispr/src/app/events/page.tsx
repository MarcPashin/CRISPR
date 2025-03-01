import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export const metadata = {
  title: 'Events | BioCurious CRISPR Project',
  description: 'Join our weekly CRISPR workshops at BioCurious. New members start on the first Thursday of each month.',
};

interface EventDetailProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const EventDetail = ({ icon: Icon, title, description }: EventDetailProps) => (
  <div className="flex items-center space-x-4 p-6 bg-dark-surface-light rounded-lg border border-dark-border/40">
    <div className="p-3 bg-primary/10 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-dark-primary">{title}</h3>
      <p className="text-dark-secondary">{description}</p>
    </div>
  </div>
);

export default function EventsPage() {
  // Get current date to determine if first Thursday has passed
  const today = new Date();
  const firstThursday = new Date(today.getFullYear(), today.getMonth(), 1);
  while (firstThursday.getDay() !== 4) { // 4 is Thursday
    firstThursday.setDate(firstThursday.getDate() + 1);
  }
  
  const hasFirstThursdayPassed = today > firstThursday;
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const nextFirstThursday = new Date(nextMonth);
  while (nextFirstThursday.getDay() !== 4) {
    nextFirstThursday.setDate(nextFirstThursday.getDate() + 1);
  }

  const onboardingMessage = hasFirstThursdayPassed 
    ? `Next onboarding session will be on ${nextFirstThursday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
    : `Join our next onboarding session on ${firstThursday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;

  return (
    <div className="min-h-screen bg-dark-surface text-dark-primary">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-dark-surface via-dark-surface-light to-dark-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            <span className="block">Weekly CRISPR Workshops</span>
            <span className="block text-primary mt-2">at BioCurious</span>
          </h1>
          <p className="text-xl text-dark-secondary text-center max-w-3xl mx-auto mb-6">
            We meet every Thursday at 7 PM for hands-on CRISPR workshops and research.
            New members start on the first Thursday of each month for onboarding.
          </p>
          <p className="text-lg text-primary text-center max-w-3xl mx-auto mb-12">
            {onboardingMessage}
          </p>
          <div className="flex justify-center">
            <Link
              href="https://www.meetup.com/biocurious/events/305392856/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
              className="px-8 py-3 bg-primary hover:bg-primary/80 text-dark-primary rounded-md font-medium transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for Next Event
            </Link>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventDetail
              icon={Calendar}
              title="Weekly Schedule"
              description="Every Thursday, with new member onboarding on first Thursday of each month"
            />
            <EventDetail
              icon={Clock}
              title="Time"
              description="7:00 PM - 9:00 PM PST"
            />
            <EventDetail
              icon={MapPin}
              title="Location"
              description="3108 Patrick Henry Dr, Santa Clara, CA 95054"
            />
            <EventDetail
              icon={Users}
              title="Attendance"
              description="Open to all experience levels"
            />
          </div>

          {/* Additional Information */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">What to Expect</h2>
            <div className="bg-dark-surface-light rounded-lg p-8 border border-dark-border/40">
              {/* Remove prose classes and use direct styling */}
              <div className="max-w-none">
                <p className="text-gray-100 mb-4">
                  Join us every Thursday for exciting CRISPR workshops! Each week brings something new:
                </p>
                <ul className="text-gray-200 list-disc pl-6 space-y-2">
                  <li>Get hands-on experience with real lab equipment</li>
                  <li>Learn the latest in CRISPR technology</li>
                  <li>Work on cool experiments with the team</li>
                  <li>Meet other biotech enthusiasts</li>
                  <li>Ask questions and share ideas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-dark-primary mb-4">Ready to Join Us?</h2>
          <p className="text-dark-secondary mb-8">
            Register for our next workshop and become part of our growing community of 
            biotech enthusiasts and citizen scientists.
          </p>
          <Link
            href="https://www.meetup.com/biocurious/events/305392856/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
            className="px-8 py-3 bg-primary hover:bg-primary/80 text-dark-primary rounded-md font-medium transition-colors duration-300 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}