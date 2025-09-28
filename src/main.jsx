import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./GlobalContext/UserContext.jsx"
import  {SocketProvider} from "./Collaboration/ContextApi/SocketContext.jsx"
createRoot(document.getElementById("root")).render(
  // <StrictMode>
      <SocketProvider>
        <UserProvider>
            <App />
        </UserProvider>
      </SocketProvider>

  
  // </StrictMode>
);
