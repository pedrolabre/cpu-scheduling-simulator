/**
 * Formata tempo para exibição
 */
export const formatTime = (time) => {
  return `t=${time}`;
};

/**
 * Formata duração com unidades
 */
export const formatDuration = (duration) => {
  if (duration === 1) {
    return '1 unidade';
  }
  return `${duration} unidades`;
};

/**
 * Formata tempo em formato extenso
 */
export const formatTimeExtended = (time) => {
  if (time === 0) return 'início';
  if (time === 1) return '1 unidade de tempo';
  return `${time} unidades de tempo`;
};

export default {
  formatTime,
  formatDuration,
  formatTimeExtended,
};
