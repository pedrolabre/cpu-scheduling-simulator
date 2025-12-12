import React from 'react';

const ProcessQueue = ({ queue }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 border-2 border-gray-300 dark:border-slate-600">
      <h3 className="font-bold text-sm mb-2 dark:text-gray-100">📋 Fila</h3>
      {queue.length > 0 ? (
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {queue.map((p, i) => (
            <div
              key={i}
              className={`p-1.5 rounded border-l-4 text-xs ${
                p.highlight
                  ? 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-500 font-bold dark:text-yellow-200'
                  : 'bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-500 dark:text-gray-200'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-mono font-bold">{p.id}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {p.remaining
                    ? `R:${p.remaining}`
                    : p.pc
                    ? `PC:${p.pc}`
                    : p.priority
                    ? `P:${p.priority}`
                    : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 dark:text-gray-500 text-xs italic text-center">Vazia</p>
      )}
    </div>
  );
};

export default ProcessQueue;
