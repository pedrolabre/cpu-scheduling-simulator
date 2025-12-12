import React from 'react';
import { X } from 'lucide-react';

/**
 * Modal de Ajuda para Configuração de Processos
 */
const HelpModal = ({ isOpen, onClose, algorithm }) => {
  if (!isOpen) return null;

  const showPriority = algorithm?.id === 'Priority' || 
                       algorithm?.id === 'PriorityNonPreemptive' || 
                       algorithm?.id === 'PriorityPreemptive';

  return (
    <div className="fixed inset-0 glass-effect flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-indigo-600 dark:bg-indigo-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Ajuda - Configuração de Processos</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-indigo-700 dark:hover:bg-indigo-800 rounded"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Campos dos Processos */}
          <section>
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-300 mb-2">
              📋 Campos dos Processos
            </h3>
            <div className="space-y-2 text-sm text-gray-900 dark:text-gray-200">
              <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded">
                <strong>ID:</strong> Identificador do processo (A, B, C, ...)
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded">
                <strong>Burst (PC):</strong> Tempo de CPU necessário (Processing Time)
                <br />
                <span className="text-gray-600 dark:text-gray-300">
                  Exemplo: 5 = processo precisa de 5 unidades de tempo
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded">
                <strong>Chegada (MT):</strong> Momento em que o processo chega (Arrival Time)
                <br />
                <span className="text-gray-600 dark:text-gray-300">
                  Exemplo: 0 = chega no início, 3 = chega no tempo 3
                </span>
              </div>
              {showPriority && (
                <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded">
                  <strong>Prioridade:</strong> Nível de prioridade (menor número = maior prioridade)
                  <br />
                  <span className="text-gray-600 dark:text-gray-300">
                    Exemplo: 1 = máxima prioridade, 5 = baixa prioridade
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Como Usar */}
          <section>
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-300 mb-2">
              🔧 Como Usar
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-900 dark:text-gray-200">
              <li>A aplicação inicia com 5 processos padrão (valores PC=1, MT=0)</li>
              <li>Edite os valores de cada processo conforme necessário</li>
              <li>Use o botão <strong>"+ Adicionar Processo"</strong> para adicionar mais processos</li>
              <li>Use o botão <strong>"🗑️"</strong> para remover um processo específico</li>
              <li>Clique em <strong>"Simular"</strong> quando estiver pronto</li>
            </ol>
          </section>

          {/* Quantum (Round Robin) */}
          {algorithm?.id === 'RR' && (
            <section>
              <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-400 mb-2">
                ⏱️ Quantum (Round Robin)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                O Quantum define quantas unidades de tempo cada processo pode usar antes de ser interrompido.
                <br />
                <strong>Exemplo:</strong> Quantum = 2 significa que cada processo executa no máximo 2 unidades de tempo por vez.
              </p>
            </section>
          )}

          {/* Dicas */}
          <section>
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-400 mb-2">
              💡 Dicas
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Processos com MT=0 chegam no início da simulação</li>
              <li>Use valores de PC diferentes para ver melhor o comportamento do algoritmo</li>
              <li>Tente começar com 3-5 processos para facilitar o entendimento</li>
              <li>Você pode ter até 26 processos (A-Z)</li>
            </ul>
          </section>

          {/* Exemplo Prático */}
          <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
              📊 Exemplo Prático
            </h3>
            <div className="text-sm font-mono bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 p-3 rounded">
              <div>Processo A: PC=10, MT=0, Priority=3</div>
              <div>Processo B: PC=5, MT=2, Priority=1</div>
              <div>Processo C: PC=8, MT=4, Priority=2</div>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-2">
              A chega primeiro com 10 unidades, B chega no tempo 2 com 5 unidades, C chega no tempo 4 com 8 unidades.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-slate-800 p-4 border-t dark:border-slate-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold"
          >
            Fechar Ajuda
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
