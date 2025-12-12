import React from 'react';

const ExplanationPanel = ({ explanation }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 border-2 border-blue-200 dark:border-blue-900">
      <h3 className="font-bold text-sm mb-2 dark:text-gray-100">📖 Explicação</h3>
      <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
        {explanation}
      </p>
    </div>
  );
};

export default ExplanationPanel;
