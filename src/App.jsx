// Main App.js (entry point for the app)
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Make sure to import 'react-router-dom' properly
import "./index.css"; // Your global CSS
import DisplayDashboard from "./DashBoard/DisplayDashboard.jsx";
import PythonCourse from "./DefaultCourses/Python/App.jsx";

import { StudentsSection } from "./managecourse/dashboard/StudentsSection";
import { DashboardLayout } from "./managecourse/layouts/DashboardLayout";
import AssignmentHistory from "./managecourse/pages/AssignmentHistory";
import ContentBox from "./managecourse/pages/ContentBox";
import { CourseManagement } from "./managecourse/pages/CourseManagement";
import EditCoursePage from "./managecourse/pages/EditCoursePage";
import TestHistory from "./managecourse/pages/TestHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dash" element={<DisplayDashboard />} />
        <Route path="/0/*" element={<PythonCourse />} />
        <Route path="course" element={<DashboardLayout />}>
          <Route index element={<CourseManagement />} />
          <Route path="edit" element={<EditCoursePage />} />
          <Route path="students" element={<StudentsSection />} />
          <Route path="curriculum" element={<ContentBox />} />
          <Route path="test" element={<TestHistory />} />
          <Route path="assign" element={<AssignmentHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
