import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";
import moment from "moment";
import { SearchContext } from "../ContextApi/BlogContext";

import {
  LuCircleAlert,
  LuDot,
  LuSparkles,
} from "react-icons/lu";
import SkeletonLoader from "../Admin/Components/SkeletonLoader";
import { sanitizeMarkdown } from "../../Utility/Helper";
import MarkdownContent from "./Components/MarkdownContent";
import SharePost from "./Components/SharePost";
import {UserContext} from "../../GlobalContext/UserContext"
import AxiosInstance from "../../Utility/AxiosInstances";
import CommentInfoCard from "./Components/CommentInfoCard";
import CommentReplyInput from "./Components/CommentReplyInput";
import toast from "react-hot-toast";
import Drawer from "./Components/Drawer";
import LikeCommentButton from "./Components/LikeCommentButton";
import axios from "axios";
const BlogPostView = ({Blog, calledby}) => {
  console.log("Blog here", Blog);
  
  
  const [blogPostData, setBlogPostData] = useState(Blog);
  const [comments, setComments] = useState(null);
  const {selectedBlog } = useContext(SearchContext)
   const commentsRef = useRef(null);
  
    const { User} = useContext(UserContext);
    console.log("selectedBlog",selectedBlog);
  


  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPostDetailsBySlug = async (BlogSlug) => {
    try {
      const response = await AxiosInstance.get(API_PATH.BLOG.GET_POST_BY_SLUG(BlogSlug));
      setBlogPostData(response.data);
    } catch (error) {
      console.log(error);
      
    }
   
  };


  const fetchCommentByPostId = async (postId) => {
    try { 
        const result = await AxiosInstance.get(API_PATH.COMMENTS.GET_COMMENTS(postId));
        setComments(result.data)
      
      
    } catch (error) {
      console.log(error);
      
    }
  };

  const generateBlogPostSummary = async () => {
  try {
    setErrorMsg("");
    setSummaryContent(null);
    setIsLoading(true);
    setOpenSummarizeDrawer(true);

    
    const response = await axios.post("http://localhost:3000/Ask/PostSummary",{content: Blog?.content })
    if (response.data) {
      setSummaryContent(response.data);
    }
  } catch (error) {
    setSummaryContent(null);
    setErrorMsg("Failed to generate summary, Try again");
  } finally {
    setIsLoading(false);
  }
};

  

  const incrementViews = async (postId) => {
    try {
      const response = await AxiosInstance.put(API_PATH.BLOG.INCREMENT_VIEW(postId));
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleCancelReply = () => {
    setShowReplyForm("")
  };

  

  const handleAddReply = async () => {
    try {
      const result = await AxiosInstance.post(API_PATH.COMMENTS.CREATE_COMMENT(Blog?._id),{
        content : replyText,
        parentComment : ""
      })
      toast.success("Reply Added Successfully!")
      if(result)
      {
        setReplyText("")
        setShowReplyForm(false)
      }
      fetchCommentByPostId(Blog?._id);
      
    } catch (error) {
      console.log(error);
      
    }
  };
  
  console.log("selectedBlog",selectedBlog);
  console.log("calledby", calledby);
  
  
  useEffect(() => {
  if (Blog && !selectedBlog) {
    fetchPostDetailsBySlug(Blog?.slug);
    fetchCommentByPostId(Blog._id);
    if(!calledby)
      incrementViews(Blog?._id)
  }
  if(Blog && !selectedBlog && calledby)
  {
    setBlogPostData(Blog)
  }

  if (selectedBlog) {
    if(!calledby)
      incrementViews(selectedBlog?._id)
    fetchPostDetailsBySlug(selectedBlog?.slug);
    
  }


}, [Blog, selectedBlog]);

  
  console.log("Blog Id" , Blog?._id);
  
  console.log("comments",comments);
  

  return (
    <div className="overflow-y-scroll ">
      <div className="mt-6  mb-2 px-6">
          <title>{blogPostData?.title}</title>
          <meta name="description" content={blogPostData?.title} />
          <meta property="og:title" content={blogPostData?.title} />
          <meta property="og:image" content={blogPostData?.coverImageUrl} />
          <meta property="og:type" content="article" />
          
          {/* Blog Post Content */}
          <div className="grid grid-cols-12 gap-8 relative">
            <div className="col-span-12 md:col-span-8 relative">
              <h1 className="text-lg text-sky-500 md:text-2xl font-bold mb-2 line-clamp-3">
                {blogPostData?.title}
              </h1>
              
              <div className="flex items-center gap-1 flex-wrap mt-3 mb-5">
                <span className="text-[13px] text-gray-500 font-medium">
                  {moment(blogPostData?.updatedAt || "").format("Do MMM YYYY")}
                </span>
                
                <LuDot className="text-xl text-gray-400" />
                
                <div className="flex items-center flex-wrap gap-2">
                  {blogPostData?.tags?.slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5  rounded-full text-nowrap cursor-pointer hover:scale-[1.02] transition-all my-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tag/${tag}`);
                      }}
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
                
                <LuDot className="text-xl text-gray-400" />

      
              {
                !calledby && (
                  <button 
                    className="border flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-3 py-1.5 rounded-full text-nowrap cursor-pointer"
                    onClick={generateBlogPostSummary}
                    disabled={isLoading}
                  >
                    <LuSparkles className="text-sm" /> 
                    Summarize Post
                    {isLoading && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </button>
                )
              }

              </div>
        </div>
      </div>
  
      </div>
      <div className="px-4">
          <MarkdownContent
              content={blogPostData?.content}
          />

          <SharePost title={blogPostData?.title} />
          <div ref={commentsRef} className=" size-8"></div>
          {
            !calledby && (
               <div className="bg-gray-50 p-4 rounded-lg" >
                  <div className="flex items-center justify-between mb-4 ">
                    <h4 className="text-lg font-semibold">Comments</h4>

                    <button
                      className="flex items-center justify-center gap-3 bg-linear-to-r from-sky-500  to-cyan-400 text-xs font-semibold text-white px-5 py-2 rounded-full hover:bg-black hover:text-white cursor-pointer"
                      onClick={() => {
                        if (!User) {
                          setOpenAuthForm(true);
                          return;
                        }
                        setShowReplyForm(true);
                      }}
                    >
                      Add Comment
                    </button>
                  </div>

                  {showReplyForm && (
                    <div className="_bg-white pt-1 pb-5 pr-8 rounded-lg mb-8">
                      <CommentReplyInput
                        user={User}
                        authorName={User.name}
                        content={""}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        handleAddReply={handleAddReply}
                        handleCancelReply={handleCancelReply}
                        disableAutoGen
                        type="new"
                      />
                    </div>
                  )}
                  {comments?.length > 0 ?
                      (
                        comments.map((comment) => (
                          <CommentInfoCard
                            key={comment._id}
                            commentId={comment._id || null}
                            authorName={comment?.author?.name || ""}
                            authorPhoto={comment?.author?.profileImage || ""}
                            content={comment.content}
                            updatedOn={
                              comment.updatedAt
                                ? moment(comment.updatedAt).format("Do MMM YYYY, h:mm A")
                                : null
                            }
                            post={comment.post}
                            replies={comment.replies || []}
                            getAllComments={() => fetchCommentByPostId(Blog._id)}
                            onDelete={(commentId) =>
                              setOpenDeleteAlert({
                                open: true,
                                data: commentId || comment._id,
                              })
                            }
                          />
                        ))
                      )
                      :
                      (
                        <div className="text-center  text-gray-500 text-sm italic">
                            No comments available.
                        </div>
                      )
                      
                    }

                </div>
            )
          }
          {
            !calledby && (
              <LikeCommentButton
                postId={blogPostData?._id || ""}
                likes={blogPostData?.likedBy.length || 0}
                likedBy={blogPostData?.likedBy}
                comments={comments?.length || 0}
                fetchPostDetailsBySlug ={()=>fetchPostDetailsBySlug(blogPostData?._id)}
                commentsRef={commentsRef}
              />
            )
          }
          <Drawer
              isOpen={openSummarizeDrawer}
              onClose={() => setOpenSummarizeDrawer(false)}
              title={!isLoading && summaryContent?.title}
            >
              {errorMsg && (
                <p className="flex gap-2 text-sm text-amber-600 font-medium">
                  <LuCircleAlert className="mt-1" /> {errorMsg}
                </p>
              )}
              {isLoading && <SkeletonLoader />}
              {!isLoading && summaryContent && (
                <MarkdownContent content={summaryContent?.summary || ""} />
              )}
            </Drawer>




      </div>

    </div>
  );
};

export default BlogPostView;

