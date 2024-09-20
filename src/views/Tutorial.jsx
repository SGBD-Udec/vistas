import React from 'react';

function Tutorial() {
  return (
    <div className="tutorial">
      <h2>Explicación del Prototipo</h2>
      <p>Este dashboard muestra cómo se organiza un SGDB con los módulos de DDL, DML, y Diccionario de Datos. A través del prototipo, puedes realizar operaciones comunes de bases de datos, como crear estructuras (DDL), manipular datos (DML), y revisar el diccionario de datos.</p>
      <h3>Diccionario de Datos</h3>
      <p>El diccionario de datos te permite ver y editar la estructura de las tablas en la base de datos.</p>
      <h3>DDL (Lenguaje de Definición de Datos)</h3>
      <p>En esta sección, puedes definir las estructuras de las tablas utilizando comandos DDL como CREATE, ALTER, y DROP.</p>
      <h3>DML (Lenguaje de Manipulación de Datos)</h3>
      <p>Aquí puedes insertar, actualizar y eliminar registros en las tablas creadas.</p>
    </div>
  );
}

export default Tutorial;
