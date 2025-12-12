import React from 'react';

/**
 * Input base reutilizável
 */
const Input = ({ 
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all';
  const normalStyles = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const disabledStyles = 'bg-gray-100 cursor-not-allowed';
  
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${disabled ? disabledStyles : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
