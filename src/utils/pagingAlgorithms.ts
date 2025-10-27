export type PageReference = number;

export interface AlgorithmStep {
  reference: PageReference;
  frames: Array<PageReference | null>;
  fault: boolean;
  replaced: PageReference | null;
}

export interface AlgorithmResult {
  key: string;
  name: string;
  description: string;
  steps: AlgorithmStep[];
  faults: number;
  hits: number;
  faultRate: number;
}

type AlgorithmComputation = {
  steps: AlgorithmStep[];
  faults: number;
};

type AlgorithmRunner = (
  sequence: PageReference[],
  frameCount: number
) => AlgorithmComputation;

const cloneFrames = (
  frames: Array<PageReference | null>
): Array<PageReference | null> => frames.slice();

const optimalAlgorithm: AlgorithmRunner = (sequence, frameCount) => {
  const frames: Array<PageReference | null> = Array(frameCount).fill(null);
  const steps: AlgorithmStep[] = [];
  let faults = 0;

  sequence.forEach((reference, index) => {
    let fault = false;
    let replaced: PageReference | null = null;
    const hitIndex = frames.indexOf(reference);

    if (hitIndex === -1) {
      fault = true;
      faults += 1;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = reference;
      } else {
        let victimIndex = 0;
        let farthestDistance = -1;

        frames.forEach((page, frameIndex) => {
          if (page === null) {
            return;
          }
          const nextUse = sequence.slice(index + 1).indexOf(page);
          if (nextUse === -1) {
            victimIndex = frameIndex;
            farthestDistance = Number.POSITIVE_INFINITY;
            return;
          }
          if (nextUse > farthestDistance) {
            farthestDistance = nextUse;
            victimIndex = frameIndex;
          }
        });

        replaced = frames[victimIndex];
        frames[victimIndex] = reference;
      }
    }

    steps.push({
      reference,
      frames: cloneFrames(frames),
      fault,
      replaced,
    });
  });

  return { steps, faults };
};

const fifoAlgorithm: AlgorithmRunner = (sequence, frameCount) => {
  const frames: Array<PageReference | null> = Array(frameCount).fill(null);
  const steps: AlgorithmStep[] = [];
  const order: number[] = [];
  let faults = 0;

  sequence.forEach((reference) => {
    let fault = false;
    let replaced: PageReference | null = null;
    const hitIndex = frames.indexOf(reference);

    if (hitIndex === -1) {
      fault = true;
      faults += 1;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = reference;
        order.push(emptyIndex);
      } else if (order.length > 0) {
        const victimIndex = order.shift()!;
        replaced = frames[victimIndex];
        frames[victimIndex] = reference;
        order.push(victimIndex);
      }
    }

    steps.push({
      reference,
      frames: cloneFrames(frames),
      fault,
      replaced,
    });
  });

  return { steps, faults };
};

const lruAlgorithm: AlgorithmRunner = (sequence, frameCount) => {
  const frames: Array<PageReference | null> = Array(frameCount).fill(null);
  const steps: AlgorithmStep[] = [];
  const lastUsed = new Map<PageReference, number>();
  let faults = 0;

  sequence.forEach((reference, index) => {
    let fault = false;
    let replaced: PageReference | null = null;
    const hitIndex = frames.indexOf(reference);

    if (hitIndex === -1) {
      fault = true;
      faults += 1;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = reference;
      } else {
        let victimIndex = 0;
        let oldestUsage = Number.POSITIVE_INFINITY;

        frames.forEach((page, frameIndex) => {
          if (page === null) {
            return;
          }
          const usage = lastUsed.get(page) ?? -1;
          if (usage < oldestUsage) {
            oldestUsage = usage;
            victimIndex = frameIndex;
          }
        });

        replaced = frames[victimIndex];
        frames[victimIndex] = reference;
        if (replaced !== null) {
          lastUsed.delete(replaced);
        }
      }
    }

    lastUsed.set(reference, index);

    steps.push({
      reference,
      frames: cloneFrames(frames),
      fault,
      replaced,
    });
  });

  return { steps, faults };
};

