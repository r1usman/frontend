import React from "react";
import { Bell, Search, Settings, BookOpen, Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-indigo-600 py-3 px-4 md:px-6 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-9 w-9 bg-white/10 rounded-lg backdrop-blur-sm">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-white hidden md:block">
                {"Code Ascend"}
              </h1>
            </div>
            <span className="inline-flex items-center rounded-full bg-green-500/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-green-100">
              Live
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-indigo-300" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 bg-indigo-500/30 border border-indigo-500 rounded-lg text-sm text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                placeholder="Search..."
              />
            </div>

            {/* Notification Button */}
            <button className="relative p-2 text-indigo-200 hover:text-white rounded-lg hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-indigo-600"></span>
            </button>

            {/* Settings Button */}
            <button className="p-2 text-indigo-200 hover:text-white rounded-lg hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30">
              <span className="sr-only">Settings</span>
              <Settings className="h-5 w-5" />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-6 border-l border-indigo-500">
              <img
                className="h-9 w-9 rounded-full ring-2 ring-indigo-500"
                src="https://i.pravatar.cc/150?img=12"
                alt="User avatar"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">
                  Dr. Chris Evans
                </p>
                <p className="text-xs text-indigo-200">Instructor</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-indigo-200 hover:text-white rounded-lg hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 border-t border-indigo-500">
            <div className="pt-4 space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-indigo-300" />
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-3 py-2 bg-indigo-500/30 border border-indigo-500 rounded-lg text-sm text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  placeholder="Search..."
                />
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-9 w-9 rounded-full ring-2 ring-indigo-500"
                    src="https://i.pravatar.cc/150?img=12"
                    alt="User avatar"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Dr. Chris Evans
                    </p>
                    <p className="text-xs text-indigo-200">Instructor</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 px-2">
                <button className="flex-1 p-2 text-indigo-200 hover:text-white rounded-lg hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30">
                  <Bell className="h-5 w-5 mx-auto" />
                </button>
                <button className="flex-1 p-2 text-indigo-200 hover:text-white rounded-lg hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30">
                  <Settings className="h-5 w-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
