import React, { useState } from 'react';
import FormModificar from '../components/FormModificar';
import FormVerTabla from '../components/FormVerTabla';
import '../components/DDL.css'; // Importar el CSS

function DDL() {
  const [commands, setCommands] = useState([]);
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmitModificar = (formData) => {
    setCommands([...commands, formData]);
    console.log(formData);
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
            {cmd.operation} en {cmd.tableName} con condición {cmd.conditionField} = {cmd.conditionValue}
            {cmd.operation === 'MODIFICAR' && (
              <span> (Modificar: {cmd.updateField} = {cmd.updateValue})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DDL;
