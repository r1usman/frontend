import React from "react";
import { LuSend } from "react-icons/lu";

const CommentReplyInput = ({
    user,
    authorName,
    content,
    replyText,
    setReplyText,
    handleAddReply,
    handleCancelReply,
    disableAutoGen ,
    type,
}) => {
    return (
    <div className="bg-gray-50 p-4 rounded-lg  bg-white">
        <div className="flex items-start gap-3">
        <img
            src={user?.profileImage || "/default-avatar.png"}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col gap-1">
            <h1 className="text-xs text-gray-500 font-medium">{authorName}</h1>
            <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={disableAutoGen ? "Write your comment..." : "Type your reply..."}
            className="form-input-Course resize-none"
            rows={3}
            />


            <div className="flex items-center justify-end    gap-2 mt-2">

            <button
                onClick={handleCancelReply}
                className="bg-gray-200 cursor-pointer rounded-2xl font-medium text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
                Cancel
            </button>
            <button
                onClick={handleAddReply}
                disabled={!replyText.trim()}
                className="flex rounded-2xl items-center gap-2 text-sm font-medium text-sky-600 bg-sky-100 rounded px-3 py-1 border border-sky-200 hover:border-sky-400 cursor-pointer hover:scale-105 transition-all"
            >
                <LuSend />
                <span>{type === "new" ? "Add Comment" : "Reply"}</span>
            </button>


            
            </div>
        </div>
        </div>
    </div>
    );
};

export default CommentReplyInput;
