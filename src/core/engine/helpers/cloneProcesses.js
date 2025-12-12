/**
 * Clona processos e adiciona índice original para rastreamento
 */
export const cloneProcesses = (processes) => {
  return processes.map((proc, idx) => ({ ...proc, _origIdx: idx }));
};
