import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Outlet } from "react-router";
import Header from "./Header";

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="  min-h-screen bg-gray-50">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileNav onOpenSidebar={() => setSidebarOpen(true)} />

      <div className="lg:pl-72">
        <main className=" px-8 pl-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
