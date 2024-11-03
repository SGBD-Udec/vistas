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
        // Obtener estadísticas de tablas
        const response1 = await axios.get('http://localhost:5000/estadisticas');
        if (response1.data && response1.data.estadisticas) {
          setStatistics(prevState => ({
            ...prevState,
            tablesCount: response1.data.estadisticas.total_tablas || 0,
          }));
        } else {
          throw new Error("Estructura de respuesta inesperada desde el endpoint de estadísticas");
        }

        // Obtener estadísticas de operaciones DML y DDL
        const response2 = await axios.get('http://localhost:5000/api/dml_ddl/estadisticas');
        if (response2.data && response2.data.estadisticas) {
          setStatistics(prevState => ({
            ...prevState,
            totalDmlOperations: response2.data.estadisticas.total_dml_operations || 0,
            totalDdlCommands: response2.data.estadisticas.total_ddl_commands || 0,
          }));
        } else {
          throw new Error("Estructura de respuesta inesperada desde el endpoint DML/DDL");
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