import React from "react";
import { CourseOverview } from "../managecourse/dashboard/CourseOverview";
import { Layout } from "./components/Layout";

const AdminDashboard = () => {
  return (
    <Layout>
      <CourseOverview />
    </Layout>
  );
};

export default AdminDashboard;
