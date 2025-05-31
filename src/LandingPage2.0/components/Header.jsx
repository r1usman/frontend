import React, { useState, useEffect } from 'react';

import { Menu, X, Code } from 'lucide-react';
import { Link } from 'react-scroll';


const navLinks = [
  { name: 'Courses', to: 'courses' },
  { name: 'Competition', to: 'competition' },
  { name: 'Collaboration', to: 'collaboration' },
  { name: 'Live Classes', to: 'live-classes' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavLinks = (isMobile = false) =>
  navLinks.map(({ name, to }) => (
    <Link
      key={name}
      to={to}
      spy={true}
      smooth={true}
      offset={-80}
      duration={500}
      activeClass="text-indigo-600 font-semibold"
      className="cursor-pointer font-semibold hover:text-indigo-600 transition"
      onClick={() => isMobile && setIsMenuOpen(false)}
    >
      {name}
    </Link>
  ));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Code className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-slate-800">Code Ascend</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8">
            {renderNavLinks()}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              Sign In
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
            <nav className="flex flex-col space-y-3">
              {renderNavLinks(true)}
              <div className="flex flex-col space-y-2 pt-3">
                <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition w-full">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
