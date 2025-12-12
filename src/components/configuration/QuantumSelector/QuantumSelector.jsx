import React from 'react';
import { NumberInput } from '../../common/Input';

/**
 * Seletor de quantum para Round Robin
 */
const QuantumSelector = ({ quantum, onChange, disabled = false }) => {
  return (
    <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <label className="block text-sm font-semibold text-purple-900 mb-2">
        Quantum (unidades de tempo):
      </label>
      <NumberInput
        value={quantum}
        onChange={onChange}
        min={1}
        disabled={disabled}
        className="w-32"
      />
      <p className="text-xs text-purple-700 mt-1">
        Fatia de tempo que cada processo recebe
      </p>
    </div>
  );
};

export default QuantumSelector;
