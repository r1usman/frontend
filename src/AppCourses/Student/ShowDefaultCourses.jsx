import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BlogSideBar from "./BlogSideBar";
import BlogPostView from "../Admin/BlogPostView";

const ShowDefaultCourses = () => {
    const location = useLocation();
    const { course } = location.state || {};

    const [ActiveTopic, setActiveTopic] = useState(null);

    if (!course) return <div>No Course Found</div>;

    return (
        <div className="w-full h-screen overflow-hidden">

            <div className="w-full fixed top-0 left-0 bg-white shadow h-14 flex items-center px-6 z-50">
                <h1 className="font-semibold text-lg">Course: {course.title}</h1>
            </div>

            <div className="flex w-full">

                <div className="w-[22%] fixed left-0 top-14 bottom-0 overflow-y-auto bg-gray-50 border-r z-40">
                    <BlogSideBar course={course} onSelectBlog={(blog) => setActiveTopic(blog)} />
                </div>


                <div className="ml-[22%] w-[78%] mt-14 h-[calc(100vh-56px)] overflow-y-auto p-6">
                    <BlogPostView Blog={ActiveTopic}  />
                </div>

            </div>

        </div>
    );
};

export default ShowDefaultCourses;
