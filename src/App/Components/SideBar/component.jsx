import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    <img
      src={imgUrl}
      alt="icon"
      className={`w-1/2 h-1/2 ${!isActive && "grayscale"}`}
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path

  const { setToken } = useAuthStore();
  const notify = (message) => toast(message);

  // Helper to check if navlink is active by matching pathname
  const getIsActive = (link) => {
    // Example: match exact path or startsWith for nested routes
    return location.pathname === link;
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={getIsActive(link.link)}
              handleClick={() => {
                if (!link.disabled) {
                  navigate(link.link);
                }
                if (link.name === "logout") {
                  LocalStorage.remove("token");
                  LocalStorage.remove("user");
                  setToken("");
                  notify("SignOut Successfully");
                  navigate("/login"); // redirect to login or wherever appropriate
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
