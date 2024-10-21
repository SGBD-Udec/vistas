import React, { useState } from 'react';

function FormEliminar({ onSubmit }) {
    const [formData, setFormData] = useState({ table: '', campoCondicion: '', valorCondicion: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ table: '', campoCondicion: '', valorCondicion: '' }); // Reiniciar el formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="table" placeholder="Nombre de la Tabla" value={formData.table} onChange={handleChange} required />
            <input name="campoCondicion" placeholder="Campo de Condición" value={formData.campoCondicion} onChange={handleChange} required />
            <input name="valorCondicion" placeholder="Valor de Condición" value={formData.valorCondicion} onChange={handleChange} required />
            <button type="submit">Eliminar</button>
        </form>
    );
}

export default FormEliminar;
