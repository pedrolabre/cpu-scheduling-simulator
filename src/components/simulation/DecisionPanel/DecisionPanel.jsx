import React from 'react';

const DecisionPanel = ({ decision }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 border-2 border-purple-200 dark:border-purple-900">
      <h3 className="font-bold text-sm mb-2 dark:text-gray-100">💡 Decisão</h3>
      <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold">{decision}</p>
    </div>
  );
};

export default DecisionPanel;
