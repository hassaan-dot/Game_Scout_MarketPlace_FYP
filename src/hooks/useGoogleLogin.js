import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LocalStorage from "../services/local-storage";
import { toast } from "react-toastify";

export const useGoogleLoginHandler = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleSuccess = (data) => {
    alert(data, "data");
    console.log(data);
    navigate("/Home");
    toast("Google Login Successful");
    setToken(data.token);
    setUser(data._id);

    LocalStorage.save("token", data.token);
    LocalStorage.save("user", data);
  };

  const handleGoogleError = (errorMessage) => {
    toast.error(errorMessage || "Google login failed");
  };

  return { handleGoogleSuccess, handleGoogleError };
};
