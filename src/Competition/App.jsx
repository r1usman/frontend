import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CompetitionProvider } from './context/CompetitionContext';
import Layout from './components/Layout';
import Login from './pages/Login';

// Instructor pages
import InstructorCompetitions from './pages/instructor/Competitions';
import CompetitionForm from './pages/instructor/CompetitionForm';
import Problems from './pages/instructor/Problems';
import ProblemForm from './pages/instructor/ProblemForm';
import Students from './pages/instructor/Students';
import CompetitionLeaderboard from './pages/instructor/CompetitionLeaderboard';

// Student pages
import StudentCompetitions from './pages/student/StudentCompetitions';
import StudentCompetition from './pages/student/StudentCompetition';
import StudentSubmissions from './pages/student/StudentSubmissions';
import StudentLeaderboard from './pages/student/StudentLeaderboard';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <Navigate
        to={user.role === 'instructor' ? '/competitions' : '/student/competitions'}
        replace
      />
    );
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
   <Routes>
      <Route path="/Check" element={<Navigate to={user ? (user.role === 'instructor' ? '/competitions' : '/student/competitions') : '/login'} replace />} />
      <Route path="/competitions" element={<ProtectedRoute requiredRole="instructor"><Layout><InstructorCompetitions /></Layout></ProtectedRoute>} />
      <Route path="/competitions/new" element={<ProtectedRoute requiredRole="instructor"><Layout><CompetitionForm /></Layout></ProtectedRoute>} />
      <Route path="/competitions/:id/edit" element={<ProtectedRoute requiredRole="instructor"><Layout><CompetitionForm /></Layout></ProtectedRoute>} />
      <Route path="/competitions/:id/leaderboard" element={<ProtectedRoute requiredRole="instructor"><Layout><CompetitionLeaderboard /></Layout></ProtectedRoute>} />
      <Route path="/problems" element={<ProtectedRoute requiredRole="instructor"><Layout><Problems /></Layout></ProtectedRoute>} />
      <Route path="/problems/new" element={<ProtectedRoute requiredRole="instructor"><Layout><ProblemForm /></Layout></ProtectedRoute>} />
      <Route path="/problems/:id/edit" element={<ProtectedRoute requiredRole="instructor"><Layout><ProblemForm /></Layout></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute requiredRole="instructor"><Layout><Students /></Layout></ProtectedRoute>} />
      <Route path="/student/competitions" element={<ProtectedRoute requiredRole="student"><Layout><StudentCompetitions /></Layout></ProtectedRoute>} />
      <Route path="/student/competitions/:id" element={<ProtectedRoute requiredRole="student"><Layout><StudentCompetition /></Layout></ProtectedRoute>} />
      <Route path="/student/competitions/:id/leaderboard" element={<ProtectedRoute requiredRole="student"><Layout><StudentLeaderboard /></Layout></ProtectedRoute>} />
      <Route path="/student/submissions" element={<ProtectedRoute requiredRole="student"><Layout><StudentSubmissions /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CompetitionProvider>
          <AppRoutes />
        </CompetitionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
