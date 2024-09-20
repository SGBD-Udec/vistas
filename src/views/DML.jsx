import React, { useState } from 'react';
import Form from '../components/Form';

function DML() {
  const [records, setRecords] = useState([]);
  
  const handleSubmit = (formData) => {
    setRecords([...records, formData]);
  };

  return (
    <div className="dml">
      <h2>Operaciones DML</h2>
      <Form
        fields={[
          { name: 'table', label: 'Tabla', type: 'text' },
          { name: 'operation', label: 'Operación (INSERT, UPDATE, DELETE)', type: 'text' },
        ]}
        onSubmit={handleSubmit}
      />
      <h3>Historial de Operaciones</h3>
      <ul>
        {records.map((record, idx) => (
          <li key={idx}>{record.operation} en {record.table}</li>
        ))}
      </ul>
    </div>
  );
}

export default DML;
