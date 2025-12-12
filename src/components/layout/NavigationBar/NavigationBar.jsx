import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationBar = ({ currentStep, totalSteps, onNavigate }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-t-4 border-indigo-600 dark:border-indigo-500 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Passo {currentStep + 1} de {totalSteps}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate(0)}
            disabled={currentStep === 0}
            className="px-3 py-1.5 bg-gray-300 dark:bg-slate-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600 disabled:opacity-30 text-xs font-semibold"
          >
            ⏮️ Início
          </button>
          <button
            onClick={() => onNavigate(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-3 py-1.5 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-30 text-sm flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <button
            onClick={() => onNavigate(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep === totalSteps - 1}
            className="px-3 py-1.5 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-30 text-sm flex items-center gap-1"
          >
            Próximo <ChevronRight size={16} />
          </button>
          <button
            onClick={() => onNavigate(totalSteps - 1)}
            disabled={currentStep === totalSteps - 1}
            className="px-3 py-1.5 bg-gray-300 dark:bg-slate-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600 disabled:opacity-30 text-xs font-semibold"
          >
            ⏭️ Final
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
