import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Settings } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
}

const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div 
              className="text-white p-2 rounded-full transition-colors"
              style={{ backgroundColor: config.themeColor }}
            >
              <BookOpen size={20} />
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              {config.siteName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? '' 
                    : 'text-neutral-300 hover:text-white'
                }`}
                style={{ 
                  color: location.pathname === link.path ? config.themeColor : undefined 
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-neutral-600 hover:text-neutral-400 transition-colors">
              <Settings size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden bg-brand-black/95 backdrop-blur-xl absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 border-b border-neutral-800' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                location.pathname === link.path 
                  ? 'bg-neutral-900' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
              style={{ 
                color: location.pathname === link.path ? config.themeColor : undefined 
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="block px-3 py-3 text-neutral-500 text-sm">Admin Access</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;