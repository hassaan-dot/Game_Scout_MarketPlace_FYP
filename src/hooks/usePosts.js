import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api_post } from "../services/axios";
import { useNavigate } from "react-router-dom";

const handleGetAlLPosts = async (data) => {
  const res = await api_post.get("/1");
  return res.data;
};
const handleCreatePost = async (data) => {
  // console.log("Data in handleCreatePost:", data);
  const res = await api_post.post(`/new`, data);
  return res.data;
};
const handleDeletePost = async (data) => {
  // console.log("Data in handleCreatePost:", data);
  const res = await api_post.delete(`/delete/${data?.id}`);
  return res.data;
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => handleGetAlLPosts(),
  });
};

export const useCreatePost = () => {
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data) => handleCreatePost(data),
    onSuccess: async (data) => {
      notify(data?.message);
      navigate("/profile", { replace: true });
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
export const useDeletePost = () => {
  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (data) => handleDeletePost(data),
    onSuccess: (data) => {
      // toastSuccess("Success!", "Your PO has beem Deleted successfully");

      queryPO.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      // toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
