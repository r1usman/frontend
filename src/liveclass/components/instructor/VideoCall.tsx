import React from 'react';
import { Mic, MicOff, Video, VideoOff, Users, PhoneOff } from 'lucide-react';

const VideoCall: React.FC = () => {
  const [micMuted, setMicMuted] = React.useState(false);
  const [videoOff, setVideoOff] = React.useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full aspect-video bg-gray-900">
        {/* Main video */}
        <div className="absolute inset-0 flex items-center justify-center">
          {videoOff ? (
            <div className="flex flex-col items-center text-white">
              <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-3xl font-semibold">JD</span>
              </div>
              <p className="mt-2 text-lg">John Doe (You)</p>
            </div>
          ) : (
            <img 
              src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg" 
              alt="Instructor" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Participant thumbnails */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="h-20 w-28 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg" 
              alt="Student 1" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-20 w-28 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg" 
              alt="Student 2" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-20 w-28 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center text-white">
              <Users className="h-6 w-6 mx-auto" />
              <span className="text-xs">+5</span>
            </div>
          </div>
        </div>
        
        {/* Mic muted indicator */}
        {micMuted && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <MicOff className="h-3 w-3 mr-1" />
            Muted
          </div>
        )}
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
        
        <button className="h-10 px-4 rounded-full bg-red-600 text-white flex items-center justify-center transition-colors hover:bg-red-700">
          <PhoneOff className="h-5 w-5 mr-1" />
          End Class
        </button>
      </div>
    </div>
  );
};

export default VideoCall;