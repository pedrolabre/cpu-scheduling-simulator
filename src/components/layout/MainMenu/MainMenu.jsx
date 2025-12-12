import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { SettingsModal } from './components';
import { schedulingTypes, algorithmsByType, getTypeName } from './config';

/**
 * Menu Principal
 * Responsabilidade: Navegação entre tipos e algoritmos
 */
const MainMenu = ({ onSelectAlgorithm }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Botão de configurações
  const SettingsButton = () => (
    <button
      onClick={() => setShowSettings(true)}
      className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-slate-600"
    >
      <Settings className="text-gray-700 dark:text-gray-200" size={24} />
    </button>
  );

  // Primeira tela: escolher tipo (Preemptivo/Não-Preemptivo)
  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-gray-950 dark:to-black p-6 transition-colors">
        <div className="max-w-5xl mx-auto">
          {/* Botão de Configurações */}
          <div className="flex justify-end mb-6">
            <SettingsButton />
          </div>

          {/* Modal de Configurações */}
          <SettingsModal 
            isOpen={showSettings} 
            onClose={() => setShowSettings(false)} 
          />

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Sistema de Simulação de Escalonamento
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Escolha o tipo de escalonamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schedulingTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-4 border-${type.color}-200 dark:border-${type.color}-600 hover:border-${type.color}-400 dark:hover:border-${type.color}-400 text-center group hover:scale-105`}
                >
                  <div
                    className={`w-24 h-24 bg-${type.color}-100 dark:bg-${type.color}-950 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-${type.color}-200 dark:group-hover:bg-${type.color}-900 transition`}
                  >
                    <Icon className={`text-${type.color}-600 dark:text-${type.color}-300`} size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {type.name}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                    {type.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.detail}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Segunda tela: mostrar algoritmos do tipo selecionado
  const algorithms = algorithmsByType[selectedType];
  const typeName = getTypeName(selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-gray-950 dark:to-black p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSelectedType(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-all text-gray-900 dark:text-gray-100"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>

          <SettingsButton />
        </div>

        {/* Modal de Configurações */}
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Algoritmos {typeName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Escolha um algoritmo para simular
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((alg) => {
            const Icon = alg.icon;
            return (
              <button
                key={alg.id}
                onClick={() => onSelectAlgorithm(alg.id)}
                className={`bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-${alg.color}-200 dark:border-${alg.color}-600 hover:border-${alg.color}-400 dark:hover:border-${alg.color}-400 text-left group`}
              >
                <div
                  className={`w-12 h-12 bg-${alg.color}-100 dark:bg-${alg.color}-950 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${alg.color}-200 dark:group-hover:bg-${alg.color}-900 transition`}
                >
                  <Icon className={`text-${alg.color}-600 dark:text-${alg.color}-300`} size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {alg.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{alg.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
