import React, { useState, useContext } from "react";
import moment from "moment";
import { LuChevronDown, LuDot, LuReply, LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { UserContext } from "../../../GlobalContext/UserContext";
// import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";
import CommentReplyInput from "./CommentReplyInput";


const CommentInfoCard = ({
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

    const [replyText, setReplyText] = useState("");
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showSubReplies, setShowSubReplies] = useState(false);
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
    <div className="bg-white p-3 rounded-lg cursor-pointer group mb-5">
        <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1">
                <div className="flex items-start gap-3">
                    <img
                        src={authorPhoto}
                        alt={authorName}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        {/* Author and date */}
                        <div className="flex items-center gap-1">
                            <h3 className="text-[12px] text-gray-500 font-medium">{authorName}</h3>
                            <LuDot className="text-gray-500" />
                            <span className="text-[12px] text-gray-500 font-medium">
                                {updatedOn || "_"}
                            </span>
                        </div>

                        {/* Comment content */}
                        <p className="text-sm text-black font-medium">{content}</p>

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
                                        {replies.length} {replies.length === 1 ? "reply" : "replies"}
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
                    <div key={reply._id} className={`ml-5 ${index === 0 ? "mt-2" : "mt-1"}`}>
                    <CommentInfoCard
                        commentId={reply._id}
                        authorName={reply?.author?.name}
                        authorPhoto={reply?.author?.profileImage}
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
    </div>
   
);


}

export default CommentInfoCard;
