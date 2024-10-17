//App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import DataDictionary from './views/DataDictionary';
import DDL from './views/DDL';
import DML from './views/DML';
import NotFound from './views/NotFound'; // Asegúrate de tener este componente creado
import Tutorial from './views/Tutorial'; // Asegúrate de que la ruta sea correcta
import Sidebar from './components/Sidebar'; // Sidebar
import './assets/App.css'; // Importa tu CSS
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <div className="layout">
        <header>
          <Header />  {/* Header en la parte superior */}
        </header>
        <div className="main">
          <aside>
            <Sidebar />  {/* Sidebar en la parte izquierda */}
          </aside>
          <section className="content">
            <Routes>
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/data-dictionary" element={<DataDictionary />} />
              <Route path="/ddl" element={<DDL />} />
              <Route path="/dml" element={<DML />} />
              <Route path="*" element={<NotFound />} /> {/* Ruta para manejar 404 */}
            </Routes>
          </section>
        </div>
        <div>
        <Footer /> 
      </div>
      </div>
    </Router>
  );
};

export default App;
