import React from "react";
import MessageInput from "./MessageInput";

function ChatWindow({
  selectedChat,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) {
  return (
    <div className="w-2/3 bg-white p-4 flex flex-col">
      {selectedChat ? (
        <>
          <h2 className="text-lg font-bold mb-4">{selectedChat.name}</h2>
          <div className="space-y-2 flex-grow overflow-y-auto">
            {selectedChat.messages.map((msg, index) => (
              <p key={index} className="bg-gray-100 p-2 rounded">
                {msg}
              </p>
            ))}
          </div>
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <p className="text-gray-500">
          Selecciona un chat para ver los mensajes.
        </p>
      )}
    </div>
  );
}

export default ChatWindow;
