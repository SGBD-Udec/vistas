import React, { useState } from 'react';

function FormModificar({ onSubmit }) {
  const [tableName, setTableName] = useState('');
  const [operation, setOperation] = useState('MODIFICAR'); // Puede ser 'MODIFICAR' o 'ELIMINAR'
  const [conditionField, setConditionField] = useState('');
  const [conditionValue, setConditionValue] = useState('');
  const [updateField, setUpdateField] = useState('');
  const [updateValue, setUpdateValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tableName,
      operation,
      conditionField,
      conditionValue,
      updateField,
      updateValue,
    };
    onSubmit(formData);
    // Limpiar campos
    setTableName('');
    setConditionField('');
    setConditionValue('');
    setUpdateField('');
    setUpdateValue('');
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
      <div>
        <label>Operación:</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="MODIFICAR">Modificar</option>
          <option value="ELIMINAR">Eliminar</option>
        </select>
      </div>
      {operation === 'MODIFICAR' && (
        <>
          <div>
            <label>Campo a Modificar:</label>
            <input 
              type="text" 
              value={updateField} 
              onChange={(e) => setUpdateField(e.target.value)} 
              placeholder="Campo a modificar" 
              required 
            />
          </div>
          <div>
            <label>Nuevo Valor:</label>
            <input 
              type="text" 
              value={updateValue} 
              onChange={(e) => setUpdateValue(e.target.value)} 
              placeholder="Nuevo valor" 
              required 
            />
          </div>
        </>
      )}
      <div>
        <label>Campo de Condición:</label>
        <input 
          type="text" 
          value={conditionField} 
          onChange={(e) => setConditionField(e.target.value)} 
          placeholder="Campo para condición" 
          required 
        />
      </div>
      <div>
        <label>Valor de Condición:</label>
        <input 
          type="text" 
          value={conditionValue} 
          onChange={(e) => setConditionValue(e.target.value)} 
          placeholder="Valor para condición" 
          required 
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormModificar;
