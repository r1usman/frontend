import { useEffect, useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { User, Hash, LogIn, Loader2 } from "lucide-react";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
  });
  const [isJoining, setIsJoining] = useState(false);

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsJoining(true);
    const name = "jon";
    // const roomCode = "ajs-hogy-ukz";
    const roomCode = "ajs-hogy-ukz";
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
    try {
      // console.log(name);
      await hmsActions.join({ name, authToken });
    } catch (e) {
      console.error(e);
    }
    // console.log(inputValues);
  };

  // useEffect(() => {
  //   let isMounted = true;

  //   const joinRoomAsync = async () => {
  //     const name = "jon";
  //     // const roomCode = "ajs-hogy-ukz";
  //     const roomCode = "ajs-hogy-ukz";
  //     const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
  //     try {
  //       if (isMounted) {
  //         // console.log(name);
  //         await hmsActions.join({ name, authToken });
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   joinRoomAsync();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Join Live Class
            </h2>
            <p className="text-blue-100 text-sm">
              Enter your details to join the session
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    required
                    value={"jon"}
                    onChange={handleInputChange}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Room Code Input */}
              <div className="relative">
                <label
                  htmlFor="room-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Room Code
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="room-code"
                    type="text"
                    name="roomCode"
                    placeholder="Enter room code"
                    defaultValue={"hkq-gffw-ogo"}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button
              type="submit"
              disabled={isJoining}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isJoining ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Join Session</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By joining, you agree to our terms of service and privacy policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinForm;
