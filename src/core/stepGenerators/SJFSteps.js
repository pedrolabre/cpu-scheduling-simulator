import { createStep } from '../engine/helpers/createStep';
import { calculateMetrics } from '../engine/helpers/computeMetrics';
import { cloneProcesses } from '../engine/helpers/cloneProcesses';
import { mergeGantt } from '../engine/helpers/mergeGantt';
import { validateProcesses } from '../engine/helpers/validateProcesses';

/**
 * SJF - Shortest Job First (Não-Preemptivo)
 * Regra: Executa o processo com menor burst disponível
 * Tie-breaker: menor burst → menor arrival → ordem original
 */
export const generateSJFSteps = (processes) => {
  if (!processes || processes.length === 0) {
    return { steps: [], gantt: [], processes: [] };
  }
  
  validateProcesses(processes);
  
  const procs = cloneProcesses(processes);
  const n = procs.length;
  const executed = Array(n).fill(false);
  const steps = [];
  const gantt = [];
  let time = 0;
  const completionById = {};

  steps.push(
    createStep(
      0,
      'INÍCIO',
      'Iniciando SJF',
      'SJF = Shortest Job First\n\nNÃO-PREEMPTIVO: executa até o fim\nEscolhe sempre o processo mais curto disponível\nTie-breaker: menor burst → menor arrival → ordem original',
      [],
      null,
      [],
      'Minimiza tempo médio de espera',
      []
    )
  );

  let completed = 0;
  while (completed < n) {
    // Processos disponíveis no tempo atual
    const available = procs
      .map((p, i) => ({ ...p, i }))
      .filter((p) => p.mt <= time && !executed[p.i]);

    if (available.length === 0) {
      // CPU ociosa - avançar para próxima chegada
      const next = Math.min(...procs.filter((p, i) => !executed[i]).map(p => p.mt));
      if (time < next) {
        gantt.push({ process: 'idle', start: time, end: next });
        time = next;
      }
      continue;
    }

    // Escolher menor pc; desempatar por mt então por ordem original
    available.sort((a, b) => 
      a.pc - b.pc || 
      a.mt - b.mt || 
      a._origIdx - b._origIdx
    );

    const sel = available[0];
    executed[sel.i] = true;

    steps.push(
      createStep(
        time,
        'EXECUTANDO',
        `${sel.id} executando`,
        `📋 Disponíveis: ${available.map(p => `${p.id}(${p.pc})`).join(', ')}\n\n🏆 ${sel.id} escolhido - menor burst (${sel.pc} unidades)\n⏱️ Terminará em t=${time + sel.pc}`,
        available.filter(p => p.id !== sel.id).map((p) => ({ id: p.id, pc: p.pc })),
        sel.id,
        [],
        `${sel.id} na CPU (Não-Preemptivo)`,
        []
      )
    );

    // Executa processo completamente (não-preemptivo)
    gantt.push({ process: sel.id, start: time, end: time + sel.pc });
    time += sel.pc;
    completionById[sel.id] = time;
    completed++;

    steps.push(
      createStep(
        time,
        'CONCLUÍDO',
        `${sel.id} finalizou`,
        `✅ ${sel.id} completou em t=${time}!\nTempo de execução: ${sel.pc} unidades\nProcessos restantes: ${n - completed}`,
        [],
        null,
        [],
        `${sel.id} finalizou`,
        []
      )
    );
  }

  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  steps.push(
    createStep(
      time,
      'FINALIZADO',
      'Completo',
      '🎉 SJF priorizou processos curtos\nNão-Preemptivo: executa até completar',
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
