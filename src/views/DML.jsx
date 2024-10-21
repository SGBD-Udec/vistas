import React, { useState } from 'react';
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
}

export default DML;
