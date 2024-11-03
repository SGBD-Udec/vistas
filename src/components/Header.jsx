import React from 'react';
import logo from '../assets/Imagenes/Escudo_Universidad_de_Cundinamarca.webp'; // Asegúrate de usar la ruta correcta de tu imagen

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <h1>Prototipo Sistema gestor de bases de datos</h1>
    </header>
  );
}

export default Header;

