import React from 'react';

/**
 * Header do Card
 */
const CardHeader = ({ 
  title, 
  subtitle,
  action,
  className = '' 
}) => {
  return (
    <div className={`border-b border-gray-200 pb-3 mb-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export default CardHeader;
