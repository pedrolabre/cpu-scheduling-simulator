/**
 * Tipos e interfaces para Steps da simulação
 * 
 * @typedef {Object} Step
 * @property {number} time - Tempo atual da simulação
 * @property {string} phase - Fase atual (INÍCIO, EXECUTANDO, CONCLUÍDO, etc.)
 * @property {string} action - Ação sendo realizada
 * @property {string} explanation - Explicação detalhada do que está acontecendo
 * @property {Array<Object>} queue - Fila de processos prontos
 * @property {string|null} executing - ID do processo em execução (null se CPU ociosa)
 * @property {Array<string>} arrived - IDs de processos que chegaram neste step
 * @property {string} decision - Decisão tomada pelo algoritmo
 * @property {Array<string>} completed - IDs de processos concluídos
 * @property {Array<number>} [remaining] - Tempo restante de cada processo (Round Robin)
 * @property {Object|null} [metrics] - Métricas finais (apenas no último step)
 */

/**
 * Valida se um objeto é um step válido
 * @param {any} step
 * @returns {boolean}
 */
export const isValidStep = (step) => {
  return (
    step &&
    typeof step.time === 'number' &&
    typeof step.phase === 'string' &&
    typeof step.action === 'string' &&
    typeof step.explanation === 'string' &&
    Array.isArray(step.queue) &&
    Array.isArray(step.completed)
  );
};

/**
 * Fases possíveis de um step
 */
export const STEP_PHASES = {
  START: 'INÍCIO',
  ARRIVAL: 'CHEGADA',
  SELECTION: 'SELEÇÃO',
  EXECUTING: 'EXECUTANDO',
  CONCLUDING: 'CONCLUINDO',
  COMPLETED: 'CONCLUÍDO',
  QUANTUM: 'QUANTUM',
  IDLE: 'CPU OCIOSA',
  FINISHED: 'FINALIZADO',
};
