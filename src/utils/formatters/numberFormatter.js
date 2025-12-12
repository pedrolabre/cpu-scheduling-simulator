/**
 * Formata número decimal com precisão
 */
export const formatDecimal = (value, decimals = 2) => {
  if (value === null || value === undefined) return '0';
  if (!isFinite(value)) return 'N/A';
  if (isNaN(value)) return 'N/A';
  
  return value.toFixed(decimals);
};

/**
 * Formata porcentagem
 */
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  if (!isFinite(value)) return 'N/A';
  if (isNaN(value)) return 'N/A';
  
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Formata número inteiro com separador de milhares
 */
export const formatInteger = (value) => {
  if (value === null || value === undefined) return '0';
  if (!isFinite(value)) return 'N/A';
  if (isNaN(value)) return 'N/A';
  
  return Math.floor(value).toLocaleString('pt-BR');
};

export default {
  formatDecimal,
  formatPercent,
  formatInteger,
};
