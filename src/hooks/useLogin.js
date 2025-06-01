import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../services/axios";
import LocalStorage from "../services/local-storage";
import { useAuthStore } from "../store/useAuthStore";
import { useModalStore } from "../store/useModalStore";

const handleLogin = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

const handleSignUp = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const useSignup = () => {
  const { setIsRegister } = useModalStore();
  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["SignUp"],
    mutationFn: (data) => handleSignUp(data),
    onSuccess: async (data) => {
      notify("Signup Successful");
      setIsRegister(false);
    },
    onError: (error) => {
      notify(error?.response?.data?.message || "Signup failed");
    },
  });
};

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();
  const notify = (message) => toast(message);
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => handleLogin(data),
    onSuccess: async (data) => {
      notify();
      setToken(data?.token);
      setUser(data?._id);
      LocalStorage.save("token", data?.token);
      LocalStorage.save("user", data?._id);
    },
    onError: (error) => {
      notify(error?.response?.data?.message);
    },
  });
};
