import React from 'react';

function DataTable({ columns, data, onDelete }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const columnMap = {
    'Descripción': 'descripcion',
    'ID': 'id',
    'Nombre': 'nombre'
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col}>{row[columnMap[col]] !== undefined ? row[columnMap[col]] : 'N/A'}</td>
            ))}
            <td>
              <button onClick={() => onDelete(row.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
