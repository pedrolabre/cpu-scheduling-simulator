import React from 'react';
import Header from '../../layout/Header';
import NavigationBar from '../../layout/NavigationBar';
import ExplanationPanel from '../ExplanationPanel';
import DecisionPanel from '../DecisionPanel';
import ArrivalBanner from '../ArrivalBanner';
import CPUDisplay from '../../visualization/CPUDisplay';
import ProcessQueue from '../../visualization/ProcessQueue';
import StatusPanel from '../../visualization/StatusPanel';
import GanttChart from '../../visualization/GanttChart';
import MetricsDisplay from '../../visualization/MetricsDisplay';
import ExportButtons from '../ExportButtons';

const SimulationView = ({
  algorithm,
  simulation,
  currentStep,
  onNavigate,
  onNavigateHome,
}) => {
  const currentStepData = simulation?.steps[currentStep];

  if (!simulation || !currentStepData) return null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:via-gray-950 dark:to-black flex flex-col">
      <Header
        algorithm={algorithm}
        onNavigateHome={onNavigateHome}
        currentTime={currentStepData.time}
        phase={currentStepData.phase}
        action={currentStepData.action}
      />

      <div className="flex-1 overflow-y-auto p-3">
        <div id="simulation-content" className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <ExplanationPanel explanation={currentStepData.explanation} />
            <DecisionPanel decision={currentStepData.decision} />
          </div>

          <ArrivalBanner arrived={currentStepData.arrived} />

          <div className="grid grid-cols-3 gap-3 mb-3">
            <CPUDisplay executing={currentStepData.executing} />
            <ProcessQueue queue={currentStepData.queue} />
            <StatusPanel
              completed={currentStepData.completed}
              remaining={currentStepData.remaining}
              processes={simulation.processes}
            />
          </div>

          {simulation.gantt.length > 0 && (
            <GanttChart gantt={simulation.gantt} currentTime={currentStepData.time} />
          )}

          <MetricsDisplay metrics={currentStepData.metrics} />
        </div>

        <div className="mt-4 flex justify-center">
          <ExportButtons simulation={simulation} algorithm={algorithm} />
        </div>
      </div>

      <NavigationBar
        currentStep={currentStep}
        totalSteps={simulation.steps.length}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default SimulationView;
