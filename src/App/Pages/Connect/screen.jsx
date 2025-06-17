import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff, FiMail, FiUser } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
import { useLogin, useSignup } from "../../../hooks/useLogin.js";
import { getGoogleOAuthURL } from "../../../services/googleConsents.js";
import { useModalStore } from "../../../store/useModalStore.js";
import OTPModal from "../../Components/otpModal/component.jsx";
const LoginPage = () => {
  const { mutate: handleUserLogin, isPending, isPaused } = useLogin();

  const { mutate: handleUserSignUp } = useSignup();

  const { IsRegister, setIsRegister, setOtpModalVisible, otpModalVisible } =
    useModalStore();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
  });
  const Connect = () => {
    if (IsRegister) {
      handleUserSignUp({
        email: formData?.email,
        password: formData?.password,
        username: formData?.username,
      });
    } else {
      handleUserLogin({
        email: formData?.email,
        password: formData?.password,
        role: formData?.role,
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
      <div className="flex items-center min-h-screen w-full bg-cover bg-center bg-no-repeat">
        <div className="hidden md:flex w-1/2 h-[700px] bg-[#8C6DFD] rounded-[40px] justify-start items-end p-20">
          <div className="text-white items-end"></div>
        </div>

        <div className="w-96 md:w-[400px] relative z-10 bg-red shadow-lg justify-center items-center rounded-3xl p-8 backdrop-blur-md my-15 ml-4 md:ml-10">
          <div className="mb-8">
            {IsRegister && (
              <button onClick={() => setIsRegister(false)}>
                <div className="mb-4">
                  <FiArrowLeft className="text-white w-8 h-8 cursor-pointer" />
                </div>
              </button>
            )}

            <h2 className="text-white text-3xl font-semibold">
              {IsRegister ? "Sign Up" : "Login"}
            </h2>
            <h4 className="text-[#ccc] text-sm mt-3">
              {IsRegister
                ? "First! Create your account"
                : "Welcome Back, you have been missed!"}
            </h4>
          </div>
          <div className="flex gap-4 mb-4">
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
                formData?.role === "admin"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <FiUser className="relative left-3 top-12 transform  text-white text-lg" />

            {IsRegister && (
              <input
                type="username"
                id="username"
                name="Username"
                value={formData.username}
                onChange={(event) =>
                  handleChange("username", event.target.value)
                }
                required
                placeholder={"Enter you new username"}
                className="pl-10 p-3 w-full bg-transparent text-sm border border-white text-white rounded-lg placeholder focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
              />
            )}
            <FiMail className="relative left-3 top-8 transform  text-white text-lg" />

            <input
              type="email"
              id="email"
              name="Email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              required
              placeholder={
                IsRegister ? "Enter you new email" : "Enter your email"
              }
              className="pl-10 p-3 w-full bg-transparent text-sm border border-white text-[#fff] rounded-lg placeholder focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="relative mt-4">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey z-10"
              >
                {showPassword ? (
                  <FiEyeOff className="text-white text-lg" />
                ) : (
                  <FiEye className=" text-white text-lg" />
                )}
              </button>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                required
                placeholder={
                  IsRegister ? "Enter you new Password" : "Enter your Password"
                }
                className="pl-10 p-3 w-full text-sm bg-transparent border border-white text-[#fff] rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {!IsRegister && (
              <div className="flex items-center mt-6 text-white text-sm">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
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
              onClick={() => Connect()}
              type="submit"
              className="mt-6 bg-[#8C6DFD] text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              {IsRegister ? "Sign Up" : "Login"}
              {isPending && (
                <ClipLoader
                  color="#ffffff"
                  loading={true}
                  size={20}
                  className="inline-block ml-2"
                />
              )}
            </button>
            {!IsRegister && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm text-white mt-6">
                  Don't have an account?{"    "}
                  <button
                    onClick={registerFunction}
                    className="font-semibold underline text-indigo-300 hover:text-white"
                    type="button"
                  >
                    Register
                  </button>
                </p>
              </div>
            )}
          </form>
          <div className="flex flex-col justify-center items-center md:w-[180px] bg-white bg-opacity-10 rounded-xl p-4 text-white mx-auto mt-6">
            <p className="text-sm mb-4">Or sign in with</p>
            <button
              type="button"
              // onClick={() => handleLogin()}
              className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
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
