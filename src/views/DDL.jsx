import axios from 'axios';
import React, { useState } from 'react';
import Form from '../components/Form';

function DDL() {
  const [commands, setCommands] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (formData) => {
    setCommands([...commands, formData.command]);
    
    try {
      const response = await axios.post('http://localhost:5000/create', {
        sql_command: formData.command,
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error al enviar el comando:', error);
      setResponseMessage(error.response ? error.response.data.error : 'Error en la conexión con el backend');
    }
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
      <h3>Respuesta del Backend</h3>
      <p>{responseMessage}</p>
    </div>
  );
}

export default DDL;
