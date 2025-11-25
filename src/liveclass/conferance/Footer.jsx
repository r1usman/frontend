import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

function Footer({ isDarkMode }) {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const navigate = useNavigate();
  const { courseId } = useParams(); // expects a route param like /:courseId/...

  const [isEndingClass, setIsEndingClass] = useState(false);
  const [liveEndError, setLiveEndError] = useState(null);

  const handleEndCall = async () => {
    if (isEndingClass) return;
    setIsEndingClass(true);
    setLiveEndError(null);
    try {
      if (courseId) {
        const res = await fetch(
          `http://localhost:3000/courses/${courseId}/live/stop`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId }),
          }
        );
        if (!res.ok) {
          throw new Error(`Stop live failed (${res.status})`);
        }
      }
    } catch (e) {
      setLiveEndError(e.message || "Unable to end live class");
    } finally {
      await hmsActions.leave();
      setIsEndingClass(false);
      navigate(-1);
    }
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
              disabled={isEndingClass}
              className="p-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-full transition-all duration-200 transform hover:scale-105 flex items-center"
              title="End Live Class"
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
            <div
              className={`w-2 h-2 rounded-full ${
                isEndingClass ? "bg-yellow-400" : "bg-green-500"
              }`}
            ></div>
            <span className="text-sm font-medium">
              {isEndingClass ? "Ending..." : "Connected"}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {liveEndError && (
          <p className="mt-3 text-xs text-red-500 text-center">
            {liveEndError}
          </p>
        )}

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
              End Class
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
