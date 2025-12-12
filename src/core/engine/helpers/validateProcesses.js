/**
 * Valida entrada de processos
 */
export const validateProcesses = (processes) => {
  if (!processes || !Array.isArray(processes)) {
    throw new Error('Processes must be a non-empty array');
  }
  
  for (const p of processes) {
    if (!p.id || typeof p.id !== 'string') {
      throw new Error(`Process must have a valid id (string)`);
    }
    if (typeof p.pc !== 'number' || p.pc <= 0) {
      throw new Error(`Process ${p.id}: burst time (pc) must be > 0`);
    }
    if (typeof p.mt !== 'number' || p.mt < 0) {
      throw new Error(`Process ${p.id}: arrival time (mt) must be >= 0`);
    }
  }
  
  return { valid: true };
};
