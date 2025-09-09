// Interfaz para los datos de entrada
interface ProcessData {
  process: string;
  startArray: Array<number>;
  endArray: Array<number>;
}

// Interfaz para los parámetros de entrada
interface ProcessInput {
  process: string;
  rafaga: number;
  tiempoLlegada: number;
  prioridad: number;
}

// FIFO (First In First Out)
export function fifo(processes: ProcessInput[]): ProcessData[] {
  const sortedProcesses = [...processes].sort((a, b) => a.tiempoLlegada - b.tiempoLlegada);
  const result: ProcessData[] = [];
  let currentTime = 0;

  sortedProcesses.forEach(proc => {
    if (currentTime < proc.tiempoLlegada) {
      currentTime = proc.tiempoLlegada;
    }
    
    result.push({
      process: proc.process,
      startArray: [currentTime],
      endArray: [currentTime + proc.rafaga]
    });
    
    currentTime += proc.rafaga;
  });

  // Ordenar el resultado por ID del proceso (P1, P2, P3, etc.)
  const sortedResult = result.sort((a, b) => {
    const numA = parseInt(a.process.replace('P', ''));
    const numB = parseInt(b.process.replace('P', ''));
    return numA - numB;
  });

  return sortedResult;
}

// SJF (Shortest Job First)
export function sjf(processes: ProcessInput[]): ProcessData[] {
  const result: ProcessData[] = [];
  const remaining = [...processes];
  let currentTime = 0;

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.tiempoLlegada <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.tiempoLlegada));
      continue;
    }

    const shortest = available.reduce((min, proc) => 
      proc.rafaga < min.rafaga ? proc : min
    );

    result.push({
      process: shortest.process,
      startArray: [currentTime],
      endArray: [currentTime + shortest.rafaga]
    });

    currentTime += shortest.rafaga;
    const index = remaining.indexOf(shortest);
    remaining.splice(index, 1);
  }

  // Ordenar el resultado por ID del proceso (P1, P2, P3, etc.)
  const sortedResult = result.sort((a, b) => {
    const numA = parseInt(a.process.replace('P', ''));
    const numB = parseInt(b.process.replace('P', ''));
    return numA - numB;
  });

  return sortedResult;
}

// Prioridad (menor número = mayor prioridad)
export function prioridad(processes: ProcessInput[]): ProcessData[] {
  const result: ProcessData[] = [];
  const remaining = [...processes];
  let currentTime = 0;

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.tiempoLlegada <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.tiempoLlegada));
      continue;
    }

    const highest = available.reduce((min, proc) => 
      proc.prioridad < min.prioridad ? proc : min
    );

    result.push({
      process: highest.process,
      startArray: [currentTime],
      endArray: [currentTime + highest.rafaga]
    });

    currentTime += highest.rafaga;
    const index = remaining.indexOf(highest);
    remaining.splice(index, 1);
  }

  // Ordenar el resultado por ID del proceso (P1, P2, P3, etc.)
  const sortedResult = result.sort((a, b) => {
    const numA = parseInt(a.process.replace('P', ''));
    const numB = parseInt(b.process.replace('P', ''));
    return numA - numB;
  });

  return sortedResult;
}

// SRTF (Shortest Remaining Time First)
export function srtf(processes: ProcessInput[]): ProcessData[] {
  const result: ProcessData[] = [];
  const remaining = processes.map(p => ({ ...p, remainingTime: p.rafaga }));
  let currentTime = 0;
  const processMap = new Map<string, { startArray: number[], endArray: number[] }>();

  while (remaining.some(p => p.remainingTime > 0)) {
    const available = remaining.filter(p => p.tiempoLlegada <= currentTime && p.remainingTime > 0);
    
    if (available.length === 0) {
      currentTime++;
      continue;
    }

    const shortest = available.reduce((min, proc) => 
      proc.remainingTime < min.remainingTime ? proc : min
    );

    if (!processMap.has(shortest.process)) {
      processMap.set(shortest.process, { startArray: [], endArray: [] });
    }

    const map = processMap.get(shortest.process)!;
    map.startArray.push(currentTime);
    
    shortest.remainingTime--;
    currentTime++;
    
    map.endArray.push(currentTime);
  }

  // Consolidar segmentos consecutivos
  processMap.forEach((data, process) => {
    const consolidated = { startArray: [] as number[], endArray: [] as number[] };
    
    for (let i = 0; i < data.startArray.length; i++) {
      if (i === 0 || data.startArray[i] !== data.endArray[i - 1]) {
        consolidated.startArray.push(data.startArray[i]);
        consolidated.endArray.push(data.endArray[i]);
      } else {
        consolidated.endArray[consolidated.endArray.length - 1] = data.endArray[i];
      }
    }

    result.push({
      process,
      startArray: consolidated.startArray,
      endArray: consolidated.endArray
    });
  });

  // Ordenar el resultado por ID del proceso (P1, P2, P3, etc.)
  const sortedResult = result.sort((a, b) => {
    const numA = parseInt(a.process.replace('P', ''));
    const numB = parseInt(b.process.replace('P', ''));
    return numA - numB;
  });

  return sortedResult;
}

// Round Robin
export function roundRobin(processes: ProcessInput[], quantum: number = 2): ProcessData[] {
  const result: ProcessData[] = [];
  const queue = [...processes].sort((a, b) => a.tiempoLlegada - b.tiempoLlegada);
  const remaining = queue.map(p => ({ ...p, remainingTime: p.rafaga }));
  let currentTime = 0;
  let currentIndex = 0;
  const processMap = new Map<string, { startArray: number[], endArray: number[] }>();

  while (remaining.some(p => p.remainingTime > 0)) {
    const available = remaining.filter(p => p.tiempoLlegada <= currentTime && p.remainingTime > 0);
    
    if (available.length === 0) {
      currentTime++;
      continue;
    }

    const current = available[currentIndex % available.length];
    
    if (!processMap.has(current.process)) {
      processMap.set(current.process, { startArray: [], endArray: [] });
    }

    const map = processMap.get(current.process)!;
    const startTime = currentTime;
    const executeTime = Math.min(quantum, current.remainingTime);
    
    map.startArray.push(startTime);
    map.endArray.push(startTime + executeTime);
    
    current.remainingTime -= executeTime;
    currentTime += executeTime;
    currentIndex++;
  }

  processMap.forEach((data, process) => {
    result.push({
      process,
      startArray: data.startArray,
      endArray: data.endArray
    });
  });

  // Ordenar el resultado por ID del proceso (P1, P2, P3, etc.)
  const sortedResult = result.sort((a, b) => {
    const numA = parseInt(a.process.replace('P', ''));
    const numB = parseInt(b.process.replace('P', ''));
    return numA - numB;
  });

  return sortedResult;
}