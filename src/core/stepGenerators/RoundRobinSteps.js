import { createStep } from '../engine/helpers/createStep';
import { calculateMetrics } from '../engine/helpers/computeMetrics';
import { cloneProcesses } from '../engine/helpers/cloneProcesses';
import { mergeGantt } from '../engine/helpers/mergeGantt';
import { validateProcesses } from '../engine/helpers/validateProcesses';

/**
 * Round Robin (Preemptivo por Tempo)
 * Regra: Cada processo recebe um quantum de tempo
 * Fila circular: processos voltam ao fim após usar quantum
 */
export const generateRoundRobinSteps = (processes, quantum = 2) => {
  if (!processes || processes.length === 0) {
    return { steps: [], gantt: [], processes: [] };
  }
  
  try {
    validateProcesses(processes);
  } catch (error) {
    console.error('RoundRobin validation error:', error);
    throw error;
  }
  
  // Validação de quantum
  if (!quantum || quantum <= 0) {
    quantum = 2; // Default seguro
  }
  
  const procs = cloneProcesses(processes);
  procs.sort((a, b) => a.mt - b.mt || a._origIdx - b._origIdx);
  
  const n = procs.length;
  const remaining = {};
  procs.forEach(p => {
    remaining[p.id] = p.pc;
  });
  
  const steps = [];
  const gantt = [];
  let time = 0;
  const completionById = {};
  const queue = [];

  steps.push(
    createStep(
      0,
      'INÍCIO',
      'Iniciando Round Robin',
      `Round Robin com Quantum = ${quantum}\n\nPREEMPTIVO: troca após quantum\nCada processo recebe fatia de tempo igual\nFila circular: justiça no tempo de CPU`,
      [],
      null,
      [],
      `Quantum: ${quantum} unidades`,
      []
    )
  );

  let nextProcessIdx = 0;
  let completed = 0;

  while (completed < n) {
    // Adicionar processos que chegaram à fila
    while (nextProcessIdx < n && procs[nextProcessIdx].mt <= time) {
      const p = procs[nextProcessIdx];
      if (remaining[p.id] > 0) {
        queue.push(p);
      }
      nextProcessIdx++;
    }

    if (queue.length === 0) {
      // CPU ociosa - avançar para próxima chegada
      if (nextProcessIdx < n) {
        const nextTime = procs[nextProcessIdx].mt;
        gantt.push({ process: 'idle', start: time, end: nextTime });
        time = nextTime;
      }
      continue;
    }

    // Pega primeiro processo da fila circular
    const proc = queue.shift();
    const execTime = Math.min(quantum, remaining[proc.id]);
    const willFinish = remaining[proc.id] <= quantum;

    const queueDisplay = queue.length > 0 
      ? [proc.id, ...queue.map(p => p.id)].join(' → ')
      : proc.id;

    steps.push(
      createStep(
        time,
        willFinish ? 'CONCLUINDO' : 'EXECUTANDO',
        `${proc.id} na CPU`,
        `🎯 Fila: ${queueDisplay}\n\n${proc.id} executará ${execTime} unidade(s)\nQuantum: ${quantum} | Restante: ${remaining[proc.id]}\n${willFinish ? '✅ Finalizará agora' : '🔄 Voltará à fila'}`,
        queue.map((p) => ({ id: p.id, pc: remaining[p.id] })),
        proc.id,
        [],
        `${proc.id} por ${execTime}u`,
        []
      )
    );

    gantt.push({ process: proc.id, start: time, end: time + execTime });
    time += execTime;
    remaining[proc.id] -= execTime;

    // Adicionar processos que chegaram durante execução
    while (nextProcessIdx < n && procs[nextProcessIdx].mt <= time) {
      const p = procs[nextProcessIdx];
      if (remaining[p.id] > 0) {
        queue.push(p);
      }
      nextProcessIdx++;
    }

    if (remaining[proc.id] > 0) {
      queue.push(proc);
    } else {
      completionById[proc.id] = time;
      completed++;
      
      steps.push(
        createStep(
          time,
          'CONCLUÍDO',
          `${proc.id} finalizou`,
          `✅ ${proc.id} completou em t=${time}!\nProcessos restantes: ${n - completed}`,
          queue.map((p) => ({ id: p.id, pc: remaining[p.id] })),
          null,
          [],
          `${proc.id} finalizou`,
          [proc.id]
        )
      );
    }
  }

  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  steps.push(
    createStep(
      time,
      'FINALIZADO',
      'Completo',
      `🎉 Round Robin com quantum ${quantum}\nPreemptivo: justiça no tempo de CPU`,
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
