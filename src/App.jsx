// App.js (main entry point)
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


// Top‐level pages (outside of /Mod)
import AdminDashboard from "./DashBoard/AdminDashboard.jsx";
import UserDashboard from "./DashBoard/DisplayDashboard.jsx";
import LandingPage from "./LandingPage2.0/LandingPage.jsx";
// Main App.js (entry point for the app)
import PythonCourse from "./DefaultCourses/Python/App.jsx";
import "./index.css"; // Your global CSS
import { ToastContainer } from 'react-toastify' 

// Competition wrapper handles everything under /Mod/*
import CompetitionWrapper from "./Competition/CompetitionWrapper.jsx";

import ForgetPassword from "./Authentication/ForgetPassword.jsx";
import Login from "./Authentication/Login.jsx";
import Signup from "./Authentication/Signup.jsx";
import Protected from "./Components/ProtectRoutes/ProtectRoutes.jsx";

import { HMSRoomProvider } from "@100mslive/react-sdk";
import DefaultLayout from "./DashBoard/components/Layout/DefaultLayout.jsx";
import LiveClass from "./liveclass/conferance/LiveClass.jsx";
import CourseDetail from "./liveclass/pages/CourseDetail.jsx";
import S_CourseDetail from "./liveclass/pages/S_CourseDetail.jsx";
import S_ShowCourses from "./liveclass/pages/S_ShowCourses.jsx";
import ProblemPage from "./problemset/ProblemPage";
import ProblemsetPage from "./problemset/Problemset.jsx";

import Evaluation from "./Collaboration/Pages/Instructors/AssingmentEvaluation/SubmittedAssingments.jsx";
import CreateAssingment from "./Collaboration/Pages/Instructors/CreateAssingment.jsx";
import Dashboard_Instructor from "./Collaboration/Pages/Instructors/DashBoard/Dasboard.jsx";
import EditAssingments from "./Collaboration/Pages/Instructors/EditAssingments.jsx";
import CollabLayout from "./DashBoard/components/Layout/CollabLayout/CollabLayout.jsx";

import Dashboard_Student from "./Collaboration/Pages/Students/DashBoard/Dasboard.jsx";
import MyPerformance from "./Collaboration/Pages/Students/MyPerformance/MyPerformance.jsx";
import EditAssingment from "./Collaboration/Pages/Students/EditAssingment/EditAssingment.jsx";
import StudentsAssingments from "./Collaboration/Pages/Instructors/AssingmentEvaluation/StudentsAssingments.jsx";
import EvaluationPage from "./Collaboration/Pages/Instructors/AssingmentEvaluation/EvaluationPage.jsx";


// Code Competiton

import CompeteLayout from "./DashBoard/components/Layout/CompeteLayout/CompeteLayout.jsx"
import Dashboard from "./CodeCompetition/Pages/Instructor/Dashboard.jsx"
import CreateChallenge from "./CodeCompetition/Pages/Instructor/CreateChallenge.jsx"
import ManagaCometition from "./CodeCompetition/Pages/Instructor/ManagaCometition.jsx"
import EditChallenge from "./CodeCompetition/Pages/Instructor/EditChallenge.jsx"
import NoFound from "./Collaboration/Components/NotFound/NotFound.jsx";
import StudentDashboard from "./CodeCompetition/Pages/Students/Dashboard.jsx"
import MyPerformanceStudent from "./CodeCompetition/Pages/Students/MyPerformance.jsx"
import CodeingEnvironment from "./CodeCompetition/Pages/Students/CodeingEnvironment.jsx"
import Leaderboard from "./CodeCompetition/Pages/Students/Leaderboard.jsx"

import SubmissionsPage from './Submissions/SubmissionsPage';
import SubmissionDetail from './Submissions/SubmissionDetail';


function App() {
  // const { role } = useContext(UserContext);
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />

          {/* Student */}
          <Route
            path="/Student"
            element={
              <Protected allowed={["Student"]}>
                <DefaultLayout />
              </Protected>
            }
          >
            <Route path="Dashboard" element={<UserDashboard />} />
            <Route path="courses/:studentId" element={<UserDashboard />} />
          </Route>

          {/* Instructor */}
          <Route
            path="/Instructor"
            element={
              <Protected allowed={["Instructor"]}>
                <DefaultLayout />
              </Protected>
            }
          >
            <Route path="Dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Collaboration instructor */}
          <Route
            path="/Instructor/Assingment"
            element={
              <Protected allowed={["Instructor"]}>
                <CollabLayout />
              </Protected>
            }
          >
            <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<Dashboard_Instructor />} />
            <Route path="CreateAssingment" element={<CreateAssingment />} />
            <Route path="Evaluation" element={<Evaluation />} />
            <Route path="Evaluation/:id" element={<StudentsAssingments />} />
          </Route>

          <Route
            path="/EditAssingments/:AssingmentId"
            element={
              <Protected allowed={["Instructor"]}>
                <EditAssingments />
              </Protected>
            }
          />
          <Route
            path="/EvaluationPanel/:SubmissionID"
            element={
              <Protected allowed={["Instructor"]}>
                <EvaluationPage />
              </Protected>
            }
          />

          {/* Collaboration student */}
          <Route
            path="/Student/Assingment"
            element={
              <Protected allowed={["Student"]}>
                <CollabLayout />
              </Protected>
            }
          >
            <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<Dashboard_Student />} />
            <Route path="Performance" element={<MyPerformance />} />
          </Route>
          <Route
            path="/CollaborationPannel/:AssingmentId"
            element={
              <Protected allowed={["Student"]}>
                <EditAssingment />
              </Protected>
            }
          />

          {/* Competitions */}
          <Route
            path="/Instructor/Competition"
            element={
              <Protected allowed={["Instructor"]}>
                <CompeteLayout />
              </Protected>
            }
          >
            <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Create" element={<CreateChallenge />} />
            <Route path="Manage" element={<ManagaCometition />} />
            <Route path="Leaderboard" element={<Leaderboard />} />
          </Route>
          <Route path="/Instructor/Challenge/:ChallengeID" element={<EditChallenge />} />

          <Route
            path="/Student/Competition"
            element={
              <Protected allowed={["Student"]}>
                <CompeteLayout />
              </Protected>
            }
          >
            <Route path="Dashboard" element={<StudentDashboard />} />
            <Route path="Performance" element={<MyPerformanceStudent />} />
            <Route path="Leaderboard" element={<Leaderboard />} />
          </Route>
          <Route path="/Student/Editor/:ChallengeID" element={<CodeingEnvironment />} />

          {/* Courses & live */}
          <Route path="/student/courses" element={<S_ShowCourses />} />
          <Route path="/instructor/course/:id" element={<CourseDetail />} />
          <Route path="/student/course/:id" element={<S_CourseDetail />} />
          <Route path="/instructor/live" element={<LiveClass />} />

          {/* Default course */}
          <Route path="/0/*" element={<PythonCourse />} />

          {/* Competition wrapper */}
          <Route path="/Mod/*" element={<CompetitionWrapper />} />

          {/* Problemset */}
          <Route path="problemset" element={<ProblemsetPage />} />
          <Route path="problemset/:id" element={<ProblemPage />} />

          {/* In your Routes */}
          <Route path="/singleProblems/submissions" element={<SubmissionsPage />} />
          <Route path="/singleProblems/submissions/:id" element={<SubmissionDetail />} />
          <Route path="/problems/:problemId/submissions" element={<SubmissionsPage />} />


          {/* Not Found */}
          <Route path="*" element={<NoFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="mt-20 mr-7"
      />
    </>
  )
}

export default App;
