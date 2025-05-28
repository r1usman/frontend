import React from 'react';
import  {Sidebar}  from './Sidebar';
import  {Header}  from './Header';

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};
