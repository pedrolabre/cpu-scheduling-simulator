import { cloneProcesses } from '../../engine/helpers/cloneProcesses';
import { calculateMetrics } from '../../engine/helpers/computeMetrics';
import { mergeGantt } from '../../engine/helpers/mergeGantt';
import { validateProcesses } from '../../engine/helpers/validateProcesses';

/**
 * SJF - Shortest Job First (Não-Preemptivo)
 * Regra: Executa o processo com menor burst disponível
 * Tie-breaker: menor burst → menor arrival → ordem original
 */
export function SJF(processes) {
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
  const n = procs.length;
  const executed = Array(n).fill(false);
  
  let time = 0;
  let completed = 0;
  const gantt = [];
  const completionById = {};
  
  while (completed < n) {
    const available = procs
      .map((p, i) => ({ ...p, i }))
      .filter((p) => p.mt <= time && !executed[p.i]);
    
    if (available.length === 0) {
      const next = Math.min(...procs.filter((p, i) => !executed[i]).map(p => p.mt));
      if (time < next) {
        gantt.push({ process: 'idle', start: time, end: next });
        time = next;
      }
      continue;
    }
    
    available.sort((a, b) => 
      a.pc - b.pc || 
      a.mt - b.mt || 
      a._origIdx - b._origIdx
    );
    
    const sel = available[0];
    executed[sel.i] = true;
    
    gantt.push({ process: sel.id, start: time, end: time + sel.pc });
    time += sel.pc;
    completionById[sel.id] = time;
    completed++;
  }
  
  const mergedGantt = mergeGantt(gantt);
  const metrics = calculateMetrics(processes, completionById);
  
  return {
    gantt: mergedGantt,
    completion: completionById,
    ...metrics
  };
}
