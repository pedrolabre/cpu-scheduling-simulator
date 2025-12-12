import { cloneProcesses } from '../../engine/helpers/cloneProcesses';
import { calculateMetrics } from '../../engine/helpers/computeMetrics';
import { mergeGantt } from '../../engine/helpers/mergeGantt';
import { validateProcesses } from '../../engine/helpers/validateProcesses';

/**
 * Prioridade Preemptivo
 * Regra: Menor número = maior prioridade, pode interromper
 * Tie-breaker: menor priority → menor arrival → ordem original
 * Preempção: checada a cada unidade de tempo
 */
export function PriorityPreemptive(processes) {
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
  
  for (const p of processes) {
    if (typeof p.priority !== 'number' || p.priority < 1) {
      throw new Error(`Process ${p.id}: priority must be >= 1`);
    }
  }
  
  const procs = cloneProcesses(processes);
  const n = procs.length;
  const remaining = procs.map((p) => p.pc);
  const completionById = {};
  const gantt = [];
  
  let time = 0;
  let completed = 0;
  
  while (completed < n) {
    const arrived = procs
      .map((p, i) => ({ ...p, i }))
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
    
    if (gantt.length && 
        gantt[gantt.length - 1].process === sel.id && 
        gantt[gantt.length - 1].end === time) {
      gantt[gantt.length - 1].end = time + 1;
    } else {
      gantt.push({ process: sel.id, start: time, end: time + 1 });
    }
    
    remaining[idx]--;
    time++;
    
    if (remaining[idx] === 0) {
      completionById[sel.id] = time;
      completed++;
    }
  }
  
  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  return {
    gantt: mergedGantt,
    completion: completionById,
    ...metrics
  };
}
