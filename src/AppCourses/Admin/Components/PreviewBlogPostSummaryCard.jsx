import { LuEye, LuHeart, LuTrash2 } from "react-icons/lu";
import python from "../../assests/python.jpg";
import CPlus from "../../assests/CPlus.png";
import Java from "../../assests/download.png";
import Default from "../../assests/default.png";
import { LucideView } from "lucide-react";
import { useState } from "react";
import BlogPosts1 from "../Components/BlogPost1";

import Modal from "../../../DashBoard/Modals/Modal";
import DeleteBlogCard from "./DeleteBlogCard";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";
const PreviewBlogPostSummaryCard = ({
  at,
  id,
  blog,
  FetchCourseArticels,
  title,
  Articles,
  index,
  content,
  imgUrl,
  updatedOn,
  tags,
  views,
  likes,
  onClick,
  courseID,
}) => {
  const [AllowViewBlog, setAllowViewBlog] = useState(false);
  const [DeletePost, setDeletePost] = useState(false);
  const [BlogImage, setBlogImage] = useState(imgUrl);

  const handleView = (e) => {
    e.stopPropagation();

    setAllowViewBlog(true);
  };

  const deletePost = async (postId) => {
    try {
      console.log("Here");

      await AxiosInstance.delete(API_PATH.BLOG.DELETE_POST(postId));
      FetchCourseArticels(courseID);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchdata = () => {
    FetchCourseArticels(courseID);
  };

  return (
    <div
      className="flex items-start gap-4 bg-gray-50 border border-gray-200  p-3 mb-3 rounded-lg cursor-pointer  group"
      onClick={onClick}
    >
      <img
        src={
          BlogImage == "Python"
            ? python
            : BlogImage == "JAVA"
            ? Java
            : CPlus || Default
        }
        alt={title}
        className="w-16 h-16 rounded-lg "
      />

      <div className="flex-1">
        <h3 className="text-[13px] md:text-[15px] text-black font-medium">
          {title}
        </h3>

        <div className="flex items-center gap-2.5 mt-2 flex-wrap ">
          <div className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded">
            Updated: {updatedOn}
          </div>

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
            setDeletePost(true);
          }}
        >
          <LuTrash2 /> <span className="hidden md:block">Delete</span>
        </button>
      </div>
      <Modal
        onClose={(e) => {
          setAllowViewBlog(false), e.stopPropagation();
        }}
        isOpen={AllowViewBlog}
        type="BlogView"
        title={"Preview"}
      >
        <BlogPosts1 Blog={Articles[index]} title={title} calledby={"Admin"} />
      </Modal>
      <Modal
        isOpen={DeletePost}
        onClose={(e) => {
          setDeletePost((prev) => !prev), e.stopPropagation();
        }}
        title={`Delete Blog`}
        type={"small"}
      >
        <DeleteBlogCard
          id={id}
          AssingmentInfo={title}
          getAllPosts={fetchdata}
          deletePost={deletePost}
          setDeletePost={setDeletePost}
        />
      </Modal>
    </div>
  );
};

export default PreviewBlogPostSummaryCard;
