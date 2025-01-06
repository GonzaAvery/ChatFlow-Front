import React, { useState, useEffect } from "react";
import ChatRoomService from './services/ChatRoomService'; // Asegúrate de que la ruta sea correcta

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState(""); // Estado para el nuevo mensaje
  const [chats, setChats] = useState([]); // Lista de chats
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Para manejar los errores

  // Cargar las salas de chat al inicio
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await ChatRoomService.getAllChatRooms(); // Obtiene las salas del backend
        setChats(response); // Establece las salas de chat
      } catch (err) {
        setError("Error al obtener las salas de chat.");
      }
    };
    fetchChats();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));
      setNewMessage(""); // Limpia el campo de texto
    }
  };

  // Función para crear una nueva sala
  const handleCreateChatRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const newChatRoom = await ChatRoomService.createChatRoom(); // Llama al servicio para crear la sala
      setChats([...chats, newChatRoom]); // Añade la nueva sala a la lista de chats
    } catch (err) {
      setError("Error al crear la sala.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Chat List */}
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
          {(chats || []).map((chat) => (
            <li
              key={chat.id}
              className={`p-2 cursor-pointer ${
                selectedChat?.id === chat.id
                  ? "bg-blue-200"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Muestra el error si ocurre */}
      </div>

      {/* Chat Window */}
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

            {/* Formulario para enviar mensaje */}
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
          </>
        ) : (
          <p className="text-gray-500">
            Selecciona un chat para ver los mensajes.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;