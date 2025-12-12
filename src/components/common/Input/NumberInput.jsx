import React from 'react';

/**
 * Input numérico com validação
 */
const NumberInput = ({ 
  value,
  onChange,
  min = 0,
  max,
  label,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  const handleChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    const bounded = Math.max(min, max !== undefined ? Math.min(max, val) : val);
    onChange(bounded);
  };
  
  const baseStyles = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all';
  const normalStyles = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
    </div>
  );
};

export default NumberInput;
