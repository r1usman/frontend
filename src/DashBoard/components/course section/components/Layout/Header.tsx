import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, Search, BookOpen, User } from "lucide-react";
import { currentUser } from "../mockData";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                LearnHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/instructor"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                isActive("/instructor")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              Instructor Dashboard
            </Link>
            <Link
              to="/student"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                isActive("/student")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              Student Dashboard
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {currentUser.name}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/instructor"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/instructor")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Instructor Dashboard
            </Link>
            <Link
              to="/student"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/student")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Student Dashboard
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {currentUser.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {currentUser.role}
                </div>
              </div>
              <button className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
