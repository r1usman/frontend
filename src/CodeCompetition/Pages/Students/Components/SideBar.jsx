import React, { useContext, useEffect, useState } from 'react'
import { SIDE_MENU_DATA, SIDE_MENU_DATA_User } from "../../../Utility/Data.js"
import { UserContext } from '../../ContextApi/UserContext.jsx';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Modal from '../../../Layouts/Modal.jsx';


const SideBar = () => {
const [SelectData, setSelectData] = useState([]);
const { User, clearUser } = useContext(UserContext);
const [ConfirmLogout, setConfirmLogout] = useState(false)

useEffect(() => {
    if (User.status === "Student") {
    setSelectData(SIDE_MENU_DATA_User);
    return;
    }
    setSelectData(SIDE_MENU_DATA);
}, [User.status]);

const navigate = useNavigate();

const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
};

const handleConfirmation = ()=>{
    setConfirmLogout(true);
}

return (
    <div className='z-50 min-h-screen fixed border w-[20%] font-urbanist border-gray-200/50'>

        <div className='flex flex-col items-center justify-center mb-7 space-y-3 pt-10'>
            {!User.profileImage ? (
            <div className='w-20 h-20 relative rounded-full bg-purple-100 text-purple-600 flex items-center justify-center'>
                <FaUser className='size-8 text-task_primary' />
            </div>
            ) : (
            <img className='size-20 rounded-full' src={User?.profileImage} alt="" />
            )}

            <h1 className='text-[10px] font-medium text-white bg-[#6c63ff] px-3 py-0.5 rounded mt-1'>
            {User.status}
            </h1>
            <p className='text-gray-950 font-medium leading-6 mt-3'>{User.name}</p>
            <p className='text-[12px] text-gray-500'>{User.email}</p>
        </div>

        {/* Menu Items */}
        <div className='space-y-2'>
            {SelectData.map((item, index) => {
            if (item.path === "logout") {
                return (
                <div
                    key={index}
                    onClick={handleConfirmation}
                    className="flex absolute items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer bottom-0 hover:bg-red-600/15 hover:text-red-600 hover:border-red-600  transition-all ease-in duration-150"
                >
                    <div className='text-xl'>{<item.icon />}</div>
                    <div>{item.label}</div>
                </div>
                );
            }

            return (
                <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                    `flex items-center gap-4 w-full text-[15px] py-3 px-5 cursor-pointer 
                    ${isActive
                    ? "bg-purple-600/15  border-r-4 border-purple-600"
                    : ""}`
                }
                >
                <div className='text-xl'>{<item.icon />}</div>
                <div>{item.label}</div>
                </NavLink>
            );
            })}
        </div>
        <Modal
            onClose={()=>setConfirmLogout((prev)=>!prev)}
            isOpen = {ConfirmLogout}
            type={"Banner"}
            title={"LogOut"}
        >
            <div className="flex flex-col justify-center text-center  h-full">
                <p className="mb-6 text-gray-700">
                Are you sure you want to log out?
                </p>
                <div className="flex justify-center gap-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Log Out
                </button>
                </div>
            </div>
        </Modal>
    </div>

);
};

export default SideBar;
