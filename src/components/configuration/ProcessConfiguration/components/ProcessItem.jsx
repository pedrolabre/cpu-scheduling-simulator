import React from 'react';
import { Trash2 } from 'lucide-react';

/**
 * Item de Processo Individual
 * Responsabilidade: Renderizar e editar um único processo
 */
const ProcessItem = ({ 
  process, 
  index, 
  showPriority, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded border dark:border-slate-600 flex gap-3 items-center">
      {/* ID */}
      <input
        type="text"
        value={process.id}
        onChange={(e) => onUpdate(index, 'id', e.target.value)}
        className="w-16 px-2 py-1 border dark:border-slate-600 rounded text-center font-bold bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
      />
      
      {/* Burst (PC) */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 dark:text-gray-300">Burst (PC)</label>
        <input
          type="number"
          value={process.pc}
          onChange={(e) => onUpdate(index, 'pc', e.target.value)}
          className="w-20 px-2 py-1 border dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
          min="1"
        />
      </div>
      
      {/* Chegada (MT) */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 dark:text-gray-300">Chegada (MT)</label>
        <input
          type="number"
          value={process.mt}
          onChange={(e) => onUpdate(index, 'mt', e.target.value)}
          className="w-20 px-2 py-1 border dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
          min="0"
        />
      </div>
      
      {/* Prioridade (condicional) */}
      {showPriority && (
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 dark:text-gray-300">Prioridade</label>
          <input
            type="number"
            value={process.priority}
            onChange={(e) => onUpdate(index, 'priority', e.target.value)}
            className="w-20 px-2 py-1 border dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100"
            min="1"
          />
        </div>
      )}
      
      {/* Botão Remover */}
      <button
        onClick={() => onRemove(index)}
        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
        title="Remover processo"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ProcessItem;
