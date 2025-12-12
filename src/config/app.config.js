/**
 * Configurações gerais da aplicação
 */
export const appConfig = {
  name: 'CPU Scheduling Simulator',
  version: '1.0.0',
  description: 'Sistema interativo de simulação de algoritmos de escalonamento',
  
  // Configurações de processos
  defaultProcessCount: 5,
  maxProcesses: 26, // A-Z
  
  // Limites de valores
  limits: {
    minBurstTime: 1,
    maxBurstTime: 100,
    minArrivalTime: 0,
    maxArrivalTime: 100,
    minPriority: 1,
    maxPriority: 10,
    minQuantum: 1,
    maxQuantum: 20,
  },
  
  // Valores para geração aleatória
  randomGeneration: {
    burstRange: { min: 1, max: 15 },
    arrivalRange: { min: 0, max: 9 },
    priorityRange: { min: 1, max: 5 },
  },
};

export default appConfig;
