import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api_dashboard } from "../services/axios";
import { useModalStore } from "../store/useModalStore";

const handleChatBot = async (data) => {
  const res = await api_dashboard.post("/chatBot", data);
  return res.data;
};
const handleGetData = async (index) => {
  const res = await api_dashboard.post(`/data/${index}`);
  return res.data;
};

const handleSearch = async (searchingInput, searchIndex) => {
  const data = {
    input: searchingInput,
  };
  const res = await api_dashboard.post(`/search/${searchIndex}`, data);
  return res.data;
};

export const useGetData = () => {
  const { setallData } = useModalStore();
  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["GetData"],
    mutationFn: (index) => handleGetData(index),
    onSuccess: async (data) => {
      setallData(data);
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
export const useChatBot = () => {
  const { setAiResponse } = useModalStore();
  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["chatBot"],
    mutationFn: (data) => handleChatBot(data),
    onSuccess: async (data) => {
      setAiResponse(data?.reply);
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};

export const useSearchBar = () => {
  const { setallData, setIsSearching, searchIndex, searchingInput } =
    useModalStore();

  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["search"],
    mutationFn: (data) => handleSearch(searchingInput, searchIndex),
    onSuccess: async (data) => {
      console.log("Search data:", data);
      setallData(data);
      setIsSearching(true);
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
