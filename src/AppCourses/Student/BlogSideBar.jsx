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
        <div className=" font-urbanist p-4 overflow-y-auto">

            <h2 className="text-xl font-bold mb-4">{course.title} Topics</h2>

            <ul className="space-y-2">
                {blogs.map((blog) => (
                    <li
                        key={blog._id}
                        onClick={() => {
                            setActiveBlog(blog);
                            onSelectBlog(blog);
                        }}
                        className={`cursor-pointer p-2 rounded transition-all
                            ${
                                activeBlog?._id === blog._id
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-300"
                            }
                        `}
                    >
                        {blog.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogSideBar;
