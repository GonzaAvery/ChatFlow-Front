import axios from 'axios';

const API_URL = 'http://localhost:8080/chatrooms'; // Cambia esto si es necesario

class ChatRoomService {
  // Método para obtener todas las salas de chat
  static async getAllChatRooms() {
    try {
      const response = await axios.get(API_URL); // Realiza la solicitud GET al backend
      return response.data; // Retorna los datos (lista de salas de chat)
    } catch (error) {
      throw new Error("Error al obtener las salas de chat");
    }
  }

  // Método para crear una nueva sala
  static async createChatRoom() {
    try {
      const response = await axios.post(API_URL); // Envía una solicitud POST para crear una nueva sala
      return response.data; // Retorna la sala recién creada
    } catch (error) {
      throw new Error("Error al crear la sala");
    }
  }
}

export default ChatRoomService;  // Esta línea exporta la clase correctamente