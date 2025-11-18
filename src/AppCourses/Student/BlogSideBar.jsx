import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";

const BlogSideBar = ({ course, onSelectBlog }) => {
    const [blogs, setBlogs] = useState([]);
    const [activeBlog, setActiveBlog] = useState(null);

    const fetchBlogs = async () => {
        try {
            const response = await AxiosInstance.get(
                API_PATH.BLOG.COURSE_BLOGS(course?._id)
            );

            const fetchedBlogs = response?.data?.posts || [];
            setBlogs(fetchedBlogs);

            if (fetchedBlogs.length > 0) {
                setActiveBlog(fetchedBlogs[0]);
                onSelectBlog(fetchedBlogs[0]);
            }

        } catch (error) {
            console.log("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        if (course?._id) fetchBlogs();
    }, [course]);

    
    
    return (
        <div className="font-urbanist h-full  shadow-lg">
            


            <div className="p-4  h-[calc(100%-100px)]">
                <ul className="space-y-3">
                    {blogs.map((blog, index) => (
                        <li
                            key={blog._id}
                            onClick={() => {
                                setActiveBlog(blog);
                                onSelectBlog(blog);
                            }}
                            className={`cursor-pointer p-4 rounded-lg transition-all duration-200 border
                                ${
                                    activeBlog?._id === blog._id
                                        ? "border-b-3 border-sky-600"
                                        : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm"
                                }
                            `}
                        >
                            <div className="flex items-start gap-3">
                                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                                    ${
                                        activeBlog?._id === blog._id
                                            ? "bg-sky-600 text-white"
                                            : "bg-gray-200 text-gray-600"
                                    }
                                `}>
                                    {index + 1}
                                </span>
                                <span className="font-medium leading-snug line-clamp-1">{blog.title}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogSideBar;