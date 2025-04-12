import React, { useState, useEffect, useRef } from "react";
import ChatRoomService from "../services/ChatRoomService";

function ChatRoom({ roomCode, roomName, stompClient, username }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [date, setDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(roomName || "");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await ChatRoomService.getMessages(roomCode);
        setMessages(response);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    };

    if (roomCode) {
      fetchMessages();
    }
  }, [roomCode]);

  useEffect(() => {
    if (stompClient && roomCode) {
      const subscription = stompClient.subscribe(
        `/topic/${roomCode}`,
        (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, roomCode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mostrar la fecha si no hay mensajes
  useEffect(() => {
    if (messages.length === 0) {
      setDate(
        new Date().toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !roomCode) return;

    const message = {
      message: newMessage,
      user: username || "Anónimo",
    };

    if (stompClient) {
      stompClient.send(`/app/chat/${roomCode}`, {}, JSON.stringify(message));
      setNewMessage("");
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!roomCode || !newName.trim()) return;

    try {
      await ChatRoomService.updateRoomName(roomCode, newName.trim());
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el nombre:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <form onSubmit={handleUpdateName} className="flex-1">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Nuevo nombre de la sala"
              />
            </form>
          ) : (
            <h2 className="text-xl font-semibold text-gray-800">
              {roomName || `Sala ${roomCode}`}
            </h2>
          )}
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateName}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  Guardar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No hay mensajes en esta sala
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.user === username
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="text-sm font-semibold mb-1">{msg.user}</div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatRoom;
