import React from "react";

function MessageInput({ newMessage, setNewMessage, handleSendMessage }) {
  return (
    <form onSubmit={handleSendMessage} className="flex mt-4">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-grow p-2 border rounded"
        placeholder="Escribe un mensaje..."
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
}

export default MessageInput;
