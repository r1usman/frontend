import { Video, Users, Settings } from "lucide-react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">LiveClass</h1>
              <p className="text-sm text-blue-100">Professional Video Conferencing</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Participants</span>
            </button>
            <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90 font-medium">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
