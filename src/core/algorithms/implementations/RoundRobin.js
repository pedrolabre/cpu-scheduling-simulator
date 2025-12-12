import { cloneProcesses } from '../../engine/helpers/cloneProcesses';
import { calculateMetrics } from '../../engine/helpers/computeMetrics';
import { mergeGantt } from '../../engine/helpers/mergeGantt';
import { validateProcesses } from '../../engine/helpers/validateProcesses';

/**
 * Round Robin (Preemptivo por Tempo)
 * Regra: Cada processo recebe um quantum de tempo
 * Fila circular: processos voltam ao fim após usar quantum
 */
export function RoundRobin(processes, quantum) {
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
  
  if (!quantum || quantum <= 0) {
    throw new Error('Quantum must be > 0');
  }
  
  const procs = cloneProcesses(processes)
    .sort((a, b) => a.mt - b.mt || a._origIdx - b._origIdx);
  
  const n = procs.length;
  const remaining = procs.map((p) => p.pc);
  const completionById = {};
  const gantt = [];
  const queue = [];
  
  let time = 0;
  let processIndex = 0;
  let completed = 0;
  
  while (completed < n) {
    while (processIndex < n && procs[processIndex].mt <= time) {
      if (remaining[processIndex] > 0) {
        queue.push(processIndex);
      }
      processIndex++;
    }
    
    if (queue.length === 0) {
      if (processIndex < n) {
        const nextMt = procs[processIndex].mt;
        if (time < nextMt) {
          gantt.push({ process: 'idle', start: time, end: nextMt });
          time = nextMt;
          continue;
        }
      }
      continue;
    }
    
    const idx = queue.shift();
    const p = procs[idx];
    const exec = Math.min(quantum, remaining[idx]);
    
    gantt.push({ process: p.id, start: time, end: time + exec });
    time += exec;
    remaining[idx] -= exec;
    
    while (processIndex < n && procs[processIndex].mt <= time) {
      if (remaining[processIndex] > 0) {
        queue.push(processIndex);
      }
      processIndex++;
    }
    
    if (remaining[idx] > 0) {
      queue.push(idx);
    } else {
      completionById[p.id] = time;
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
