import React, { useState } from 'react';

function FormInsertar({ onSubmit }) {
    const [formData, setFormData] = useState({ table: '', value: '', valor: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ table: '', value: '', valor: '' }); // Reiniciar el formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="table" placeholder="Nombre de la Tabla" value={formData.table} onChange={handleChange} required />
            <input name="value" placeholder="Campo" value={formData.value} onChange={handleChange} required />
            <input name="valor" placeholder="Valor" value={formData.valor} onChange={handleChange} required />
            <button type="submit">Insertar</button>
        </form>
    );
}

export default FormInsertar;
