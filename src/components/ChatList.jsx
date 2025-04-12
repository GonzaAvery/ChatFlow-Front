import React, { useEffect, useRef } from "react";

const ChatList = ({ chats, onChatSelect, selectedChat }) => {
  const chatListRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Guardar la posición del scroll antes de la actualización
  useEffect(() => {
    if (chatListRef.current) {
      scrollPositionRef.current = chatListRef.current.scrollTop;
    }
  }, [chats]);

  // Restaurar la posición del scroll después de la actualización
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [chats]);

  return (
    <div
      ref={chatListRef}
      className="overflow-y-auto h-full"
      style={{ scrollBehavior: "auto" }}
    >
      {chats.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No hay chats disponibles
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <li
              key={chat.roomCode}
              onClick={() =>
                onChatSelect({ code: chat.roomCode, name: chat.roomName })
              }
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.code === chat.roomCode ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{chat.roomName}</h3>
                  <p className="text-sm text-gray-500">{chat.roomCode}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(
                    chat.lastMessageAt || chat.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
