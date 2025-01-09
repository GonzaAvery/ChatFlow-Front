import React from "react";

function ChatList({ chats, setSelectedChat, handleCreateChatRoom, loading, error }) {
  return (
    <div className="w-1/3 bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chats</h2>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreateChatRoom} // Llama a la función para crear una sala
          disabled={loading} // Deshabilita el botón mientras se crea la sala
        >
          {loading ? "Creando..." : "Crear Sala"}
        </button>
      </div>
      <ul>
        {(chats || []).map((chat, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer ${chat.selected ? "bg-blue-200" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat.room_code} {/* Mostrar el roomCode (ajustado para que coincida con el backend) */}
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500">{error}</p>} {/* Muestra el error si ocurre */}
    </div>
  );
}

export default ChatList;