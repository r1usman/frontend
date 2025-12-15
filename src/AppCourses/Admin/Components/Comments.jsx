import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentInfoCard from "./CommentInfoCard";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";
import moment from "moment";

const Comments = () => {
  const navigate = useNavigate();
  console.log("Comments Component Loaded");

  const [comments, setComments] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const getAllComments = async () => {
    try {
      const response = await AxiosInstance.get(
        API_PATH.COMMENTS.GET_ALL_COMMENTS
      );
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // DELETE COMMENT
  // -------------------------
  const deleteComment = async (commentId) => {
    try {
      const response = await AxiosInstance.delete(
        API_PATH.COMMENTS.DELETE_COMMENT(commentId)
      );
      getAllComments();
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // USE EFFECT
  // -------------------------
  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="w-auto sm:max-w-[900px] mx-auto rounded-md px-5 py-3 bg-gray-50 border border-gray-200 ">
      <h2 className="text-2xl font-semibold mt-5 mb-5">Comments</h2>

      {comments.map((comment) => (
        <CommentInfoCard
          key={comment._id}
          status={comment.author?.status}
          admin={true}
          commentId={comment._id || null}
          authorName={comment.author?.name}
          authorPhoto={comment.author?.profileImage}
          content={comment.content}
          updatedOn={
            comment.updatedAt
              ? moment(comment.updatedAt).format("Do MMM YYYY")
              : "_"
          }
          post={comment.post}
          replies={comment.replies || []}
          getAllComments={getAllComments}
          onDelete={(commentId) => deleteComment(commentId)}
        />
      ))}
    </div>
  );
};

export default Comments;
