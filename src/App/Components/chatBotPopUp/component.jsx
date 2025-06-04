import React, { useEffect, useRef, useState } from "react";
import { useChatBot } from "../../../hooks/useDashboard";
import { useModalStore } from "../../../store/useModalStore";
import ReactMarkdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";

const ChatBotPopup = ({ onClose }) => {
  const [message, setMessage] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const previousAiResponse = useRef("");

  const chatEndRef = useRef(null);

  const { AiResponse } = useModalStore();

  const { mutate: handleChat } = useChatBot();

  const [isWaiting, setIsWaiting] = useState(false); // NEW

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleChatBot = () => {
    if (!message.trim()) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    handleChat({ message });
    setMessage("");
    setIsWaiting(true); // Set to waiting
  };

  useEffect(() => {
    if (
      AiResponse &&
      AiResponse !== previousAiResponse.current &&
      chatHistory.length > 0
    ) {
      setChatHistory((prev) => [...prev, { sender: "bot", text: AiResponse }]);
      previousAiResponse.current = AiResponse;
      setIsWaiting(false);
    }
  }, [AiResponse, chatHistory]);

  return (
    <div className="fixed bottom-28 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-md font-semibold">{"Intelligence Help"}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-2 rounded text-sm ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <ReactMarkdown>{msg?.text}</ReactMarkdown>
          </div>
        ))}

        {isWaiting && (
          <div className="max-w-[80%] p-2 rounded text-sm bg-gray-200 text-gray-800 self-start">
            <ClipLoader color="#4B5563" size={20} />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="w-full p-2 border rounded text-sm"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleChatBot()}
        />
        <button
          onClick={handleChatBot}
          className="mt-2 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotPopup;
