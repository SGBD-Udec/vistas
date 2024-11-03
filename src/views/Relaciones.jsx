// src/components/Relaciones.jsx

import React, { useEffect, useState } from 'react';
import FormRelacion from '../components/FormRelacion';
import '../components/DDL.css';

function Relaciones() {
  const [relations, setRelations] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchRelations();
  }, []);

  const fetchRelations = async () => {
    try {
      const response = await fetch('http://localhost:5000/relaciones');
      if (!response.ok) throw new Error('Error al obtener relaciones');
      const data = await response.json();
      setRelations(data);
    } catch (error) {
      console.error(error);
      setError('No se pudieron cargar las relaciones.');
    }
  };

  const handleAddRelation = async (relationData) => {
    try {
      const response = await fetch('http://localhost:5000/relaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(relationData),
      });
      if (!response.ok) throw new Error('Error al agregar la relación');
      setSuccessMessage('Relación agregada exitosamente');
      fetchRelations();
    } catch (error) {
      console.error(error);
      setError('No se pudo agregar la relación.');
    }
  };

  const handleDeleteRelation = async (relationData) => {
    try {
        const response = await fetch('http://localhost:5000/relaciones', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(relationData), // Asegúrate de que esto esté estructurado correctamente
        });
        if (response.status === 204) {
            setSuccessMessage('Relación eliminada exitosamente');
            fetchRelations(); // Asegúrate de que esta función esté implementada
        } else {
            throw new Error('Error al eliminar la relación');
        }
    } catch (error) {
        console.error(error);
        setError('No se pudo eliminar la relación.');
    }
};



  return (
    <div className="relaciones">
      <h2>Relaciones entre Tablas</h2>
      <FormRelacion onSubmit={handleAddRelation} />
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Tabla Origen</th>
            <th>Columna Origen</th>
            <th>Tabla Destino</th>
            <th>Columna Destino</th>
            <th>Tipo Relación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {relations.map((rel, idx) => (
            <tr key={idx}>
              <td>{rel.tabla_origen}</td>
              <td>{rel.columna_origen}</td>
              <td>{rel.tabla_destino}</td>
              <td>{rel.columna_destino}</td>
              <td>{rel.tipo_relacion}</td>
              <td>
                <button onClick={() => handleDeleteRelation(rel)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Relaciones;