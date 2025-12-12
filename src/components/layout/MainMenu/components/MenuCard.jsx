import React from 'react';

/**
 * Card de Algoritmo/Tipo
 * Responsabilidade: Renderizar um card clicável do menu
 */
const MenuCard = ({ 
  icon: Icon, 
  name, 
  description, 
  detail, 
  color, 
  onClick, 
  size = 'large' // 'large' para tipos, 'small' para algoritmos
}) => {
  const isLarge = size === 'large';
  
  return (
    <button
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 ${isLarge ? 'p-8' : 'p-6'} rounded-${isLarge ? '2xl' : 'xl'} shadow-${isLarge ? 'xl' : 'lg'} hover:shadow-${isLarge ? '2xl' : 'xl'} transition-all border-${isLarge ? '4' : '2'} border-${color}-200 dark:border-${color}-600 hover:border-${color}-400 dark:hover:border-${color}-400 ${isLarge ? 'text-center group hover:scale-105' : 'text-left group'}`}
    >
      <div
        className={`${isLarge ? 'w-24 h-24' : 'w-12 h-12'} bg-${color}-100 dark:bg-${color}-950 rounded-${isLarge ? '2xl' : 'lg'} flex items-center justify-center ${isLarge ? 'mb-6 mx-auto' : 'mb-4'} group-hover:bg-${color}-200 dark:group-hover:bg-${color}-900 transition`}
      >
        <Icon className={`text-${color}-600 dark:text-${color}-300`} size={isLarge ? 48 : 24} />
      </div>
      
      <h2 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-bold text-gray-900 dark:text-white ${isLarge ? 'mb-3' : 'mb-2'}`}>
        {name}
      </h2>
      
      <p className={`${isLarge ? 'text-lg mb-2 font-semibold' : 'text-sm'} text-gray-${isLarge ? '700' : '600'} dark:text-gray-${isLarge ? '300' : '400'}`}>
        {description}
      </p>
      
      {detail && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{detail}</p>
      )}
    </button>
  );
};

export default MenuCard;
