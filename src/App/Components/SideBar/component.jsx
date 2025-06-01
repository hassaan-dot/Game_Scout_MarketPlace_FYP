import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LocalStorage from "../../../services/local-storage";
import { useAuthStore } from "../../../store/useAuthStore";
import { logo, sun } from "../../Resources/assets";
import { navlinks } from "../../Resources/constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("Home");

  const { setToken } = useAuthStore();

  const notify = (message) => toast(message);

  return (
    <div className="flex  justify-between items-center bg-[#2c2f32]] flex-col sticky top-5 h-[93vh]">
      <div>
        {/* <Link to="/Connect"> */}
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
        {/* </Link> */}
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
                if (link.name === "logout") {
                  LocalStorage.remove("token");
                  LocalStorage.remove("user");
                  setToken("");
                  notify("SignOut Successfully");
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
