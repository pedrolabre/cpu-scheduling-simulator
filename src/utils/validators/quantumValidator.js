/**
 * Validação de quantum do Round Robin
 */
export const validateQuantum = (quantum) => {
  if (quantum === null || quantum === undefined || quantum === '') {
    return { valid: false, error: 'Quantum é obrigatório' };
  }
  
  const num = Number(quantum);
  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: 'Quantum deve ser um número' };
  }
  
  if (!Number.isInteger(num)) {
    return { valid: false, error: 'Quantum deve ser um número inteiro' };
  }
  
  if (num < 1) {
    return { valid: false, error: 'Quantum deve ser maior que 0' };
  }
  
  if (num > 100) {
    return { valid: false, error: 'Quantum deve ser <= 100' };
  }
  
  return { valid: true, error: null };
};

export default validateQuantum;
