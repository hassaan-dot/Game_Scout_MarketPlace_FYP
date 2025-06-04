import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { icons } from "../../Resources/Icons/icons";
import { useGetData, useSearchBar } from "../../../hooks/useDashboard";
import { useModalStore } from "../../../store/useModalStore";
import ChatBotPopup from "../../Components/chatBotPopUp/component";
import { ContentCard } from "../../Components/index";
import { Pagination } from "../../Components/pagination/component";

const Home = () => {
  const {
    allData,
    isSearching,
    searchingInput,
    setSearchIndex,
    searchingIndex,
    setIsSearching,
    mutateVariable,
  } = useModalStore();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const { mutate, isPending, error } = useGetData();

  const { mutate: searching } = useSearchBar();

  useEffect(() => {
    mutate(1);
  }, [mutateVariable]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const onPageChangeFunction = (index) => {
    if (!isSearching && !searchingInput) {
      mutate(index);
    }
    const data = {
      input: searchingInput,
    };
    if (isSearching && searchingInput) {
      searching(data);
    }
    if (isSearching && !searchingInput) {
      setIsSearching(false);
    }
    setSearchIndex(index);
    if (error && !isPending) {
      return (
        <div className="text-red-500 text-center mt-10">
          Failed to load data.
        </div>
      );
    }
  };

  return (
    <div>
      {allData && allData.totalPages > 1 && !isPending && (
        <Pagination
          onPageChange={onPageChangeFunction}
          currentPage={allData?.currentPage}
          totalPages={allData?.totalPages}
        />
      )}
      {isPending ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#ccc" size={60} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 mt-10 mb-10 px-4">
          {allData && allData.data.length > 0 ? (
            allData.data.map((product) => (
              <div key={product.id} className="m-0">
                <ContentCard content={product} />
              </div>
            ))
          ) : (
            <div className="w-full text-center text-gray-500 mt-20 mb-20">
              No Data Found
            </div>
          )}
        </div>
      )}
      {isChatOpen && (
        <div className="m-20">
          <ChatBotPopup onClose={toggleChat} />
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          aria-label="Toggle Chat Bot"
          className="bg-[#1C1C24] hover:bg-[#ccc] p-4 rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.4)] transition duration-300"
        >
          <img
            src={icons.chatBot}
            alt="ChatBot Icon"
            className="w-8 h-8 filter brightness-0 invert"
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
