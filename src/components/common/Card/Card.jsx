import React from 'react';

/**
 * Card base reutilizável
 */
const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md',
  shadow = true
}) => {
  const baseStyles = 'bg-white rounded-lg border';
  
  const variants = {
    default: 'border-gray-200',
    primary: 'border-indigo-200',
    success: 'border-green-200',
    warning: 'border-yellow-200',
    danger: 'border-red-200',
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const shadowStyles = shadow ? 'shadow-md hover:shadow-lg transition-shadow' : '';
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${shadowStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
