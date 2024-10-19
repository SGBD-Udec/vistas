import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';

function DML() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía el comando al back-end
      const response = await axios.post('http://localhost:5000/execute_command', {
        command: command,
      });

      // Actualiza el historial de comandos y muestra el mensaje de éxito
      setHistory([...history, { command: command, message: response.data.message }]);
      setMessage('Comando ejecutado correctamente');
    } catch (error) {
      setMessage('Error al ejecutar el comando');
    }

    // Limpiar el campo de texto
    setCommand('');
  };

  return (
    <div className="dml">
      <h2>Operaciones DML</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="command">Ingresa tu comando:</label>
        <input
          type="text"
          id="command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Escribe un comando SQL-like aquí"
          required
        />
        <button type="submit">Ejecutar</button>
      </form>

      <p>{message}</p>

      <h3>Historial de Comandos</h3>
      <ul>
        {history.map((record, idx) => (
          <li key={idx}>
            Comando: {record.command} - Resultado: {record.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DML;
