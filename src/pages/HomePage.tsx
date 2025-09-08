import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
        
      <h2>Bienvenido a la página de inicio</h2>
      <p>Esta es la página principal de tu aplicación React.</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Características de este proyecto:</h3>
        <ul>
          <li>React 19 con TypeScript</li>
          <li>Vite para desarrollo rápido</li>
          <li>Estructura de carpetas organizada</li>
          <li>Componentes reutilizables</li>
          <li>Hooks personalizados</li>
          <li>Utilidades comunes</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;