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
          <React.Fragment key={idx}>
            <tr>
              {columns.map((col) => (
                <td key={col}>{row[columnMap[col]] !== undefined ? row[columnMap[col]] : 'N/A'}</td>
              ))}
              <td>
                <button onClick={() => onDelete(row.id)}>Eliminar</button>
              </td>
            </tr>
            {/* Fila adicional para mostrar las columnas y restricciones */}
            {row.columnas && row.columnas.length > 0 && (
              <tr>
                <td colSpan={columns.length + 1}>
                  <strong>Columnas:</strong>
                  <ul>
                    {row.columnas.map((col, i) => (
                      <li key={i}>
                        {col.nombre} - {col.tipo} 
                        {col.restricciones.length > 0 && (
                          <span> ({col.restricciones.join(', ')})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
