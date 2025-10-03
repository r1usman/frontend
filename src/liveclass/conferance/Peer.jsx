import { useEffect, useRef } from "react";
import { useVideo } from "@100mslive/react-sdk";
import { useEmotion } from "./EmotionContext";
import {
  User,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  // Use emotion context
  const {
    getPeerEngagement,
    createSnapshotFromVideo,
    clearPeerEmotionHistory,
  } = useEmotion();

  // Get current emotion data from context
  const emotionData = getPeerEngagement(peer.id);
  const engagementData = emotionData
    ? {
        level: emotionData.engagementLevel,
        percentage: emotionData.engagementPercentage,
      }
    : null;
  const currentEmotion = emotionData?.currentEmotion || null;

  // Add your own ref for snapshots
  const snapshotRef = useRef(null);

  // Combine both refs
  const setVideoRefs = (element) => {
    // Set the HMS video ref
    if (typeof videoRef === "function") {
      videoRef(element); // Handle callback refs
    } else {
      videoRef.current = element; // Handle object refs
    }

    // Set your snapshot ref
    snapshotRef.current = element;
  };

  const captureSnapshot = () => {
    if (snapshotRef.current) {
      createSnapshotFromVideo(snapshotRef.current, {
        name: peer.name,
        id: peer.id,
      });
    }
  };

  // Cleanup when peer leaves
  // useEffect(() => {
  //   return () => {
  //     clearPeerEmotionHistory(peer.id);
  //   };
  // }, [peer.id, clearPeerEmotionHistory]);

  useEffect(() => {
    const intervalId = setInterval(captureSnapshot, 5000);
    return () => {
      clearInterval(intervalId);
      console.log("Timer has been stopped. 🛑");
    };
  }, []);

  // Get engagement level styling
  const getEngagementStyling = () => {
    if (!engagementData) {
      return {
        bgColor: "bg-gray-500",
        textColor: "text-gray-300",
        icon: Minus,
        label: "Unknown",
      };
    }

    switch (engagementData.level) {
      case "high":
        return {
          bgColor: "bg-green-600",
          textColor: "text-green-100",
          icon: TrendingUp,
          label: "High Engagement",
        };
      case "medium":
        return {
          bgColor: "bg-yellow-600",
          textColor: "text-yellow-100",
          icon: TrendingUp,
          label: "Medium Engagement",
        };
      case "low":
        return {
          bgColor: "bg-orange-600",
          textColor: "text-orange-100",
          icon: TrendingDown,
          label: "Low Engagement",
        };
      case "very-low":
        return {
          bgColor: "bg-red-600",
          textColor: "text-red-100",
          icon: TrendingDown,
          label: "Very Low Engagement",
        };
      default:
        return {
          bgColor: "bg-gray-500",
          textColor: "text-gray-300",
          icon: Minus,
          label: "Unknown",
        };
    }
  };

  const engagementStyling = getEngagementStyling();
  const EngagementIcon = engagementStyling.icon;

  return (
    <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Video Container */}
      <div className="relative aspect-video bg-gray-700">
        <video
          ref={setVideoRefs}
          className={`w-full h-full object-cover ${
            peer.isLocal ? "scale-x-[-1]" : ""
          }`}
          autoPlay
          muted
          playsInline
        />

        {/* Video Off Overlay */}
        {!peer.videoTrack && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {/* Audio Status */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              peer.audioTrack
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {peer.audioTrack ? (
              <Mic className="w-3 h-3" />
            ) : (
              <MicOff className="w-3 h-3" />
            )}
          </div>

          {/* Video Status */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              peer.videoTrack
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {peer.videoTrack ? (
              <Video className="w-3 h-3" />
            ) : (
              <VideoOff className="w-3 h-3" />
            )}
          </div>
        </div>

        {/* Engagement Level Indicator */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Current Emotion */}
          {currentEmotion && (
            <div className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <span className="capitalize">{currentEmotion}</span>
            </div>
          )}

          {/* Engagement Level */}
          {engagementData && (
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${engagementStyling.bgColor} ${engagementStyling.textColor}`}
            >
              <EngagementIcon className="w-3 h-3" />
              <span>{engagementData.percentage}%</span>
            </div>
          )}

          {/* Local User Badge */}
          {peer.isLocal && (
            <div className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              You
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-3 bg-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {peer.name}
            </p>
            <p className="text-xs text-gray-400">
              {peer.isLocal ? "You" : "Participant"}
            </p>
          </div>
        </div>

        {/* Engagement Details */}
        {engagementData && (
          <div className="mt-2 p-2 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">Engagement:</span>
              <span
                className={`text-xs font-medium ${engagementStyling.textColor}`}
              >
                {engagementStyling.label}
              </span>
            </div>
            <div className="mt-1">
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${engagementStyling.bgColor}`}
                  style={{ width: `${engagementData.percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default Peer;
