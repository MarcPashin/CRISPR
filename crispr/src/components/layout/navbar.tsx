'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';





interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  hasDropdown?: boolean;
  children?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  label, 
  isActive, 
  onClick, 
  hasDropdown = false,
  children 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    if (hasDropdown) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // Base styles for all nav links
  const baseStyles = "relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  
  // Styles for desktop active/inactive states
  const desktopStyles = isActive
    ? "text-primary border-b-2 border-primary"
    : "text-dark-primary hover:text-primary";
  
    
  return (
    <div className="relative group">
      <Link 
        href={href} 
        className={`${baseStyles} ${desktopStyles} ${hasDropdown ? 'flex items-center' : ''}`}
        onClick={(e) => {
          if (hasDropdown) toggleDropdown(e);
          if (onClick) onClick();
        }}
      >
        {label}
        {hasDropdown && (
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        )}
      </Link>
      
      {children && (
        <div 
          className={`
            absolute left-0 mt-1 w-48 rounded-md shadow-dark-lg bg-dark-surface-light border border-dark-border z-50
            transition-all duration-200 origin-top-left
            ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ 
  href, 
  label, 
  isActive, 
  onClick,
  hasDropdown = false,
  children
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Base styles for all mobile nav links
  const baseStyles = "block px-4 py-3 text-base font-medium";
  
  // Styles for mobile active/inactive states
  const mobileStyles = isActive
    ? "text-primary bg-dark-surface-lighter"
    : "text-dark-primary hover:bg-dark-surface-lighter";
  
  return (
    <div>
      {hasDropdown ? (
        <button 
          className={`${baseStyles} ${mobileStyles} w-full text-left flex justify-between items-center`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {label}
          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link 
          href={href} 
          className={`${baseStyles} ${mobileStyles}`}
          onClick={onClick}
        >
          {label}
        </Link>
      )}
      
      {hasDropdown && children && (
        <div className={`pl-4 space-y-1 ${isDropdownOpen ? 'block' : 'hidden'}`}>
          {children}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Handle scroll effect to show/hide navbar
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > 100) { // If scroll is more than 100px
          if (window.scrollY > lastScrollY && visible) { // Scrolling down
            setVisible(false);
          } else if (window.scrollY < lastScrollY && !visible) { // Scrolling up
            setVisible(true);
          }
        } else {
          setVisible(true); // Always show at top of page
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, visible]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 w-full z-30 transition-transform duration-300 ease-in-out bg-dark-surface shadow-dark
        ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 mr-3 overflow-hidden">
                <Image 
                  src="/logos/biocuriousLogo.png" 
                  alt="BioCurious Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-dark-primary tracking-tight">BioCurious</span>
                <span className="text-xs text-primary font-semibold tracking-wider">CRISPR PROJECT</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/" label="Home" isActive={isActivePath('/')} />
            <NavLink href="/about" label="About" isActive={isActivePath('/about')} />
            <NavLink href="/blog" label="Blog" isActive={isActivePath('/blog')} />
            <NavLink href="/events" label="Events" isActive={isActivePath('/events')} />
         {/*   <NavLink 
              href="/projects" 
              label="Projects" 
              isActive={isActivePath('/projects')}
              hasDropdown
            >
              <Link 
                href="/projects" 
                className="block px-4 py-2 text-sm text-dark-primary hover:bg-dark-surface-lighter hover:text-primary"
              >
                All Projects
              </Link>
              <Link 
                href="/projects/active" 
                className="block px-4 py-2 text-sm text-dark-primary hover:bg-dark-surface-lighter hover:text-primary"
              >
                Active Projects
              </Link>
              <Link 
                href="/projects/propose" 
                className="block px-4 py-2 text-sm text-dark-primary hover:bg-dark-surface-lighter hover:text-primary"
              >
                Propose a Project
              </Link>
            </NavLink>
            <NavLink href="/blog" label="Blog" isActive={isActivePath('/blog')} />
            <NavLink 
              href="/community" 
              label="Community" 
              isActive={isActivePath('/community')}
              hasDropdown
            >
              <Link 
                href="/community/events" 
                className="block px-4 py-2 text-sm text-dark-primary hover:bg-dark-surface-lighter hover:text-primary"
              >
                Events
              </Link>
              <Link 
                href="/community/forum" 
                className="block px-4 py-2 text-sm text-dark-primary hover:bg-dark-surface-lighter hover:text-primary"
              >
                Forum
              </Link>
              <Link 
                href="/community/resources" 
                className="block px-4 py-2 text-sm text-dark-primary hover:bg-dark-surface-lighter hover:text-primary"
              >
                Resources
              </Link>
            </NavLink>
            <NavLink href="/contact" label="Contact" isActive={isActivePath('/contact')} />*/}
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link 
              href="https://www.meetup.com/biocurious/events/305392856/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
              className="ml-4 px-4 py-2 rounded-md bg-primary text-dark-primary text-sm font-medium hover:bg-primary/80 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-dark-primary hover:text-primary hover:bg-dark-surface-lighter focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-dark-border bg-dark-surface">
          <MobileNavLink href="/" label="Home" isActive={isActivePath('/')} />
          <MobileNavLink href="/about" label="About" isActive={isActivePath('/about')} />
          <MobileNavLink 
            href="/projects" 
            label="Projects" 
            isActive={isActivePath('/projects')}
            hasDropdown
          >
            <Link 
              href="/projects" 
              className="block py-2 pl-4 pr-4 text-base font-medium text-dark-secondary hover:text-primary hover:bg-dark-surface-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              All Projects
            </Link>
            <Link 
              href="/projects/active" 
              className="block py-2 pl-4 pr-4 text-base font-medium text-dark-secondary hover:text-primary hover:bg-dark-surface-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              Active Projects
            </Link>
            <Link 
              href="/projects/propose" 
              className="block py-2 pl-4 pr-4 text-base font-medium text-dark-secondary hover:text-primary hover:bg-dark-surface-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              Propose a Project
            </Link>
          </MobileNavLink>
          <MobileNavLink href="/blog" label="Blog" isActive={isActivePath('/blog')} />
          <MobileNavLink 
            href="/community" 
            label="Community" 
            isActive={isActivePath('/community')}
            hasDropdown
          >
            <Link 
              href="/community/events" 
              className="block py-2 pl-4 pr-4 text-base font-medium text-dark-secondary hover:text-primary hover:bg-dark-surface-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/community/forum" 
              className="block py-2 pl-4 pr-4 text-base font-medium text-dark-secondary hover:text-primary hover:bg-dark-surface-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              Forum
            </Link>
            <Link 
              href="/community/resources" 
              className="block py-2 pl-4 pr-4 text-base font-medium text-dark-secondary hover:text-primary hover:bg-dark-surface-lighter"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
          </MobileNavLink>
          <MobileNavLink href="/contact" label="Contact" isActive={isActivePath('/contact')} />

          {/* CTA Button (Mobile) */}
          <div className="pt-2">
            <Link 
              href="/join"
              className="block w-full px-4 py-3 text-center rounded-md bg-primary text-dark-primary font-medium hover:bg-primary/80 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;