import axios from 'axios';

const API_URL = 'http://localhost:8080/users';  // URL de la API backend

class UserService {
  // Método para registrar un nuevo usuario
  createUser(username) {
    return axios.post(API_URL, null, { params: { username } })
      .then(response => response.data)
      .catch(error => {
        console.error('Error al crear el usuario:', error);
        throw error;
      });
  }

  // Método para verificar si un usuario es válido
  isUserValid(id) {
    return axios.get(`${API_URL}/${id}/valid`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al verificar el usuario:', error);
        throw error;
      });
  }

  // Método para obtener todos los usuarios (solo para pruebas)
  getAllUsers() {
    return axios.get(API_URL)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
        throw error;
      });
  }
}

export default new UserService();
