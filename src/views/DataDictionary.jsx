import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import Form from '../components/Form';

function DataDictionary() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null); // Para manejar mensajes de error

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tablas');
      if (Array.isArray(response.data)) {
        setTables(response.data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAddTable = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/tablas/agregar', formData);
      fetchTables();
      setError(null); // Limpiar el mensaje de error si se agrega correctamente
    } catch (error) {
      console.error("Error al agregar la tabla:", error);
      // Manejo de errores específico
      if (error.response && error.response.data.error) {
        setError(error.response.data.error); // Mostrar error del servidor
      } else {
        setError("Error desconocido. Inténtalo de nuevo."); // Error genérico
      }
    }
  };
  

  const handleDeleteTable = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar esta tabla?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/tablas/${id}`);
        setTables((prevTables) => prevTables.filter((table) => table.id !== id));
      } catch (error) {
        console.error("Error al borrar la tabla:", error);
      }
    }
  };

  const tableFields = [
    { name: 'nombre', label: 'Nombre de la Tabla', type: 'text' },
    { name: 'descripcion', label: 'Descripción', type: 'text' },
  ];

  return (
    <div className="data-dictionary">
      <h2>Diccionario de Datos</h2>
      {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
      {tables.length === 0 ? (
        <p>Cargando datos...</p>
      ) : (
        <DataTable
          columns={['ID', 'Nombre', 'Descripción']}
          data={tables}
          onDelete={handleDeleteTable}
        />
      )}
      <h3>Agregar Nueva Tabla</h3>
      <Form
        fields={tableFields}
        onSubmit={handleAddTable}
      />
    </div>
  );
}

export default DataDictionary;
