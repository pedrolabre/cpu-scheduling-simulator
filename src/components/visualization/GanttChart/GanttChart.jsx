import React from 'react';
import { getProcessColor } from '../../../utils/helpers/getProcessColor';

const GanttChart = ({ gantt, currentTime }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 border-2 border-gray-300 dark:border-slate-600">
      <h3 className="font-bold text-sm mb-2 dark:text-gray-100">📊 Diagrama de Gantt</h3>
      <div className="overflow-x-auto">
        <div className="flex min-w-full border-2 border-gray-400 dark:border-slate-500 rounded">
          {gantt.map((item, index) => {
            const duration = item.end - item.start;
            const color = getProcessColor(item.process);
            const isCompleted = currentTime >= item.end;
            const isCurrent = currentTime >= item.start && currentTime < item.end;
            const isFuture = currentTime < item.start;

            let blockColor = isFuture ? 'bg-gray-300' : color;
            let textColor = isFuture ? 'text-gray-500' : 'text-white';

            return (
              <div
                key={index}
                className={`${blockColor} ${
                  isCurrent ? 'ring-4 ring-yellow-400 animate-pulse' : ''
                } ${textColor} p-2 border-r-2 border-white flex flex-col items-center justify-center transition-all duration-500`}
                style={{ width: `${duration * 40}px`, minWidth: '40px' }}
              >
                <div className="font-bold text-base">{item.process}</div>
                <div
                  className={`text-[10px] px-1 rounded ${
                    isCompleted || isCurrent
                      ? 'bg-black bg-opacity-30'
                      : 'bg-gray-400'
                  }`}
                >
                  {item.start}-{item.end}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
