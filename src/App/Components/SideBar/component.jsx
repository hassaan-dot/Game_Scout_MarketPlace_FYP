import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LocalStorage from "../../../services/local-storage";
import { useAuthStore } from "../../../store/useAuthStore";
import { logo, sun } from "../../Resources/assets";
import { navlinks } from "../../Resources/constants";
import { useModalStore } from "../../../store/useModalStore";

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
  const location = useLocation();

  const { setToken } = useAuthStore();
  const notify = (message) => toast(message);
  const {
    setEditActive,
    setEditData,
    setSearchBarActive,
    setIsSearching,
    setSearchingInput,
  } = useModalStore();

  useEffect(() => {
    if (location.pathname === "/Home") {
      setSearchBarActive(true);
    }
  }, [location.pathname, setSearchBarActive]);

  const getIsActive = (linkPath) => {
    if (!linkPath) return false;
    if (linkPath === "/Home" && location.pathname === "/Home") return true;
    if (
      linkPath?.includes("/CreatePosts") &&
      location.pathname.startsWith("/CreatePosts")
    )
      return true;
    return location.pathname === linkPath;
  };

  const sortedNavLinks = [...navlinks].sort((a, b) => {
    if (a.name === "Home") return -1;
    if (b.name === "Home") return 1;
    return 0;
  });

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {sortedNavLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={getIsActive(link.link)}
              handleClick={() => {
                if (link.name === "CreatePosts/:edit") {
                  navigate("/CreatePosts/false");
                  setEditActive(false);
                  setEditData({});
                } else if (link.name === "logout") {
                  LocalStorage.remove("token");
                  LocalStorage.remove("user");
                  setToken("");
                  notify("SignOut Successfully");
                  navigate("/login");
                } else if (link.name === "Home") {
                  navigate("/Home");
                  setSearchBarActive(true);
                } else if (link.name !== "Home" && !link.disabled) {
                  navigate(link.link);
                  setSearchingInput("");
                  setSearchBarActive(false);
                  setIsSearching(false);
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
