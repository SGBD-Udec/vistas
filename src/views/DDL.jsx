import React, { useState } from 'react';
import Form from '../components/Form';

function DDL() {
  const [commands, setCommands] = useState([]);
  
  const handleSubmit = (formData) => {
    setCommands([...commands, formData.command]);
  };

  return (
    <div className="ddl">
      <h2>Comandos DDL</h2>
      <Form
        fields={[
          { name: 'command', label: 'Comando DDL', type: 'text' },
        ]}
        onSubmit={handleSubmit}
      />
      <h3>Historial de Comandos</h3>
      <ul>
        {commands.map((cmd, idx) => (
          <li key={idx}>{cmd}</li>
        ))}
      </ul>
    </div>
  );
}

export default DDL;
