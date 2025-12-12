/**
 * Valida métricas calculadas pelos algoritmos
 */
export const validateMetrics = (result, processes) => {
  const errors = [];

  if (!result || !result.metricsById) {
    errors.push('Resultado não contém metricsById');
    return errors;
  }

  const { metricsById } = result;

  processes.forEach((process) => {
    const metrics = metricsById[process.id];

    if (!metrics) {
      errors.push(`Métricas não encontradas para processo ${process.id}`);
      return;
    }

    // Validação: completion >= mt + pc
    if (metrics.completion < process.mt + process.pc) {
      errors.push(
        `${process.id}: completion (${metrics.completion}) < mt + pc (${process.mt + process.pc})`
      );
    }

    // Validação: turnaround = completion - mt
    const expectedTurnaround = metrics.completion - process.mt;
    if (metrics.turnaround !== expectedTurnaround) {
      errors.push(
        `${process.id}: turnaround (${metrics.turnaround}) !== completion - mt (${expectedTurnaround})`
      );
    }

    // Validação: waiting = turnaround - pc
    const expectedWaiting = metrics.turnaround - process.pc;
    if (metrics.waiting !== expectedWaiting) {
      errors.push(
        `${process.id}: waiting (${metrics.waiting}) !== turnaround - pc (${expectedWaiting})`
      );
    }

    // Validação: waiting >= 0
    if (metrics.waiting < 0) {
      errors.push(`${process.id}: waiting time (${metrics.waiting}) < 0`);
    }
  });

  return errors;
};

export default validateMetrics;
