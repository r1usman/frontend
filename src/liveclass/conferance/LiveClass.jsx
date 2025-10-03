import {
  selectIsConnectedToRoom,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import Conference from "./Conference";
import Footer from "./Footer";
import Header from "./Header";
import JoinForm from "./JoinForm";
import { AudioRecorder } from "./recorder";
import { EmotionProvider } from "./EmotionContext";
import { ResourcesProvider } from "./ResourcesContext";
import ResourcesSection from "./ResourcesSection";

export default function LiveClass() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);

  const handleUseObsCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      let target = videoDevices[5];
      if (!target) {
        target = videoDevices.find((d) =>
          (d.label || "").toLowerCase().includes("obs")
        );
      }
      if (target?.deviceId) {
        await hmsActions.setVideoDevice(target.deviceId);
      } else {
        console.warn("OBS camera not found at index 5 or by label.");
      }
    } catch (err) {
      console.error("Failed to switch to OBS camera:", err);
    }
  };

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <EmotionProvider>
      <ResourcesProvider>
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
          <Header
            onOpenResources={() => setIsResourcesOpen(true)}
            onOpenRecorder={() => setIsRecorderOpen(true)}
            onUseObsCamera={handleUseObsCamera}
          />

          {isConnected ? (
            <div className="flex-1 flex flex-col">
              {/* Main Conference Area */}
              <Conference />

              {/* Footer Controls */}
              <Footer />

              {/* Overlays */}
              {isResourcesOpen && (
                <div className="fixed inset-0 z-40">
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setIsResourcesOpen(false)}
                  />
                  <div className="absolute inset-x-0 top-20 mx-auto max-w-3xl px-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                        <h3 className="text-sm font-medium text-gray-100">
                          Resources
                        </h3>
                        <button
                          onClick={() => setIsResourcesOpen(false)}
                          className="text-gray-300 hover:text-white text-sm"
                        >
                          Close
                        </button>
                      </div>
                      <div className="p-4">
                        <ResourcesSection />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isRecorderOpen && (
                <div className="fixed inset-0 z-40">
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setIsRecorderOpen(false)}
                  />
                  <div className="absolute inset-x-0 top-20 mx-auto max-w-2xl px-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                        <h3 className="text-sm font-medium text-gray-100">
                          Recorder
                        </h3>
                        <button
                          onClick={() => setIsRecorderOpen(false)}
                          className="text-gray-300 hover:text-white text-sm"
                        >
                          Close
                        </button>
                      </div>
                      <div className="p-4">
                        <AudioRecorder />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <JoinForm />
          )}
        </div>
      </ResourcesProvider>
    </EmotionProvider>
  );
}
