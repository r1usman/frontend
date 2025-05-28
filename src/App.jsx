// Main App.js (entry point for the app)
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Make sure to import 'react-router-dom' properly
import "./index.css"; // Your global CSS
import LandingPage from "./landingPage/landingPage.jsx";
import DisplayDashboard from "./DashBoard/DisplayDashboard.jsx";
import PythonCourse from "./DefaultCourses/Python/App.jsx";

function App() {
  return (
    <BrowserRouter>  {/* BrowserRouter wraps the entire app to enable routing */}
      <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dash" element={<DisplayDashboard />} />
        <Route path="/0/*" element={<PythonCourse />} /> {/* Use '*' to allow nested routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
