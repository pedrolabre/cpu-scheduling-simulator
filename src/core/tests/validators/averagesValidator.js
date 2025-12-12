/**
 * Valida médias calculadas
 */
export const validateAverages = (result, processes) => {
  const errors = [];

  if (!result || !result.metricsById) {
    errors.push('Resultado não contém metricsById');
    return errors;
  }

  const { metricsById } = result;

  // Calcula médias manualmente
  const processCount = processes.length;
  let sumTurnaround = 0;
  let sumWaiting = 0;

  processes.forEach((process) => {
    const metrics = metricsById[process.id];
    if (metrics) {
      sumTurnaround += metrics.turnaround;
      sumWaiting += metrics.waiting;
    }
  });

  const expectedAvgTurnaround = sumTurnaround / processCount;
  const expectedAvgWaiting = sumWaiting / processCount;

  // Tolerância para diferenças de ponto flutuante
  const epsilon = 0.001;

  // Nota: avgTurnaround e avgWaiting podem não estar no resultado
  // Dependendo da implementação, podem estar em lastStep.metrics
  const avgTurnaround = result.avgTurnaround;
  const avgWaiting = result.avgWaiting;

  if (avgTurnaround !== undefined) {
    if (Math.abs(avgTurnaround - expectedAvgTurnaround) > epsilon) {
      errors.push(
        `avgTurnaround (${avgTurnaround}) difere do esperado (${expectedAvgTurnaround})`
      );
    }
  }

  if (avgWaiting !== undefined) {
    if (Math.abs(avgWaiting - expectedAvgWaiting) > epsilon) {
      errors.push(
        `avgWaiting (${avgWaiting}) difere do esperado (${expectedAvgWaiting})`
      );
    }
  }

  return errors;
};

export default validateAverages;
