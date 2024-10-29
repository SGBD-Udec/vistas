import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Dashboard() {
  const [statistics, setStatistics] = useState({
    tablesCount: 0,
    totalDmlOperations: 0,
    totalDdlCommands: 0,
    error: null,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dml_ddl/estadisticas');
        
        // Verifica si la respuesta contiene la estructura esperada
        if (response.data && response.data.estadisticas) {
          setStatistics({
            tablesCount: response.data.estadisticas.total_tablas || 0,
            totalDmlOperations: response.data.estadisticas.total_dml_operations || 0, // Ajustado a la clave correcta
            totalDdlCommands: response.data.estadisticas.total_ddl_commands || 0, // Ajustado a la clave correcta
            error: null,
          });
        } else {
          throw new Error("Estructura de respuesta inesperada");
        }
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        setStatistics(prevState => ({
          ...prevState,
          error: 'No se pudieron cargar las estadísticas.',
        }));
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard Principal</h2>
      {statistics.error && <p className="error-message">{statistics.error}</p>}
      <div className="card-container">
        <Card title="Tablas Definidas" content={`${statistics.tablesCount} Tablas`} />
        <Card title="Operaciones DDL" content={`${statistics.totalDdlCommands} Comandos DDL ejecutados`} />
        <Card title="Operaciones DML" content={`${statistics.totalDmlOperations} Comandos DML ejecutados`} />
      </div>
    </div>
  );
}

export default Dashboard;
