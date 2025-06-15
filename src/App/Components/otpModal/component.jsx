import React, { useRef, useState } from "react";
import { useOtpSubmit } from "../../../hooks/useLogin";
import { icons } from "../../Resources/Icons/icons.js";

const OTPModal = ({ visible, onClose, email }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { mutate, isPending } = useOtpSubmit();

  const handleChangeText = (index, value) => {
    if (value.length <= 1) {
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
      email: email,
    };
    mutate(data);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-max max-w-sm rounded-xl p-6 relative shadow-lg h-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600"
        ></button>

        <div className="flex  mb-4 flex-row justify-start items-start">
          <img src={icons.OptIcon} alt="OTP Icon" className="w-14 h-14 " />
        </div>

        <p className="text-gray-800 text-center text-base font-medium mb-5">
          Enter the OTP confirmation code sent to your email
        </p>

        <div className="flex gap-4 mb-6">
          {otp?.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg"
              value={digit}
              onChange={(e) => handleChangeText(index, e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, index)}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-[#8C6DFD] text-white w-full py-2 rounded-lg font-medium flex justify-center items-center"
        >
          {isPending ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
