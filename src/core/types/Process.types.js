/**
 * Tipos e interfaces para Processos
 * 
 * @typedef {Object} Process
 * @property {string} id - Identificador do processo (A, B, C, etc.)
 * @property {number} pc - Burst time (tempo de CPU necessário)
 * @property {number} mt - Arrival time (tempo de chegada)
 * @property {number} [priority] - Prioridade (opcional, usado em algoritmos de prioridade)
 * @property {number} [_origIdx] - Índice original (usado internamente para desempate)
 */

/**
 * Cria um processo padrão
 * @param {string} id - ID do processo
 * @param {number} pc - Burst time
 * @param {number} mt - Arrival time
 * @param {number} priority - Prioridade
 * @returns {Process}
 */
export const createProcess = (id, pc = 1, mt = 0, priority = 1) => ({
  id,
  pc,
  mt,
  priority,
});

/**
 * Valida se um objeto é um processo válido
 * @param {any} process
 * @returns {boolean}
 */
export const isValidProcess = (process) => {
  return (
    process &&
    typeof process.id === 'string' &&
    typeof process.pc === 'number' &&
    process.pc > 0 &&
    typeof process.mt === 'number' &&
    process.mt >= 0
  );
};
