/**
 * Ordena processos por tempo de chegada
 * Tie-breaker: ordem original (_origIdx)
 */
export const sortByArrival = (processes) => {
  return [...processes].sort((a, b) => {
    if (a.mt !== b.mt) return a.mt - b.mt;
    return (a._origIdx || 0) - (b._origIdx || 0);
  });
};

/**
 * Ordena processos por tempo de CPU (burst time)
 * Tie-breaker: menor mt → ordem original
 */
export const sortByBurst = (processes) => {
  return [...processes].sort((a, b) => {
    if (a.pc !== b.pc) return a.pc - b.pc;
    if (a.mt !== b.mt) return a.mt - b.mt;
    return (a._origIdx || 0) - (b._origIdx || 0);
  });
};

/**
 * Ordena processos por prioridade (menor número = maior prioridade)
 * Tie-breaker: menor mt → ordem original
 */
export const sortByPriority = (processes) => {
  return [...processes].sort((a, b) => {
    const aPriority = a.priority || 999;
    const bPriority = b.priority || 999;
    
    if (aPriority !== bPriority) return aPriority - bPriority;
    if (a.mt !== b.mt) return a.mt - b.mt;
    return (a._origIdx || 0) - (b._origIdx || 0);
  });
};

/**
 * Ordena processos por tempo restante
 * Usado em SRTF
 */
export const sortByRemainingTime = (processes, remainingTimes) => {
  return [...processes].sort((a, b) => {
    const aRemaining = remainingTimes[a.id] || 0;
    const bRemaining = remainingTimes[b.id] || 0;
    
    if (aRemaining !== bRemaining) return aRemaining - bRemaining;
    if (a.mt !== b.mt) return a.mt - b.mt;
    return (a._origIdx || 0) - (b._origIdx || 0);
  });
};

export default {
  sortByArrival,
  sortByBurst,
  sortByPriority,
  sortByRemainingTime,
};
