import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import Form from '../components/Form';

function DataDictionary() {
  const [tables, setTables] = useState([
    { name: 'Usuarios', columns: '5', description: 'Tabla de usuarios' },
    { name: 'Productos', columns: '8', description: 'Tabla de productos' },
  ]);

  const handleAddTable = (formData) => {
    setTables([...tables, formData]);
  };

  return (
    <div className="data-dictionary">
      <h2>Diccionario de Datos</h2>
      <DataTable
        columns={['Nombre', 'Columnas', 'Descripción']}
        data={tables}
      />
      <h3>Agregar Nueva Tabla</h3>
      <Form
        fields={[
          { name: 'name', label: 'Nombre de la Tabla', type: 'text' },
          { name: 'columns', label: 'Número de Columnas', type: 'number' },
          { name: 'description', label: 'Descripción', type: 'text' },
        ]}
        onSubmit={handleAddTable}
      />
    </div>
  );
}

export default DataDictionary;
