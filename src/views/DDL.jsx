// src/views/DDL.jsx

import React, { useState } from 'react';
import FormModificar from '../components/FormModificar';
import FormVerTabla from '../components/FormVerTabla';
import '../components/DDL.css';

function DDL() {
  const [commands, setCommands] = useState([]);
  const [tablaData, setTablaData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitModificar = async (formData) => {
    try {
      const { operation, tableName, newTableName, description } = formData;
      
      if (operation === 'MODIFICAR') {
        const response = await fetch(`http://localhost:5000/api/dml_ddl/tablas/${tableName}/modificar`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: newTableName, descripcion: description }),
        });
        if (!response.ok) throw new Error('Error al modificar la tabla');
        const data = await response.json();
        setSuccessMessage(data.message);
        
      } else if (operation === 'ELIMINAR') {
        const response = await fetch(`http://localhost:5000/api/dml_ddl/tablas/${tableName}`, { method: 'DELETE' });
        if (response.status === 204) setSuccessMessage('Tabla eliminada exitosamente');
        else if (response.status === 404) throw new Error('Tabla no encontrada.');
        else throw new Error('Error al eliminar la tabla');
      }
      
      setCommands([...commands, formData]);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || 'No se pudo completar la operación.');
      setSuccessMessage('');
    }
  };

  const handleVerTabla = async (tableName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dml_ddl/tablas/${tableName}`);
      if (!response.ok) throw new Error('Error al obtener la tabla');
      const data = await response.json();
      setTablaData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('No se pudo encontrar la tabla especificada.');
      setTablaData(null);
    }
  };

  return (
    <div className="ddl">
      <h2>Comandos DDL</h2>
      <FormModificar onSubmit={handleSubmitModificar} />
      <h3>Ver Tabla</h3>
      <FormVerTabla onSubmit={handleVerTabla} />
      
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {tablaData && (
        <div>
          <h4>Tabla: {tablaData.nombre}</h4>
          <p>Descripción: {tablaData.descripcion}</p>
          <h5>Columnas:</h5>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Restricciones</th>
              </tr>
            </thead>
            <tbody>
              {tablaData.columnas.map((col, idx) => (
                <tr key={idx}>
                  <td>{col.nombre}</td>
                  <td>{col.tipo}</td>
                  <td>{col.restricciones.length > 0 ? col.restricciones.join(', ') : 'Ninguna'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>Registros:</h5>
          {tablaData.registros.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  {tablaData.columnas.map((col, idx) => (
                    <th key={idx}>{col.nombre}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tablaData.registros.map((reg, idx) => (
                  <tr key={idx}>
                    {tablaData.columnas.map((col, colIdx) => (
                      <td key={colIdx}>{reg[col.nombre] || '-'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay registros disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DDL;

