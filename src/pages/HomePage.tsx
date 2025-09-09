import React from 'react';
import AlgorithmTable from '../components/AlgorithmTable';
import GanttResults from '../components/GanttResults';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 py-10">
      
      
      {/* Tabla principal */}
      <AlgorithmTable />
      
      {/* Resultados de todos los algoritmos */}
      <GanttResults />
    
    </div>
  );
};

export default HomePage;