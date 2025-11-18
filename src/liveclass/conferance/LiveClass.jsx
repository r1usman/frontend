import {
  selectIsConnectedToRoom,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import Conference from "./Conference";
import { EmotionProvider } from "./EmotionContext";
import Footer from "./Footer";
import Header from "./Header";
import JoinForm from "./JoinForm";
import { AudioRecorder } from "./recorder";
import { ResourcesProvider } from "./ResourcesContext";
import ResourcesSection from "./ResourcesSection";
import { WhiteboardProvider } from "./WhiteboardProvider";
import Whiteboard from "./Whiteboard";
import { QueryProvider } from "./QueryContext";
import QueryPanel from "./QueryPanel";

export default function LiveClass() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isQueriesOpen, setIsQueriesOpen] = useState(false);

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
        if (typeof hmsActions.setDevice === "function") {
          await hmsActions.setDevice("videoInput", target.deviceId);
        } else if (typeof hmsActions.setVideoSettings === "function") {
          await hmsActions.setVideoSettings({ deviceId: target.deviceId });
        } else {
          console.warn(
            "HMS: No supported API found to switch camera (setDevice/setVideoSettings)."
          );
        }
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
        <WhiteboardProvider>
          <QueryProvider>
            <div
              className={`min-h-screen flex flex-col ${
                isDarkMode
                  ? "bg-gray-900 text-gray-100"
                  : "bg-gray-50 text-gray-900"
              }`}
            >
              <Header
                onOpenResources={() => setIsResourcesOpen(true)}
                onOpenRecorder={() => setIsRecorderOpen(true)}
                onUseObsCamera={handleUseObsCamera}
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                onOpenQueries={() => setIsQueriesOpen(true)} // added
              />
              {isConnected ? (
                <div className="flex-1 flex flex-col">
                  {/* Main Conference Area */}
                  <Conference isDarkMode={isDarkMode} />
                  <Whiteboard />
                  <Footer isDarkMode={isDarkMode} />
                  {/* Resources Overlay */}
                  {isResourcesOpen && (
                    <div className="fixed inset-0 z-40">
                      <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsResourcesOpen(false)}
                      />
                      <div className="absolute inset-x-0 top-20 mx-auto max-w-3xl px-4">
                        <div
                          className={`${
                            isDarkMode
                              ? "bg-gray-900 border-gray-800"
                              : "bg-white border-gray-200"
                          } border rounded-xl shadow-lg`}
                        >
                          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                            <h3
                              className={`text-sm font-medium ${
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              Resources
                            </h3>
                            <button
                              onClick={() => setIsResourcesOpen(false)}
                              className={`text-sm ${
                                isDarkMode
                                  ? "text-gray-300 hover:text-white"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              Close
                            </button>
                          </div>
                          <div className="p-4">
                            <ResourcesSection isDarkMode={isDarkMode} />
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
                        <div
                          className={`${
                            isDarkMode
                              ? "bg-gray-900 border-gray-800"
                              : "bg-white border-gray-200"
                          } border rounded-xl shadow-lg`}
                        >
                          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                            <h3
                              className={`text-sm font-medium ${
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              Recorder
                            </h3>
                            <button
                              onClick={() => setIsRecorderOpen(false)}
                              className={`text-sm ${
                                isDarkMode
                                  ? "text-gray-300 hover:text-white"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
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
                  {isQueriesOpen && (
                    <div className="fixed inset-0 z-40">
                      <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsQueriesOpen(false)}
                      />
                      <div className="absolute inset-x-0 top-20 mx-auto max-w-3xl px-4">
                        <div
                          className={`${
                            isDarkMode
                              ? "bg-gray-900 border-gray-800"
                              : "bg-white border-gray-200"
                          } border rounded-xl shadow-lg`}
                        >
                          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                            <h3
                              className={`text-sm font-medium ${
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              Queries
                            </h3>
                            <button
                              onClick={() => setIsQueriesOpen(false)}
                              className={`text-sm ${
                                isDarkMode
                                  ? "text-gray-300 hover:text-white"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              Close
                            </button>
                          </div>
                          <div className="p-4">
                            <QueryPanel isDarkMode={isDarkMode} />
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
          </QueryProvider>
        </WhiteboardProvider>
      </ResourcesProvider>
    </EmotionProvider>
  );
}
