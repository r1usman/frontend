import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import moment from "moment";

import {
  LuCircleAlert,
  LuDot,
  LuSparkles,
} from "react-icons/lu";

import MarkdownContent from "./MarkdownContent";
import SharePost from "./SharePost";
import CommentInfoCard from "./CommentInfoCard";
import CommentReplyInput from "./CommentReplyInput";
import Drawer from "./Drawer";

const BlogPostView = ({Blog, calledby}) => {
  console.log("Blog here", Blog);
  
  
  const [blogPostData, setBlogPostData] = useState(Blog);
  




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
              <h1 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
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
                  {comments?.length > 0 &&
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
                    }

                </div>
            )
          }
          {
            !calledby && (
              <LikeCommentButton
                postId={blogPostData?._id || ""}
                likes={blogPostData?.likes || 0}
                comments={comments?.length || 0}
                fetchPostDetailsBySlug ={()=>fetchPostDetailsBySlug(blogPostData?._id)}
                commentsRef={commentsRef}
              />
            )
          }
         




      </div>

    </div>
  );
};

export default BlogPostView;

