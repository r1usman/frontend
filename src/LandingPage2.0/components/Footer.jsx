import React from 'react';
import { Code, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Code className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">CodeMaster</span>
            </div>
            <p className="mb-4 text-slate-400">
              Empowering developers through interactive learning, competitions, and AI-powered assistance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                "Courses", "Live Classes", "Competitions", "AI Assistant",
                "Community", "Events", "Blog", "Success Stories"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                "Documentation", "API Reference", "Tutorials", "Help Center",
                "Career Resources", "FAQs", "Privacy Policy", "Terms of Service"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-indigo-400 flex-shrink-0" />
                <span>support@codemaster.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-indigo-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-indigo-400 flex-shrink-0" />
                <span>123 Coding Avenue, Tech District, CA 94103, USA</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow p-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:border-indigo-500 text-white text-sm"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CodeMaster. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-indigo-400">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-indigo-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
