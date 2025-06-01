// import React, { useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import { ContentCard } from "../../Components/index";
// import ChatBotPopup from "../../Components/chatBotPopUp/component";
// import { icons } from "../../../assets/Icons/icons";
// import { useGetData } from "../../../hooks/useDashboard";
// import { data } from "autoprefixer";
// import Pagination from "../../Components/pagination/component";

// const Home = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const { data: allData, isPending } = useGetData();

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };
//   console.log("all data is", allData?.data);

//   return (
//     <>
//       {/* Loading Indicator */}
//       {isPending ? (
//         <div className="flex justify-center items-center h-screen">
//           <ClipLoader color="#ccc" size={60} />
//         </div>
//       ) : (
//         <div className="flex flex-wrap gap-6">
//           {allData &&
//             allData.data?.map((product) => (
//               <ContentCard key={product.id} content={product} />
//             ))}

//           {!allData?.totalPages > 1 && allData && <Pagination />}
//         </div>
//       )}

//       {isChatOpen && (
//         <div className="top-0">
//           <ChatBotPopup onClose={toggleChat} />
//         </div>
//       )}

//       {/* Sticky Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button
//           onClick={toggleChat}
//           className="bg-[#1C1C24] hover:bg-[#ccc] p-4 rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.4)] transition duration-300"
//         >
//           <img
//             src={icons.chatBot}
//             alt="ChatBot Icon"
//             className="w-8 h-8 filter brightness-0 invert"
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ContentCard } from "../../Components/index";
import ChatBotPopup from "../../Components/chatBotPopUp/component";
import { icons } from "../../../assets/Icons/icons";
import { useGetData } from "../../../hooks/useDashboard";
import { Pagination } from "../../Components/pagination/component";
import { useModalStore } from "../../../store/useModalStore";

const Home = () => {
  const { allData } = useModalStore();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [Index, setIndex] = useState(1);

  const { mutate, isPending, error } = useGetData();

  useEffect(() => {
    mutate(Index);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const onPageChangeFunction = (index) => {
    mutate(index);
    if (error) {
      return (
        <div className="text-red-500 text-center mt-10">
          Failed to load data.
        </div>
      );
    }
  };
  return (
    <>
      {allData && allData.totalPages > 1 && (
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
        <div className="flex flex-wrap gap-6">
          {allData && allData.data.length > 0 ? (
            allData.data.map((product) => (
              <ContentCard key={product.id} content={product} />
            ))
          ) : (
            <div className="w-full text-center text-gray-500">
              No data found.
            </div>
          )}
        </div>
      )}

      {isChatOpen && (
        <div className="top-0">
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
    </>
  );
};

export default Home;
