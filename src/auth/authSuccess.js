import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "../hooks/useLogin"; // adjust path

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { mutate: googleLogin } = useGoogleLogin();

  useEffect(() => {
    if (token) {
      googleLogin(token); // triggers mutation
    }
  }, [token, googleLogin]);

  return <div>Signing in with Google...</div>;
};

export default OAuthSuccess;
