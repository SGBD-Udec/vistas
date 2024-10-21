import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Dashboard() {
  const [statistics, setStatistics] = useState({
    tablesCount: 0,
    columnsCount: 0,
    totalDmlOperations: 0,
    totalDdlCommands: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/estadisticas');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard Principal</h2>
      <div className="card-container">
        <Card title="Tablas Definidas" content={`${statistics.tablesCount} Tablas`} />
        <Card title="Operaciones DDL" content={`${statistics.totalDdlCommands} Comandos DDL ejecutados`} />
        <Card title="Operaciones DML" content={`${statistics.totalDmlOperations} Comandos DML ejecutados`} />
      </div>
    </div>
  );
}

export default Dashboard;
