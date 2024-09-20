import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Crea la raíz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
