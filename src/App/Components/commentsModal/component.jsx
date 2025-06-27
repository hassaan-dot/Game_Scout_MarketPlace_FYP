import React, { useState } from "react";
import { useAddComments } from "../../../hooks/usePosts";
import LocalStorage from "../../../services/local-storage";
import ClipLoader from "react-spinners/ClipLoader";
import { icons } from "../../Resources/Icons/icons";

const CommentsModal = ({
  visible,
  onClose,
  comments = [],
  id,
  onAddComment,
}) => {
  const User = LocalStorage.get("user");
  const [newComment, setNewComment] = useState("");
  const { mutate: handleAddComments, isPending } = useAddComments();

  const currentUserId = User?._id || "undefined";

  if (!visible) return null;

  const handleAdd = () => {
    handleAddComments({
      postId: id,
      text: newComment.trim(),
      userId: currentUserId,
    });
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#ccc] w-full h-full md:w-[600px] md:h-[85%] rounded-none md:rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 underline">
            Comments
          </h2>
        </div>

        <div className="flex-1 space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
          {comments?.length > 0 ? (
            comments.map((comment, index) => {
              const isCurrentUser = comment?.user?._id === currentUserId;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 m-2 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isCurrentUser && (
                    <img
                      src={icons.chatBot}
                      alt="avatar"
                      className="w-8 h-8 rounded-full self-start"
                    />
                  )}

                  <div className="flex flex-col">
                    <div
                      className={`max-w-[75%] p-3 rounded-xl shadow-md ${
                        isCurrentUser
                          ? "bg-blue-100 text-blue-800 rounded-br-none self-end"
                          : "bg-gray-100 text-gray-800 rounded-bl-none self-start"
                      }`}
                    >
                      <div className="text-sm break-words">
                        {comment?.text || "No comment text available."}
                      </div>
                    </div>

                    <span
                      className={`text-xs text-gray-400 mt-1 ${
                        isCurrentUser
                          ? "text-right self-end"
                          : "text-left self-start"
                      }`}
                    >
                      {isCurrentUser
                        ? "You"
                        : comment?.user?.username || "Anonymous"}{" "}
                      •{" "}
                      {new Date(
                        comment?.createdAt || Date.now()
                      ).toLocaleString()}
                    </span>
                  </div>

                  {isCurrentUser && (
                    <img
                      src={icons.chatBot}
                      alt="avatar"
                      className="w-8 h-8 rounded-full self-start"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No comments available.</p>
          )}
        </div>

        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {isPending ? <ClipLoader color="#ccc" size={10} /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
