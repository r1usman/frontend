// App.js (main entry point)
import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";

// Top‐level pages (outside of /Mod)
import LandingPage from "./LandingPage2.0/LandingPage.jsx";
import UserDashboard from "./DashBoard/DisplayDashboard.jsx";
import AdminDashboard from "./DashBoard/AdminDashboard.jsx"
import PythonCourse from "./DefaultCourses/Python/App.jsx";

// Competition wrapper handles everything under /Mod/*
import CompetitionWrapper from "./Competition/CompetitionWrapper.jsx";

import {UserContext} from "./GlobalContext/UserContext.jsx"
import Login from "./Competition/pages/Login.jsx";
import Signup from "./Authentication/Signup.jsx";

function App() {

  const {role} = useContext(UserContext)
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Dash" element={
          role === "student" ?
          <UserDashboard />
          :
          <AdminDashboard />
        } />

        <Route path="/0/*" element={<PythonCourse />} />

        <Route path="/Mod/*" element={<CompetitionWrapper />} />


     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
