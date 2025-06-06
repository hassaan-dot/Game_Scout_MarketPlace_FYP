import React from "react";
import { Images } from "../../Resources/Images";
import { useModalStore } from "../../../store/useModalStore";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  username,
  userAvatar,
  title,
  description,
  onClickDel,
  price,
  object,
  postImage,
  id,
}) => {
  const { setEditData, setEditActive, editActive } = useModalStore();
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl shadow-md w-70 mb-6 ml-10 border border-[#2c2f32]">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src={`http://localhost:3000/uploads/${postImage}`}
            alt={username}
            className="w-10 h-10 rounded-full mr-3 "
          />
          <span className="font-semibold text-white">{username}</span>
        </div>
        <div>
          <button
            onClick={() => {
              setEditData(object);
              setEditActive(true);
              // navigate("/createPosts");
              navigate(`/CreatePosts/${true}`);
            }}
            className="bg-[#4acd8d] hover:bg-red-700 text-white px-3 py-1 text-sm rounded-full mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onClickDel(id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded-full"
          >
            Delete
          </button>
        </div>
      </div>

      <img
        src={`http://localhost:3000/uploads/${postImage}`}
        alt="Post"
        className="w-full h-60 object-cover"
      />
      <div className="flex justify-between items-center p-4">
        <div className="p-4">
          <h2 className="text-lg font-bold text-white mb-1">{title}</h2>
          <p className="text-white text-sm">{description}</p>
        </div>
        <p className="text-[#4acd8d] text-sm">{`${price}$`}</p>
      </div>
    </div>
  );
};

export default PostCard;
