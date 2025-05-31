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
// Main App.js (entry point for the app)
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Make sure to import 'react-router-dom' properly
import "./index.css"; // Your global CSS
import DisplayDashboard from "./DashBoard/DisplayDashboard.jsx";
import PythonCourse from "./DefaultCourses/Python/App.jsx";

// Competition wrapper handles everything under /Mod/*
import CompetitionWrapper from "./Competition/CompetitionWrapper.jsx";

import {UserContext} from "./GlobalContext/UserContext.jsx"
import Login from "./Competition/pages/Login.jsx";
import Signup from "./Authentication/Signup.jsx";

import { StudentsSection } from "./managecourse/dashboard/StudentsSection";
import { DashboardLayout } from "./managecourse/layouts/DashboardLayout";
import AssignmentHistory from "./managecourse/pages/AssignmentHistory";
import ContentBox from "./managecourse/pages/ContentBox";
import { CourseManagement } from "./managecourse/pages/CourseManagement";
import EditCoursePage from "./managecourse/pages/EditCoursePage";
import TestHistory from "./managecourse/pages/TestHistory";

import Problemset from "./problemset/Problemset";

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
        <Route path="course" element={<DashboardLayout />}>
          <Route index element={<CourseManagement />} />
          <Route path="edit" element={<EditCoursePage />} />
          <Route path="students" element={<StudentsSection />} />
          <Route path="curriculum" element={<ContentBox />} />
          <Route path="test" element={<TestHistory />} />
          <Route path="assign" element={<AssignmentHistory />} />
        </Route>

        <Route path="/problemset" element={<Problemset />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
