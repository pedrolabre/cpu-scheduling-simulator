/**
 * Calcula métricas finais a partir dos tempos de conclusão
 * @param {Array} processes - Array de processos
 * @param {Object} completionById - Objeto com tempos de conclusão por ID
 * @returns {Object} Métricas calculadas
 */
export const calculateMetrics = (processes, completionById) => {
  const turnaround = {};
  const waiting = {};
  let sumT = 0, sumW = 0;
  
  for (const p of processes) {
    const c = completionById[p.id];
    const ta = c - p.mt;
    const w = ta - p.pc;
    
    // Validação: waiting time nunca pode ser negativo
    if (w < 0) {
      console.warn(`WARNING: Negative waiting time for ${p.id}: ${w}`);
    }
    
    turnaround[p.id] = ta;
    waiting[p.id] = Math.max(0, w); // Garante que nunca seja negativo
    sumT += ta;
    sumW += Math.max(0, w);
  }
  
  const n = processes.length || 1;
  return {
    turnaround,
    waiting,
    avgTurnaround: sumT / n,
    avgWaiting: sumW / n,
    completion: completionById
  };
};
