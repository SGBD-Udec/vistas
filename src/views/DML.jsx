import React, { useState } from 'react';
import FormInsertar from '../components/FormInsertar';
import FormActualizar from '../components/FormActualizar';
import FormEliminar from '../components/FormEliminar';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dml_ddl';

function DML() {
    const [records, setRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

    const handleInsertar = async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/tablas/${formData.table}/insertar`, {
                nuevo_registro: { [formData.value]: formData.valor }
            });
            setRecords([...records, { operation: 'INSERT', table: formData.table }]);
            console.log(response.data.message);
            setErrorMessage(''); // Limpiar mensaje de error al insertar con éxito
        } catch (error) {
            console.error("Error al insertar registro:", error);
            setErrorMessage("Error al insertar el registro.");
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
            setErrorMessage(''); // Limpiar mensaje de error al actualizar con éxito
        } catch (error) {
            console.error("Error al actualizar registro:", error);
            setErrorMessage("Error al actualizar el registro.");
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
            setErrorMessage(''); // Limpiar mensaje de error al eliminar con éxito
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Error desconocido al eliminar el registro.");
            } else {
                setErrorMessage("Error al conectar con el servidor.");
            }
            console.error("Error al eliminar registro:", error);
        }
    };

    return (
        <div className="dml">
            <h2>Operaciones DML</h2>

            {/* Mostrar mensaje de error si existe */}
            {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}

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
}

export default DML;
