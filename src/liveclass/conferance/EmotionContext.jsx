import React, { createContext, useContext, useState, useCallback } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { client } from "@gradio/client";

// Create the emotion context
const EmotionContext = createContext();

// Global emotion tracking for each peer
const peerEmotionHistory = new Map();

/**
 * Processes an array of emotion objects and determines an 'expression'
 * based on a set of prioritized rules involving Happy, Neutral, and Sadness confidence.
 */
function determineExpressionFromArray(emotionArray) {
  const probabilities = {};
  emotionArray.forEach((item) => {
    probabilities[item.label] = item.confidence;
  });

  const neutral = probabilities["Neutral"] || 0;
  const sadness = probabilities["Sadness"] || 0;
  const anger = probabilities["Anger"] || 0;
  const difference = sadness - neutral;
  const difference1 = neutral - sadness;

  const topTwoLabels = emotionArray.slice(0, 2).map((item) => item.label);

  // Log top two emotions and their probabilities
  console.log("Top two emotions:", {
    first: {
      emotion: emotionArray[0]?.label,
      probability: emotionArray[0]?.confidence,
    },
    second: {
      emotion: emotionArray[1]?.label,
      probability: emotionArray[1]?.confidence,
    },
  });

  if (topTwoLabels.includes("Happiness")) {
    return "engaged";
  }
  if (topTwoLabels.includes("Anger") && topTwoLabels.includes("Neutral")) {
    return "engaged";
  }
  if (topTwoLabels.includes("Anger") && topTwoLabels.includes("Disgust")) {
    return "confused";
  }

  if (neutral > 0.7) {
    return "engaged";
  }
  if (topTwoLabels.includes("Neutral") && topTwoLabels.includes("Sadness")) {
    if (neutral > sadness) return "engaged";
    else return "bored";
  }

  if (topTwoLabels.includes("Sadness") && topTwoLabels.includes("Anger")) {
    if (sadness > 0.75) {
      return "frustrated";
    } else return "confused";
  }

  return "unknown"; // Default fallback
}

/**
 * Calculates engagement level based on emotion history
 */
function calculateEngagementLevel(emotions) {
  if (emotions.length === 0) {
    return { level: "unknown", percentage: 0 };
  }

  // Count emotions (excluding 'unknown')
  const emotionCounts = {
    engaged: 0,
    frustrated: 0,
    confused: 0,
    bored: 0,
  };

  // Filter out 'unknown' emotions and count only known emotions
  const knownEmotions = emotions.filter(({ emotion }) => emotion !== "unknown");

  if (knownEmotions.length === 0) {
    return { level: "unknown", percentage: 0 };
  }

  knownEmotions.forEach(({ emotion }) => {
    if (emotionCounts.hasOwnProperty(emotion)) {
      emotionCounts[emotion]++;
    }
  });

  const total = knownEmotions.length; // Use count of known emotions only
  const engagedEmotions =
    emotionCounts.engaged + emotionCounts.frustrated + emotionCounts.confused;
  const engagementPercentage = Math.round((engagedEmotions / total) * 100);

  // Determine engagement level
  let level;
  if (engagementPercentage >= 80) {
    level = "high";
  } else if (engagementPercentage >= 60) {
    level = "medium";
  } else if (engagementPercentage >= 40) {
    level = "low";
  } else {
    level = "very-low";
  }

  return { level, percentage: engagementPercentage };
}

