import { List, Zap, Clock, Repeat, Star } from 'lucide-react';

/**
 * Configuração dos algoritmos de escalonamento
 */
export const algorithmsConfig = [
  {
    id: 'FIFO',
    name: 'FIFO',
    fullName: 'First In First Out',
    icon: List,
    color: 'teal',
    description: 'First In First Out - Ordem de chegada',
    isPreemptive: false,
    requiresQuantum: false,
    requiresPriority: false,
  },
  {
    id: 'SJF',
    name: 'SJF',
    fullName: 'Shortest Job First',
    icon: Zap,
    color: 'blue',
    description: 'Shortest Job First - Processo mais curto',
    isPreemptive: false,
    requiresQuantum: false,
    requiresPriority: false,
  },
  {
    id: 'SRTF',
    name: 'SRTF',
    fullName: 'Shortest Remaining Time First',
    icon: Clock,
    color: 'indigo',
    description: 'Shortest Remaining Time - Menor tempo restante',
    isPreemptive: true,
    requiresQuantum: false,
    requiresPriority: false,
  },
  {
    id: 'RR',
    name: 'Round Robin',
    fullName: 'Round Robin',
    icon: Repeat,
    color: 'purple',
    description: 'Fatia de tempo circular',
    isPreemptive: true,
    requiresQuantum: true,
    requiresPriority: false,
  },
  {
    id: 'PriorityNonPreemptive',
    name: 'Prioridade (Não-Preemptivo)',
    fullName: 'Priority Non-Preemptive',
    icon: Star,
    color: 'pink',
    description: 'Por ordem de prioridade - sem interrupção',
    isPreemptive: false,
    requiresQuantum: false,
    requiresPriority: true,
  },
  {
    id: 'PriorityPreemptive',
    name: 'Prioridade (Preemptivo)',
    fullName: 'Priority Preemptive',
    icon: Star,
    color: 'rose',
    description: 'Por ordem de prioridade - com interrupção',
    isPreemptive: true,
    requiresQuantum: false,
    requiresPriority: true,
  },
];

/**
 * Encontra um algoritmo pelo ID
 */
export const getAlgorithmById = (id) => {
  return algorithmsConfig.find((alg) => alg.id === id);
};
