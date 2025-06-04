import React, { useState, useEffect } from "react";

import { DisplayContent } from "../../Components/index";
import InformationContainer from "../../Components/userDetails/component";
import LocalStorage from "../../../services/local-storage";
import { useDeletePost, useGetAllPosts } from "../../../hooks/usePosts";
import PostCard from "../../Components/Posts/component";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const User = LocalStorage.get("user");

  const { mutate: deletePost } = useDeletePost();

  const { data } = useGetAllPosts();
  console.log("User Data:", data);
  const onClickFunc = (id) => {
    deletePost({ id: id });
  };
  return (
    <>
      <InformationContainer data={User} />
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          {"Posts"} ({data?.posts?.length})
        </h1>
      </div>

      <div className="flex w-full flex-wrap gap-10 mt-10">
        {data?.posts?.map((post) => (
          <PostCard
            onClickFunc={onClickFunc}
            key={post._id}
            id={post._id}
            username={User?.username || "Anonymous"}
            userAvatar=""
            postImage={post?.picture}
            title={post?.title || "No Title"}
            description=""
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
