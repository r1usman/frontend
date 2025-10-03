import { useState, useRef, useEffect } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectLocalAudioTrackID,
  selectIsLocalAudioEnabled,
} from "@100mslive/react-sdk";
import {
  Mic,
  Square,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useResources } from "./ResourcesContext";

export function AudioRecorder() {
  const hmsActions = useHMSActions();
  const localAudioTrackId = useHMSStore(selectLocalAudioTrackID);
  const isMicOn = useHMSStore(selectIsLocalAudioEnabled);
  const { addResources } = useResources();
  const [recordingState, setRecordingState] = useState("idle");
  const mediaRecorderRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error

  const toggleRecording = async () => {
    if (recordingState === "recording") {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      setRecordingState("starting");
      setUploadStatus("idle");

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
        setRecordingState("idle");
        setRecordingDuration(0);
      };

      mediaRecorderRef.current.start(1000);
      setRecordingState("recording");
    } catch (error) {
      console.error("Recording failed to start:", error);
      setRecordingState("idle");
      setUploadStatus("error");
    }
  };

  const stopRecording = () => {
    setRecordingState("stopping");
    mediaRecorderRef.current?.stop();
  };

  const uploadRecording = async (blob) => {
    try {
      setUploadStatus("uploading");
      const formData = new FormData();
      formData.append("file", blob, `recording-${Date.now()}.webm`);

      const response = await fetch("http://localhost:3000/courses/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Upload successful:", result);

      // Add resources to context
      if (result.updResults) {
        console.log("Adding resources to context:", result);
        addResources(result.updResults);
      }

      setUploadStatus("success");

      // Reset status after 3 seconds
      setTimeout(() => setUploadStatus("idle"), 3000);
      return result.updResults;
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      throw error;
    }
  };

  // Recording duration timer
  useEffect(() => {
    let interval;
    if (recordingState === "recording") {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recordingState]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
      <div className="flex items-center justify-between">
        {/* Recording Status */}
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${
              recordingState === "recording"
                ? "bg-red-500"
                : recordingState === "starting" || recordingState === "stopping"
                ? "bg-yellow-500"
                : "bg-gray-700"
            }`}
          />

          <div>
            <p className="text-sm font-medium text-gray-100">
              {recordingState === "idle" && "Ready to Record"}
              {recordingState === "starting" && "Preparing..."}
              {recordingState === "recording" &&
                `Recording - ${formatDuration(recordingDuration)}`}
              {recordingState === "stopping" && "Saving..."}
            </p>

            {recordingState === "recording" && (
              <p className="text-xs text-gray-400">
                Click stop to save recording
              </p>
            )}
          </div>
        </div>

        {/* Upload Status */}
        {uploadStatus !== "idle" && (
          <div className="flex items-center space-x-2">
            {uploadStatus === "uploading" && (
              <>
                <Loader2 className="w-4 h-4 text-gray-300 animate-spin" />
                <span className="text-sm text-gray-300">Uploading...</span>
              </>
            )}
            {uploadStatus === "success" && (
              <>
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Uploaded!</span>
              </>
            )}
            {uploadStatus === "error" && (
              <>
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">Upload failed</span>
              </>
            )}
          </div>
        )}

        {/* Record Button */}
        <button
          onClick={toggleRecording}
          disabled={
            recordingState === "starting" || recordingState === "stopping"
          }
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            recordingState === "recording"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-100 hover:bg-white text-gray-900"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {recordingState === "recording" ? (
            <>
              <Square className="w-4 h-4" />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>Start Recording</span>
            </>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {recordingState === "recording" && (
        <div className="mt-3">
          <div className="w-full bg-gray-800 rounded-full h-1">
            <div
              className="bg-red-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${(recordingDuration % 60) * 1.67}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
