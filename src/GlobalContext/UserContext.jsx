import React, { createContext, useState } from "react";

export const UserContext = createContext({
  role: null,         
  loginAs: (newRole) => {},
  logout: () => {},       
});


// 2) Provider component that wraps your app (or part of it)
export function UserProvider({ children }) {
  const [role, setRole] = useState("instructor");

  // Function to set role to "student" or "instructor"
  const loginAs = (newRole) => {
    if (newRole === "student" || newRole === "instructor") {
      setRole(newRole);
    } else {
      console.warn(`Invalid role "${newRole}". Must be "student" or "instructor".`);
    }
  };

  // Function to clear role (log out)
  const logout = () => {
    setRole(null);
  };

  // The context value we supply to any descendants
  const value = {
    role,
    loginAs,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
