import { List, Zap, Clock, Repeat, Star, Shield, Zap as Lightning } from 'lucide-react';

/**
 * Tipos de escalonamento disponíveis
 */
export const schedulingTypes = [
  {
    id: 'non-preemptive',
    name: 'Não-Preemptivo',
    icon: Shield,
    color: 'blue',
    description: 'Processos executam até completar',
    detail: 'Uma vez que um processo inicia, ele executa até terminar sem interrupções'
  },
  {
    id: 'preemptive',
    name: 'Preemptivo',
    icon: Lightning,
    color: 'purple',
    description: 'Processos podem ser interrompidos',
    detail: 'O sistema pode interromper um processo em execução para dar vez a outro'
  },
];

/**
 * Algoritmos organizados por tipo
 */
export const algorithmsByType = {
  'non-preemptive': [
    {
      id: 'FIFO',
      name: 'FIFO',
      icon: List,
      color: 'teal',
      description: 'First In First Out - Ordem de chegada',
    },
    {
      id: 'SJF',
      name: 'SJF',
      icon: Zap,
      color: 'blue',
      description: 'Shortest Job First - Menor tempo de CPU',
    },
    {
      id: 'PriorityNonPreemptive',
      name: 'Prioridade',
      icon: Star,
      color: 'pink',
      description: 'Por ordem de prioridade - sem interrupção',
    },
  ],
  'preemptive': [
    {
      id: 'SRTF',
      name: 'SRTF',
      icon: Clock,
      color: 'indigo',
      description: 'Shortest Remaining Time - Menor tempo restante',
    },
    {
      id: 'RR',
      name: 'Round Robin',
      icon: Repeat,
      color: 'purple',
      description: 'Fatia de tempo circular com quantum',
    },
    {
      id: 'PriorityPreemptive',
      name: 'Prioridade',
      icon: Star,
      color: 'rose',
      description: 'Por ordem de prioridade - com interrupção',
    },
  ],
};

/**
 * Busca nome do tipo pelo ID
 */
export const getTypeName = (typeId) => {
  return schedulingTypes.find(t => t.id === typeId)?.name || '';
};
