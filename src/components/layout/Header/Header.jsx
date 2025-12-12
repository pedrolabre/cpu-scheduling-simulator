import React from 'react';
import { Home } from 'lucide-react';

const Header = ({ algorithm, onNavigateHome, currentTime, phase, action }) => {
  const getPhaseColor = (phase) => {
    const colors = {
      'INÍCIO': 'bg-blue-500',
      'CHEGADA': 'bg-green-500',
      'CPU OCIOSA': 'bg-gray-400',
      'ANÁLISE': 'bg-yellow-500',
      'SELEÇÃO': 'bg-indigo-500',
      'PREEMPÇÃO': 'bg-red-500',
      'EXECUÇÃO': 'bg-purple-500',
      'QUANTUM': 'bg-orange-500',
      'CONCLUSÃO': 'bg-teal-500',
      'FINALIZADO': 'bg-pink-500'
    };
    return colors[phase] || 'bg-gray-500';
  };

  return (
    <div className={`${getPhaseColor(phase)} text-white px-4 py-3 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <Home size={18} />
          </button>
          <div>
            <div className="text-xs opacity-90">
              {algorithm?.name} - {phase}
            </div>
            <div className="text-lg font-bold">{action}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs opacity-90">Tempo</div>
          <div className="text-2xl font-bold">t = {currentTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
