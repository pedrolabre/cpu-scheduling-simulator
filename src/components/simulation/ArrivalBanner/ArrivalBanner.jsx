import React from 'react';

const ArrivalBanner = ({ arrived }) => {
  if (!arrived || arrived.length === 0) return null;

  return (
    <div className="bg-green-50 dark:bg-green-950/40 border-2 border-green-500 dark:border-green-700 rounded-lg p-2 mb-3">
      <div className="font-bold text-green-800 dark:text-green-300 text-sm">
        🆕 Novo(s): {arrived.join(', ')}
      </div>
    </div>
  );
};

export default ArrivalBanner;
