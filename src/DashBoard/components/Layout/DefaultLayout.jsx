import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const DefaultLayout = () => {
  return (
    <div className="m-4 px-3">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
