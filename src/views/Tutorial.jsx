import React from 'react';

function Tutorial() {
  return (
    <div className="tutorial">
      <h2>Explicación del Prototipo</h2>
      <p>
        Este dashboard muestra cómo se organiza un Sistema de Gestión de Bases de Datos (SGDB) con los módulos de 
        DDL (Lenguaje de Definición de Datos), DML (Lenguaje de Manipulación de Datos), y Diccionario de Datos. 
        A través del prototipo, puedes realizar operaciones comunes de bases de datos, como crear estructuras (DDL), 
        manipular datos (DML) y revisar el diccionario de datos.
      </p>
      
      <h3>Diccionario de Datos</h3>
      <p>
        El Diccionario de Datos te permite crear y gestionar la estructura de las tablas en la base de datos. 
        Aquí puedes definir:
      </p>
      <ul>
        <li><strong>Nombre de la Tabla:</strong> El nombre que identificarás la tabla en tu base de datos.</li>
        <li><strong>Descripción:</strong> Una breve descripción que explica el propósito de la tabla.</li>
        <li><strong>Columnas:</strong> Especifica las columnas de la tabla, junto con sus tipos de datos y restricciones. 
            Puedes definir tipos como VARCHAR, INT, y más, así como restricciones como PRIMARY KEY, NOT NULL, etc.</li>
      </ul>

      <h3>DDL (Lenguaje de Definición de Datos)</h3>
      <p>
        En esta sección, puedes modificar la estructura de las tablas existentes y eliminar tablas que ya no necesites. 
        Las operaciones DDL incluyen:
      </p>
      <ul>
        <li><strong>Modificar Tabla:</strong> Cambia la estructura de una tabla existente. Puedes añadir o eliminar columnas según lo requieras.</li>
        <li><strong>Eliminar Tabla:</strong> Borra una tabla y toda la información que contiene.</li>
        <li><strong>Ver Tablas:</strong> Revisa la lista de tablas definidas junto con sus descripciones y columnas.</li>
      </ul>

      <h3>DML (Lenguaje de Manipulación de Datos)</h3>
      <p>
        En esta sección, puedes realizar operaciones sobre los registros de las tablas. Las funciones DML incluyen:
      </p>
      <ul>
        <li><strong>Insertar Registro:</strong> Agrega nuevos registros a una tabla específica con los valores correspondientes.</li>
        <li><strong>Actualizar Registro:</strong> Modifica la información de un registro existente según sea necesario.</li>
        <li><strong>Eliminar Registro:</strong> Elimina un registro de una tabla, borrando la información de forma permanente.</li>
      </ul>

      <h3>Conclusión</h3>
      <p>
        Este prototipo te ofrece una interfaz amigable para gestionar tu base de datos de manera efectiva. 
        Explora todas las funcionalidades y empieza a crear, modificar y manipular tus datos con facilidad.
      </p>
    </div>
  );
}

export default Tutorial;

