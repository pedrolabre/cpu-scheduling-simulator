/**
 * Casos de teste básicos para algoritmos de escalonamento
 */

/**
 * Caso 1: Processos com tempos variados
 */
export const basicCase1 = {
  name: 'Processos Variados',
  processes: [
    { id: 'A', pc: 5, mt: 0, priority: 2 },
    { id: 'B', pc: 3, mt: 2, priority: 1 },
    { id: 'C', pc: 8, mt: 1, priority: 3 },
  ],
  quantum: 2,
};

/**
 * Caso 2: Todos processos chegam juntos
 */
export const basicCase2 = {
  name: 'Chegada Simultânea',
  processes: [
    { id: 'A', pc: 4, mt: 0, priority: 3 },
    { id: 'B', pc: 2, mt: 0, priority: 1 },
    { id: 'C', pc: 6, mt: 0, priority: 2 },
    { id: 'D', pc: 3, mt: 0, priority: 4 },
  ],
  quantum: 3,
};

/**
 * Caso 3: Processos bem espaçados no tempo
 */
export const basicCase3 = {
  name: 'Chegadas Espaçadas',
  processes: [
    { id: 'A', pc: 3, mt: 0, priority: 1 },
    { id: 'B', pc: 4, mt: 5, priority: 2 },
    { id: 'C', pc: 2, mt: 10, priority: 3 },
  ],
  quantum: 2,
};

/**
 * Caso 4: Processo único
 */
export const basicCase4 = {
  name: 'Processo Único',
  processes: [
    { id: 'A', pc: 10, mt: 0, priority: 1 },
  ],
  quantum: 3,
};

export const BASIC_CASES = [
  basicCase1,
  basicCase2,
  basicCase3,
  basicCase4,
];
