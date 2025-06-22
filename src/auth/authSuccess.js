import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LocalStorage from "../services/local-storage";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const userString = searchParams.get("user");
  const error = searchParams.get("error");
  const setAuthToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (error) {
      toast.error("Google login failed. Please try again.");
      return;
    }

    if (!token || !userString) return;

    try {
      const decodedUser = JSON.parse(decodeURIComponent(userString));

      toast.success("Successfully Logged In");

      LocalStorage.save("token", token);
      LocalStorage.save("user", decodedUser);

      setAuthToken(token);
      navigate("/Home");
    } catch (err) {
      console.error("Failed to parse user data:", err);
      toast.error("Invalid user data received.");
    }
  }, [token, error, userString, navigate, setAuthToken]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Logging you in via Google...</p>
    </div>
  );
};

export default OAuthSuccess;
