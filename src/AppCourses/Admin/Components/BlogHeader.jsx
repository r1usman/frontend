import React, { useContext, useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { UserContext } from '../../../GlobalContext/UserContext';
import AxiosInstance from '../../../Utility/AxiosInstances';
import { FaRegFileAlt, FaRegCommentDots, FaCogs, FaBell } from "react-icons/fa";
import SearchBarPopup from './SearchBar';
import SearchBar from './SearchBar';

export const BlogHeader = ({course}) => {
  const { User } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await AxiosInstance.get('/Notifications');
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMarkAllRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    for (const n of unreadNotifications) {
      try {
        await AxiosInstance.put(`/Notifications/${n._id}/read`);
      } catch (err) {
        console.error(err);
      }
    }
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "Assignment":
        return <FaRegFileAlt className="text-[#6c63ff]" size={20} />;
      case "Message":
        return <FaRegCommentDots className="text-gray-600" size={20} />;
      case "System":
        return <FaCogs className="text-gray-600" size={20} />;
      default:
        return <FaBell className="text-gray-600" size={20} />;
    }
  };

  const userName = User?.name || 'User';

  return (
    <header className=" flex justify-between items-center ">
      <div className='flex gap-2 items-end'>
        <h2 className="text-sm text-gray-500">Welcome back</h2>
        <h1 className="text-xl font-semibold">{userName}</h1>
      </div>

      <SearchBar course={course}/>


      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500">{formattedDate}</div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 right-1 size-4 bg-[#6c63ff] text-white text-xs font-medium rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showDropdown && (
            <div className="absolute -right-1 mt-6 w-96 bg-white border border-gray-200 shadow-lg rounded-lg z-50 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-500">
                  You have {unreadCount} new {unreadCount === 1 ? 'notification' : 'notifications'}.
                </p>
              </div>
              <div className="flex-1 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-gray-500 text-sm">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`flex items-start gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition ${!n.read ? 'bg-purple-50' : ''}`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-lg">
                        {getNotificationIcon(n.type)}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${!n.read ? '' : 'text-gray-800'}`}>{n.title}</p>
                        <p className="text-sm text-gray-600">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {unreadCount > 0 && (
                <div className="p-3 ">
                  <button
                    onClick={handleMarkAllRead}
                    className="w-full text-center text-sm text-gray-600 hover:text-purple-600 py-2 rounded-md border border-gray-300 hover:border-purple-400 transition"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-gray-700 text-sm font-medium hidden sm:block">{userName}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              } hidden sm:block`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-4  w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Settings
              </a>
              <hr className="my-1" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
