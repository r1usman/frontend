import React from "react";
import { Outlet } from "react-router-dom";
import CollabSideBar from "../CollabSideBar";
import { Header } from "../Header";

const CollabLayout = () => {
  return (
     <div className='flex min-h-screen'>
         <div className='w-[20%] '>
          <CollabSideBar/>
        </div>
        <div className='w-[80%] '>
          <Header/>
          <div className='m-4 px-3 '><Outlet/></div>
        </div>
    </div>
  );
};

export default CollabLayout;
