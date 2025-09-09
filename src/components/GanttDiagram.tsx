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
  title?: string;
}

// Datos por defecto si no se pasan como props
const defaultData: ProcessData[] = [
  { process: "P1", startArray: [0, 4], endArray: [2, 7] }, // P1 ejecuta [0-2] y [4-7]
  { process: "P2", startArray: [2], endArray: [4] },     // P2 ejecuta [2-4]
  { process: "P3", startArray: [7], endArray: [9] }      // P3 ejecuta [7-9]
];


export default function GanttDiagram({ data = defaultData, title }: GanttDiagramProps) {
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
          fillColor: "#0000ff" // Un solo color para todas las barras
        });
      }
    });
    
    // Retornar una sola serie con todos los segmentos
    return [{
      name: 'Procesos',
      data: allSegments
    }];
  };

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

      <h3 className="text-2xl font-bold mb-6 text-center">{title }</h3>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <ReactApexChart 
          options={options} 
          series={series} 
          type="rangeBar" 
          height={350} 
        />
        
        
         

      </div>
    </div>
  );
}