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
  const [isWaiting, setIsWaiting] = useState(false);

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
    setIsWaiting(true);
  };

  const handleChatBotFromSuggestion = (suggestedText) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: suggestedText },
    ]);
    handleChat({ message: suggestedText });
    setIsWaiting(true);
  };

  const getSuggestionsForMessage = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("gta") || lowerText.includes("grand theft auto")) {
      return [
        "GTA 6 system requirements",
        "GTA 6 map details",
        "Similar games like GTA",
        "Open-world games",
      ];
    }

    if (lowerText.includes("elden ring")) {
      return [
        "Elden Ring tips",
        "Boss guide",
        "Similar games like Elden Ring",
        "Best builds",
      ];
    }

    if (lowerText.includes("fifa")) {
      return [
        "FIFA 24 features",
        "Ultimate Team tips",
        "Career mode best teams",
        "Multiplayer options",
      ];
    }

    if (lowerText.includes("racing")) {
      return [
        "Best racing games",
        "Top car games 2024",
        "Need for Speed vs Forza",
        "Realistic driving simulators",
      ];
    }

    return [
      "Trending games now",
      "Top reviewed games",
      "Multiplayer vs single-player",
    ];
  };

  useEffect(() => {
    if (
      AiResponse &&
      AiResponse !== previousAiResponse.current &&
      chatHistory.length > 0
    ) {
      const lastUserMessage = chatHistory[chatHistory.length - 1]?.text || "";
      const suggestions = getSuggestionsForMessage(lastUserMessage);

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: AiResponse,
          suggestions,
        },
      ]);

      previousAiResponse.current = AiResponse;
      setIsWaiting(false);
    }
  }, [AiResponse, chatHistory]);

  return (
    <div
      className="fixed bottom-28 right-6 w-96 h-[32rem] rounded-2xl shadow-2xl z-50 flex flex-col border"
      style={{
        background: "rgba(28,28,36,0.92)",
        backdropFilter: "blur(10px)",
        borderColor: "#2f2f3a",
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center p-4 rounded-t-2xl"
        style={{
          background: "rgba(28,28,36,0.96)",
          borderBottom: "1px solid #34343e",
        }}
      >
        <h2 className="text-lg font-bold text-white">💬 AI Assistant</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 text-2xl font-bold transition-colors"
        >
          &times;
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-4 py-2 overflow-y-auto space-y-3">
        {chatHistory.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              className={`flex flex-col ${
                isUser ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`relative max-w-[80%] px-4 py-3 text-sm whitespace-pre-line ${
                  isUser
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                    : "bg-[#2d2d38] text-gray-200 border border-[#3d3d4a]"
                } rounded-xl shadow-md`}
                style={{
                  borderTopRightRadius: isUser ? "0.25rem" : "1rem",
                  borderTopLeftRadius: isUser ? "1rem" : "0.25rem",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {msg.suggestions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleChatBotFromSuggestion(suggestion)}
                      className="text-xs text-gray-300 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isWaiting && (
          <div className="flex justify-start">
            <div className="px-4 py-2 text-sm rounded-xl bg-[#2d2d38] text-gray-300 border border-[#3d3d4a] shadow">
              <ClipLoader color="#e5e5e5" size={20} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="px-4 py-2 flex gap-2 flex-wrap ">
        {[
          "When is GTA 6 releasing?",
          "Top open-world games",
          "Best multiplayer games 2024",
          "FIFA 24 new features",
          "System requirements for Elden Ring",
        ].map((query, i) => (
          <button
            key={i}
            onClick={() => setMessage(query)}
            className="text-xs px-3 py-1 bg-[#34343e] text-gray-300 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            {query}
          </button>
        ))}
      </div>

      <div
        className="p-4 border-t flex items-center gap-2 rounded-b-2xl"
        style={{
          background: "rgba(28,28,36,0.96)",
          borderTop: "1px solid #34343e",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleChatBot()}
          className="flex-1 px-4 py-2 text-sm rounded-lg focus:outline-none"
          style={{
            backgroundColor: "#22222a",
            border: "1px solid #3a3a45",
            color: "#e5e5e5",
          }}
        />
        <button
          onClick={handleChatBot}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotPopup;
