import React, { useState } from "react";
import axios from "axios";

const UserPopupPage = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(!localStorage.getItem("user"));

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      alert("Por favor, ingresa un nombre de usuario válido.");
      return;
    }

    try {
      // Llamada al backend para registrar al usuario
      const response = await axios.post(`http://localhost:8080/users?username=${username}`);

      const user = response.data;

      // Guardar datos en localStorage
      const userData = {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Llamar a onRegister para notificar al componente principal
      onRegister(userData);

      // Ocultar el popup
      setPopupVisible(false);
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
      alert("Hubo un error al registrar al usuario. Inténtalo nuevamente.");
    }
  };

  return (
    isPopupVisible && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Ingresa tu nombre de usuario</h2>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Nombre de usuario"
            className="border p-2 w-full rounded mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    )
  );
};

export default UserPopupPage;
