// Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Code, Trophy, Users, Clock, LogOut, Home } from 'lucide-react';
import { UserContext } from '../../GlobalContext/UserContext';

export const Sidebar = ({ user }) => {
  const { role } = useContext(UserContext);
  const navigate = useNavigate();

  const BackHome = () => {
    navigate('/Dash');
  };

  // Build nav items array based on role
  const navItems =
    role === 'instructor'
      ? [
          { label: 'Home', icon: <Home size={18} />, path: '/Dash' },
          { label: 'Competitions', icon: <Trophy size={18} />, path: '/Mod/competitions' },
          { label: 'Problems', icon: <Code size={18} />, path: '/Mod/problems' },
          { label: 'Students', icon: <Users size={18} />, path: '/Mod/students' },
        ]
      : [
          { label: 'Home', icon: <Home size={18} />, path: '/Dash' },
          {
            label: 'Competitions',
            icon: <Trophy size={18} />,
            path: '/Mod/student/competitions',
          },
          {
            label: 'My Submissions',
            icon: <Clock size={18} />,
            path: '/Mod/student/submissions',
          },
        ];

  // Base classes that always apply to each link
  const baseClasses =
    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200';

  return (
    <aside className="h-screen w-64 fixed bg-gray-900 text-white flex flex-col">
      {/* Logo / App Title */}
      <div className="px-4 py-6 flex items-center">
        <div className="bg-amber-500 rounded-lg p-2 mr-2">
          <span className="font-bold text-gray-900">St</span>
        </div>
        <span className="font-bold text-xl">studify.</span>
      </div>

      {/* User Info Card */}
      <div className="p-4 mb-4 space-y-2">
        <div className="bg-indigo-800 rounded-lg p-3 flex gap-2">
          <span className="text-sm font-semibold">Good afternoon, Sarah 👋</span>

        </div>
        
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2 text-sm">
          {navItems.map(({ label, icon, path }, idx) => (
            <li key={idx}>
              <NavLink
                to={path}
                end
                // React Router v6 will pass { isActive } into this function
                className={({ isActive }) =>
                  isActive
                    ? `${baseClasses} bg-gray-800 text-white`
                    : `${baseClasses} text-gray-300 hover:bg-gray-800 hover:text-white`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button at the Bottom */}
      <div className="px-4 py-3 border-t border-indigo-800">
        <button className="flex items-center w-full text-gray-300 hover:text-white transition-colors duration-200">
          <LogOut size={18} className="mr-3" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};
