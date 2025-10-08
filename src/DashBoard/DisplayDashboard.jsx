import React from "react";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";

function DisplayDashboard() {
  return (
    <div className="min-h-screen  text-gray-800 font-sans">
      <Dashboard />
    </div>
  );
}

export default DisplayDashboard;
