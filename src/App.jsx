// Main App.js (entry point for the app)
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Make sure to import 'react-router-dom' properly
import "./index.css"; // Your global CSS
import DisplayDashboard from "./DashBoard/DisplayDashboard.jsx";
import PythonCourse from "./DefaultCourses/Python/App.jsx";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayDashboard />} />
        <Route path="/0/*" element={<PythonCourse />} />

        <Route index element={<DashboardLayout />} />
        <Route path="ic" element={<DashboardLayout />}>
          <Route path="" element={<CourseManagement />} />
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
