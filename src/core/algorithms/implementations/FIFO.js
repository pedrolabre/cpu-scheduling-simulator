import { cloneProcesses } from '../../engine/helpers/cloneProcesses';
import { calculateMetrics } from '../../engine/helpers/computeMetrics';
import { mergeGantt } from '../../engine/helpers/mergeGantt';
import { validateProcesses } from '../../engine/helpers/validateProcesses';

/**
 * FIFO - First In First Out (Não-Preemptivo)
 * Regra: Primeiro a chegar, primeiro a executar
 * Tie-breaker: Ordem original de entrada
 */
export function FIFO(processes) {
  if (!processes || processes.length === 0) {
    return {
      gantt: [],
      completion: {},
      turnaround: {},
      waiting: {},
      avgTurnaround: 0,
      avgWaiting: 0
    };
  }
  
  validateProcesses(processes);
  
  const procs = cloneProcesses(processes);
  procs.sort((a, b) => a.mt - b.mt || a._origIdx - b._origIdx);
  
  let time = 0;
  const gantt = [];
  const completionById = {};
  
  for (const p of procs) {
    if (time < p.mt) {
      gantt.push({ process: 'idle', start: time, end: p.mt });
      time = p.mt;
    }
    
    gantt.push({ process: p.id, start: time, end: time + p.pc });
    time += p.pc;
    completionById[p.id] = time;
  }
  
  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  return {
    gantt: mergedGantt,
    completion: completionById,
    ...metrics
  };
}
