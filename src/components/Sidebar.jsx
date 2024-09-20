import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/tutorial">Explicación</Link></li>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/data-dictionary">Diccionario de Datos</Link></li>
        <li><Link to="/ddl">DDL</Link></li>
        <li><Link to="/dml">DML</Link></li>
        
      </ul>
    </nav>
  );
}

export default Sidebar;
