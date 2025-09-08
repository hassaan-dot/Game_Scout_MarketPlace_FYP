import React, { useRef, useState } from "react";
import { useOtpSubmit } from "../../../hooks/useLogin.js";
import { icons } from "../../Resources/Icons/icons.js";

const OTPModal = ({ visible, onClose, email }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { mutate, isPending } = useOtpSubmit();

  const handleChangeText = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const data = {
      otp: otp.join(""),
      email,
    };
    mutate(data);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-[#13131A] bg-opacity-90 flex items-center justify-center z-50 py-8 px-10 ">
      <div className="bg-[#1E1E28] text-white rounded-2xl w-[90%] max-w-[40%] text-center shadow-xl relative py-5 mx-auto px-8 ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <img src={icons.OptIcon} alt="otp" className="w-12 h-12" />
        </div>

        <h2 className="text-lg font-semibold mb-1">Check your email</h2>
        <p className="text-gray-400 text-sm mb-6">
          Enter the verification code sent to <br />
          <span className="text-white font-medium">{email}</span>
        </p>

        <div className="flex justify-center gap-3 mb-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-14 h-12 rounded-md border border-gray-600 bg-transparent text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition p-5"
              value={digit}
              onChange={(e) => handleChangeText(index, e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, index)}
            />
          ))}
        </div>

        <p className="text-sm text-gray-400 mb-3">
          Didn’t get a code?{" "}
          <button className="text-blue-400 font-medium hover:underline text-sm">
            resend
          </button>
        </p>

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 w-full text-sm rounded-lg font-semibold text-base"
        >
          {isPending ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto " />
          ) : (
            "Verify email"
          )}
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
