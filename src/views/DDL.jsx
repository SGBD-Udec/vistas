import axios from 'axios';
import React, { useState } from 'react';
import FormModificar from '../components/FormModificar';
import FormVerTabla from '../components/FormVerTabla';
import '../components/DDL.css'; // Importar el CSS

function DDL() {
  const [commands, setCommands] = useState([]);
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

  const handleSubmitModificar = async (formData) => {
    try {
      const { operation, tableName, newTableName, description } = formData;

      // Solo enviar solicitud de modificación si es 'MODIFICAR'
      if (operation === 'MODIFICAR') {
        const response = await fetch(`http://localhost:5000/api/dml_ddl/tablas/${tableName}/modificar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: newTableName, // Cambiar a 'nombre'
            descripcion: description,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al modificar la tabla');
        }

        const data = await response.json();
        setSuccessMessage(data.message); // Mostrar mensaje de éxito
      }

      // Agregar la operación al historial de comandos
      setCommands([...commands, formData]);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('No se pudo modificar la tabla.');
      setSuccessMessage(''); // Limpiar mensaje de éxito en caso de error
    }
  };

  const handleVerTabla = async (tableName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dml_ddl/tablas/${tableName}`);
      if (!response.ok) throw new Error('Error al obtener la tabla');
      const data = await response.json();
      setTableData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('No se pudo encontrar la tabla especificada.');
      setTableData(null);
    }
  };

  return (
    <div className="ddl">
      <h2>Comandos DDL</h2>
      <FormModificar onSubmit={handleSubmitModificar} />
      <h3>Ver Tabla</h3>
      <FormVerTabla onSubmit={handleVerTabla} />

      {successMessage && <p className="success-message">{successMessage}</p>} {/* Mensaje de éxito */}
      {error && <p className="error-message">{error}</p>}
      {tableData && (
        <div>
          <h4>Tabla: {tableData.nombre}</h4>
          <p>Descripción: {tableData.descripcion}</p>
          <h5>Columnas:</h5>
          <ul>
            {tableData.columnas.map((col, idx) => (
              <li key={idx}>{col.nombre} - {col.tipo} {col.restricciones.length > 0 && `(${col.restricciones.join(', ')})`}</li>
            ))}
          </ul>
          {tableData.registros.length > 0 ? (
            <div>
              <h5>Registros:</h5>
              <ul>
                {tableData.registros.map((reg, idx) => (
                  <li key={idx}>{JSON.stringify(reg)}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay registros disponibles.</p>
          )}
        </div>
      )}

      <h3>Historial de Comandos</h3>
      <ul>
        {commands.map((cmd, idx) => (
          <li key={idx}>
            {cmd.operation} en {cmd.tableName}
            {cmd.operation === 'MODIFICAR' && (
              <span> (Nuevo Nombre: {cmd.newTableName}, Nueva Descripción: {cmd.description})</span>
            )}
          </li>
        ))}
      </ul>
      <h3>Respuesta del Backend</h3>
      <p>{responseMessage}</p>
    </div>
  );
}

export default DDL;
