import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  useDeletePost,
  useGetAllPosts,
  useGetAllUserPosts,
} from "../../../hooks/usePosts";
import { CountBox } from "../../Components/index";
import LocalStorage from "../../../services/local-storage";
import { useModalStore } from "../../../store/useModalStore";
import PostCard from "../../Components/Posts/component";

const AllPosts = () => {
  const User = LocalStorage.get("user");

  const { setSearchBarActive } = useModalStore();
  const { mutate: deletePost, isPending: deletePending } = useDeletePost();
  const { data, isPending } = useGetAllPosts({ userId: User?._id });

  const onClickFunc = (id) => {
    deletePost({
      postId: id,
      userId: User?._id,
    });
  };

  useEffect(() => {
    setSearchBarActive(false);
  }, []);

  return (
    <div className="mt-10 px-6">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left mb-6">
        Community Posts ({data?.posts?.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {isPending || deletePending ? (
            <div className="flex justify-center items-center m-20 h-screen">
              <ClipLoader color="#ccc" size={60} />
            </div>
          ) : (
            <div className="flex w-full flex-wrap gap-10">
              {data?.posts?.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  object={post}
                  onClickDel={onClickFunc}
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

        {/* Right Side: CountBoxes */}
        {/* <div className="min-w-[250px] flex flex-col gap-6">
          <CountBox title="Days Left" />
          <CountBox title="Raised Amount" />
          <CountBox title="Total Backers" />
        </div> */}
      </div>
    </div>
  );
};

export default AllPosts;
