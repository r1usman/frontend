import React from 'react';
import { Mic, MicOff, Video, VideoOff, Hand, PhoneOff } from 'lucide-react';

const VideoCall: React.FC = () => {
  const [micMuted, setMicMuted] = React.useState(false);
  const [videoOff, setVideoOff] = React.useState(false);
  const [handRaised, setHandRaised] = React.useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full aspect-video bg-gray-900">
        {/* Instructor video */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg" 
            alt="Instructor" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Student's self view */}
        <div className="absolute bottom-4 right-4 h-32 w-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
          {videoOff ? (
            <div className="h-full w-full flex flex-col items-center justify-center text-white">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-sm font-semibold">ME</span>
              </div>
              <p className="mt-1 text-xs">You</p>
            </div>
          ) : (
            <img 
              src="https://images.pexels.com/photos/3782226/pexels-photo-3782226.jpeg" 
              alt="You" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Indicators */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {micMuted && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
              <MicOff className="h-3 w-3 mr-1" />
              Muted
            </div>
          )}
          {handRaised && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
              <Hand className="h-3 w-3 mr-1" />
              Hand Raised
            </div>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-center space-x-4">
        <button 
          onClick={() => setMicMuted(!micMuted)}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
            micMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {micMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        
        <button 
          onClick={() => setVideoOff(!videoOff)}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
            videoOff ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {videoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </button>
        
        <button 
          onClick={() => setHandRaised(!handRaised)}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
            handRaised ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Hand className="h-5 w-5" />
        </button>
        
        <button className="h-10 px-4 rounded-full bg-red-600 text-white flex items-center justify-center transition-colors hover:bg-red-700">
          <PhoneOff className="h-5 w-5 mr-1" />
          Leave
        </button>
      </div>
    </div>
  );
};

export default VideoCall;