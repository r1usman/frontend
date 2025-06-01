// App.js (main entry point)
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

// Top‐level pages (outside of /Mod)
import LandingPage from "./LandingPage2.0/LandingPage.jsx";
import UserDashboard from "./DashBoard/DisplayDashboard.jsx";
import AdminDashboard from "./DashBoard/AdminDashboard.jsx";
// Main App.js (entry point for the app)
import "./index.css"; // Your global CSS
import DisplayDashboard from "./DashBoard/DisplayDashboard.jsx";
import PythonCourse from "./DefaultCourses/Python/App.jsx";

// Competition wrapper handles everything under /Mod/*
import CompetitionWrapper from "./Competition/CompetitionWrapper.jsx";

import { UserContext } from "./GlobalContext/UserContext.jsx";
import Login from "./Authentication/Login.jsx";
import Signup from "./Authentication/Signup.jsx";
import ForgetPassword from "./Authentication/ForgetPassword.jsx";

import { StudentsSection } from "./managecourse/dashboard/StudentsSection";
import { DashboardLayout } from "./managecourse/layouts/DashboardLayout";
import AssignmentHistory from "./managecourse/pages/AssignmentHistory";
import ContentBox from "./managecourse/pages/ContentBox";
import TestHistory from "./managecourse/pages/TestHistory";
import { DashboardLayout as StudentDL } from "./student manage/layouts/DashboardLayout";
import StudentAH from "./student manage/pages/AssignmentHistory";
import StudentCB from "./student manage/pages/ContentBox";
import StudentTH from "./student manage/pages/TestHistory";
import { CourseManagement } from "./managecourse/pages/CourseManagement";
import EditCoursePage from "./managecourse/pages/EditCoursePage";

function App() {
  const { role } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route
          path="/Dash"
          element={role === "student" ? <UserDashboard /> : <AdminDashboard />}
        />

        <Route path="/0/*" element={<PythonCourse />} />

        <Route path="/Mod/*" element={<CompetitionWrapper />} />
        <Route path="ic" element={<DashboardLayout />}>
          <Route index element={<CourseManagement />} />
          <Route path="edit" element={<EditCoursePage />} />
          <Route path="students" element={<StudentsSection />} />
          <Route path="curriculum" element={<ContentBox />} />
          <Route path="test" element={<TestHistory />} />
          <Route path="assign" element={<AssignmentHistory />} />
        </Route>

        <Route path="sc" element={<StudentDL />}>
          <Route index element={<StudentCB />} />
          <Route path="test" element={<TestHistory />} />
          <Route path="assign" element={<AssignmentHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
