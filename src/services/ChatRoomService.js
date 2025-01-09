import axios from 'axios';

const API_URL = 'http://localhost:8080/chatrooms'; // Cambia esto si es necesario

class ChatRoomService {
  // Método para crear una nueva sala
  static async createChatRoom() {
    try {
      // Haces una solicitud POST sin enviar datos, ya que el backend genera el código
      const response = await axios.post(API_URL); 
      
      // El backend devuelve la sala creada, que incluye el roomCode generado
      return response.data;  // Retorna la sala recién creada con el código generado
    } catch (error) {
      throw new Error("Error al crear la sala");
    }
  }
  
  // Método para obtener todas las salas de chat
  static async getAllRoomCodes() {
    try {
      // Realizamos la solicitud GET usando axios
      const response = await axios.get(API_URL);
      
      // Retornamos los datos de las salas obtenidas
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los room codes.");
    }
  }
}

export default ChatRoomService;  // Esta línea exporta la clase correctamente