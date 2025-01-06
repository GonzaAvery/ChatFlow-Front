import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <div className="w-2/3 h-full flex flex-col">
      <div className="flex-grow p-4 overflow-y-scroll bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.isOwn
                ? "text-right"
                : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.isOwn ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
