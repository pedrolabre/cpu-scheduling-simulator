/**
 * Validação de ID de processo
 */
export const validateProcessId = (id) => {
  if (!id || typeof id !== 'string') {
    return { valid: false, error: 'ID é obrigatório' };
  }
  if (id.length !== 1 || !/^[A-Z]$/.test(id)) {
    return { valid: false, error: 'ID deve ser uma letra maiúscula (A-Z)' };
  }
  return { valid: true, error: null };
};

/**
 * Validação de Burst Time (PC)
 */
export const validateBurst = (pc) => {
  if (pc === null || pc === undefined || pc === '') {
    return { valid: false, error: 'Tempo de CPU é obrigatório' };
  }
  const num = Number(pc);
  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: 'Tempo de CPU deve ser um número' };
  }
  if (num < 1) {
    return { valid: false, error: 'Tempo de CPU deve ser >= 1' };
  }
  if (num > 100) {
    return { valid: false, error: 'Tempo de CPU deve ser <= 100' };
  }
  return { valid: true, error: null };
};

/**
 * Validação de Arrival Time (MT)
 */
export const validateArrival = (mt) => {
  if (mt === null || mt === undefined || mt === '') {
    return { valid: false, error: 'Tempo de chegada é obrigatório' };
  }
  const num = Number(mt);
  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: 'Tempo de chegada deve ser um número' };
  }
  if (num < 0) {
    return { valid: false, error: 'Tempo de chegada deve ser >= 0' };
  }
  if (num > 100) {
    return { valid: false, error: 'Tempo de chegada deve ser <= 100' };
  }
  return { valid: true, error: null };
};

/**
 * Validação de Prioridade
 */
export const validatePriority = (priority) => {
  if (priority === null || priority === undefined || priority === '') {
    return { valid: false, error: 'Prioridade é obrigatória' };
  }
  const num = Number(priority);
  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: 'Prioridade deve ser um número' };
  }
  if (num < 1) {
    return { valid: false, error: 'Prioridade deve ser >= 1' };
  }
  if (num > 10) {
    return { valid: false, error: 'Prioridade deve ser <= 10' };
  }
  return { valid: true, error: null };
};

/**
 * Validação completa de processo
 */
export const validateProcess = (process) => {
  const idCheck = validateProcessId(process.id);
  if (!idCheck.valid) return idCheck;

  const burstCheck = validateBurst(process.pc);
  if (!burstCheck.valid) return burstCheck;

  const arrivalCheck = validateArrival(process.mt);
  if (!arrivalCheck.valid) return arrivalCheck;

  if (process.priority !== undefined) {
    const priorityCheck = validatePriority(process.priority);
    if (!priorityCheck.valid) return priorityCheck;
  }

  return { valid: true, error: null };
};
