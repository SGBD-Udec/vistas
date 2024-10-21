import React, { useState } from 'react';

function FormVerTabla({ onSubmit }) {
  const [tableName, setTableName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tableName);
    setTableName(''); // Limpiar el campo después de enviar
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Ver Tabla</button>
    </form>
  );
}

export default FormVerTabla;
