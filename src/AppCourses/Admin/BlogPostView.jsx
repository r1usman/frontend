import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";
import moment from "moment";

import {
  LuCircleAlert,
  LuDot,
  LuSparkles,
} from "react-icons/lu";

// import CommentReplyInput from "../../components/Inputs/CommentReplyInput";
// import toast from "react-hot-toast";
// import TrendingPostsSection from "./components/TrendingPostsSection";
import SkeletonLoader from "../Admin/Components/SkeletonLoader";
import { sanitizeMarkdown } from "../../Utility/Helper";
import MarkdownContent from "./Components/MarkdownContent";
const BlogPostView = ({Blog}) => {

  const [blogPostData, setBlogPostData] = useState(null);
  const [comments, setComments] = useState(null);


  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPostDetailsBySlug = async () => {
    console.log("Fetching post by slug...");
   
  };


  const fetchCommentByPostId = async (postId) => {
    console.log("Fetching comments for post:", postId);
  };

  const generateBlogPostSummary = async () => {
    console.log("Generating summary...");
  };


  const incrementViews = async (postId) => {
    console.log("Incrementing views for:", postId);
  };

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };


  const handleAddReply = async () => {
    console.log("Adding reply...");
  };



  console.log("Blog",Blog);
  

  return (
    <div className="overflow-y-scroll">
        
      <div className="px-4 ">
          <MarkdownContent
              content={Blog?.content}
          />

          {/* <SharePost title={blogPostData.title} /> */}
      </div>

    </div>
  );
};

export default BlogPostView;

