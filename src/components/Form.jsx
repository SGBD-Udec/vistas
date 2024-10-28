// Form.jsx
import React, { useState } from 'react';
import SelectModal from './SelectModal'; // Asegúrate de importar tu nuevo componente modal
import './Form.css';

function Form({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [columnas, setColumnas] = useState([{ nombre: '', tipo: '', restricciones: [] }]);
  const [modalTipoOpen, setModalTipoOpen] = useState(false);
  const [modalRestriccionOpen, setModalRestriccionOpen] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedRestriccion, setSelectedRestriccion] = useState(null);
  const [errorMessages, setErrorMessages] = useState({}); // Estado para mensajes de error

  const tiposDeDatos = [
    { value: "INT", label: "INTEGER" },
    { value: "VARCHAR", label: "VARCHAR" },
    { value: "TEXT", label: "TEXT" },
    { value: "DATE", label: "DATE" },
    { value: "BIGINT", label: "BIGINT" },
    { value: "DECIMAL", label: "DECIMAL" },
    { value: "FLOAT", label: "FLOAT" },
    { value: "DOUBLE", label: "DOUBLE" },
    { value: "BOOLEAN", label: "BOOLEAN" },
    { value: "DATETIME", label: "DATETIME" },
    { value: "TIMESTAMP", label: "TIMESTAMP" },
    { value: "BLOB", label: "BLOB" },
    { value: "CHAR", label: "CHAR" },
    
    
];

  const opcionesRestricciones = [
    { value: "PRIMARY KEY", label: "PRIMARY KEY" },
    { value: "FOREIGN KEY", label: "FOREIGN KEY" },
    { value: "NOT NULL", label: "NOT NULL" },
    { value: "AUTO_INCREMENT", label: "AUTO_INCREMENT" },
    { value: "UNIQUE", label: "UNIQUE" },
    { value: "CHECK", label: "CHECK" },
    { value: "DEFAULT", label: "DEFAULT" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar mensaje de error al cambiar el campo
    if (errorMessages[e.target.name]) {
      setErrorMessages({ ...errorMessages, [e.target.name]: '' });
    }
  };

  const handleColumnChange = (index, name, value) => {
    const updatedColumnas = [...columnas];
    updatedColumnas[index][name] = value;
    setColumnas(updatedColumnas);
  };

  const handleAddColumn = () => {
    setColumnas([...columnas, { nombre: '', tipo: '', restricciones: [] }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrorMessages = {};

    // Validar campos Nombre y Descripción
    if (!formData.nombre || formData.nombre.trim() === '') {
      newErrorMessages.nombre = 'El campo Nombre debe estar lleno.';
    }
    if (!formData.descripcion || formData.descripcion.trim() === '') {
      newErrorMessages.descripcion = 'El campo Descripción debe estar lleno.';
    }

    // Validar columnas
    columnas.forEach((col, index) => {
      if (!col.nombre || col.nombre.trim() === '') {
        newErrorMessages[`columnaNombre${index}`] = `El campo Nombre de la Columna ${index + 1} debe estar lleno.`;
      }
    });

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages); // Establecer mensajes de error
    } else {
      onSubmit({ ...formData, columnas }); // Enviar también las columnas
      // Limpiar los campos del formulario
      setFormData({});
      setColumnas([{ nombre: '', tipo: '', restricciones: [] }]); // Restablecer a una sola columna
      setSelectedTipo(null); // Limpiar selección de tipo
      setSelectedRestriccion(null); // Limpiar selección de restricción
      setErrorMessages({}); // Limpiar mensajes de error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
          {errorMessages[field.name] && <p className="error-message">{errorMessages[field.name]}</p>} {/* Mensaje de error */}
        </div>
      ))}
      <h4>Columnas</h4>
      {columnas.map((columna, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la Columna"
            value={columna.nombre}
            onChange={(e) => handleColumnChange(index, 'nombre', e.target.value)}
          />
          {errorMessages[`columnaNombre${index}`] && <p className="error-message">{errorMessages[`columnaNombre${index}`]}</p>} {/* Mensaje de error */}
          <button type="button" onClick={() => setModalTipoOpen(true)}>
            Seleccionar Tipo
          </button>
          <span>{columna.tipo || 'Tipo no seleccionado'}</span>
          
          <SelectModal 
            isOpen={modalTipoOpen}
            onRequestClose={() => setModalTipoOpen(false)}
            options={tiposDeDatos}
            onSelect={(value) => {
              handleColumnChange(index, 'tipo', value);
              setSelectedTipo(value);
            }}
          />
          
          <button type="button" onClick={() => setModalRestriccionOpen(true)}>
            Seleccionar Restricción
          </button>
          <span>{columna.restricciones.length > 0 ? columna.restricciones.join(', ') : 'Ninguna restricción seleccionada'}</span>

          <SelectModal 
            isOpen={modalRestriccionOpen}
            onRequestClose={() => setModalRestriccionOpen(false)}
            options={opcionesRestricciones}
            onSelect={(value) => {
              handleColumnChange(index, 'restricciones', [value]); // Solo una restricción
              setSelectedRestriccion(value);
            }}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddColumn}>Agregar Columna</button>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;
