import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LandingPage from "./landingPage/landingPage.jsx";
import DisplayDashboard from "./DashBoard/DisplayDashboard.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Dash" element={<DisplayDashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