// Emotion Provider Component
export function EmotionProvider({ children }) {
  const [peerEmotions, setPeerEmotions] = useState(new Map());
  const [classEngagement, setClassEngagement] = useState(0);
  const hmsActions = useHMSActions();

  const computeClassEngagementFromMap = useCallback((map) => {
    let known = 0;
    let engaged = 0;
    map.forEach((data) => {
      const emotion = data?.currentEmotion;
      if (!emotion) return;
      known += 1;
      if (
        emotion === "engaged" ||
        emotion === "frustrated" ||
        emotion === "confused"
      ) {
        engaged += 1;
      }
    });
    if (known === 0) return 0;
    return Math.round((engaged / known) * 100);
  }, []);

  const trackPeerEmotion = useCallback((peerId, emotion) => {
    if (!peerEmotionHistory.has(peerId)) {
      peerEmotionHistory.set(peerId, {
        emotions: [],
        timestamp: Date.now(),
      });
    }

    const peerData = peerEmotionHistory.get(peerId);
    const now = Date.now();

    // Add new emotion with timestamp
    peerData.emotions.push({
      emotion,
      timestamp: now,
    });

    // Keep only last 20 emotions (last ~100 seconds with 5s intervals)
    if (peerData.emotions.length > 20) {
      peerData.emotions = peerData.emotions.slice(-20);
    }

    // Calculate engagement level
    const engagementData = calculateEngagementLevel(peerData.emotions);

    const emotionData = {
      peerId,
      currentEmotion: emotion,
      engagementLevel: engagementData.level,
      engagementPercentage: engagementData.percentage,
      recentEmotions: peerData.emotions.slice(-5), // Last 5 emotions
      totalEmotions: peerData.emotions.length,
    };

    // Update the state and class engagement
    setPeerEmotions((prev) => {
      const newMap = new Map(prev);
      newMap.set(peerId, emotionData);
      const percentage = computeClassEngagementFromMap(newMap);
      setClassEngagement(percentage);
      // Best-effort broadcast to room for visibility
      try {
        const payload = JSON.stringify({
          kind: "class_engagement",
          percentage,
        });
        // fire and forget; if unsupported, it will be caught
        hmsActions.sendBroadcastMessage(payload);
      } catch (e) {
        // ignore
      }
      return newMap;
    });

    console.log(
      `Peer ${peerId}: ${emotion} - Engagement: ${engagementData.level} (${engagementData.percentage}%)`
    );

    return emotionData;
  }, []);

  const getPeerEngagement = useCallback(
    (peerId) => {
      return peerEmotions.get(peerId) || null;
    },
    [peerEmotions]
  );

  const clearPeerEmotionHistory = useCallback((peerId) => {
    peerEmotionHistory.delete(peerId);
    setPeerEmotions((prev) => {
      const newMap = new Map(prev);
      newMap.delete(peerId);
      return newMap;
    });
  }, []);

  const uploadSnapshot = useCallback(
    async (inputCanvas, peer) => {
      inputCanvas.toBlob(async (blob) => {
        try {
          const app = await client(
            "ElenaRyumina/Facial_Expression_Recognition"
          );
          const result = await app.predict("/preprocess_image_and_predict", [
            blob, // blob in 'Original image' Image component
          ]);

          const detectedEmotion = determineExpressionFromArray(
            result.data[2]["confidences"]
          );
          trackPeerEmotion(peer.id, detectedEmotion);
        } catch (err) {
          console.error("Snapshot upload failed", err);
        }
      }, "image/png");
    },
    [trackPeerEmotion]
  );

  const createSnapshotFromVideo = useCallback(
    (inputVideo, peer) => {
      const canvas = document.createElement("canvas");
      canvas.width = inputVideo.videoWidth;
      canvas.height = inputVideo.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(inputVideo, 0, 0, canvas.width, canvas.height);
      uploadSnapshot(canvas, peer);
    },
    [uploadSnapshot]
  );

  const value = {
    peerEmotions,
    trackPeerEmotion,
    getPeerEngagement,
    clearPeerEmotionHistory,
    uploadSnapshot,
    createSnapshotFromVideo,
    classEngagement,
  };

  return (
    <EmotionContext.Provider value={value}>{children}</EmotionContext.Provider>
  );
}

// Custom hook to use the emotion context
export function useEmotion() {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error("useEmotion must be used within an EmotionProvider");
  }
  return context;
}

export default EmotionContext;
