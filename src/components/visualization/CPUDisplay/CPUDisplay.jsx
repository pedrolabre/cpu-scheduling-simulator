import React from 'react';

const CPUDisplay = ({ executing }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 border-2 border-gray-300 dark:border-slate-600">
      <h3 className="font-bold text-sm mb-2 text-center dark:text-gray-100">⚙️ CPU</h3>
      {executing ? (
        <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-4 rounded-lg text-center">
          <div className="text-3xl font-bold">{executing}</div>
          <div className="text-xs">EXECUTANDO</div>
        </div>
      ) : (
        <div className="bg-gray-200 dark:bg-slate-700 p-4 rounded-lg text-center">
          <div className="text-xl text-gray-500 dark:text-gray-400 font-bold">—</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">OCIOSA</div>
        </div>
      )}
    </div>
  );
};

export default CPUDisplay;
