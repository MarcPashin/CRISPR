import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Github, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-surface-light text-dark-primary pt-16 pb-8 border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-10 w-10 mr-3">
                <Image 
                  src="/logos/biocuriousLogo.png" 
                  alt="BioCurious Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">BioCurious</span>
                <span className="text-xs text-primary font-semibold tracking-wider">CRISPR PROJECT</span>
              </div>
            </div>
            <p className="text-dark-secondary text-sm">
              A community-driven initiative making CRISPR technology accessible through open-source research and education.
            </p>
            <div className="flex space-x-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark-secondary hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark-secondary hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark-secondary hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark-secondary hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark-secondary hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-dark-secondary hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-dark-secondary hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-dark-secondary hover:text-primary transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-dark-secondary hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community/events" className="text-dark-secondary hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/community/resources" className="text-dark-secondary hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-dark-secondary hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-dark-secondary">
                  845 Stewart Drive, Sunnyvale, CA 94085
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="tel:+14085555555" className="text-dark-secondary hover:text-primary transition-colors">
                  (408) 555-5555
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="mailto:info@biocurious.org" className="text-dark-secondary hover:text-primary transition-colors">
                  info@biocurious.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-dark-secondary text-sm mb-4">
              Subscribe to our newsletter for the latest updates on our CRISPR projects and events.
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-dark-primary bg-dark-surface border border-dark-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-dark-primary py-2 px-4 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Links and Copyright */}
        <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-dark-secondary mb-4 md:mb-0">
            © {new Date().getFullYear()} BioCurious CRISPR Project. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-dark-secondary hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-dark-secondary hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-dark-secondary hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;