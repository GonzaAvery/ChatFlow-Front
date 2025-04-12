import axios from "axios";

const API_URL = "http://localhost:8080/chatrooms"; // Cambia esto si es necesario
const MESSAGES_API_URL = "http://localhost:8080/api/chat";

class ChatRoomService {
  // Método para crear una nueva sala
  static async createChatRoom() {
    try {
      // Haces una solicitud POST sin enviar datos, ya que el backend genera el código
      const response = await axios.post(API_URL);

      // El backend devuelve la sala creada, que incluye el roomCode generado
      return response.data; // Retorna la sala recién creada con el código generado
    } catch (error) {
      throw new Error("Error al crear la sala");
    }
  }

  // Método para obtener todas las salas de chat
  static async getAllChatRooms() {
    try {
      // Realizamos la solicitud GET usando axios
      const response = await axios.get(API_URL);

      // Retornamos los datos de las salas obtenidas
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener las salas de chat.");
    }
  }

  // Método para actualizar el nombre de una sala
  static async updateRoomName(roomCode, newName) {
    try {
      const response = await axios.put(`${API_URL}/${roomCode}/name`, {
        roomName: newName,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el nombre de la sala");
    }
  }

  // Método para obtener los mensajes de una sala
  static async getMessages(roomCode) {
    try {
      const response = await axios.get(`${MESSAGES_API_URL}/${roomCode}`);
      return response.data.map((msg) => ({
        user: msg.user_name,
        message: msg.message,
      }));
    } catch (error) {
      throw new Error("Error al obtener los mensajes");
    }
  }
}

export default ChatRoomService; // Esta línea exporta la clase correctamente
