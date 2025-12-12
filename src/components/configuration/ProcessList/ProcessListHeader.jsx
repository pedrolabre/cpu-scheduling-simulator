import React from 'react';

/**
 * Header da lista de processos
 */
const ProcessListHeader = () => {
  return (
    <div className="bg-indigo-50 p-2 rounded border border-indigo-200 mb-2">
      <div className="grid grid-cols-5 gap-3 text-xs font-semibold text-indigo-900">
        <div className="text-center">ID</div>
        <div>Burst Time (PC)</div>
        <div>Arrival Time (MT)</div>
        <div>Prioridade</div>
        <div className="text-center">Ações</div>
      </div>
    </div>
  );
};

export default ProcessListHeader;
