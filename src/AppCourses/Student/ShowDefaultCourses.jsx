import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogSideBar from "./BlogSideBar";
import BlogPostView from "../Admin/BlogPostView";
import { Header } from "../../DashBoard/components/Layout/Header";
import { BlogHeader } from "../Admin/Components/BlogHeader";
import { LuChevronsLeft, LuChevronsRightLeft } from "react-icons/lu";
import { ChevronLeft, ChevronRight } from "lucide-react";


const ShowDefaultCourses = () => {
    const location = useLocation();
    const { course } = location.state || {};
    const navigator = useNavigate();

    const [ActiveTopic, setActiveTopic] = useState(null);

    if (!course) return <div>No Course Found</div>;

    return (
        <div className="w-full h-screen overflow-hidden">

            <div className="w-full fixed top-0 left-0 bg-white shadow h-16 flex items-center  z-50">
                <div className="w-[22%] font-semibold text-2xl px-4 flex items-center gap-2 py-3 bg-white">
                <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer"onClick={()=>{navigator("/student/dashboard")}} />
                <h1 className="text-gray-900" >Code Ascend</h1>
            </div>
                <div  className="w-[88%] pl-13  pr-5 ">
                    <BlogHeader/>
                </div>
            </div>

            <div className="flex w-full">

                <div className="w-[22%] fixed left-0 top-14   bottom-0 overflow-y-auto  mt-5 z-40">
                    <div className="border-r border-sky-600  h-full ">
                        <BlogSideBar course={course} onSelectBlog={(blog) => setActiveTopic(blog)} />
                    </div>
                </div>


                <div className="ml-[22%] w-[78%] mt-10 h-[calc(100vh-56px)] overflow-y-auto p-6">
                    <BlogPostView Blog={ActiveTopic}  />
                </div>

            </div>

        </div>
    );
};

export default ShowDefaultCourses;
