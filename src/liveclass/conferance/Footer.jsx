import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Settings, Users } from "lucide-react";

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  const handleEndCall = async () => {
    await hmsActions.leave();
    navigate(-1); // Go back to the previous page
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left side - Additional controls */}
          <div className="flex items-center space-x-3">
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200 group">
              <Users className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200 group">
              <Settings className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </button>
          </div>

          {/* Center - Main controls */}
          <div className="flex items-center space-x-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-all duration-200 transform hover:scale-105 ${
                isLocalAudioEnabled
                  ? "bg-gray-600 hover:bg-gray-500 text-white"
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
                  ? "bg-gray-600 hover:bg-gray-500 text-white"
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
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Connected</span>
          </div>
        </div>

        {/* Control Labels */}
        <div className="flex items-center justify-center mt-3 space-x-12">
          <div className="text-center">
            <p className="text-xs text-gray-400">
              {isLocalAudioEnabled ? "Mute" : "Unmute"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">
              {isLocalVideoEnabled ? "Turn Off Video" : "Turn On Video"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">End Call</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
