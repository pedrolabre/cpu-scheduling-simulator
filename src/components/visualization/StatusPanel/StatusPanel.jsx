import React from 'react';

const StatusPanel = ({ completed, remaining, processes }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 border-2 border-gray-300 dark:border-slate-600">
      <h3 className="font-bold text-sm mb-2 dark:text-gray-100">📊 Status</h3>
      <div className="space-y-1.5">
        <div className="p-1.5 bg-green-50 dark:bg-green-950/40 rounded border border-green-300 dark:border-green-800">
          <div className="text-[10px] text-gray-600 dark:text-gray-400">Concluídos</div>
          <div className="font-bold text-green-700 dark:text-green-400 text-xs">
            {completed.length > 0 ? completed.join(', ') : 'Nenhum'}
          </div>
        </div>
        {remaining && remaining.length > 0 && (
          <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-300 dark:border-blue-800">
            <div className="text-[10px] text-gray-600 dark:text-gray-400">Restantes</div>
            <div className="font-bold text-blue-700 dark:text-blue-400 text-xs">
              {processes
                .map((p, i) => (remaining[i] > 0 ? `${p.id}:${remaining[i]}` : ''))
                .filter(Boolean)
                .join(', ') || 'Todos completados'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPanel;
