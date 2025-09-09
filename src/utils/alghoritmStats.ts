// Interfaz para los datos de entrada
interface ProcessData {
  process: string;
  startArray: Array<number>;
  endArray: Array<number>;
}

// Interfaz para los parámetros de entrada originales (necesarios para calcular TS)
interface ProcessInput {
  process: string;
  rafaga: number;
  tiempoLlegada: number;
  prioridad: number;
}

// Interfaz para el resultado de las estadísticas individuales
interface ProcessStats {
  process: string;
  TS: number; // Tiempo del sistema
  TE: number; // Tiempo de ejecución
}

// Interfaz para el resultado de las estadísticas promedio
interface AlgorithmAverageStats {
  TS: number; // Tiempo promedio del sistema
  TE: number; // Tiempo promedio de ejecución
}

// Función para calcular estadísticas individuales de los procesos
export function alghoritmStats(
  processData: Array<ProcessData>, 
  originalProcesses: Array<ProcessInput>
): Array<ProcessStats> {
  const stats: Array<ProcessStats> = [];

  processData.forEach(process => {
    // Buscar el proceso original para obtener el tiempo de llegada
    const originalProcess = originalProcesses.find(p => p.process === process.process);
    
    if (!originalProcess) {
      console.warn(`Proceso ${process.process} no encontrado en datos originales`);
      return;
    }

    // Calcular TE: Suma de todos los intervalos de ejecución
    let TE = 0;
    for (let i = 0; i < process.startArray.length; i++) {
      TE += process.endArray[i] - process.startArray[i];
    }

    // Calcular tiempo de finalización: último valor en endArray
    const tiempoFinalizacion = Math.max(...process.endArray);

    // Calcular TS: tiempo de finalización - tiempo de llegada
    const TS = tiempoFinalizacion - originalProcess.tiempoLlegada;

    stats.push({
      process: process.process,
      TS,
      TE
    });
  });

  // Ordenar por ID del proceso (P1, P2, P3, etc.)
  return stats.sort((a, b) => {
    const numA = parseInt(a.process.replace('P', ''));
    const numB = parseInt(b.process.replace('P', ''));
    return numA - numB;
  });
}

// Función para calcular estadísticas promedio del algoritmo
export function algorithmAverageStats(
  processData: Array<ProcessData>, 
  originalProcesses: Array<ProcessInput>
): AlgorithmAverageStats {
  // Primero obtener las estadísticas individuales
  const individualStats = alghoritmStats(processData, originalProcesses);
  
  if (individualStats.length === 0) {
    return { TS: 0, TE: 0 };
  }

  // Calcular TS promedio: suma de todos los TS / número de procesos
  const totalTS = individualStats.reduce((sum, stat) => sum + stat.TS, 0);
  const averageTS = totalTS / individualStats.length;

  // Calcular TE promedio: suma de todos los TE / número de procesos
  const totalTE = individualStats.reduce((sum, stat) => sum + stat.TE, 0);
  const averageTE = totalTE / individualStats.length;

  return {
    TS: Math.round(averageTS * 100) / 100, // Redondear a 2 decimales
    TE: Math.round(averageTE * 100) / 100  // Redondear a 2 decimales
  };
}