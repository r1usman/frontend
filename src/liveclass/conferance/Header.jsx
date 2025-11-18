import React, { useState, useRef, useEffect } from "react";
import { Video, Users, Settings, Sun, Moon, Mic, Square } from "lucide-react";
import { useResources } from "./ResourcesContext";
import {
  useHMSActions,
  useHMSStore,
  selectLocalAudioTrackID,
  selectIsLocalAudioEnabled,
} from "@100mslive/react-sdk";
import { WhiteboardToggle } from "./WhiteboardToggle";

function Header({
  onOpenResources,
  onOpenRecorder,
  onUseObsCamera,
  isDarkMode,
  onToggleTheme,
  onOpenQueries, // added
}) {
  const { addResources } = useResources();
  const hmsActions = useHMSActions();
  const localAudioTrackId = useHMSStore(selectLocalAudioTrackID);
  const isMicOn = useHMSStore(selectIsLocalAudioEnabled);

  const [isAutoRecording, setIsAutoRecording] = useState(false);
  const [recordingInterval, setRecordingInterval] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const startAutoRecording = async () => {
    try {
      setIsAutoRecording(true);

      if (!isMicOn) {
        await hmsActions.setLocalAudioEnabled(true);
      }

      const track = hmsActions.getLocalTrack(localAudioTrackId);
      if (!track?.nativeTrack) {
        throw new Error("Audio track not available");
      }

      const audioStream = new MediaStream([track.nativeTrack]);
      mediaRecorderRef.current = new MediaRecorder(audioStream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        await uploadRecording(blob);
      };

      mediaRecorderRef.current.start(1000);

      // Set up 20-second interval for automatic recording segments
      const interval = setInterval(async () => {
        if (mediaRecorderRef.current?.state === "recording") {
          // Stop current recording
          mediaRecorderRef.current.stop();

          // Start new recording immediately
          const newTrack = hmsActions.getLocalTrack(localAudioTrackId);
          if (newTrack?.nativeTrack) {
            const newAudioStream = new MediaStream([newTrack.nativeTrack]);
            mediaRecorderRef.current = new MediaRecorder(newAudioStream);

            const newChunks = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
              newChunks.push(e.data);
            };

            mediaRecorderRef.current.onstop = async () => {
              const blob = new Blob(newChunks, { type: "audio/webm" });
              await uploadRecording(blob);
            };

            mediaRecorderRef.current.start(1000);
          }
        }
      }, 15000); // 20 seconds

      setRecordingInterval(interval);
    } catch (error) {
      console.error("Auto recording failed to start:", error);
      setIsAutoRecording(false);
    }
  };

  const stopAutoRecording = () => {
    setIsAutoRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const uploadRecording = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, `auto-recording-${Date.now()}.webm`);

      const response = await fetch("http://localhost:3000/courses/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Auto recording upload successful:", result);

      // Add resources to context
      if (result.updResults) {
        console.log("Adding auto recording resources to context:", result);
        addResources(result.updResults);
      }

      return result.updResults;
    } catch (error) {
      console.error("Auto recording upload error:", error);
      throw error;
    }
  };

  // Recording duration timer
  useEffect(() => {
    let interval;
    if (isAutoRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isAutoRecording]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);
  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
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
              <h1
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                LiveClass
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Simple, focused live sessions
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              className={`flex items-center space-x-2 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors duration-200`}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Participants</span>
            </button>
            <WhiteboardToggle>Whiteboard</WhiteboardToggle>
            <button
              onClick={onOpenResources}
              className={`text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Resources
            </button>
            <button
              onClick={onOpenRecorder}
              className={`text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Recorder
            </button>
            <button
              onClick={onOpenQueries}
              className={`text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Queries
            </button>
            <button
              onClick={onUseObsCamera}
              className={`text-xs font-medium ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } px-3 py-1.5 rounded-md`}
            >
              Use OBS Cam
            </button>
            <button
              onClick={isAutoRecording ? stopAutoRecording : startAutoRecording}
              className={`text-xs font-medium ${
                isAutoRecording
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } px-3 py-1.5 rounded-md flex items-center space-x-1`}
              title={
                isAutoRecording ? "Stop auto-recording" : "Start auto-recording"
              }
            >
              {isAutoRecording ? (
                <>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <Square className="w-4 h-4" />
                  <span>
                    Stop ({Math.floor(recordingDuration / 60)}:
                    {(recordingDuration % 60).toString().padStart(2, "0")})
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Auto Record</span>
                </>
              )}
            </button>
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              } transition-colors duration-200`}
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Live
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
