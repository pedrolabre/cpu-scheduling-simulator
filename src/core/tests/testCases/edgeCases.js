/**
 * Casos de teste extremos
 */

/**
 * Caso 1: Muitos processos
 */
export const edgeCase1 = {
  name: 'Muitos Processos',
  processes: [
    { id: 'A', pc: 5, mt: 0, priority: 1 },
    { id: 'B', pc: 3, mt: 1, priority: 2 },
    { id: 'C', pc: 8, mt: 1, priority: 3 },
    { id: 'D', pc: 2, mt: 2, priority: 4 },
    { id: 'E', pc: 4, mt: 3, priority: 5 },
    { id: 'F', pc: 6, mt: 3, priority: 1 },
    { id: 'G', pc: 1, mt: 5, priority: 2 },
    { id: 'H', pc: 7, mt: 6, priority: 3 },
  ],
  quantum: 2,
};

/**
 * Caso 2: Bursts muito longos
 */
export const edgeCase2 = {
  name: 'Bursts Longos',
  processes: [
    { id: 'A', pc: 50, mt: 0, priority: 1 },
    { id: 'B', pc: 100, mt: 10, priority: 2 },
    { id: 'C', pc: 75, mt: 20, priority: 3 },
  ],
  quantum: 10,
};

/**
 * Caso 3: Quantum muito pequeno
 */
export const edgeCase3 = {
  name: 'Quantum Mínimo',
  processes: [
    { id: 'A', pc: 10, mt: 0, priority: 1 },
    { id: 'B', pc: 8, mt: 2, priority: 2 },
    { id: 'C', pc: 6, mt: 4, priority: 3 },
  ],
  quantum: 1,
};

/**
 * Caso 4: Bursts todos iguais
 */
export const edgeCase4 = {
  name: 'Bursts Iguais',
  processes: [
    { id: 'A', pc: 5, mt: 0, priority: 3 },
    { id: 'B', pc: 5, mt: 1, priority: 1 },
    { id: 'C', pc: 5, mt: 2, priority: 2 },
    { id: 'D', pc: 5, mt: 3, priority: 4 },
  ],
  quantum: 2,
};

export const EDGE_CASES = [
  edgeCase1,
  edgeCase2,
  edgeCase3,
  edgeCase4,
];
