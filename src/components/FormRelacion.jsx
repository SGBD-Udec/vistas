import React, { useState } from 'react';

function FormRelacion({ onSubmit }) {
  const [tablaOrigen, setTablaOrigen] = useState('');
  const [columnaOrigen, setColumnaOrigen] = useState('');
  const [tablaDestino, setTablaDestino] = useState('');
  const [columnaDestino, setColumnaDestino] = useState('');
  const [tipoRelacion, setTipoRelacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!tablaOrigen || !columnaOrigen || !tablaDestino || !columnaDestino || !tipoRelacion) {
      alert('Todos los campos son obligatorios');
      return;
    }
    
    // Pasar los datos al callback onSubmit
    onSubmit({
      tabla_origen: tablaOrigen,
      columna_origen: columnaOrigen,
      tabla_destino: tablaDestino,
      columna_destino: columnaDestino,
      tipo_relacion: tipoRelacion,
    });

    // Limpiar el formulario
    setTablaOrigen('');
    setColumnaOrigen('');
    setTablaDestino('');
    setColumnaDestino('');
    setTipoRelacion('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-relacion">
      <h3>Registrar Nueva Relación</h3>

      <div>
        <label>Tabla Origen:</label>
        <input
          type="text"
          value={tablaOrigen}
          onChange={(e) => setTablaOrigen(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Columna Origen:</label>
        <input
          type="text"
          value={columnaOrigen}
          onChange={(e) => setColumnaOrigen(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Tabla Destino:</label>
        <input
          type="text"
          value={tablaDestino}
          onChange={(e) => setTablaDestino(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Columna Destino:</label>
        <input
          type="text"
          value={columnaDestino}
          onChange={(e) => setColumnaDestino(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Tipo de Relación:</label>
        <select
          value={tipoRelacion}
          onChange={(e) => setTipoRelacion(e.target.value)}
          required
        >
          <option value="">Seleccione</option>
          <option value="uno-a-uno">Uno a Uno</option>
          <option value="uno-a-muchos">Uno a Muchos</option>
          <option value="muchos-a-muchos">Muchos a Muchos</option>
        </select>
      </div>

      <button type="submit">Agregar Relación</button>
    </form>
  );
}

export default FormRelacion;