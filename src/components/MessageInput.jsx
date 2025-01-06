import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-4 bg-white border-t">
      <input
        type="text"
        className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-r-lg"
        onClick={handleSend}
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
