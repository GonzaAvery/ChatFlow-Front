import React from "react";

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="w-1/3 h-full bg-gray-100 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="p-3 mb-2 bg-white shadow-sm rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectChat(chat.id)}
          >
            <p className="font-medium">{chat.name}</p>
            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;