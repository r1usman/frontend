// App.js (main entry point)
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

// Top‐level pages (outside of /Mod)
import AdminDashboard from "./DashBoard/AdminDashboard.jsx";
import UserDashboard from "./DashBoard/DisplayDashboard.jsx";
import LandingPage from "./LandingPage2.0/LandingPage.jsx";
// Main App.js (entry point for the app)
import PythonCourse from "./DefaultCourses/Python/App.jsx";
import "./index.css"; // Your global CSS

// Competition wrapper handles everything under /Mod/*
import CompetitionWrapper from "./Competition/CompetitionWrapper.jsx";

import ForgetPassword from "./Authentication/ForgetPassword.jsx";
import Login from "./Authentication/Login.jsx";
import Signup from "./Authentication/Signup.jsx";
import { UserContext } from "./GlobalContext/UserContext.jsx";

import InstructorInterface from "./liveclass/pages/InstructorInterface.js";
import StudentInterface from "./liveclass/pages/StudentInterface.js";
import { StudentsSection } from "./managecourse/dashboard/StudentsSection";
import { DashboardLayout } from "./managecourse/layouts/DashboardLayout";
import AssignmentHistory from "./managecourse/pages/AssignmentHistory";
import ContentBox from "./managecourse/pages/ContentBox";
import { CourseManagement } from "./managecourse/pages/CourseManagement";
import EditCoursePage from "./managecourse/pages/EditCoursePage";
import TestHistory from "./managecourse/pages/TestHistory";
import StudentCourseView from "./Student manage/pages/StudentCourseView.js";
import ProblemsetPage from "./problemset/Problemset.jsx";

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

        <Route path="sc" element={<StudentCourseView />} />
        <Route path="problemset" element={<ProblemsetPage />} />

        <Route
          path="/lc"
          element={
            role === "student" ? <StudentInterface /> : <InstructorInterface />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
