import React from 'react';
import Card from '../components/Card';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard Principal</h2>
      <div className="card-container">
        <Card title="Tablas Definidas" content="5 Tablas" />
        <Card title="Operaciones DDL" content="15 Comandos DDL ejecutados" />
        <Card title="Operaciones DML" content="10 Comandos DML ejecutados" />
        
      </div>
    </div>
  );
}

export default Dashboard;
