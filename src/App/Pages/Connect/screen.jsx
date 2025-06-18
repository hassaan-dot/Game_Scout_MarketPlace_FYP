import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff, FiMail, FiUser } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
import { useLogin, useSignup } from "../../../hooks/useLogin.js";
import { getGoogleOAuthURL } from "../../../services/googleConsents.js";
import { useModalStore } from "../../../store/useModalStore.js";
import OTPModal from "../../Components/otpModal/component.jsx";

const LoginPage = () => {
  const { mutate: handleUserLogin, isPending } = useLogin();
  const { mutate: handleUserSignUp } = useSignup();

  const { IsRegister, setIsRegister, setOtpModalVisible, otpModalVisible } =
    useModalStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
    remember: false,
  });

  const Connect = () => {
    if (IsRegister) {
      handleUserSignUp({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });
    } else {
      handleUserLogin({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
    }
  };

  const handleChange = (field, input) => {
    setFormData((prev) => ({
      ...prev,
      [field]: input,
    }));
  };

  const registerFunction = () => {
    setFormData({
      email: "",
      password: "",
    });
    setIsRegister(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const handleLogin = () => {
    window.location.href = getGoogleOAuthURL();
  };

  return (
    <>
      {!otpModalVisible && (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat px-4 lg:px-12">
          <div className="hidden lg:flex flex-[1.2] bg-[#8C6DFD] h-[700px] rounded-3xl items-end p-12">
            <div className="text-white text-lg font-bold">
              Welcome back, you've been missed!
            </div>
          </div>

          <div className="flex-1 bg-opacity-5 shadow-lg rounded-3xl p-8 backdrop-blur-md w-full max-w-[600px] mt-10 lg:mt-0 ml-10">
            {IsRegister && (
              <button
                onClick={() => {
                  setIsRegister(false);
                  setFormData({ email: "", password: "", username: "" });
                }}
                className="mb-4"
              >
                <FiArrowLeft className="text-white w-6 h-6 cursor-pointer" />
              </button>
            )}

            <h2 className="text-white text-3xl font-semibold">
              {IsRegister ? "Sign Up" : "Login"}
            </h2>
            <p className="text-sm text-[#ccc] mt-2">
              {IsRegister
                ? "First! Create your account"
                : "Welcome back, you've been missed!"}
            </p>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => handleChange("role", "user")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  formData.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => handleChange("role", "admin")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  formData.role === "admin"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                }`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              {IsRegister && (
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-white" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Enter your new username"
                    required
                    className="pl-10 p-3 w-full bg-transparent text-sm border border-white text-[#ccc] rounded-lg placeholder:text-[#ccc] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-white" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder={
                    IsRegister ? "Enter your new email" : "Enter your email"
                  }
                  required
                  className="pl-10 p-3 w-full bg-transparent text-sm border border-white text-[#ccc] rounded-lg placeholder:text-[#ccc] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 z-10"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-white" />
                  ) : (
                    <FiEye className="text-white" />
                  )}
                </button>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder={
                    IsRegister
                      ? "Enter your new password"
                      : "Enter your password"
                  }
                  required
                  className="pl-10 p-3 w-full bg-transparent text-sm border border-[#ccc] text-[#ccc] rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {!IsRegister && (
                <div className="flex items-center text-white text-sm mt-2">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => handleChange("remember", e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="remember">Remember me</label>
                  <a
                    href="#"
                    className="ml-auto text-indigo-300 hover:text-white"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                onClick={Connect}
                className="mt-4 bg-[#8C6DFD] text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                {IsRegister ? "Sign Up" : "Login"}
                {isPending && (
                  <ClipLoader
                    color="#fff"
                    loading={true}
                    size={20}
                    className="ml-2"
                  />
                )}
              </button>
            </form>

            {!IsRegister && (
              <div className="text-center mt-6 text-white">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <button
                    onClick={registerFunction}
                    className="font-semibold underline text-indigo-300 hover:text-white"
                  >
                    Register
                  </button>
                </p>
              </div>
            )}
            <div className="flex flex-col items-center bg-white bg-opacity-10 rounded-xl p-4 text-white mt-6">
              <p className="text-sm mb-3">Or sign in with</p>
              <button
                type="button"
                onClick={handleLogin}
                className="flex items-center gap-2 border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>
            </div>
          </div>
        </div>
      )}

      {otpModalVisible && (
        <OTPModal
          visible={otpModalVisible}
          email={formData.email}
          onClose={() => setOtpModalVisible(false)}
        />
      )}
    </>
  );
};

export default LoginPage;
