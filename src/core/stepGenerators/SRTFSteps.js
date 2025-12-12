import { createStep } from '../engine/helpers/createStep';
import { calculateMetrics } from '../engine/helpers/computeMetrics';
import { cloneProcesses } from '../engine/helpers/cloneProcesses';
import { mergeGantt } from '../engine/helpers/mergeGantt';
import { validateProcesses } from '../engine/helpers/validateProcesses';

/**
 * SRTF - Shortest Remaining Time First (Preemptivo)
 * Regra: Executa o processo com menor tempo RESTANTE
 * Tie-breaker: menor remaining → menor arrival → ordem original
 * Preempção: checada a cada unidade de tempo
 */
export const generateSRTFSteps = (processes) => {
  if (!processes || processes.length === 0) {
    return { steps: [], gantt: [], processes: [] };
  }
  
  validateProcesses(processes);
  
  const procs = cloneProcesses(processes);
  const n = procs.length;
  const remaining = procs.map((p) => p.pc);
  const steps = [];
  const gantt = [];
  let time = 0;
  let completed = 0;
  let lastProcess = null;
  const completionById = {};

  steps.push(
    createStep(
      0,
      'INÍCIO',
      'Iniciando SRTF',
      'SRTF = Shortest Remaining Time First\n\nPREEMPTIVO: pode interromper a cada unidade\nEscolhe sempre o menor tempo restante\nTie-breaker: menor remaining → menor arrival → ordem original',
      [],
      null,
      [],
      'Otimiza tempo médio (versão preemptiva do SJF)',
      [],
      remaining
    )
  );

  while (completed < n) {
    // Processos que já chegaram e não completaram
    const arrived = procs
      .map((p, i) => ({ ...p, i }))
      .filter((p) => p.mt <= time && remaining[p.i] > 0);

    if (arrived.length === 0) {
      // CPU ociosa - avançar para próxima chegada
      const next = Math.min(...procs.filter((p, i) => remaining[i] > 0).map(p => p.mt));
      if (time < next) {
        gantt.push({ process: 'idle', start: time, end: next });
        time = next;
      }
      continue;
    }

    // Escolher menor remaining; desempatar por mt então por ordem original
    arrived.sort((a, b) => 
      remaining[a.i] - remaining[b.i] || 
      a.mt - b.mt || 
      a._origIdx - b._origIdx
    );

    const sel = arrived[0];
    const idx = sel.i;
    const wasPreempted = lastProcess && lastProcess !== selected.id;

    const justArrived = processes
      .map((p, i) => ({ ...p, index: i }))
      .filter((p) => p.mt === time && remaining[p.index] > 0);

    if (justArrived.length > 0) {
      steps.push(
        createStep(
          time,
          'CHEGADA',
          `${justArrived.map((p) => p.id).join(', ')} chegou`,
          `Novo(s) processo(s) na fila`,
          arrived.map((p) => ({
            id: p.id,
            remaining: remaining[p.index],
            highlight: justArrived.some((j) => j.id === p.id),
          })),
          lastProcess,
          justArrived.map((p) => p.id),
          'Adicionados',
          [],
          remaining
        )
      );
    }

    if (!lastProcess || wasPreempted) {
      const sortedQueue = [...arrived].sort(
        (a, b) => remaining[a.index] - remaining[b.index]
      );

      if (wasPreempted) {
        steps.push(
          createStep(
            time,
            'PREEMPÇÃO',
            `${lastProcess} → ${selected.id}`,
            `⚠️ PREEMPÇÃO!\n${lastProcess} interrompido\n${selected.id} tem menor tempo (${remaining[idx]})`,
            sortedQueue.map((p) => ({ id: p.id, remaining: remaining[p.index] })),
            null,
            [],
            'Troca de processo',
            [],
            remaining
          )
        );
      }

      let explanation = `Analisando fila:\n\n`;
      sortedQueue.forEach((p) => {
        explanation += `${p.id === selected.id ? '→ ' : '   '}${p.id}: ${
          remaining[p.index]
        } restantes\n`;
      });
      explanation += `\n${selected.id} tem o menor → executar`;

      steps.push(
        createStep(
          time,
          'SELEÇÃO',
          `Executar ${selected.id}`,
          explanation,
          sortedQueue.map((p) => ({
            id: p.id,
            remaining: remaining[p.index],
            highlight: p.id === selected.id,
          })),
          selected.id,
          [],
          `${selected.id} na CPU`,
          [],
          remaining
        )
      );
    }

    if (gantt.length > 0 && gantt[gantt.length - 1].process === selected.id) {
      gantt[gantt.length - 1].end = time + 1;
    } else {
      gantt.push({ process: selected.id, start: time, end: time + 1 });
    }

    remaining[idx]--;
    time++;
    lastProcess = selected.id;

    if (remaining[idx] === 0) {
      completed++;
      completionById[sel.id] = time;
      steps.push(
        createStep(
          time,
          'CONCLUSÃO',
          `${selected.id} finalizou`,
          `✅ ${selected.id} completou!\n\nChegou: t=${selected.mt}\nTerminou: t=${time}\nFaltam: ${
            n - completed
          }`,
          arrived
            .filter((p) => p.index !== idx)
            .map((p) => ({ id: p.id, remaining: remaining[p.index] })),
          null,
          [],
          `${selected.id} completo`,
          [],
          remaining
        )
      );
      lastProcess = null;
    }
  }

  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  steps.push(
    createStep(
      time,
      'FINALIZADO',
      'Completo',
      '🎉 SRTF otimizou tempo médio\nPreemptivo: interrompe quando necessário',
      [],
      null,
      [],
      'Finalizado',
      procs.map((p) => p.id),
      remaining,
      metrics
    )
  );

  return { steps, gantt: mergedGantt, processes: procs };
};
