import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import { Users, Video } from "lucide-react";
import { useEmotion } from "./EmotionContext";

function Conference({ isDarkMode }) {
  const peers = useHMSStore(selectPeers);
  const { classEngagement } = useEmotion();

  return (
    <div className={`flex-1 p-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Conference Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              } rounded-lg`}
            >
              <Video
                className={`w-6 h-6 ${
                  isDarkMode ? "text-gray-200" : "text-gray-600"
                }`}
              />
            </div>
            <div>
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Live Class
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {peers.length} participant{peers.length !== 1 ? "s" : ""} in the
                room
              </p>
            </div>
          </div>

          <div
            className={`flex items-center space-x-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">{peers.length}</span>
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs uppercase tracking-wide ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Engagement
              </span>
              <div
                className={`w-28 h-2 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                } rounded-full overflow-hidden`}
              >
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${classEngagement}%` }}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {classEngagement}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>

      {/* Empty State */}
      {peers.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div
            className={`w-20 h-20 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            } rounded-full flex items-center justify-center mb-4`}
          >
            <Users
              className={`w-10 h-10 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
          </div>
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            No participants yet
          </h3>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Waiting for others to join the session...
          </p>
        </div>
      )}
    </div>
  );
}

export default Conference;
