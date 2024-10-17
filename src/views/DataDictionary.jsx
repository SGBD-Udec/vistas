import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import Form from '../components/Form';

function DataDictionary() {
  const [tables, setTables] = useState([]);

  // Fetch de las tablas al cargar el componente
  const fetchTables = async () => {
    console.log("Iniciando fetchTables...");
    try {
      const response = await axios.get('http://localhost:5000/ejemplos');
      console.log("Datos recibidos:", response.data);
      if (Array.isArray(response.data)) {
        setTables(response.data); // Almacena los datos en el estado
      } else {
        console.log("Los datos no son un arreglo:", response.data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    fetchTables(); // Llama a la función de fetch
  }, []);

  // Función para agregar una nueva tabla
  const handleAddTable = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/ejemplos/agregar', formData);
      console.log("Respuesta del servidor al agregar tabla:", response.data);
      fetchTables(); // Actualiza la lista de tablas después de agregar
    } catch (error) {
      console.error("Error al agregar la tabla:", error);
    }
  };

 // Función para borrar una tabla con confirmación
const handleDeleteTable = async (id) => {
  const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar esta tabla?");
  if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:5000/ejemplos/${id}`); // Usando la URL correcta
      console.log(`Tabla con ID ${id} borrada`);

      // Actualiza el estado eliminando la tabla localmente
      setTables((prevTables) => prevTables.filter((table) => table.id !== id));
      
    } catch (error) {
      console.error("Error al borrar la tabla:", error);
      // Aquí puedes optar por mostrar un mensaje al usuario o manejar el error de alguna otra manera
    }
  } else {
    console.log("Borrado cancelado");
  }
};


  return (
    <div className="data-dictionary">
      <h2>Diccionario de Datos</h2>
      {tables.length === 0 ? (
        <p>Cargando datos...</p>
      ) : (
        <DataTable
          columns={['Descripción', 'ID', 'Nombre']}
          data={tables}
          onDelete={handleDeleteTable} // Pasamos la función de eliminar
        />
      )}
      <h3>Agregar Nueva Tabla</h3>
      <Form
        fields={[
          { name: 'nombre', label: 'Nombre de la Tabla', type: 'text' },
          { name: 'descripcion', label: 'Descripción', type: 'text' },
        ]}
        onSubmit={handleAddTable} // Pasamos la función de agregar
      />
    </div>
  );
}

export default DataDictionary;

