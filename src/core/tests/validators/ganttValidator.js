/**
 * Valida diagrama de Gantt
 */
export const validateGantt = (result, processes) => {
  const errors = [];

  if (!result || !result.gantt) {
    errors.push('Resultado não contém gantt');
    return errors;
  }

  const { gantt } = result;

  if (!Array.isArray(gantt) || gantt.length === 0) {
    errors.push('Gantt está vazio ou não é um array');
    return errors;
  }

  // Validação: continuidade (sem gaps)
  for (let i = 1; i < gantt.length; i++) {
    if (gantt[i].start !== gantt[i - 1].end) {
      errors.push(
        `Gap no Gantt entre blocos ${i - 1} e ${i}: ${gantt[i - 1].end} -> ${gantt[i].start}`
      );
    }
  }

  // Validação: soma dos tempos = soma dos PC (considerando idle)
  const totalBurst = processes.reduce((sum, p) => sum + p.pc, 0);
  const totalGanttTime = gantt.reduce((sum, block) => {
    if (block.process !== 'idle') {
      return sum + (block.end - block.start);
    }
    return sum;
  }, 0);

  if (totalGanttTime !== totalBurst) {
    errors.push(
      `Soma dos tempos de execução no Gantt (${totalGanttTime}) !== soma dos PC (${totalBurst})`
    );
  }

  // Validação: todos os processos aparecem
  const processesInGantt = new Set();
  gantt.forEach((block) => {
    if (block.process !== 'idle') {
      processesInGantt.add(block.process);
    }
  });

  processes.forEach((process) => {
    if (!processesInGantt.has(process.id)) {
      errors.push(`Processo ${process.id} não aparece no Gantt`);
    }
  });

  // Validação: sem sobreposições
  for (let i = 1; i < gantt.length; i++) {
    if (gantt[i].start < gantt[i - 1].end) {
      errors.push(`Sobreposição no Gantt entre blocos ${i - 1} e ${i}`);
    }
  }

  return errors;
};

export default validateGantt;
