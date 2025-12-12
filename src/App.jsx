import React, { useState } from 'react';
import MainMenu from './components/layout/MainMenu';
import ProcessConfiguration from './components/configuration/ProcessConfiguration';
import SimulationView from './components/simulation/SimulationView';
import { useProcesses } from './hooks/processes/useProcesses';
import { useSimulation } from './hooks/simulation/useSimulation';
import { algorithmsConfig, getAlgorithmById } from './config/algorithms.config';

/**
 * Componente principal da aplicação
 */
function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [quantum, setQuantum] = useState(2);

  const {
    processes,
    addProcess,
    addMultipleProcesses,
    removeProcess,
    updateProcess,
    resetProcesses,
    randomizeProcesses,
  } = useProcesses();

  const {
    simulation,
    currentStep,
    runSimulation,
    resetSimulation,
    navigateToStep,
  } = useSimulation();

  const handleSelectAlgorithm = (algorithmId) => {
    setSelectedAlgorithm(algorithmId);
    resetSimulation();
  };

  const handleNavigateHome = () => {
    setSelectedAlgorithm(null);
    resetSimulation();
  };

  const handleRunSimulation = () => {
    runSimulation(selectedAlgorithm, processes, quantum);
  };

  const currentAlgorithm = getAlgorithmById(selectedAlgorithm);

  // Menu Principal
  if (!selectedAlgorithm) {
    console.log('Rendering MainMenu...');
    return <MainMenu onSelectAlgorithm={handleSelectAlgorithm} />;
  }

  // Configuração de Processos
  if (!simulation) {
    return (
      <ProcessConfiguration
        algorithm={currentAlgorithm}
        processes={processes}
        quantum={quantum}
        onUpdateProcess={updateProcess}
        onAddProcess={addProcess}
        onAddMultipleProcesses={addMultipleProcesses}
        onRemoveProcess={removeProcess}
        onUpdateQuantum={setQuantum}
        onRunSimulation={handleRunSimulation}
        onNavigateHome={handleNavigateHome}
        onRandomizeProcesses={randomizeProcesses}
      />
    );
  }

  // Visualização da Simulação
  return (
    <SimulationView
      algorithm={currentAlgorithm}
      simulation={simulation}
      currentStep={currentStep}
      onNavigate={navigateToStep}
      onNavigateHome={() => {
        resetSimulation();
      }}
    />
  );
}

export default App;
