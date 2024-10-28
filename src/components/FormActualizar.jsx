import React, { useState } from 'react';
import './MyForm.css'; // Asegúrate de que la ruta sea correcta

function FormActualizar({ onSubmit }) {
    const [formData, setFormData] = useState({ table: '', value: '', valor: '', campoCondicion: '', valorCondicion: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ table: '', value: '', valor: '', campoCondicion: '', valorCondicion: '' }); // Reiniciar el formulario
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
                placeholder="Nuevo Valor" 
                value={formData.valor} 
                onChange={handleChange} 
                required 
                className="form-input" 
            />
            <input 
                name="campoCondicion" 
                placeholder="Campo de Condición" 
                value={formData.campoCondicion} 
                onChange={handleChange} 
                required 
                className="form-input" 
            />
            <input 
                name="valorCondicion" 
                placeholder="Valor de Condición" 
                value={formData.valorCondicion} 
                onChange={handleChange} 
                required 
                className="form-input" 
            />
            <button 
                type="submit" 
                className="form-button"
            >
                Actualizar
            </button>
        </form>
    );
}

export default FormActualizar;
