import { useState } from 'react';
import { generateFIFOSteps } from '../../core/stepGenerators/FIFOSteps';
import { generateSJFSteps } from '../../core/stepGenerators/SJFSteps';
import { generateSRTFSteps } from '../../core/stepGenerators/SRTFSteps';
import { generateRoundRobinSteps } from '../../core/stepGenerators/RoundRobinSteps';
import { generatePrioritySteps } from '../../core/stepGenerators/PrioritySteps';

/**
 * Hook para gerenciar a simulação
 */
export const useSimulation = () => {
  const [simulation, setSimulation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const runSimulation = (algorithmId, processes, quantum = 2) => {
    console.log('Running simulation:', algorithmId, 'Processes:', processes, 'Quantum:', quantum);
    let result;

    switch (algorithmId) {
      case 'FIFO':
        result = generateFIFOSteps(processes);
        break;
      case 'SJF':
        result = generateSJFSteps(processes);
        break;
      case 'SRTF':
        result = generateSRTFSteps(processes);
        break;
      case 'RR':
        result = generateRoundRobinSteps(processes, quantum);
        break;
      case 'PriorityNonPreemptive':
      case 'Priority':
        result = generatePrioritySteps(processes, false);
        break;
      case 'PriorityPreemptive':
        result = generatePrioritySteps(processes, true);
        break;
      default:
        console.error('Unknown algorithm:', algorithmId);
        return;
    }

    console.log('Simulation result:', result);
    if (!result || !result.steps || result.steps.length === 0) {
      console.error('Invalid simulation result');
      return;
    }

    setSimulation(result);
    setCurrentStep(0);
  };

  const resetSimulation = () => {
    setSimulation(null);
    setCurrentStep(0);
  };

  const navigateToStep = (step) => {
    if (simulation && step >= 0 && step < simulation.steps.length) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (simulation && currentStep < simulation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    simulation,
    currentStep,
    runSimulation,
    resetSimulation,
    navigateToStep,
    nextStep,
    previousStep,
  };
};
