import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatRoom from "../components/ChatRoom";
import ChatRoomService from "../services/ChatRoomService";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function Home() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const username = userData.username;

  const updateChatsList = async () => {
    try {
      const response = await ChatRoomService.getAllChatRooms();
      // Ordenar los chats por lastMessageAt
      const sortedChats = response.sort((a, b) => {
        const dateA = new Date(a.lastMessageAt || a.createdAt);
        const dateB = new Date(b.lastMessageAt || b.createdAt);
        return dateB - dateA;
      });
      setChats(sortedChats);
    } catch (error) {
      console.error("Error al obtener las salas:", error);
    }
  };

  // Efecto para establecer la conexión WebSocket
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setStompClient(client);
    });

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []); // Sin dependencias para que solo se ejecute una vez

  // Efecto para suscribirse a los chats cuando cambian
  useEffect(() => {
    if (!stompClient) return;

    // Desuscribirse de todas las suscripciones anteriores
    stompClient.subscriptions = {};

    // Suscribirse a todas las salas existentes
    chats.forEach((chat) => {
      stompClient.subscribe(`/topic/${chat.roomCode}`, (message) => {
        const newMessage = JSON.parse(message.body);
        // Actualizar el chat en la lista sin recargar
        setChats((prevChats) => {
          // Encontrar el chat actualizado
          const updatedChat = prevChats.find(
            (c) => c.roomCode === chat.roomCode
          );
          if (!updatedChat) return prevChats;

          // Crear el chat actualizado con la nueva fecha y mantener el roomName
          const chatWithNewDate = {
            ...updatedChat,
            lastMessageAt: new Date().toISOString(),
            roomName: updatedChat.roomName, // Aseguramos que se mantenga el roomName
          };

          // Filtrar el chat actualizado de la lista y agregarlo al principio
          const filteredChats = prevChats.filter(
            (c) => c.roomCode !== chat.roomCode
          );
          return [chatWithNewDate, ...filteredChats];
        });
      });
    });
  }, [chats, stompClient]);

  // Efecto para cargar los chats inicialmente
  useEffect(() => {
    updateChatsList();
  }, []);

  const handleCreateChat = async () => {
    try {
      const newRoom = await ChatRoomService.createChatRoom();
      setChats((prevChats) => [newRoom, ...prevChats]);
      setSelectedChat({ code: newRoom.roomCode, name: newRoom.roomName });
    } catch (error) {
      console.error("Error al crear la sala:", error);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatList
            chats={chats}
            onChatSelect={handleChatSelect}
            selectedChat={selectedChat}
          />
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleCreateChat}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Crear Nuevo Chat
          </button>
        </div>
      </div>
      <div className="flex-1">
        {selectedChat ? (
          <ChatRoom
            roomCode={selectedChat.code}
            roomName={selectedChat.name}
            stompClient={stompClient}
            username={username}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecciona un chat para comenzar
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
