import React, { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import ChatRoomService from "./services/ChatRoomService";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]); // Lista de chats
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Para manejar los errores

  // Cargar los room_code de las salas de chat al inicio
  useEffect(() => {
    const fetchRoomCodes = async () => {
      try {
        const response = await ChatRoomService.getAllRoomCodes();
        // Asegúrate de mapear los objetos para extraer solo el room_code
        setChats(response.map((room) => ({ room_code: room.roomCode })));
      } catch (err) {
        setError("Error al obtener los códigos de las salas de chat.");
      }
    };
    fetchRoomCodes();
  }, []);

  // Función para crear una nueva sala
  const handleCreateChatRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const newChatRoom = await ChatRoomService.createChatRoom(); // Llama al servicio para crear la sala
      setChats([...chats, { room_code: newChatRoom.room_code }]); // Añade la nueva sala con su room_code
    } catch (err) {
      setError("Error al crear la sala.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Chat List */}
      <ChatList
        chats={chats}
        setSelectedChat={setSelectedChat}
        handleCreateChatRoom={handleCreateChatRoom}
        loading={loading}
        error={error}
      />

      {/* Chat Window */}
      <ChatWindow selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
    </div>
  );
}

export default App;