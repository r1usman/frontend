// Sidebar.jsx
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../../../GlobalContext/UserContext";
import Modal from "../../Modals/Modal.jsx";

const ACTIVE_CLASS = "bg-gray-700 text-white font-semibold shadow-md";
const INACTIVE_CLASS = "text-gray-400 hover:text-white hover:bg-gray-700";

// NavItem Component
const NavItem = ({ icon, label, path, tooltip }) => (
  <NavLink
    to={path}
    title={tooltip}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive ? ACTIVE_CLASS : INACTIVE_CLASS
      }`
    }
  >
    <div className="w-5 h-5 mr-3">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);


export const Sidebar = () => {
  const { role, User } = useContext(UserContext);
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/Instructor/Dashboard",
      tooltip: "View your dashboard",
    },
    {
      label: "Courses",
      icon: <BookOpen size={18} />,
      path: role === "instructor" ? "/instructor/courses" : "/student/courses",
      tooltip: "Browse your courses",
    },
    {
      label: "Assignment",
      icon: <FileText size={18} />,
      path: "/Instructor/Assingment",
      tooltip: "See your tasks",
    },
    {
      label: "Messages",
      icon: <MessageSquare size={18} />,
      path: "/messages",
      tooltip: "Read messages",
    },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/settings",
      tooltip: "Account settings",
    },
  ];

  const handleLogout = () => {
    navigate("/Login");
  };
  console.log("User.profileImage",User.profileImage);
  
  return (
    <div className="z-50 min-h-screen fixed border w-[20%] font-urbanist border-gray-200/50  flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center mb-7 space-y-3 pt-10">
        {!User.profileImage ? (
          <div className="w-20 h-20 relative rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <FaUser className="w-8 h-8 text-task_primary" />
          </div>
        ) : (
          <img className="w-20 h-20 rounded-full" src={User.profileImage} alt="Profile" />
        )}

        <h1 className="text-[10px] font-medium text-white bg-[#6c63ff] px-3 py-0.5 rounded mt-1">
          {User.status}
        </h1>
        <p className="text-gray-950 font-medium leading-6 mt-3">{User.name}</p>
        <p className="text-[12px] text-gray-500">{User.email}</p>
      </div>

      {/* Navigation Items */}
    {/* Navigation Items */}
<div className="flex-1 flex flex-col space-y-2">
  {navItems.map((item, index) => (
    <NavLink
      key={index}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer transition-colors duration-200 ${
          isActive ? "bg-purple-600/15 border-r-4 border-purple-600" : "" 
        }`
      }
    >
      <div className="text-xl">{item.icon}</div>
      <div>{item.label}</div>
    </NavLink>
  ))}
</div>


      {/* Logout Button */}
      <div
        onClick={() => setConfirmLogout(true)}
        className="flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer hover:bg-red-600/15 hover:text-red-600 hover:border-red-600 transition-all ease-in duration-150"
      >
        <div className="text-xl">
          <LogOut />
        </div>
        <div>Logout</div>
      </div>

      {/* Logout Modal */}
      <Modal
        onClose={() => setConfirmLogout(false)}
        isOpen={confirmLogout}
        type="small"
        title="LogOut"
      >
        <div className="font-urbanist text-black px-6 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3 mt-2">
              <LogOut className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-black">Confirm Logout</h3>
            </div>
            <p className="text-md text-center">
              Are you sure you want to <span className="font-semibold text-red-600">log out</span>?
            </p>
            <p className="text-xs text-slate-700 mt-[5px]">
              You’ll need to log in again to access your account.
            </p>
          </div>
          <div className="flex w-full border items-center justify-center gap-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
