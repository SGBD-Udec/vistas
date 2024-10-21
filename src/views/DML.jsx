import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import FormInsertar from '../components/FormInsertar'; // Componente para el formulario de inserción
import FormActualizar from '../components/FormActualizar'; // Componente para el formulario de actualización
import FormEliminar from '../components/FormEliminar'; // Componente para el formulario de eliminación
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dml_ddl';

function DML() {
    const [records, setRecords] = useState([]);

    const handleInsertar = async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/tablas/${formData.table}/insertar`, {
                nuevo_registro: { [formData.value]: formData.valor }
            });
            setRecords([...records, { operation: 'INSERT', table: formData.table }]);
            console.log(response.data.message);
        } catch (error) {
            console.error("Error al insertar registro:", error);
        }
    };

    const handleActualizar = async (formData) => {
        try {
            const response = await axios.put(`${API_URL}/tablas/${formData.table}/actualizar`, {
                campos: { [formData.value]: formData.valor },
                campo_condicion: formData.campoCondicion,
                valor_condicion: formData.valorCondicion
            });
            setRecords([...records, { operation: 'UPDATE', table: formData.table }]);
            console.log(response.data.message);
        } catch (error) {
            console.error("Error al actualizar registro:", error);
        }
    };

    const handleEliminar = async (formData) => {
        try {
            const response = await axios.delete(`${API_URL}/tablas/${formData.table}/eliminar`, {
                data: {
                    campo_condicion: formData.campoCondicion,
                    valor_condicion: formData.valorCondicion
                }
            });
            setRecords([...records, { operation: 'DELETE', table: formData.table }]);
            console.log(response.data.message);
        } catch (error) {
            console.error("Error al eliminar registro:", error);
        }
    };

    return (
        <div className="dml">
            <h2>Operaciones DML</h2>
            
            <h3>Historial de Operaciones</h3>
            <ul>
                {records.map((record, idx) => (
                    <li key={idx}>{record.operation} en {record.table}</li>
                ))}
            </ul>

            <h3>Insertar Registro</h3>
            <FormInsertar onSubmit={handleInsertar} />

            <h3>Actualizar Registro</h3>
            <FormActualizar onSubmit={handleActualizar} />

            <h3>Eliminar Registro</h3>
            <FormEliminar onSubmit={handleEliminar} />
        </div>
    );
>>>>>>> origin/ingjorge
}

export default DML;
