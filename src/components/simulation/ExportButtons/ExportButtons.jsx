import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { exportToPDF } from './exporters/pdfExporter';
import { exportToPPTX } from './exporters/pptxExporter';
import PreviewModal from './components/PreviewModal';

// Polyfill para html2canvas
import html2canvas from 'html2canvas';
if (typeof window !== 'undefined') {
  window.html2canvas = html2canvas;
}

/**
 * Componente para exportar a simulação para PDF e PPTX
 * Responsabilidade: UI dos botões e gerenciamento de estado
 */
const ExportButtons = ({ simulation, algorithm }) => {
  const [exporting, setExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState(null);

  const openPreview = (type) => {
    if (!simulation?.steps?.length) {
      alert('❌ Nenhum passo de simulação disponível para exportar');
      return;
    }
    setPreviewType(type);
    setPreviewOpen(true);
  };

  const handleExportPDF = async () => {
    if (exporting) return;
    
    try {
      setExporting(true);
      const result = await exportToPDF(simulation, algorithm);
      alert(`✅ PDF exportado com ${result.pages} páginas!`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('❌ Erro ao exportar PDF: ' + (error?.message || 'Erro desconhecido'));
    } finally {
      setExporting(false);
    }
  };

  const handleExportPPTX = async () => {
    if (exporting) return;
    
    try {
      setExporting(true);
      const result = await exportToPPTX(simulation, algorithm);
      alert(`✅ PPTX exportado com ${result.slides} slides!`);
    } catch (error) {
      console.error('Error exporting PPTX:', error);
      alert('❌ Erro ao exportar PPTX: ' + (error?.message || 'Erro desconhecido'));
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <ExportButton
          onClick={() => openPreview('pdf')}
          disabled={exporting}
          color="red"
          label={exporting ? 'Exportando...' : 'Exportar PDF'}
        />
        
        <ExportButton
          onClick={() => openPreview('pptx')}
          disabled={exporting}
          color="orange"
          label={exporting ? 'Exportando...' : 'Exportar PPTX'}
        />
      </div>

      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        simulation={simulation}
        algorithm={algorithm}
        exportType={previewType}
        onExport={previewType === 'pdf' ? handleExportPDF : handleExportPPTX}
      />
    </>
  );
};

/**
 * Botão de exportação reutilizável
 */
const ExportButton = ({ onClick, disabled, color, label }) => {
  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-5 py-3 text-white rounded-lg transition-colors shadow-lg font-semibold ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={label}
    >
      <Eye size={20} />
      {label}
    </button>
  );
};

export default ExportButtons;
