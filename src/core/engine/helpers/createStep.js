/**
 * Cria um passo genérico da simulação
 */
export const createStep = (
  time,
  phase,
  action,
  explanation,
  queue = [],
  executing = null,
  arrived = [],
  decision = '',
  completed = [],
  remaining = [],
  metrics = null
) => ({
  time,
  phase,
  action,
  explanation,
  queue,
  executing,
  arrived,
  decision,
  completed,
  remaining,
  metrics
});
