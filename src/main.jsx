import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./GlobalContext/UserContext.jsx";
import SearchProvider from "./AppCourses/ContextApi/BlogContext.jsx"
import { SocketProvider } from "./Collaboration/ContextApi/SocketContext.jsx";
import { HMSRoomProvider } from "@100mslive/react-sdk";
// import { HMSRoomProvider } from "@100mslive/react-sdk";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <SocketProvider>
      <UserProvider>
        <SearchProvider>
          <HMSRoomProvider>
            <App />
          </HMSRoomProvider>
        </SearchProvider>
      </UserProvider>
    </SocketProvider>
  // </StrictMode>
);
