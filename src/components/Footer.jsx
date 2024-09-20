import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Creadores de el Prototipo de Módulo de Diccionario de Datos: Adrian Fernando Alonso Baquero, Jorge David Duran Gerena
      </p>
      <p>
        Creadores de el Prototipo de Módulo DML y DDL: Cristian Felipe Gonzalez Rodriguez, Daniel Eduardo Bautista Diaz
      </p>
      <p>Líder del Proyecto: Luis Carlos</p>
      <p>&copy; {new Date().getFullYear()} Prototipo SGBD - Versión 0.1</p>
    </footer>
  );
};

export default Footer;