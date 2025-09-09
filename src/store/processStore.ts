import { create } from 'zustand';

interface ProcessData {
  id: number;
  proceso: string;
  tiempoEjecucion: number;
  prioridad: number;
  tiempoLlegada: number;
}

interface ProcessStore {
  rows: ProcessData[];
  addRow: () => void;
  clearAll: () => void;
  updateRow: (newRow: ProcessData) => ProcessData;
  setRows: (rows: ProcessData[]) => void;
  executeAlgorithm: () => void;
}

export const useProcessStore = create<ProcessStore>((set, get) => ({
  rows: [
    {
      id: 1,
      proceso: "P1",
      tiempoEjecucion: 5,
      prioridad: 3,
      tiempoLlegada: 0,
    },
    {
      id: 2,
      proceso: "P2",
      tiempoEjecucion: 3,
      prioridad: 1,
      tiempoLlegada: 1,
    },
    {
      id: 3,
      proceso: "P3",
      tiempoEjecucion: 8,
      prioridad: 2,
      tiempoLlegada: 2,
    },
  ],
  
  addRow: () => set((state) => {
    if (state.rows.length !== 0) {
      const newId = Math.max(...state.rows.map((row) => row.id)) + 1;
      return {
        rows: [...state.rows, {
          id: newId,
          proceso: `P${newId}`,
          tiempoEjecucion: 0,
          prioridad: 1,
          tiempoLlegada: 0,
        }]
      };
    } else {
      return {
        rows: [{
          id: 1,
          proceso: "P1",
          tiempoEjecucion: 0,
          prioridad: 1,
          tiempoLlegada: 0,
        }]
      };
    }
  }),
  
  clearAll: () => set({ rows: [] }),
  
  updateRow: (newRow) => {
    set((state) => ({
      rows: state.rows.map((row) => (row.id === newRow.id ? newRow : row))
    }));
    return newRow; // Retornar el nuevo row para cumplir con el tipo de Material-UI
  },
  
  setRows: (rows) => set({ rows }),
  
  executeAlgorithm: () => {
    const { rows } = get();
    console.log("Ejecutando algoritmo con datos:", rows);
    
    // Algoritmo de prioridad (menor número = mayor prioridad)
    const sortedByPriority = [...rows].sort((a, b) => {
      if (a.prioridad === b.prioridad) {
        return a.tiempoLlegada - b.tiempoLlegada; // FCFS como criterio de desempate
      }
      return a.prioridad - b.prioridad;
    });
    
    console.log("Orden de ejecución por prioridad:", sortedByPriority);
    alert(`Algoritmo ejecutado! Orden: ${sortedByPriority.map(p => p.proceso).join(' → ')}`);
  }
}));