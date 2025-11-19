import React, { useState, useEffect } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { PiHandsClapping } from "react-icons/pi";
import clsx from "clsx";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";

const LikeCommentButton = ({ postId, likes, comments , fetchPostDetailsBySlug,commentsRef }) => {
  const [postLikes, setPostLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes !== undefined) setPostLikes(likes);
  }, [likes]);

  const handleLikeClick = async () => {
  if (!postId) return;

  try {
    const response = await AxiosInstance.put(API_PATH.BLOG.LIKE_POST(postId));

    if (response.data?.likes !== undefined) {
      setPostLikes(response.data.likes);  
    }
    fetchPostDetailsBySlug();
    setLiked(true);
    setTimeout(() => setLiked(false), 500);
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

const handleCommentClick = () => {
    if (commentsRef?.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <div className="flex justify-center items-center h-[15vh] ">
      <div className="fixed bottom-8 right-8 px-6 py-3 bg-black text-white rounded-full shadow-lg flex items-center justify-center">
        <button className="flex items-end gap-2 cursor-pointer" onClick={handleLikeClick}>
          <PiHandsClapping
            className={clsx(
              "text-[22px] transition-transform duration-300",
              liked && "scale-125 text-cyan-500"
            )}
          />
          <span className="text-base font-medium leading-4">{postLikes}</span>
        </button>

        <div className="h-6 w-px bg-gray-500 mx-5"></div>

        <button className="flex items-end gap-2  cursor-pointer" onClick={handleCommentClick}>
          <LuMessageCircle className="text-[22px]" />
          <span className="text-base font-medium leading-4">{comments}</span>
        </button>
      </div>
    </div>
  );
};

export default LikeCommentButton;
