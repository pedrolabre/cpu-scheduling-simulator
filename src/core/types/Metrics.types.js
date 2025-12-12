/**
 * Tipos e interfaces para Métricas da simulação
 * 
 * @typedef {Object} ProcessMetrics
 * @property {string} id - ID do processo
 * @property {number} arrivalTime - Tempo de chegada (MT)
 * @property {number} burstTime - Tempo de CPU (PC)
 * @property {number} completionTime - Tempo de conclusão (CT)
 * @property {number} turnaroundTime - Turnaround Time (TAT = CT - AT)
 * @property {number} waitingTime - Waiting Time (WT = TAT - BT)
 */

/**
 * @typedef {Object} GlobalMetrics
 * @property {Array<ProcessMetrics>} processes - Métricas de cada processo
 * @property {number} averageTurnaroundTime - TAT médio
 * @property {number} averageWaitingTime - WT médio
 * @property {number} totalTime - Tempo total da simulação
 */

/**
 * Calcula o Turnaround Time
 * @param {number} completionTime
 * @param {number} arrivalTime
 * @returns {number}
 */
export const calculateTurnaroundTime = (completionTime, arrivalTime) => {
  return completionTime - arrivalTime;
};

/**
 * Calcula o Waiting Time
 * @param {number} turnaroundTime
 * @param {number} burstTime
 * @returns {number}
 */
export const calculateWaitingTime = (turnaroundTime, burstTime) => {
  return turnaroundTime - burstTime;
};

/**
 * Calcula métricas de um processo individual
 * @param {string} id
 * @param {number} arrivalTime
 * @param {number} burstTime
 * @param {number} completionTime
 * @returns {ProcessMetrics}
 */
export const calculateProcessMetrics = (id, arrivalTime, burstTime, completionTime) => {
  const turnaroundTime = calculateTurnaroundTime(completionTime, arrivalTime);
  const waitingTime = calculateWaitingTime(turnaroundTime, burstTime);
  
  return {
    id,
    arrivalTime,
    burstTime,
    completionTime,
    turnaroundTime,
    waitingTime,
  };
};

/**
 * Calcula médias globais
 * @param {Array<ProcessMetrics>} processMetrics
 * @returns {Object}
 */
export const calculateAverages = (processMetrics) => {
  const count = processMetrics.length;
  if (count === 0) return { averageTurnaroundTime: 0, averageWaitingTime: 0 };
  
  const totalTAT = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0);
  const totalWT = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0);
  
  return {
    averageTurnaroundTime: totalTAT / count,
    averageWaitingTime: totalWT / count,
  };
};
