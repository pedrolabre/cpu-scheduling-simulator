import { useState } from 'react';

/**
 * Hook para gerenciar processos
 */
export const useProcesses = (initialProcesses) => {
  const [processes, setProcesses] = useState(
    initialProcesses || [
      { id: 'A', pc: 1, mt: 0, priority: 1 },
      { id: 'B', pc: 1, mt: 0, priority: 1 },
      { id: 'C', pc: 1, mt: 0, priority: 1 },
      { id: 'D', pc: 1, mt: 0, priority: 1 },
      { id: 'E', pc: 1, mt: 0, priority: 1 },
    ]
  );

  const addProcess = () => {
    const newId = String.fromCharCode(65 + processes.length);
    setProcesses([...processes, { id: newId, pc: 1, mt: 0, priority: 1 }]);
  };

  const addMultipleProcesses = (count) => {
    const newProcesses = [];
    const startIndex = processes.length;
    
    for (let i = 0; i < count; i++) {
      const newId = String.fromCharCode(65 + startIndex + i);
      newProcesses.push({ id: newId, pc: 1, mt: 0, priority: 1 });
    }
    
    setProcesses([...processes, ...newProcesses]);
  };

  const removeProcess = (index) => {
    if (processes.length > 1) {
      setProcesses(processes.filter((_, i) => i !== index));
    }
  };

  const updateProcess = (index, field, value) => {
    const updated = [...processes];
    if (field === 'id') {
      updated[index][field] = value;
    } else if (field === 'pc') {
      // Burst time deve ser >= 1
      updated[index][field] = Math.max(1, parseInt(value) || 1);
    } else {
      // Outros campos numéricos podem ser >= 0
      updated[index][field] = Math.max(0, parseInt(value) || 0);
    }
    setProcesses(updated);
  };

  const randomizeProcesses = () => {
    const randomized = processes.map((proc, index) => ({
      id: proc.id,
      pc: Math.floor(Math.random() * 15) + 1, // 1 a 15 unidades de burst
      mt: Math.floor(Math.random() * 10), // 0 a 9 unidades de chegada
      priority: Math.floor(Math.random() * 5) + 1, // 1 a 5 prioridade
    }));
    setProcesses(randomized);
  };

  const resetProcesses = () => {
    setProcesses([
      { id: 'A', pc: 1, mt: 0, priority: 1 },
      { id: 'B', pc: 1, mt: 0, priority: 1 },
      { id: 'C', pc: 1, mt: 0, priority: 1 },
      { id: 'D', pc: 1, mt: 0, priority: 1 },
      { id: 'E', pc: 1, mt: 0, priority: 1 },
    ]);
  };

  return {
    processes,
    addProcess,
    addMultipleProcesses,
    removeProcess,
    updateProcess,
    resetProcesses,
    randomizeProcesses,
  };
};
