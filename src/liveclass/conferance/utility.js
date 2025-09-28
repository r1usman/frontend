import { client } from "@gradio/client";

// Global emotion tracking for each peer
const peerEmotionHistory = new Map();

/**
 * Processes an array of emotion objects and determines an 'expression'
 * based on a set of prioritized rules involving Happy, Neutral, and Sadness confidence.
 * @param {Array<Object>} emotionArray - Array of emotion objects
 * @returns {string} The determined expression (engaged, frustrated, bored, or confused).
 */
function determineExpressionFromArray(emotionArray) {
  // 1. Pre-process: Create a confidence map for quick lookups
  const probabilities = {};
  emotionArray.forEach((item) => {
    probabilities[item.label] = item.confidence;
  });

  const neutral = probabilities["Neutral"] || 0;
  const sadness = probabilities["Sadness"] || 0;
  const anger = probabilities["Anger"] || 0;
  const difference = Math.abs(neutral - sadness);

  const topTwoLabels = emotionArray.slice(0, 2).map((item) => item.label);
  
  if (topTwoLabels.includes("Happiness")) {
    return "engaged";
  }
  if (topTwoLabels.includes("Anger") && topTwoLabels.includes("Neutral")) {
    return "engaged";
  }

  if (neutral > 0.7) {
    return "engaged";
  }
  if (topTwoLabels.includes("Neutral") && topTwoLabels.includes("Sadness")) {
    if (difference < 0.25) {
      return "engaged";
    } else {
      return "bored";
    }
  }

  if (topTwoLabels.includes("Sadness") && topTwoLabels.includes("Anger")) {
    if (sadness > 0.75) {
      return "frustrated";
    } else return "confused";
  }
  
  return "engaged"; // Default fallback
}

/**
 * Tracks emotions for a specific peer and calculates engagement level
 * @param {string} peerId - Unique identifier for the peer
 * @param {string} emotion - The detected emotion
 * @returns {Object} Engagement data with level, percentage, and recent emotions
 */
export function trackPeerEmotion(peerId, emotion) {
  if (!peerEmotionHistory.has(peerId)) {
    peerEmotionHistory.set(peerId, {
      emotions: [],
      timestamp: Date.now()
    });
  }

  const peerData = peerEmotionHistory.get(peerId);
  const now = Date.now();
  
  // Add new emotion with timestamp
  peerData.emotions.push({
    emotion,
    timestamp: now
  });

  // Keep only last 20 emotions (last ~100 seconds with 5s intervals)
  if (peerData.emotions.length > 20) {
    peerData.emotions = peerData.emotions.slice(-20);
  }

  // Calculate engagement level
  const engagementData = calculateEngagementLevel(peerData.emotions);
  
  return {
    peerId,
    currentEmotion: emotion,
    engagementLevel: engagementData.level,
    engagementPercentage: engagementData.percentage,
    recentEmotions: peerData.emotions.slice(-5), // Last 5 emotions
    totalEmotions: peerData.emotions.length
  };
}

/**
 * Calculates engagement level based on emotion history
 * @param {Array} emotions - Array of recent emotions
 * @returns {Object} Engagement level and percentage
 */
function calculateEngagementLevel(emotions) {
  if (emotions.length === 0) {
    return { level: 'unknown', percentage: 0 };
  }

  // Count emotions
  const emotionCounts = {
    engaged: 0,
    frustrated: 0,
    confused: 0,
    bored: 0
  };

  emotions.forEach(({ emotion }) => {
    if (emotionCounts.hasOwnProperty(emotion)) {
      emotionCounts[emotion]++;
    }
  });

  const total = emotions.length;
  const engagedEmotions = emotionCounts.engaged + emotionCounts.frustrated + emotionCounts.confused;
  const engagementPercentage = Math.round((engagedEmotions / total) * 100);

  // Determine engagement level
  let level;
  if (engagementPercentage >= 80) {
    level = 'high';
  } else if (engagementPercentage >= 60) {
    level = 'medium';
  } else if (engagementPercentage >= 40) {
    level = 'low';
  } else {
    level = 'very-low';
  }

  return { level, percentage: engagementPercentage };
}

/**
 * Gets current engagement data for a peer
 * @param {string} peerId - Peer identifier
 * @returns {Object|null} Current engagement data or null if no data
 */
export function getPeerEngagement(peerId) {
  const peerData = peerEmotionHistory.get(peerId);
  if (!peerData || peerData.emotions.length === 0) {
    return null;
  }

  return calculateEngagementLevel(peerData.emotions);
}

/**
 * Clears emotion history for a peer (useful when peer leaves)
 * @param {string} peerId - Peer identifier
 */
export function clearPeerEmotionHistory(peerId) {
  peerEmotionHistory.delete(peerId);
}

export const uploadSnapshot = (inputCanvas, peer) => {
  inputCanvas.toBlob(async (blob) => {
    try {
      const app = await client("ElenaRyumina/Facial_Expression_Recognition");
      const result = await app.predict("/preprocess_image_and_predict", [
        blob, // blob in 'Original image' Image component
      ]);

      const detectedEmotion = determineExpressionFromArray(result.data[2]["confidences"]);
      const engagementData = trackPeerEmotion(peer.id, detectedEmotion);
      
      console.log(`Peer ${peer.name}: ${detectedEmotion} - Engagement: ${engagementData.engagementLevel} (${engagementData.engagementPercentage}%)`);
      console.log('Full engagement data:', engagementData);
      
      // Dispatch custom event for real-time updates
      const event = new CustomEvent('emotionDetected', {
        detail: {
          peerId: peer.id,
          peerName: peer.name,
          emotion: detectedEmotion,
          engagementData
        }
      });
      
      console.log('Dispatching emotion event:', event.detail);
      window.dispatchEvent(event);
    } catch (err) {
      console.error("Snapshot upload failed", err);
    }
  }, "image/png");
};

export const createSnapshotFromVideo = (inputVideo, peer) => {
  // console.log("fdsaf");
  const canvas = document.createElement("canvas");
  canvas.width = inputVideo.videoWidth;
  canvas.height = inputVideo.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(inputVideo, 0, 0, canvas.width, canvas.height);
  uploadSnapshot(canvas, peer);
};
