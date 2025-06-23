import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useDeletePost, useGetAllPosts } from "../../../hooks/usePosts";
import LocalStorage from "../../../services/local-storage";
import { useModalStore } from "../../../store/useModalStore";
import PostCard from "../../Components/Posts/component";
import InformationContainer from "../../Components/userDetails/component";

const Profile = () => {
  const User = LocalStorage.get("user");

  const { setSearchBarActive } = useModalStore();

  const { mutate: deletePost, isPending: deletePending } = useDeletePost();

  const { data, isPending } = useGetAllPosts();

  const onClickFunc = (id) => {
    console.log("id", id);
    // data = {
    //   postId: id,
    //   userId: User?._id,
    // };
    deletePost({
      postId: id,
      userId: User?._id,
    });
  };

  useEffect(() => {
    setSearchBarActive(false);
  }, []);
  return (
    <div className="items-center mt-10">
      <InformationContainer data={User} />
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          {"Posts"} ({data?.posts?.length})
        </h1>
      </div>

      {isPending || deletePending ? (
        <div className="flex justify-center  m-20 h-screen">
          <ClipLoader color="#ccc" size={60} />
        </div>
      ) : (
        <div className="flex w-full flex-wrap gap-10 mt-10">
          {console.log("checking2,", User)}

          {data?.posts?.map((post) => (
            <PostCard
              onClickDel={onClickFunc}
              object={post}
              key={post._id}
              id={post._id}
              comments={post?.comments}
              username={post?.author?.username || "Anonymous"}
              userAvatar=""
              AuthorId={User?._id || "Unknown"}
              price={post?.price || "0"}
              postImage={post?.picture}
              title={post?.title || "No Title"}
              description={post?.description || "No Description"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
