import React from 'react';
import './NotFound.css'; // Asegúrate de tener un archivo CSS si deseas estilos

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver al inicio</a> {/* Enlace para volver a la página principal */}
    </div>
  );
};

export default NotFound;
