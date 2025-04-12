// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ChatRoomService from "./services/ChatRoomService";
import UserPopupPage from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]); // Lista de chats
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Para manejar los errores
  const navigate = useNavigate(); // Usamos el hook useNavigate para la redirección

  // Verificar si el usuario ya está registrado en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Establece el usuario en el estado
      navigate("/home"); // Redirige a la página principal
    }
  }, [navigate]);

  // Cargar las salas de chat al inicio
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true); // Mostrar indicador de carga
      try {
        const response = await ChatRoomService.getAllChatRooms(); // Llama al servicio
        setChats(
          response.map((room) => ({
            room_code: room.roomCode,
            room_name: room.roomName || null, // Incluye room_name si está disponible
          }))
        );
      } catch (err) {
        setError("Error al cargar las salas de chat."); // Maneja errores
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchChats();
  }, []);

  const handleUserRegistration = (newUser) => {
    console.log("Nuevo usuario registrado:", newUser); // Asegúrate de que los datos son correctos
    setUser(newUser); // Actualiza el estado con la información del usuario
    localStorage.setItem("user", JSON.stringify(newUser)); // Guarda el usuario en localStorage
    navigate("/home"); // Redirige a la página principal
  };

  const handleCreateChatRoom = async () => {
    try {
      const newRoom = await ChatRoomService.createChatRoom();
      setChats((prevChats) => [
        ...prevChats,
        {
          room_code: newRoom.roomCode,
          room_name: newRoom.roomName || null,
        },
      ]);
      return newRoom;
    } catch (err) {
      setError("Error al crear la sala de chat.");
      throw err;
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<UserPopupPage onUserRegistration={handleUserRegistration} />}
      />
      <Route
        path="/home"
        element={
          <Home
            handleCreateChatRoom={handleCreateChatRoom}
            chats={chats}
            setChats={setChats}
            user={user}
          />
        }
      />
    </Routes>
  );
}

export default App;
