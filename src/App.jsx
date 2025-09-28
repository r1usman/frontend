// App.js (main entry point)
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
import Protected from "./Components/ProtectRoutes/ProtectRoutes.jsx";

import { UserContext } from "./GlobalContext/UserContext.jsx";
import CourseDetail from "./liveclass/pages/CourseDetail.jsx";
import ProblemPage from "./problemset/ProblemPage";
import ProblemsetPage from "./problemset/Problemset.jsx";
import S_CourseDetail from "./liveclass/pages/S_CourseDetail.jsx";
import S_ShowCourses from "./liveclass/pages/S_ShowCourses.jsx";
import ShowCourses from "./liveclass/pages/ShowCourses.jsx";
import { Dashboard } from "./DashBoard/pages/Dashboard.jsx";
import DefaultLayout from "./DashBoard/components/Layout/DefaultLayout.jsx";



import Dashboard_Instructor from "./Collaboration/Pages/Instructors/DashBoard/Dasboard.jsx"
import CreateAssingment from "./Collaboration/Pages/Instructors/CreateAssingment.jsx"
import Evaluation from "./Collaboration/Pages/Instructors/AssingmentEvaluation/SubmittedAssingments.jsx"
import CollabLayout from "./DashBoard/components/Layout/CollabLayout/CollabLayout.jsx";
import EditAssingments from "./Collaboration/Pages/Instructors/EditAssingments.jsx"

function App() {
  // const { role } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />

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

         <Route path="/Instructor/Assingment"
              element= {<Protected allowed = {["Instructor"]}>
                <CollabLayout />
              </Protected>}
            >
              <Route index element={<Navigate to="Dashboard" />} />
              <Route path='Dashboard' element={<Dashboard_Instructor/>} />
              <Route path='CreateAssingment' element={<CreateAssingment/>} />
              <Route path='Evaluation' element={<Evaluation/>} />
              {/* <Route path='Evaluation/:id' element={<StudentsAssingments/>} /> */}
            </Route>

        <Route path="/EditAssingments/:AssingmentId"
              element= {<Protected allowed = {["Instructor"]}>
                <EditAssingments/>
              </Protected>}
            ></Route>
        
        {/* <Route
          path="/student"
          element={
            <Protected allowed={["Student"]}>
              <Dashboard/>
              <S_ShowCourses />
            </Protected>
          }
        >
          <Route path="Das" element={<UserDashboard />} />
          <Route path="courses/:studentId" element={<UserDashboard />} />
          
        </Route> */}
        {/* <Route
          path="instructor"
          element={
            <Protected allowed={["Instructor"]}>
              <ShowCourses />
            </Protected>
          }
        >
          <Route path="courses" element={<AdminDashboard />} />
        </Route> */}

        {/* <Route
          path="/Dash"
          element={
            role !== "instructor" ? <UserDashboard /> : <AdminDashboard />
          }
        ></Route> */}

        <Route path="/student/courses" element={<S_ShowCourses />} />
        <Route path="/instructor/course/:id" element={<CourseDetail />} />
        <Route path="/student/course/:id" element={<S_CourseDetail />} />

        <Route path="/0/*" element={<PythonCourse />} />

        <Route path="/Mod/*" element={<CompetitionWrapper />} />

        <Route path="problemset" element={<ProblemsetPage />} />
        <Route path="problemset/:id" element={<ProblemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
