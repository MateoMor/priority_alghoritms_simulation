import React from 'react';
import GanttDiagram from './GanttDiagram';
import { useProcessStore } from '../store/processStore';

const GanttResults: React.FC = () => {
  const { ganttResults } = useProcessStore();

  return (
    <div className="space-y-8 mt-8">

      {/* Grid de 2 columnas en pantallas grandes, 1 en móviles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {/* FIFO */}
        <div className="bg-gray-50 rounded-lg ">
          <h3 className="text-xl font-semibold  text-center text-blue-800">
            FIFO (First In First Out)
          </h3>
          {ganttResults.fifo.length > 0 ? (
            <GanttDiagram data={ganttResults.fifo} />
          ) : (
            <div className="text-center text-gray-500 ">
              No hay datos. Ejecuta el algoritmo primero.
            </div>
          )}
        </div>

        {/* SJF */}
        <div className="bg-gray-50 rounded-lg ">
          <h3 className="text-xl font-semibold  text-center text-green-800">
            SJF (Shortest Job First)
          </h3>
          {ganttResults.sjf.length > 0 ? (
            <GanttDiagram data={ganttResults.sjf} />
          ) : (
            <div className="text-center text-gray-500 ">
              No hay datos. Ejecuta el algoritmo primero.
            </div>
          )}
        </div>

        {/* Prioridad */}
        <div className="bg-gray-50 rounded-lg ">
          <h3 className="text-xl font-semibold  text-center text-purple-800">
            Prioridad 
          </h3>
          {ganttResults.prioridad.length > 0 ? (
            <GanttDiagram data={ganttResults.prioridad} />
          ) : (
            <div className="text-center text-gray-500 ">
              No hay datos. Ejecuta el algoritmo primero.
            </div>
          )}
        </div>

        {/* SRTF */}
        <div className="bg-gray-50 rounded-lg ">
          <h3 className="text-xl font-semibold  text-center text-red-800">
            SRTF (Shortest Remaining Time First)
          </h3>
          {ganttResults.srtf.length > 0 ? (
            <GanttDiagram data={ganttResults.srtf} />
          ) : (
            <div className="text-center text-gray-500 ">
              No hay datos. Ejecuta el algoritmo primero.
            </div>
          )}
        </div>

        {/* Round Robin - Centrado en la última fila */}
        <div className="bg-gray-50 rounded-lg ">
          <h3 className="text-xl font-semibold  text-center text-red-800">
            Round Robin | Quantum = 2
          </h3>
          {ganttResults.roundRobin.length > 0 ? (
            <GanttDiagram data={ganttResults.roundRobin} />
          ) : (
            <div className="text-center text-gray-500 ">
              No hay datos. Ejecuta el algoritmo primero.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GanttResults;