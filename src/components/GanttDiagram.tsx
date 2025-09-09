import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

// Interfaz para los datos de entrada
interface ProcessData {
  process: string;
  startArray: Array<number>;
  endArray: Array<number>;
}

// Props del componente
interface GanttDiagramProps {
  data?: ProcessData[];
}

// Datos por defecto si no se pasan como props
const defaultData: ProcessData[] = [
  { process: "P1", startArray: [0, 4], endArray: [2, 7] }, // P1 ejecuta [0-2] y [4-7]
  { process: "P2", startArray: [2], endArray: [4] },     // P2 ejecuta [2-4]
  { process: "P3", startArray: [7], endArray: [9] }      // P3 ejecuta [7-9]
];

export default function GanttDiagram({ data = defaultData }: GanttDiagramProps) {
  // Transformar datos para ApexCharts
  const transformDataForApex = (processData: ProcessData[]) => {
    const allSegments: any[] = [];
    
    // Para cada proceso, crear múltiples segmentos basados en startArray y endArray
    processData.forEach((processItem, processIndex) => {
      const { startArray, endArray } = processItem;
      
      // Combinar startArray y endArray para crear segmentos
      for (let i = 0; i < startArray.length && i < endArray.length; i++) {
        allSegments.push({
          x: `P${processIndex + 1}`, // Solo P1, P2, P3, etc.
          y: [startArray[i], endArray[i]],
          fillColor: "#8884d8" // Un solo color para todas las barras
        });
      }
    });
    
    // Retornar una sola serie con todos los segmentos
    return [{
      name: 'Procesos',
      data: allSegments
    }];
  };

  // Función para generar todos los segmentos de ejecución para la tabla de resumen
  const getAllExecutionSegments = (processData: ProcessData[]) => {
    const segments: Array<{process: string, inicio: number, fin: number, duracion: number}> = [];
    
    processData.forEach(processItem => {
      const { process, startArray, endArray } = processItem;
      
      for (let i = 0; i < startArray.length && i < endArray.length; i++) {
        segments.push({
          process: process,
          inicio: startArray[i],
          fin: endArray[i],
          duracion: endArray[i] - startArray[i]
        });
      }
    });
    
    // Ordenar por tiempo de inicio
    return segments.sort((a, b) => a.inicio - b.inicio);
  };

  const allSegments = getAllExecutionSegments(data);

  // Configuración de opciones para ApexCharts
  const options: ApexOptions = {
    chart: {
      type: 'rangeBar',
      height: 350,
      toolbar: {
        show: false // Ocultar toda la barra de herramientas
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false, // No distribuir colores
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: any) {
        const start = val[0];
        const end = val[1];
        const duration = end - start;
        return `${duration}`;
      },
      style: {
        colors: ['#fff'],
        fontSize: '12px'
      }
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: 'Tiempo'
      },
      labels: {
        formatter: function(val: any) {
          return Math.round(val).toString();
        }
      }
    },
    yaxis: {
      title: {
        text: 'Procesos'
      }
    },
    tooltip: {
      custom: function({ dataPointIndex, w }) {
        const data = w.globals.initialSeries[0].data[dataPointIndex];
        const proceso = data.x;
        const inicio = data.y[0];
        const fin = data.y[1];
        const duracion = fin - inicio;
        
        return `
          <div class="bg-white border border-gray-300 p-3 rounded shadow-lg">
            <p class="font-bold text-lg">${proceso}</p>
            <p><strong>Inicio:</strong> ${inicio}</p>
            <p><strong>Fin:</strong> ${fin}</p>
            <p><strong>Duración:</strong> ${duracion}</p>
          </div>
        `;
      }
    },
    legend: {
      show: false // Ocultar leyenda
    },
    colors: ['#8884d8'] // Un solo color
  };

  const series = transformDataForApex(data);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ReactApexChart 
          options={options} 
          series={series} 
          type="rangeBar" 
          height={350} 
        />
        
        {/* Tabla de resumen debajo del gráfico */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Cronología de Ejecución:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {allSegments.map((segment, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg border-l-4 bg-gray-50"
                style={{ borderLeftColor: getColor(segment.process) }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{segment.process}</span>
                  <span 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getColor(segment.process) }}
                  ></span>
                </div>
                <p className="text-sm text-gray-600">
                  {segment.inicio} → {segment.fin} ({segment.duracion} unidades)
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas adicionales */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h5 className="font-semibold text-blue-800">Total de Procesos</h5>
            <p className="text-2xl font-bold text-blue-600">
              {data.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h5 className="font-semibold text-green-800">Tiempo Total</h5>
            <p className="text-2xl font-bold text-green-600">
              {Math.max(...allSegments.map(segment => segment.fin))} unidades
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h5 className="font-semibold text-purple-800">Fragmentos</h5>
            <p className="text-2xl font-bold text-purple-600">
              {allSegments.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}