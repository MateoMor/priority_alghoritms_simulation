import { create } from 'zustand';
import { fifo, sjf, prioridad, srtf, roundRobin } from '../utils/alghoritms';

interface ProcessData {
  id: number;
  proceso: string;
  tiempoEjecucion: number;
  prioridad: number;
  tiempoLlegada: number;
}

interface GanttData {
  process: string;
  startArray: Array<number>;
  endArray: Array<number>;
}

interface ProcessStore {
  rows: ProcessData[];
  ganttResults: {
    fifo: GanttData[];
    sjf: GanttData[];
    prioridad: GanttData[];
    srtf: GanttData[];
    roundRobin: GanttData[];
  };
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

  ganttResults: {
    fifo: [],
    sjf: [],
    prioridad: [],
    srtf: [],
    roundRobin: []
  },

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

    // Transformar datos para los algoritmos
    const processInputs = rows.map(row => ({
      process: row.proceso,
      rafaga: row.tiempoEjecucion,
      tiempoLlegada: row.tiempoLlegada,
      prioridad: row.prioridad
    }));

    // Ejecutar todos los algoritmos
    const fifoResult = fifo(processInputs);
    const sjfResult = sjf(processInputs);
    const prioridadResult = prioridad(processInputs);
    const srtfResult = srtf(processInputs);
    const roundRobinResult = roundRobin(processInputs, 2); // quantum = 2

    // Actualizar los resultados en el store
    set(state => ({
      ...state,
      ganttResults: {
        fifo: fifoResult,
        sjf: sjfResult,
        prioridad: prioridadResult,
        srtf: srtfResult,
        roundRobin: roundRobinResult
      }
    }));

    console.log('Algoritmos ejecutados:', {
      fifo: fifoResult,
      sjf: sjfResult,
      prioridad: prioridadResult,
      srtf: srtfResult,
      roundRobin: roundRobinResult
    });
  }
}));