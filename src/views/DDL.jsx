import React, { useState, useEffect } from 'react';
import FormModificar from '../components/FormModificar';
import FormVerTabla from '../components/FormVerTabla';
import FormRelacion from '../components/FormRelacion';
import '../components/DDL.css';

function DDL() {
  const [commands, setCommands] = useState([]);
  const [tablaData, setTablaData] = useState(null);
  const [relations, setRelations] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchRelations();
  }, []);

  const fetchRelations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dml_ddl/relaciones');
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
      const response = await fetch('http://localhost:5000/api/dml_ddl/relaciones', {
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
      const response = await fetch('http://localhost:5000/api/dml_ddl/relaciones', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(relationData),
      });
      if (response.status === 204) {
        setSuccessMessage('Relación eliminada exitosamente');
        fetchRelations();
      } else {
        throw new Error('Error al eliminar la relación');
      }
    } catch (error) {
      console.error(error);
      setError('No se pudo eliminar la relación.');
    }
  };

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
                    <th key={idx}>{col.nombre}</th> // Encabezados basados en columnas
                  ))}
                </tr>
              </thead>
              <tbody>
                {tablaData.registros.map((reg, idx) => (
                  <tr key={idx}>
                    {tablaData.columnas.map((col, colIdx) => (
                      <td key={colIdx}>{reg[col.nombre] || '-'}</td> // Mostrar valor o un guion si no existe
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

      <FormRelacion onSubmit={handleAddRelation} />

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <h3>Relaciones entre Tablas</h3>
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

export default DDL;
