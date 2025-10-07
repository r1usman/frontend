import { Video, Users, Settings } from "lucide-react";

function Header({ onOpenResources, onOpenRecorder, onUseObsCamera }) {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg">
              <Video className="w-6 h-6 text-gray-200" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-100">LiveClass</h1>
              <p className="text-sm text-gray-400">
                Simple, focused live sessions
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Participants</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button
              onClick={onOpenResources}
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Resources
            </button>
            <button
              onClick={onOpenRecorder}
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Recorder
            </button>
            <button
              onClick={onUseObsCamera}
              className="text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-100 px-3 py-1.5 rounded-md"
            >
              Use OBS Cam
            </button>
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-300 font-medium">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
