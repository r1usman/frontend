import {
  selectIsConnectedToRoom,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect } from "react";
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
        <div className="min-h-screen bg-gray-900 flex flex-col">
          <Header />
          
          {isConnected ? (
            <div className="flex-1 flex flex-col">
              {/* Main Conference Area */}
              <Conference />
              
              {/* Resources Section */}
              <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
                <ResourcesSection />
              </div>
              
              {/* Audio Recorder - Fixed at bottom above footer */}
              <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
                <AudioRecorder />
              </div>
              
              {/* Footer Controls */}
              <Footer />
            </div>
          ) : (
            <JoinForm />
          )}
        </div>
      </ResourcesProvider>
    </EmotionProvider>
    
  );
}
