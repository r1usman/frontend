import React from "react";

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
    <div className="bg-gray-50 p-3 rounded-lg mt-3">
        <div className="flex items-start gap-3">
        <img
            src={user?.profileImage || "/default-avatar.png"}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col">
            <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={disableAutoGen ? "Write your comment..." : "Type your reply..."}
            className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-sky-400"
            rows={3}
            />


            <div className="flex items-center gap-2 mt-2">
            <button
                onClick={handleAddReply}
                disabled={!replyText.trim()}
                className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600 disabled:opacity-50"
            >
                {type === "new" ? "Add Comment" : "Reply"}
            </button>

            <button
                onClick={handleCancelReply}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    </div>
    );
};

export default CommentReplyInput;
