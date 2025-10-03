import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import { Users, Video } from "lucide-react";

function Conference() {
  const peers = useHMSStore(selectPeers);

  return (
    <div className="flex-1 bg-gray-900 p-6">
      {/* Conference Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg">
              <Video className="w-6 h-6 text-gray-200" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-100">
                Live Class
              </h2>
              <p className="text-gray-400 text-sm">
                {peers.length} participant{peers.length !== 1 ? "s" : ""} in the
                room
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">{peers.length}</span>
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
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            No participants yet
          </h3>
          <p className="text-gray-400">
            Waiting for others to join the session...
          </p>
        </div>
      )}
    </div>
  );
}

export default Conference;
