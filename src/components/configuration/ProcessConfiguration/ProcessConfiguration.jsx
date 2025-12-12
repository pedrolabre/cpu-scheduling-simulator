import React, { useState } from 'react';
import { Home, Play, Plus, HelpCircle, Dices } from 'lucide-react';
import { HelpModal, ProcessItem } from './components';

/**
 * Configuração de Processos
 * Responsabilidade: Gerenciar lista de processos e parâmetros de simulação
 */
const ProcessConfiguration = ({
  algorithm,
  processes,
  quantum,
  onUpdateProcess,
  onAddProcess,
  onRemoveProcess,
  onUpdateQuantum,
  onRunSimulation,
  onNavigateHome,
  onAddMultipleProcesses,
  onRandomizeProcesses,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  const showPriority = algorithm?.id === 'Priority' || 
                       algorithm?.id === 'PriorityNonPreemptive' || 
                       algorithm?.id === 'PriorityPreemptive';

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-gray-950 flex flex-col transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 shadow-md px-4 py-2 border-b-4 border-indigo-600 dark:border-indigo-400">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-gray-900 dark:text-gray-100"
              title="Voltar ao menu"
            >
              <Home size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">
                {algorithm?.name}
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {algorithm?.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
            title="Abrir ajuda"
          >
            <HelpCircle size={18} />
            Ajuda
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Configurar Processos
            </h2>

            {/* Quantum (Round Robin) */}
            {algorithm?.id === 'RR' && (
              <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-700">
                <label className="block text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  Quantum (unidades de tempo):
                </label>
                <input
                  type="number"
                  value={quantum}
                  onChange={(e) =>
                    onUpdateQuantum(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-32 px-3 py-2 border dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                  min="1"
                />
              </div>
            )}

            {/* Lista de Processos */}
            <div className="space-y-2 mb-4">
              {processes.map((proc, index) => (
                <ProcessItem
                  key={index}
                  process={proc}
                  index={index}
                  showPriority={showPriority}
                  onUpdate={onUpdateProcess}
                  onRemove={onRemoveProcess}
                />
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={onAddProcess}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                title="Adicionar mais um processo"
              >
                <Plus size={20} /> Adicionar Processo
              </button>
              <button
                onClick={onRandomizeProcesses}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                title="Gerar valores aleatórios para todos os processos"
              >
                <Dices size={20} /> Valores Aleatórios
              </button>
              <button
                onClick={onRunSimulation}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold"
                title="Iniciar simulação"
              >
                <Play size={20} /> Simular
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Ajuda */}
      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
        algorithm={algorithm} 
      />
    </div>
  );
};

export default ProcessConfiguration;
