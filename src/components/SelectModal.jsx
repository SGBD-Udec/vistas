// SelectModal.jsx
import React from 'react';
import Modal from 'react-modal';
import './SelectModal.css'; // Asegúrate de importar el CSS para el estilo

Modal.setAppElement('#root'); // Ajusta esto según el ID de tu elemento root

function SelectModal({ isOpen, onRequestClose, options, onSelect }) {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(''); // Estado para el mensaje de error

  const handleSelect = () => {
    if (selectedValue === null) {
      setErrorMessage('No has seleccionado ninguna opción.'); // Establece el mensaje de error
    } else {
      onSelect(selectedValue);
      onRequestClose(); // Cierra el modal después de seleccionar
      setErrorMessage(''); // Limpia el mensaje de error
    }
  };

  const handleOptionClick = (value) => {
    setSelectedValue(selectedValue === value ? null : value);
    setErrorMessage(''); // Limpia el mensaje de error al seleccionar
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Seleccionar Opción</h2>
      <div className="options-container">
        {options.map(option => (
          <button 
            key={option.value} 
            className={`option-button ${selectedValue === option.value ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.value)} // Cambia aquí
          >
            {option.label}
          </button>
        ))}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar el mensaje de error */}
      <button onClick={handleSelect} disabled={selectedValue === null}>Seleccionar</button>
      <button onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
}

export default SelectModal;
