import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api_post } from "../services/axios";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../store/useModalStore";

const handleGetAlLPosts = async (data) => {
  const res = await api_post.get("/1");
  return res.data;
};
const handleCreatePost = async (data) => {
  const res = await api_post.post(`/new`, data);
  return res.data;
};
const handleDeletePost = async (data) => {
  const res = await api_post.delete(`/delete/${data?.id}`);
  return res.data;
};

const handleUpdatePost = async ({ formData, id }) => {
  const res = await api_post.put(`/update/${id}`, formData);
  return res.data;
};
const handleAddCommentsPost = async (data) => {
  const res = await api_post.post(`/comment/${data?.postId}`, data);
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
      notify(error);
    },
  });
};

export const useUpdatePost = (id) => {
  const { setEditData, setEditActive } = useModalStore();
  const navigate = useNavigate();

  const queryPO = useQueryClient();
  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: ({ formData, id }) => handleUpdatePost({ formData, id }),
    onSuccess: (data) => {
      notify(data?.message);
      setEditData(null);
      setEditActive(false);
      navigate("/profile", { replace: true });

      queryPO.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
export const useDeletePost = () => {
  const queryPO = useQueryClient();
  const notify = (message) => toast(message);

  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (data) => handleDeletePost(data),
    onSuccess: (data) => {
      notify(data?.message);
      queryPO.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
export const useAddComments = () => {
  const queryPO = useQueryClient();
  const notify = (message) => toast(message);
  const { setShowComments } = useModalStore();

  return useMutation({
    mutationKey: ["comments"],
    mutationFn: (data) => handleAddCommentsPost(data),
    onSuccess: (data) => {
      notify(data?.message);
      setShowComments(true);
      queryPO.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
