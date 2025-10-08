import { useEffect, useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { Loader2 } from "lucide-react";

function LiveClassAutoJoin() {
  const hmsActions = useHMSActions();
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const joinRoomAsync = async () => {
      setIsConnecting(true);
      const name = "jon";
      // vft-hqzi-alj
      const roomCode = "vft-hqzi-alj";
      // const roomCode = "ajs-hogy-ukz";
      try {
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        if (isMounted) {
          await hmsActions.join({ name, authToken });
          setIsConnecting(false);
        }
      } catch (e) {
        if (isMounted) {
          setError("Could not connect to conference.");
          setIsConnecting(false);
        }
      }
    };
    joinRoomAsync();
    return () => {
      isMounted = false;
    };
  }, [hmsActions]);

  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <span className="ml-4 text-lg text-blue-600">
          Connecting to conference...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          {/* Optionally render JoinForm for manual join */}
        </div>
      </div>
    );
  }

  return null;
}

export default LiveClassAutoJoin;
