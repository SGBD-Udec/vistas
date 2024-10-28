import React, { useState } from 'react';
import './MyForm.css';

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
        <form onSubmit={handleSubmit} className="form-container">
            <input 
                name="table" 
                placeholder="Nombre de la Tabla" 
                value={formData.table} 
                onChange={handleChange} 
                required 
                className="form-input" 
            />
            <input 
                name="value" 
                placeholder="Campo" 
                value={formData.value} 
                onChange={handleChange} 
                required 
                className="form-input" 
            />
            <input 
                name="valor" 
                placeholder="Valor" 
                value={formData.valor} 
                onChange={handleChange} 
                required 
                className="form-input" 
            />
            <button 
                type="submit" 
                className="form-button"
            >
                Insertar
            </button>
        </form>
    );
}

export default FormInsertar;
