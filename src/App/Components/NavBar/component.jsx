import React, { useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchBar } from "../../../hooks/useDashboard";
import LocalStorage from "../../../services/local-storage";
import { useAuthStore } from "../../../store/useAuthStore";
import { useModalStore } from "../../../store/useModalStore";
import { logo, menu, search, thirdweb } from "../../Resources/assets/index";
import { navlinks } from "../../Resources/constants";

const Navbar = () => {
  const navigate = useNavigate();

  const notify = (message) => toast(message);

  const [isActive, setIsActive] = useState("dashboard");

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const { setToken } = useAuthStore();

  const searchRef = useRef(null);

  const { mutate, isPending } = useSearchBar();

  const {
    setSearchingInput,
    setSearchIndex,
    isSearching,
    setIsSearching,
    searchingInput,
    setMutateVariable,
    searchBarActive,
  } = useModalStore();

  const allCampaigns = useMemo(
    () => ["Lowest Price", "High Ratings", "Ps5", "Discounted", "Ps4"],
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = allCampaigns.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(allCampaigns);
    }
    setShowSuggestions(true);
  };

  const handleFocus = (e) => {
    setIsSearching(true);

    const data = {
      input: e.target.value,
    };

    if (!data) return;

    setSuggestions(allCampaigns);

    setShowSuggestions(true);
  };

  const handleSuggestionClick = (item) => {
    if (isSearching) {
      setSearchQuery(item);
      setSearchingInput(item);
    }

    if (!isSearching) return;

    const data = {
      input: searchingInput,
    };

    setSearchIndex(1);

    mutate(data);

    setShowSuggestions(false);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div ref={searchRef} className=" lg:flex-1 flex flex-col max-w-[458px]">
        {searchBarActive && (
          <div className="flex flex-row py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
            <input
              type="text"
              placeholder="Search for games"
              className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={(e) => handleFocus(e)}
            />
            {isSearching && (
              <div>
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearchingInput("");
                    setSearchIndex(1);
                    setSearchQuery("");
                    setMutateVariable(true);
                  }}
                  className=" rounded-[20px] bg-[red] flex justify-center items-center cursor-pointer right-2 mr-2 p-2 px-3"
                >
                  <IoClose size={20} color="white" className="justify-center" />
                </button>
              </div>
            )}
            <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
              <img
                src={search}
                alt="search"
                className="w-[15px] h-[15px] object-contain"
              />
            </div>
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && isSearching && (
          <div className="mt-2 flex overflow-x-auto space-x-2 px-1 scrollbar-hide">
            {suggestions?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="flex-shrink-0 bg-[#4acd8d] text-[#0f0f10] font-semibold rounded-full px-4 py-1 text-sm hover:bg-[#36b16a] transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        >
          {toggleDrawer ? (
            <IoClose size={34} color="white" />
          ) : (
            <img
              src={menu}
              alt="menu"
              className="w-[34px] h-[34px] object-contain"
            />
          )}
        </div>

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 px-4 rounded-b-lg transition-all duration-700 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          }`}
        >
          <ul className="mb-4 space-y-2">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                  isActive === link.name ? "bg-[#3a3a43]" : ""
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                  if (link.name === "logout") {
                    LocalStorage.remove("token");
                    LocalStorage.remove("user");
                    setToken("");
                    notify("SignOut Successfully");
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" sm:flex hidden flex-row justify-end items-center gap-4 ">
        <Link to="/profile">
          <div className="w-[40px] h-[40px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>

        <button
          onClick={() => {
            LocalStorage.remove("token");
            LocalStorage.remove("user");
            setToken("");
            notify("SignOut Successfully");
          }}
          className="text-white text-sm bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
