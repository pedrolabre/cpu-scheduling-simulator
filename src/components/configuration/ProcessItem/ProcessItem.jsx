import React from 'react';
import { Trash2 } from 'lucide-react';
import { NumberInput, Input } from '../../common/Input';

/**
 * Item individual de processo na lista
 */
const ProcessItem = ({ 
  process, 
  index, 
  onUpdate, 
  onRemove, 
  showPriority = false,
  canRemove = true 
}) => {
  return (
    <div className="bg-gray-50 p-3 rounded border flex gap-3 items-center">
      <Input
        type="text"
        value={process.id}
        onChange={(e) => onUpdate(index, 'id', e.target.value)}
        className="w-16 px-2 py-1 border rounded text-center font-bold"
        maxLength={1}
      />
      
      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Burst (PC)</label>
        <NumberInput
          value={process.pc}
          onChange={(value) => onUpdate(index, 'pc', value)}
          min={1}
          className="w-20"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Chegada (MT)</label>
        <NumberInput
          value={process.mt}
          onChange={(value) => onUpdate(index, 'mt', value)}
          min={0}
          className="w-20"
        />
      </div>
      
      {showPriority && (
        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Prioridade</label>
          <NumberInput
            value={process.priority}
            onChange={(value) => onUpdate(index, 'priority', value)}
            min={1}
            className="w-20"
          />
        </div>
      )}
      
      <button
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        title={canRemove ? "Remover processo" : "Deve haver pelo menos um processo"}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ProcessItem;
