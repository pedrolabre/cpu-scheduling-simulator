import { createStep } from '../engine/helpers/createStep';
import { calculateMetrics } from '../engine/helpers/computeMetrics';
import { cloneProcesses } from '../engine/helpers/cloneProcesses';
import { mergeGantt } from '../engine/helpers/mergeGantt';
import { validateProcesses } from '../engine/helpers/validateProcesses';

/**
 * FIFO - First In First Out (Não-Preemptivo)
 * Regra: Primeiro a chegar, primeiro a executar
 * Tie-breaker: Ordem original de entrada
 */
export const generateFIFOSteps = (processes) => {
  // Validação
  if (!processes || processes.length === 0) {
    return { steps: [], gantt: [], processes: [] };
  }
  
  validateProcesses(processes);
  
  const procs = cloneProcesses(processes);
  // Ordena por chegada (mt) e desempata pela ordem original (FIFO)
  procs.sort((a, b) => a.mt - b.mt || a._origIdx - b._origIdx);
  
  const steps = [];
  const gantt = [];
  let time = 0;
  const completionById = {};

  steps.push(
    createStep(
      0,
      'INÍCIO',
      'Iniciando FIFO',
      'FIFO = First In First Out\n\nNÃO-PREEMPTIVO: executa até o fim\nOrdem: primeiro a chegar, primeiro a executar',
      [],
      null,
      [],
      'Algoritmo mais simples',
      []
    )
  );

  procs.forEach((proc, i) => {
    // CPU ociosa até processo chegar
    if (time < proc.mt) {
      gantt.push({ process: 'idle', start: time, end: proc.mt });
      steps.push(
        createStep(
          time,
          'CPU OCIOSA',
          'Aguardando processos',
          `⏸️ CPU ociosa (nenhum processo disponível)\nAvançando de t=${time} → t=${proc.mt}`,
          [],
          null,
          [],
          'Aguardando chegada',
          procs.slice(0, i).map((p) => p.id)
        )
      );
      time = proc.mt;
    }

    // Apenas um passo: Executando o processo
    steps.push(
      createStep(
        time,
        'EXECUTANDO',
        `${proc.id} executando`,
        `🔄 ${proc.id} chegou em t=${proc.mt} e iniciou execução\nPrecisa: ${proc.pc} unidades\n⏱️ Terminará em t=${time + proc.pc}`,
        procs.slice(i + 1).map((p) => ({ id: p.id, pc: p.pc })),
        proc.id,
        [],
        `${proc.id} na CPU (Não-Preemptivo)`,
        procs.slice(0, i).map((p) => p.id)
      )
    );

    // Executa processo até o fim (não-preemptivo)
    gantt.push({ process: proc.id, start: time, end: time + proc.pc });
    time += proc.pc;
    completionById[proc.id] = time;

    steps.push(
      createStep(
        time,
        'CONCLUÍDO',
        `${proc.id} finalizou`,
        `✅ ${proc.id} completou em t=${time}!\nTempo de execução: ${proc.pc} unidades\nTempo total no sistema: ${time - proc.mt} unidades`,
        procs.slice(i + 1).map((p) => ({ id: p.id, pc: p.pc })),
        null,
        [],
        `${proc.id} finalizou`,
        procs.slice(0, i + 1).map((p) => p.id)
      )
    );
  });

  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  steps.push(
    createStep(
      time,
      'FINALIZADO',
      'Completo',
      '🎉 FIFO executou na ordem de chegada\nNão-Preemptivo: sem interrupções',
      [],
      null,
      [],
      'Finalizado',
      procs.map((p) => p.id),
      [],
      metrics
    )
  );

  return { steps, gantt: mergedGantt, processes: procs };
};
