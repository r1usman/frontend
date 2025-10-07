import React from "react";
import { Outlet } from "react-router-dom";
import CompeteSidebar from "../CompetitionSideBar"
import CompeteNavBar from "../CompetitonNavBar";

const CollabLayout = () => {
    return (
        <div className='flex min-h-screen'>
            <div className='w-[20%] '>
            <CompeteSidebar/>
            </div>
            <div className='w-[80%] overflow-x-hidden'>
            <CompeteNavBar/>
            <div className='m-4 px-3'><Outlet/></div>
            </div>
        </div>
    );
};

export default CollabLayout;