const mruAlgorithm: AlgorithmRunner = (sequence, frameCount) => {
  const frames: Array<PageReference | null> = Array(frameCount).fill(null);
  const steps: AlgorithmStep[] = [];
  const lastUsed = new Map<PageReference, number>();
  let faults = 0;

  sequence.forEach((reference, index) => {
    let fault = false;
    let replaced: PageReference | null = null;
    const hitIndex = frames.indexOf(reference);

    if (hitIndex === -1) {
      fault = true;
      faults += 1;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = reference;
      } else {
        let victimIndex = 0;
        let mostRecentUsage = -1;

        frames.forEach((page, frameIndex) => {
          if (page === null) {
            return;
          }
          const usage = lastUsed.get(page) ?? -1;
          if (usage > mostRecentUsage) {
            mostRecentUsage = usage;
            victimIndex = frameIndex;
          }
        });

        replaced = frames[victimIndex];
        frames[victimIndex] = reference;
        if (replaced !== null) {
          lastUsed.delete(replaced);
        }
      }
    }

    lastUsed.set(reference, index);

    steps.push({
      reference,
      frames: cloneFrames(frames),
      fault,
      replaced,
    });
  });

  return { steps, faults };
};

const referenceBitAlgorithm: AlgorithmRunner = (sequence, frameCount) => {
  const frames: Array<PageReference | null> = Array(frameCount).fill(null);
  const referenceBits: number[] = Array(frameCount).fill(0);
  const steps: AlgorithmStep[] = [];
  let pointer = 0;
  let faults = 0;

  if (frameCount === 0) {
    return { steps: [], faults: sequence.length };
  }

  sequence.forEach((reference) => {
    let fault = false;
    let replaced: PageReference | null = null;
    const hitIndex = frames.indexOf(reference);

    if (hitIndex !== -1) {
      referenceBits[hitIndex] = 1;
    } else {
      fault = true;
      faults += 1;

      while (true) {
        if (frames[pointer] === null) {
          frames[pointer] = reference;
          referenceBits[pointer] = 1;
          pointer = (pointer + 1) % frameCount;
          break;
        }

        if (referenceBits[pointer] === 0) {
          replaced = frames[pointer];
          frames[pointer] = reference;
          referenceBits[pointer] = 1;
          pointer = (pointer + 1) % frameCount;
          break;
        }

        referenceBits[pointer] = 0;
        pointer = (pointer + 1) % frameCount;
      }
    }

    steps.push({
      reference,
      frames: cloneFrames(frames),
      fault,
      replaced,
    });
  });

  return { steps, faults };
};

const algorithmsCatalog: Array<{
  key: string;
  name: string;
  description: string;
  runner: AlgorithmRunner;
}> = [
  {
    key: "optimal",
    name: "Algoritmo Óptimo",
    description: "Selecciona la página cuyo uso futuro es más lejano.",
    runner: optimalAlgorithm,
  },
  {
    key: "fifo",
    name: "Algoritmo FIFO",
    description: "Reemplaza siempre la página que llegó primero a memoria.",
    runner: fifoAlgorithm,
  },
  {
    key: "lru",
    name: "Algoritmo LRU",
    description: "Reemplaza la página menos utilizada recientemente.",
    runner: lruAlgorithm,
  },
  {
    key: "mru",
    name: "Algoritmo MRU",
    description: "Libera la página utilizada más recientemente.",
    runner: mruAlgorithm,
  },
  {
    key: "reference-bit",
    name: "Algoritmo de Bit de Referencia",
    description: "Implementación tipo segunda oportunidad basándose en bits de referencia.",
    runner: referenceBitAlgorithm,
  },
];

export const runPagingAlgorithms = (
  sequence: PageReference[],
  frameCount: number
): AlgorithmResult[] => {
  if (frameCount <= 0 || sequence.length === 0) {
    return algorithmsCatalog.map(({ key, name, description }) => ({
      key,
      name,
      description,
      steps: [],
      faults: 0,
      hits: 0,
      faultRate: 0,
    }));
  }

  return algorithmsCatalog.map(({ key, name, description, runner }) => {
    const { steps, faults } = runner(sequence, frameCount);
    const hits = sequence.length - faults;
    const faultRate = sequence.length > 0 ? faults / sequence.length : 0;

    return {
      key,
      name,
      description,
      steps,
      faults,
      hits,
      faultRate,
    };
  });
};
