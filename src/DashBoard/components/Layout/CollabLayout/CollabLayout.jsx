import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header";
import CollabSideBar from "../CollabSideBar";



const CollabLayout = () => {
  return (
     <div className='flex min-h-screen'>
         <div className='w-[20%] '>
          <CollabSideBar/>
        </div>
        <div className='w-[80%] overflow-x-hidden'>
          <Header/>
          <div className='m-4 px-3 '><Outlet/></div>
        </div>
    </div>
  );
};

export default CollabLayout;
