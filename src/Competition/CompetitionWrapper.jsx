// Competition/CompetitionWrapper.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { CompetitionProvider } from "./context/CompetitionContext.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";

// Instructor pages (all under /Mod/...)
import InstructorCompetitions from "./pages/instructor/Competitions.jsx";
import CompetitionForm from "./pages/instructor/CompetitionForm.jsx";
import Problems from "./pages/instructor/Problems.jsx";
import ProblemForm from "./pages/instructor/ProblemForm.jsx";
import Students from "./pages/instructor/Students.jsx";
import CompetitionLeaderboard from "./pages/instructor/CompetitionLeaderboard.jsx";

// Student pages (all under /Mod/student/...)
import StudentCompetitions from "./pages/student/StudentCompetitions.jsx";
import StudentCompetition from "./pages/student/StudentCompetition.jsx";
import StudentSubmissions from "./pages/student/StudentSubmissions.jsx";
import StudentLeaderboard from "./pages/student/StudentLeaderboard.jsx";

// “Bouncer” component to protect routes by role
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // 1) Not logged in → redirect to /Mod/login
  if (!user) {
    return <Navigate to="/Mod/login" replace />;
  }
  // 2) Wrong role → redirect to their “home” under /Mod
  if (requiredRole && user.role !== requiredRole) {
    const fallback =
      user.role === "instructor"
        ? "/Mod/competitions"
        : "/Mod/student/competitions";
    return <Navigate to={fallback} replace />;
  }
  // 3) Otherwise render the protected page
  return <>{children}</>;
};

// All competition‐related routes (mounted under /Mod/*)
function CompetitionRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 1) /Mod/login → public login page */}
      <Route path="login" element={<Login />} />

      {/* 2) /Mod exactly → index route */}
      <Route
        index
        element={
          <Navigate
            to={
              user
                ? user.role === "instructor"
                  ? "/Mod/competitions"
                  : "/Mod/student/competitions"
                : "/Mod/login"
            }
            replace
          />
        }
      />

      {/* 3) Instructor routes under /Mod/competitions, /Mod/problems, /Mod/students */}
      <Route
        path="competitions"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <InstructorCompetitions />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="competitions/new"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <CompetitionForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="competitions/:id/edit"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <CompetitionForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="competitions/:id/leaderboard"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <CompetitionLeaderboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="problems"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <Problems />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="problems/new"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <ProblemForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="problems/:id/edit"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <ProblemForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="students"
        element={
          <ProtectedRoute requiredRole="instructor">
            <Layout>
              <Students />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 4) Student routes under /Mod/student/... */}
      <Route
        path="student/competitions"
        element={
          <ProtectedRoute requiredRole="student">
            <Layout>
              <StudentCompetitions />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="student/competitions/:id"
        element={
          <ProtectedRoute requiredRole="student">
            <Layout>
              <StudentCompetition />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="student/competitions/:id/leaderboard"
        element={
          <ProtectedRoute requiredRole="student">
            <Layout>
              <StudentLeaderboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="student/submissions"
        element={
          <ProtectedRoute requiredRole="student">
            <Layout>
              <StudentSubmissions />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 5) Fallback for any unknown /Mod/... path */}
      <Route path="*" element={<Navigate to="/Mod" replace />} />
    </Routes>
  );
}

// Wrap the competition routes with AuthProvider & CompetitionProvider
export default function CompetitionWrapper() {
  return (
    <AuthProvider>
      <CompetitionProvider>
        <CompetitionRoutes />
      </CompetitionProvider>
    </AuthProvider>
  );
}
