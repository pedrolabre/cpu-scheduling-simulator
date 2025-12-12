import React, { useState, useEffect } from 'react';
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { generateStepHTML } from '../templates/stepTemplate';

/**
 * Modal de Preview da exportação
 * Permite visualizar os slides/páginas antes de exportar
 */
const PreviewModal = ({ 
  isOpen, 
  onClose, 
  simulation, 
  algorithm, 
  onExport, 
  exportType 
}) => {
  const [currentPreview, setCurrentPreview] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const isDark = document.documentElement.classList.contains('dark');
  const totalSteps = simulation?.steps?.length || 0;

  // Reset ao abrir modal
  useEffect(() => {
    if (isOpen) {
      setCurrentPreview(0);
      setPreviewImage(null);
    }
  }, [isOpen]);

  // Gerar preview da página atual
  useEffect(() => {
    if (!isOpen || !simulation?.steps?.length) return;
    
    const generatePreview = async () => {
      setLoading(true);
      try {
        const step = simulation.steps[currentPreview];
        const html = generateStepHTML(
          step,
          currentPreview + 1,
          totalSteps,
          algorithm?.name || 'Simulação',
          isDark,
          simulation.gantt || []
        );
        
        // Criar container temporário
        const container = document.createElement('div');
        container.style.cssText = `
          position: absolute;
          left: -9999px;
          top: 0;
          width: 1200px;
          height: 800px;
          overflow: hidden;
        `;
        
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        container.innerHTML = bodyMatch ? bodyMatch[1] : html;
        document.body.appendChild(container);
        
        await new Promise(r => setTimeout(r, 100));
        
        const canvas = await html2canvas(container.firstElementChild || container, {
          scale: 0.5,
          backgroundColor: null,
          logging: false,
          width: 1200,
          height: 800,
        });
        
        document.body.removeChild(container);
        setPreviewImage(canvas.toDataURL('image/png'));
      } catch (error) {
        console.error('Erro ao gerar preview:', error);
      } finally {
        setLoading(false);
      }
    };
    
    generatePreview();
  }, [isOpen, currentPreview, simulation, algorithm, isDark, totalSteps]);

  if (!isOpen) return null;

  const handleExport = () => {
    onClose();
    onExport();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Preview - {exportType === 'pdf' ? 'PDF' : 'PPTX'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {algorithm?.name} • {totalSteps} {exportType === 'pdf' ? 'páginas' : 'slides'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Preview Content */}
        <div className="p-4">
          <PreviewImage 
            loading={loading} 
            previewImage={previewImage} 
            currentPreview={currentPreview} 
          />
          
          <PreviewNavigation
            currentPreview={currentPreview}
            totalSteps={totalSteps}
            onPrev={() => setCurrentPreview(Math.max(0, currentPreview - 1))}
            onNext={() => setCurrentPreview(Math.min(totalSteps - 1, currentPreview + 1))}
          />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-5 py-2 text-white rounded-lg font-semibold transition-colors ${
              exportType === 'pdf' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            <Download size={18} />
            Exportar {exportType === 'pdf' ? 'PDF' : 'PPTX'}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente de imagem do preview
 */
const PreviewImage = ({ loading, previewImage, currentPreview }) => (
  <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
    {loading ? (
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <span className="text-gray-500 dark:text-gray-400">Gerando preview...</span>
      </div>
    ) : previewImage ? (
      <img 
        src={previewImage} 
        alt={`Preview página ${currentPreview + 1}`}
        className="max-w-full max-h-[400px] rounded-lg shadow-lg"
      />
    ) : (
      <span className="text-gray-500">Erro ao gerar preview</span>
    )}
  </div>
);

/**
 * Componente de navegação do preview
 */
const PreviewNavigation = ({ currentPreview, totalSteps, onPrev, onNext }) => (
  <div className="flex items-center justify-center gap-4 mt-4">
    <button
      onClick={onPrev}
      disabled={currentPreview === 0}
      className="p-2 bg-gray-200 dark:bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
    >
      <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
    </button>
    
    <span className="text-gray-700 dark:text-gray-300 font-medium min-w-[100px] text-center">
      {currentPreview + 1} / {totalSteps}
    </span>
    
    <button
      onClick={onNext}
      disabled={currentPreview === totalSteps - 1}
      className="p-2 bg-gray-200 dark:bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
    >
      <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
    </button>
  </div>
);

export default PreviewModal;
