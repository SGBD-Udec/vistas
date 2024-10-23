import React, { useState } from 'react';

function FormModificar({ onSubmit }) {
  const [operation, setOperation] = useState('MODIFICAR'); // 'MODIFICAR' o 'ELIMINAR'
  const [tableName, setTableName] = useState('');
  const [newTableName, setNewTableName] = useState(''); // Nombre nuevo de la tabla
  const [description, setDescription] = useState(''); // Nueva descripción

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      operation,     // Indica si es una operación de "MODIFICAR" o "ELIMINAR"
      tableName,     // Nombre de la tabla actual
      newTableName,  // Nuevo nombre de la tabla (si aplica)
      description,   // Nueva descripción (si aplica)
    };

    onSubmit(formData);

    // Limpiar campos después de enviar
    setTableName('');
    setNewTableName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Operación:</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="MODIFICAR">Modificar</option>
          <option value="ELIMINAR">Eliminar</option>
        </select>
      </div>

      <div>
        <label>Nombre de la Tabla:</label>
        <input 
          type="text" 
          value={tableName} 
          onChange={(e) => setTableName(e.target.value)} 
          placeholder="Nombre de la tabla" 
          required 
        />
      </div>

      {operation === 'MODIFICAR' && (
        <>
          <div>
            <label>Nuevo Nombre de la Tabla:</label>
            <input 
              type="text" 
              value={newTableName} 
              onChange={(e) => setNewTableName(e.target.value)} 
              placeholder="Nuevo nombre de la tabla" 
              required 
            />
          </div>

          <div>
            <label>Nueva Descripción:</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Nueva descripción de la tabla" 
              required 
            />
          </div>
        </>
      )}

      {operation === 'ELIMINAR' && (
        <div>
          <p>Al eliminar la tabla, se eliminará toda la estructura y los datos asociados.</p>
        </div>
      )}

      <button type="submit">{operation === 'MODIFICAR' ? 'Modificar Tabla' : 'Eliminar Tabla'}</button>
    </form>
  );
}

export default FormModificar;
