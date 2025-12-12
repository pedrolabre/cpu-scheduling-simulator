/**
 * Tipos e interfaces para Diagrama de Gantt
 * 
 * @typedef {Object} GanttEntry
 * @property {string} process - ID do processo ('idle' para CPU ociosa)
 * @property {number} start - Tempo de início
 * @property {number} end - Tempo de término
 * @property {string} [color] - Cor opcional para renderização
 */

/**
 * Cria uma entrada do Gantt
 * @param {string} process - ID do processo
 * @param {number} start - Início
 * @param {number} end - Fim
 * @returns {GanttEntry}
 */
export const createGanttEntry = (process, start, end) => ({
  process,
  start,
  end,
});

/**
 * Valida se um objeto é uma entrada de Gantt válida
 * @param {any} entry
 * @returns {boolean}
 */
export const isValidGanttEntry = (entry) => {
  return (
    entry &&
    typeof entry.process === 'string' &&
    typeof entry.start === 'number' &&
    typeof entry.end === 'number' &&
    entry.start < entry.end
  );
};

/**
 * Calcula a duração de uma entrada do Gantt
 * @param {GanttEntry} entry
 * @returns {number}
 */
export const getGanttDuration = (entry) => {
  return entry.end - entry.start;
};

/**
 * Verifica se uma entrada representa CPU ociosa
 * @param {GanttEntry} entry
 * @returns {boolean}
 */
export const isIdleEntry = (entry) => {
  return entry.process === 'idle';
};
