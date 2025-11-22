import { LuEye, LuHeart, LuTrash2 } from "react-icons/lu";
import python from "../../assests/python.jpg"
import { LucideView } from "lucide-react";
import { useState } from "react";


import Modal from "../../../DashBoard/Modals/Modal";
import BlogPosts from "../BlogPost";
import BlogPostView from "../BlogPostView";
import DeleteCard from "../../../Collaboration/Components/Cards/DeleteCard";
import DeleteBlogCard from "./DeleteBlogCard";
const BlogPostSummaryCard = ({id,at ,blog, title,Articles , index, content,getAllPosts, imgUrl, updatedOn, tags, views, likes, onClick, onDelete }) => {
    const [AllowViewBlog, setAllowViewBlog] = useState(false)
    const [DeletePost, setDeletePost] = useState(false)
    
    const handleView = (e)=>{
        e.stopPropagation();

        setAllowViewBlog(true)
    }
    

    

    return (
        <div
            className="flex items-start gap-4 bg-gray-50 border border-gray-200  p-3 mb-3 rounded-lg cursor-pointer  group"
            onClick={onClick}
        >
            <img
            src={python}
            alt={title}
            className="w-16 h-16 rounded-lg "
            />

            <div className="flex-1">
            <h3 className="text-[13px] md:text-[15px] text-black font-medium">
                {title}
            </h3>

            <div className="flex items-center gap-2.5 mt-2 flex-wrap ">
                <div className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded">Updated: {updatedOn}</div>

                <div className="h-6 w-[1px] bg-gray-300/70" />

                <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-sky-700 font-medium bg-sky-50 px-2.5 py-1 rounded">
                    <LuEye className="text-[16px] text-sky-500" /> {views}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-sky-700 font-medium bg-sky-50 px-2.5 py-1 rounded">
                    <LuHeart className="text-[16px] text-sky-500" /> {likes}
                </span>
                </div>

                <div className="h-6 w-[1px] bg-gray-300/70" />

                <div className="flex items-center gap-2.5">
                {tags?.map((tag, index) => (
                    <div
                    key={`tag_${index}`}
                    className="text-xs text-cyan-700 font-medium bg-cyan-100/50 px-2.5 py-1 rounded"
                    >
                    {tag}
                    </div>
                ))}
                </div>
            </div>
        
            </div>
            <div className="flex flex-col gap-3">
                <button
                    className="flex items-center gap-2 text-xs font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1.5 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   "
                    onClick={handleView}
                    >
                    <LuEye className="text-sm" />
                    <span>View Blog</span>
            
                </button>

                    <button
                    className="hidden md:flex items-center gap-2 text-xs text-rose-500  font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100  hover:border-rose-200 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeletePost(true)
                    }}
                    >
                    <LuTrash2 /> <span className="hidden md:block">Delete</span>
                    </button>
            </div>
             <Modal
                onClose={(e) => {setAllowViewBlog(false) , e.stopPropagation();  }}
                isOpen={AllowViewBlog}
                type="BlogView"
                title={"Preview"}
            >
                <BlogPostView Blog ={content} title={title} calledby={"Admin"}/>
        </Modal>
        <Modal
            isOpen = {DeletePost}
            onClose = {(e)=>{ setDeletePost((prev)=>!prev) ,e.stopPropagation() }}
            title={`Delete Blog`}
            type={"small"}
        >
            <DeleteBlogCard 
                id={id}
                AssingmentInfo = {title}
                deletePost = {onDelete}
                setDeletePost={setDeletePost}
                getAllPosts={getAllPosts}
            />

        </Modal>
        </div>
    );

};

export default BlogPostSummaryCard;
