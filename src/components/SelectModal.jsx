import React, { useState } from 'react';
import Modal from 'react-modal';
import './SelectModal.css'; // Asegúrate de que el CSS esté en la misma carpeta

Modal.setAppElement('#root'); // Ajusta esto según el ID de tu elemento root

function SelectModal({ isOpen, onRequestClose, options, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleSelect = () => {
    if (selectedValue === null) {
      setErrorMessage('No has seleccionado ninguna opción.'); // Mostrar mensaje de error si no hay selección
    } else {
      onSelect(selectedValue); // Ejecutar la función de selección
      onRequestClose(); // Cerrar el modal después de seleccionar
      setErrorMessage(''); // Limpiar el mensaje de error
    }
  };

  const handleOptionClick = (value) => {
    // Cambiar la opción seleccionada o deseleccionarla si se hace clic nuevamente
    setSelectedValue(selectedValue === value ? null : value);
    setErrorMessage(''); // Limpiar el mensaje de error al seleccionar una opción
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="custom-modal-content"
      overlayClassName="custom-modal-overlay"
    >
      <h2>Seleccionar Opción</h2>
      <div className="options-container">
        {options.map(option => (
          <button 
            key={option.value} 
            className={`option-button ${selectedValue === option.value ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
      
      <div className="modal-actions">
        <button 
          className="select-button" 
          onClick={handleSelect} 
          disabled={selectedValue === null} // Deshabilitar si no hay selección
        >
          Seleccionar
        </button>
        <button className="close-button" onClick={onRequestClose}>Cerrar</button>
      </div>
    </Modal>
  );
}

export default SelectModal;
