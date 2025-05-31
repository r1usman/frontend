import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code, Trophy, Users, Clock, LogOut, ToggleLeft } from 'lucide-react';
import { Header } from '../../GlobalComponents/Header';
import {Sidebar} from "./Sidebar.jsx"
const Layout = ({ children }) => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
     <Sidebar/>  
      <div className="flex-1 overflow-auto ml-64">
          <Header />
          <main className="p-6 md:p-8">{children}</main>
      </div>  
   
      
    </div>
  );
};

export default Layout;
