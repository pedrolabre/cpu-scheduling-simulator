import { createStep } from '../engine/helpers/createStep';
import { calculateMetrics } from '../engine/helpers/computeMetrics';
import { cloneProcesses } from '../engine/helpers/cloneProcesses';
import { mergeGantt } from '../engine/helpers/mergeGantt';
import { validateProcesses } from '../engine/helpers/validateProcesses';

/**
 * Prioridade (Preemptivo e Não-Preemptivo)
 * Regra: Menor número = maior prioridade
 * Tie-breaker: menor priority → menor arrival → ordem original
 */
export const generatePrioritySteps = (processes, isPreemptive = false) => {
  if (!processes || processes.length === 0) {
    return { steps: [], gantt: [], processes: [] };
  }
  
  validateProcesses(processes);
  
  // Valida que todos têm prioridade
  for (const p of processes) {
    if (typeof p.priority !== 'number' || p.priority < 1) {
      throw new Error(`Process ${p.id}: priority must be >= 1`);
    }
  }
  
  const procs = cloneProcesses(processes);
  const n = procs.length;
  
  if (isPreemptive) {
    return generatePriorityPreemptiveSteps(procs);
  } else {
    return generatePriorityNonPreemptiveSteps(procs);
  }
};

/**
 * Prioridade Não-Preemptivo
 */
const generatePriorityNonPreemptiveSteps = (procs) => {
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
      'Iniciando Prioridade Não-Preemptivo',
      'Escalonamento por Prioridade\n\nNÃO-PREEMPTIVO: executa até o fim\nMenor número = Maior prioridade\nTie-breaker: menor priority → menor arrival → ordem original',
      [],
      null,
      [],
      'Prioriza processos por importância',
      []
    )
  );

  let completed = 0;
  while (completed < n) {
    // Processos disponíveis
    const available = procs
      .map((p, i) => ({ ...p, i }))
      .filter((p) => p.mt <= time && !executed[p.i]);

    if (available.length === 0) {
      // CPU ociosa
      const next = Math.min(...procs.filter((p, i) => !executed[i]).map(p => p.mt));
      if (time < next) {
        gantt.push({ process: 'idle', start: time, end: next });
        time = next;
      }
      continue;
    }

    // Menor número = maior prioridade; desempate FIFO
    available.sort((a, b) => 
      a.priority - b.priority || 
      a.mt - b.mt || 
      a._origIdx - b._origIdx
    );

    const sel = available[0];
    executed[sel.i] = true;

    steps.push(
      createStep(
        time,
        'SELEÇÃO',
        `Selecionar ${sel.id}`,
        `Processos disponíveis:\n${available
          .map(
            (p) =>
              `${p.id === sel.id ? '→ ' : '   '}${p.id}: prioridade ${p.priority} (chegada: ${p.mt})`
          )
          .join('\n')}\n\n${sel.id} tem maior prioridade (${sel.priority})`,
        available.map((p) => ({
          id: p.id,
          priority: p.priority,
          highlight: p.id === sel.id,
        })),
        sel.id,
        [],
        `${sel.id} por prioridade`,
        []
      )
    );

    // Executa completamente (não-preemptivo)
    gantt.push({ process: sel.id, start: time, end: time + sel.pc });
    time += sel.pc;
    completionById[sel.id] = time;
    completed++;

    steps.push(
      createStep(
        time,
        'CONCLUSÃO',
        `${sel.id} finalizou`,
        `✅ ${sel.id} completou!\nPrioridade: ${sel.priority}\nChegou: t=${sel.mt}\nTerminou: t=${time}\nFaltam: ${n - completed}`,
        [],
        null,
        [],
        `${sel.id} completo`,
        []
      )
    );
  }

  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(procs, completionById);
  
  steps.push(
    createStep(
      time,
      'FINALIZADO',
      'Completo',
      '🎉 Prioridade executou por importância\nNão-Preemptivo: executa até completar',
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

/**
 * Prioridade Preemptivo
 */
const generatePriorityPreemptiveSteps = (procs) => {
  const n = procs.length;
  const remaining = procs.map((p) => p.pc);
  const steps = [];
  const gantt = [];
  let time = 0;
  const completionById = {};
  let completed = 0;

  steps.push(
    createStep(
      0,
      'INÍCIO',
      'Iniciando Prioridade Preemptivo',
      'Escalonamento por Prioridade\n\nPREEMPTIVO: pode interromper\nMenor número = Maior prioridade\nTie-breaker: menor priority → menor arrival → ordem original',
      [],
      null,
      [],
      'Prioriza processos com interrupção',
      []
    )
  );

  while (completed < n) {
    const arrived = procs
      .map((p, i) => ({ ...p, i, remaining: remaining[i] }))
      .filter((p) => p.mt <= time && remaining[p.i] > 0);

    if (arrived.length === 0) {
      const next = Math.min(...procs.filter((p, i) => remaining[i] > 0).map(p => p.mt));
      if (time < next) {
        gantt.push({ process: 'idle', start: time, end: next });
        time = next;
      }
      continue;
    }

    arrived.sort((a, b) => 
      a.priority - b.priority || 
      a.mt - b.mt || 
      a._origIdx - b._origIdx
    );

    const sel = arrived[0];
    const idx = sel.i;

    steps.push(
      createStep(
        time,
        'SELEÇÃO',
        `Executar ${sel.id}`,
        `Processos prontos:\n${arrived
          .map(
            (p) =>
              `${p.id === sel.id ? '→ ' : '   '}${p.id}: prioridade ${p.priority}, restante: ${remaining[p.i]}`
          )
          .join('\n')}\n\n${sel.id} tem maior prioridade`,
        arrived.map((p) => ({
          id: p.id,
          priority: p.priority,
          highlight: p.id === sel.id,
        })),
        sel.id,
        [],
        `${sel.id} executando`,
        []
      )
    );

    gantt.push({ process: sel.id, start: time, end: time + 1 });
    remaining[idx]--;
    time++;

    if (remaining[idx] === 0) {
      completionById[sel.id] = time;
      completed++;

      steps.push(
        createStep(
          time,
          'CONCLUSÃO',
          `${sel.id} finalizou`,
          `✅ ${sel.id} completou!\nPrioridade: ${sel.priority}\nTerminou: t=${time}\nFaltam: ${n - completed}`,
          [],
          null,
          [],
          `${sel.id} completo`,
          []
        )
      );
    }
  }

  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(procs, completionById);
  
  steps.push(
    createStep(
      time,
      'FINALIZADO',
      'Completo',
      '🎉 Prioridade Preemptivo\nPreemptivo: interrompe para maior prioridade',
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
