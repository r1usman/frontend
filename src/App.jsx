// App.js (main entry point)
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import DefaultLayout from "./DashBoard/components/Layout/DefaultLayout.jsx";
import { UserContext } from "./GlobalContext/UserContext.jsx";
import CourseDetail from "./liveclass/pages/CourseDetail.jsx";
import ProblemPage from "./problemset/ProblemPage";
import ProblemsetPage from "./problemset/Problemset.jsx";
import S_CourseDetail from "./liveclass/pages/S_CourseDetail.jsx";
import S_ShowCourses from "./liveclass/pages/S_ShowCourses.jsx";
import ShowCourses from "./liveclass/pages/ShowCourses.jsx";
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
          path="/student"
          element={
            <Protected allowed={["Student"]}>
              <S_ShowCourses />
            </Protected>
          }
        >
          <Route path="courses/:studentId" element={<UserDashboard />} />
        </Route>
        <Route
          path="instructor"
          element={
            <Protected allowed={["Instructor"]}>
              <ShowCourses />
            </Protected>
          }
        >
          <Route path="courses" element={<AdminDashboard />} />
        </Route>

        {/* <Route
          path="/Dash"
          element={
            role !== "instructor" ? <UserDashboard /> : <AdminDashboard />
          }
        ></Route> */}
        <Route path="/instructor/courses" element={<ShowCourses />} />
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
