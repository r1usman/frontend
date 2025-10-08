import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Settings,
  Users,
} from "lucide-react";

function Footer({ isDarkMode }) {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  const handleEndCall = async () => {
    await hmsActions.leave();
    navigate(-1); // Go back to the previous page
  };

  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border-t px-6 py-4`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left side - Additional controls */}
          <div className="flex items-center space-x-3">
            <button
              className={`p-3 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              } rounded-full transition-colors duration-200 group`}
            >
              <Users
                className={`w-5 h-5 ${
                  isDarkMode
                    ? "text-gray-300 group-hover:text-white"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              />
            </button>
            <button
              className={`p-3 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              } rounded-full transition-colors duration-200 group`}
            >
              <Settings
                className={`w-5 h-5 ${
                  isDarkMode
                    ? "text-gray-300 group-hover:text-white"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              />
            </button>
          </div>

          {/* Center - Main controls */}
          <div className="flex items-center space-x-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-all duration-200 transform hover:scale-105 ${
                isLocalAudioEnabled
                  ? isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
            >
              {isLocalAudioEnabled ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </button>

            {/* Video Toggle */}
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all duration-200 transform hover:scale-105 ${
                isLocalVideoEnabled
                  ? isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
            >
              {isLocalVideoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </button>

            {/* End Call */}
            <button
              onClick={handleEndCall}
              className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>

          {/* Right side - Status */}
          <div
            className={`flex items-center space-x-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Connected</span>
          </div>
        </div>

        {/* Control Labels */}
        <div className="flex items-center justify-center mt-3 space-x-12">
          <div className="text-center">
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isLocalAudioEnabled ? "Mute" : "Unmute"}
            </p>
          </div>
          <div className="text-center">
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isLocalVideoEnabled ? "Turn Off Video" : "Turn On Video"}
            </p>
          </div>
          <div className="text-center">
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              End Call
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
