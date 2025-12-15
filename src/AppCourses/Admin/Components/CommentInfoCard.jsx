import React, { useState, useContext } from "react";
import moment from "moment";
import { LuChevronDown, LuDot, LuReply, LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { UserContext } from "../../../GlobalContext/UserContext";
// import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";
import CommentReplyInput from "./CommentReplyInput";
import Modal from "../../../DashBoard/Modals/Modal";
import DeleteComments from "./DeleteComments";

const CommentInfoCard = ({
  admin,
  status,
  commentId,
  authorName,
  authorPhoto,
  content,
  updatedOn,
  post,
  replies,
  getAllComments,
  onDelete,
  isSubReply = false,
}) => {
  const { User } = useContext(UserContext);
  console.log("replies", replies);

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);
  const [deleteComment, setdeleteComment] = useState(false);

  // Handles canceling a reply
  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  // Handles adding a reply
  const handleAddReply = async () => {
    try {
      const response = await AxiosInstance.post(
        API_PATH.COMMENTS.CREATE_COMMENT(post?._id),
        {
          content: replyText,
          parentComment: commentId,
        }
      );

      toast.success("Reply added successfully!");

      // Reset input and hide form
      setReplyText("");
      setShowReplyForm(false);

      // Refresh comments
      getAllComments();
    } catch (error) {
      console.error("Failed to add reply:", error);
      toast.error("Failed to add reply.");
    }
  };

  return (
    <div className="pb-1 rounded-lg cursor-pointer group ">
      <div className="grid grid-cols-12 gap-3 mx-3 my-2">
        <div
          className={`col-span-12 md:col-span-12 order-2 md:order-1 border p-2 rounded-md ${
            status == "Instructor"
              ? " border-sky-200 bg-sky-50"
              : "border-gray-200 "
          } `}
        >
          <div className="flex items-start gap-3">
            <img
              src={authorPhoto}
              alt={authorName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              {/* Author and date */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-[12px] text-gray-500 font-medium">
                    {authorName}
                  </h3>

                  {status == "Instructor" && (
                    <span className="border flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-2 py-0.5 rounded-full text-nowrap cursor-pointer">
                      Instructor
                    </span>
                  )}
                </div>

                <LuDot className="text-gray-500" />
                <span className="text-[12px] text-gray-500 font-medium">
                  {updatedOn || "_"}
                </span>
              </div>

              {/* Comment content */}
              <div className="relative">
                <p className={`text-sm font-medium text-black`}>{content}</p>
                {admin && (
                  <div
                    onClick={() => setdeleteComment(true)}
                    className="  absolute right-0 md:right-5 top-0 text-red-500 border p-2 hover:bg-red-500 hover:text-white rounded-md transition-all ease-in duration-100"
                  >
                    <LuTrash2 />
                  </div>
                )}
              </div>
              {/* Actions */}
              <div className="flex items-center gap-3 mt-1.5">
                {!isSubReply && (
                  <>
                    <button
                      className="flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500  hover:text-white cursor-pointer"
                      onClick={() => {
                        if (!User) {
                          console.log("USER", User);
                          setOpenAuthForm(true);
                          return;
                        }
                        setShowReplyForm((prev) => !prev);
                      }}
                    >
                      <LuReply /> Reply
                    </button>
                    <button
                      className="flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500  hover:text-white cursor-pointer"
                      onClick={() => setShowSubReplies((prev) => !prev)}
                    >
                      {replies.length}{" "}
                      {replies.length === 1 ? "reply" : "replies"}
                      <LuChevronDown
                        className={`transition-transform ${
                          showSubReplies ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reply input */}
      {!isSubReply && showReplyForm && (
        <CommentReplyInput
          user={User}
          authorName={authorName}
          content={content}
          replyText={replyText}
          setReplyText={setReplyText}
          handleAddReply={handleAddReply}
          handleCancelReply={handleCancelReply}
          disableAutoGen
        />
      )}

      {/* Nested replies */}
      {showSubReplies &&
        replies?.length > 0 &&
        replies.map((reply, index) => (
          <div
            key={reply._id}
            className={`ml-5 ${index === 0 ? "mt-2" : "mt-1"}`}
          >
            <CommentInfoCard
              commentId={reply._id}
              authorName={reply?.author?.name}
              authorPhoto={reply?.author?.profileImage}
              status={reply?.author?.status}
              content={reply.content}
              post={reply.post}
              replies={reply.replies || []}
              isSubReply
              updatedOn={
                reply.updatedAt
                  ? moment(reply.updatedAt).format("Do MMM YYYY")
                  : "_"
              }
              onDelete={() => onDelete(reply._id)}
              getAllComments={getAllComments}
            />
          </div>
        ))}

      <Modal
        isOpen={deleteComment}
        onClose={(e) => {
          setdeleteComment((prev) => !prev), e.stopPropagation();
        }}
        title={`Delete Commemt`}
        type={"small"}
      >
        <DeleteComments
          commentId={commentId}
          Author={authorName}
          content={content}
          onDelete={onDelete}
          getAllComments={getAllComments}
        />
      </Modal>
    </div>
  );
};

export default CommentInfoCard;
