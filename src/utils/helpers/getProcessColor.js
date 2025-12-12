/**
 * Retorna a cor CSS para um processo específico
 */
export const getProcessColor = (id) => {
  const colors = {
    'A': 'bg-blue-500',
    'B': 'bg-green-500',
    'C': 'bg-yellow-500',
    'D': 'bg-purple-500',
    'E': 'bg-pink-500',
    'F': 'bg-indigo-500',
    'G': 'bg-red-500',
    'H': 'bg-teal-500',
    'I': 'bg-orange-500'
  };
  return colors[id] || 'bg-gray-500';
};

export const getPhaseColor = (phase) => {
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
