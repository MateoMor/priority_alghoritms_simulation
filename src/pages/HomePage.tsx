import React from 'react';
import AlgorithmTable from '../components/AlgorithmTable';
import GanttDiagram from '../components/GanttDiagram';

const HomePage: React.FC = () => {
  // Datos de ejemplo para el diagrama de Gantt con el nuevo formato
  const ganttData = [
    { 
      process: "P1", 
      startArray: [0, 4], 
      endArray: [2, 7] 
    }, // P1 ejecuta en intervalos [0-2] y [4-7]
    { 
      process: "P2", 
      startArray: [2], 
      endArray: [4] 
    }, // P2 ejecuta en intervalo [2-4]
    { 
      process: "P3", 
      startArray: [7], 
      endArray: [9] 
    } // P3 ejecuta en intervalo [7-9]
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Simulador de Algoritmos de Planificación
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ingresa los datos de los procesos y ejecuta el algoritmo de planificación por prioridad
          para ver cómo se organizan y ejecutan en el sistema operativo.
        </p>
      </div>
      
      {/* Componente de resumen que usa el estado compartido */}
      
      {/* Tabla principal */}
      <AlgorithmTable />
      
      {/* Diagrama de Gantt con ApexCharts */}
      <GanttDiagram data={ganttData} />
    
    </div>
  );
};

export default HomePage;