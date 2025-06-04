import React from "react";
import { Images } from "../../Resources/Images";

const PostCard = ({
  username,
  userAvatar,
  postImage,
  title,
  description,
  onClickFunc,
  id,
}) => {
  return (
    <div className="rounded-2xl shadow-md w-70 mb-6 ml-10 border border-[#2c2f32]">
      {/* Header */}
      <div className="flex items-center p-4">
        <img
          src={Images.Game_Hi_Fi}
          alt={username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold text-white">{username}</span>
      </div>
      <button
        onClick={() => onClickFunc(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      ></button>
      {/* Image */}
      <img
        src={Images.Game_Hi_Fi}
        alt="Post"
        className="w-full h-72 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-1">{title}</h2>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
