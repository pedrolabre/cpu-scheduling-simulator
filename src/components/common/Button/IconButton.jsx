import React from 'react';

/**
 * Botão com ícone
 */
const IconButton = ({ 
  icon: Icon, 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconPosition = 'left',
  className = ''
}) => {
  const baseStyles = 'flex items-center gap-2 rounded-lg font-semibold transition-all';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {iconPosition === 'left' && Icon && <Icon size={20} />}
      {children}
      {iconPosition === 'right' && Icon && <Icon size={20} />}
    </button>
  );
};

export default IconButton;
