import React, { useEffect } from "react";
import { useGoogleLoginHandler } from "../hooks/useGoogleLogin.js";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GoogleRedirectHandler = () => {
  const { handleGoogleSuccess, handleGoogleError } = useGoogleLoginHandler();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get("code");

      if (!code) {
        handleGoogleError("No code found in URL");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/googlelogin?code=${code}`
        );
        // console.log("google response", res?.data);
        handleGoogleSuccess(res.data);
      } catch (err) {
        console.error(err);
        handleGoogleError(err?.response?.data?.message || "Login failed");
      }
    };

    handleLogin();
  }, [location.search]);

  return <div>Logging you in...</div>;
};

export default GoogleRedirectHandler;
