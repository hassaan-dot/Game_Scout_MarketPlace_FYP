import React, { useState } from "react";
import { Images } from "../../Resources/Images/index";
import { useLogin, useSignup } from "../../../hooks/useLogin";
import { useModalStore } from "../../../store/useModalStore";
import ClipLoader from "react-spinners/ClipLoader";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi"; // Make sure these are imported

const LoginPage = () => {
  const { mutate: handleUserLogin, isPending, isPaused } = useLogin();

  const { mutate: handleUserSignUp } = useSignup();

  const { IsRegister, setIsRegister } = useModalStore();

  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const Connect = () => {
    if (IsRegister) {
      handleUserSignUp({
        email: formData?.email,
        password: formData?.password,
      });
    } else {
      handleUserLogin({ email: formData?.email, password: formData?.password });
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

  return (
    <div
    className="fixed inset-0 flex justify-center items-center w-full min-h-screen h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${Images.ironman})` }}
  >
      <div className="w-96 md:w-[400px] relative z-10 bg-red shadow-lg rounded-3xl p-8 backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-semibold">
            {IsRegister ? "Sign Up" : "Login"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <FiMail className="relative left-3 top-8 transform  text-grey text-lg" />
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
            className="pl-10 p-3 w-full bg-transparent text-sm border border-white text-white rounded-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="relative mt-4">
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey z-10"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={(event) => handleChange("password", event.target.value)}
              required
              placeholder={
                IsRegister ? "Enter you new Password" : "Enter your Password"
              }
              className="pl-10 p-3 w-full text-sm bg-transparent border border-white text-white rounded-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <a href="#" className="ml-auto text-indigo-300 hover:text-white">
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
                loading={true} // Replace with your loading state
                size={20}
                className="inline-block ml-2"
              />
            )}
          </button>
          {!IsRegister && (
            <p className="text-sm text-white mt-6">
              Don't have an account?{" "}
              <button
                onClick={registerFunction}
                href="#"
                className="font-semibold underline text-indigo-300 hover:text-white"
              >
                Register
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
