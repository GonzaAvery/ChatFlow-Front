import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import Header from "../components/Header";

const Home = () => {
  const [chats] = useState([
    { id: 1, name: "Chat 1", lastMessage: "Hola, ¿cómo estás?" },
    { id: 2, name: "Chat 2", lastMessage: "¡Nos vemos mañana!" },
  ]);
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
    // Simula mensajes del chat
    setMessages([
      { content: "Hola", isOwn: false },
      { content: "¿Qué tal?", isOwn: true },
    ]);
  };

  const handleSendMessage = (message) => {
    setMessages((prev) => [...prev, { content: message, isOwn: true }]);
  };

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      {activeChat ? (
        <div className="flex flex-col w-full">
          <Header title={`Chat ${activeChat}`} />
          <ChatWindow messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Selecciona un chat para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default Home;
