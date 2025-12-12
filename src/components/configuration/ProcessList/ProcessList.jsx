import React from 'react';
import ProcessItem from '../ProcessItem';

/**
 * Lista de processos configuráveis
 */
const ProcessList = ({ 
  processes, 
  onUpdateProcess, 
  onRemoveProcess,
  showPriority = false 
}) => {
  return (
    <div className="space-y-2">
      {processes.map((proc, index) => (
        <ProcessItem
          key={index}
          process={proc}
          index={index}
          onUpdate={onUpdateProcess}
          onRemove={onRemoveProcess}
          showPriority={showPriority}
          canRemove={processes.length > 1}
        />
      ))}
    </div>
  );
};

export default ProcessList;
