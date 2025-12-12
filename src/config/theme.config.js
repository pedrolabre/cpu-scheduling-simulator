/**
 * Configurações de tema e cores da aplicação
 */
export const themeConfig = {
  // Cores dos algoritmos
  algorithmColors: {
    FIFO: 'teal',
    SJF: 'blue',
    SRTF: 'indigo',
    RR: 'purple',
    PriorityNonPreemptive: 'pink',
    PriorityPreemptive: 'rose',
  },
  
  // Cores das fases da simulação
  phaseColors: {
    INÍCIO: 'blue',
    CHEGADA: 'green',
    EXECUTANDO: 'indigo',
    CONCLUINDO: 'purple',
    CONCLUÍDO: 'green',
    SELEÇÃO: 'yellow',
    QUANTUM: 'orange',
    'CPU OCIOSA': 'gray',
    FINALIZADO: 'green',
  },
  
  // Cores do diagrama de Gantt
  ganttColors: {
    idle: '#FEF3C7', // Yellow-100
    executing: '#DBEAFE', // Blue-100
  },
  
  // Cores de status
  statusColors: {
    running: '#10B981', // Green-500
    waiting: '#F59E0B', // Amber-500
    idle: '#6B7280', // Gray-500
    completed: '#059669', // Emerald-600
  },
};

export default themeConfig;
