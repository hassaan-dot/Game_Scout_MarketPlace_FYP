import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchBar } from "../../../hooks/useDashboard";
import { logo, menu, search, thirdweb } from "../../Resources/assets";
import { navlinks } from "../../Resources/constants";
import { CustomButton } from "../index";
import { useModalStore } from "../../../store/useModalStore";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  const navigate = useNavigate();

  const {
    setSearchingInput,
    setSearchIndex,
    isSearching,
    setIsSearching,
    searchingInput,
  } = useModalStore();

  const [isActive, setIsActive] = useState("campaign");

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const [address, setAddress] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  const { mutate, isPending } = useSearchBar();

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
    console.log("Search test:", searchingInput);

    const data = {
      input: searchingInput,
    };

    setSearchIndex(1);

    mutate(data);

    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Connect = () => {
    navigate("/Connect");
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div
        ref={searchRef}
        className="relative lg:flex-1 flex flex-col max-w-[458px]"
      >
        <div className="flex flex-row py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            type="text"
            placeholder="Search for campaigns"
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={(e) => handleFocus(e)}
          />
          {isSearching && (
            <div className="w-[72px] h-full rounded-[20px] bg-[red] flex justify-center items-center cursor-pointer right-2 mr-2">
              <button
                onClick={() => {
                  setIsSearching(false);
                  setSearchingInput("");
                  setSearchIndex(1);
                  setSearchQuery("");
                }}
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

      <div className="sm: flex hidden flex bg-[#000] flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else Connect();
          }}
        />
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else Connect();
          }}
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
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
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else Connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
