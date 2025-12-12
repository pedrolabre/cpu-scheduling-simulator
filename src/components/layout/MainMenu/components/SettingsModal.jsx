import React from 'react';
import { Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

/**
 * Modal de Configurações
 * Responsabilidade: UI e lógica do modal de settings
 */
const SettingsModal = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 glass-effect flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="text-gray-500 dark:text-gray-400" size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Toggle de Tema */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon className="text-indigo-500" size={24} />
              ) : (
                <Sun className="text-yellow-500" size={24} />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Modo Escuro</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alterna entre tema claro e escuro
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isDark ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
