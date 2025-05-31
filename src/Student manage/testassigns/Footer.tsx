import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Instructor Dashboard. All rights reserved.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center justify-center md:justify-end">
            <p className="text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for educators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;