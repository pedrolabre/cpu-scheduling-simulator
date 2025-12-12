import React from 'react';

const MetricsDisplay = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-3 border-2 border-green-600 dark:border-green-700 mt-3">
      <h3 className="font-bold text-green-900 dark:text-green-300 text-base mb-2">
        🎯 Resultados Finais
      </h3>
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div className="bg-white dark:bg-slate-800 p-2 rounded shadow text-center">
          <div className="text-[10px] text-gray-600 dark:text-gray-400 mb-1">Turnaround Médio</div>
          <div className="text-xl font-bold text-green-700 dark:text-green-400">
            {metrics.avgTurnaround.toFixed(2)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-2 rounded shadow text-center">
          <div className="text-[10px] text-gray-600 dark:text-gray-400 mb-1">Espera Média</div>
          <div className="text-xl font-bold text-green-700 dark:text-green-400">
            {metrics.avgWaiting.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
