import React, { createContext, useContext, useState } from 'react';
import { currentUser as defaultUser } from '../data/mockData';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const login = (username, role) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      username,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = () => {
    if (user) {
      setUser({
        ...user,
        role: user.role === 'instructor' ? 'student' : 'instructor',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
