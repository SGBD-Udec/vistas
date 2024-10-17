//api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/ejemplos'; // Cambia esto si tu API está en otro puerto o dominio

// Función para obtener ejemplos
export const obtenerEjemplos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener ejemplos:', error);
        throw error;
    }
};

// Función para agregar un nuevo ejemplo
export const agregarEjemplo = async (nombre, descripcion) => {
    try {
        const response = await axios.post(API_URL, { nombre, descripcion });
        return response.data;
    } catch (error) {
        console.error('Error al agregar ejemplo:', error);
        throw error;
    }
};

// Función para eliminar un ejemplo
export const eliminarEjemplo = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error al eliminar ejemplo:', error);
        throw error;
    }
};
