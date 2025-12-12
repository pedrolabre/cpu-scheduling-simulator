/**
 * Mescla blocos adjacentes do Gantt com mesmo processo
 */
export const mergeGantt = (gantt) => {
  if (!gantt || gantt.length === 0) return [];
  
  const res = [{ ...gantt[0] }];
  for (let i = 1; i < gantt.length; i++) {
    const cur = gantt[i];
    const last = res[res.length - 1];
    
    // Mescla se mesmo processo e blocos contíguos
    if (cur.process === last.process && last.end === cur.start) {
      last.end = cur.end;
    } else {
      res.push({ ...cur });
    }
  }
  return res;
};
