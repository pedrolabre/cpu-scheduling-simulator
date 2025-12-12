import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { generateStepHTML } from '../templates/stepTemplate';

/**
 * Cria overlay de loading para exportação
 */
const createLoadingOverlay = (totalSteps, type = 'PDF') => {
  const overlay = document.createElement('div');
  overlay.id = 'export-overlay';
  overlay.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 99998; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; padding: 40px 60px; border-radius: 16px; text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.25);">
        <div style="width: 50px; height: 50px; border: 4px solid #e5e7eb; border-top-color: #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <h2 style="margin: 0 0 10px 0; color: #1f2937; font-size: 24px;">Gerando ${type}...</h2>
        <p id="export-progress" style="margin: 0; color: #6b7280; font-size: 18px;">Passo 0 de ${totalSteps}</p>
        <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">Não feche esta janela</p>
      </div>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;
  document.body.appendChild(overlay);
  return overlay;
};

/**
 * Atualiza o progresso no overlay
 */
const updateProgress = (current, total) => {
  const progressEl = document.getElementById('export-progress');
  if (progressEl) {
    progressEl.textContent = `Passo ${current} de ${total}`;
  }
};

/**
 * Remove overlay de loading
 */
const removeOverlay = () => {
  const overlay = document.getElementById('export-overlay');
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
};

/**
 * Renderiza HTML em um div temporário e captura como imagem
 */
const renderHTMLToImage = async (htmlContent) => {
  // Criar container temporário fora da tela
  const container = document.createElement('div');
  container.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 1200px;
    height: 800px;
    overflow: hidden;
    z-index: 1;
  `;
  
  // Extrair apenas o body content do HTML
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) {
    container.innerHTML = bodyMatch[1];
  } else {
    container.innerHTML = htmlContent;
  }
  
  document.body.appendChild(container);
  
  // Aguardar renderização
  await new Promise(r => setTimeout(r, 150));
  
  try {
    // Capturar com html2canvas - foco no primeiro filho que é o wrapper principal
    const targetElement = container.firstElementChild || container;
    
    const canvas = await html2canvas(targetElement, {
      scale: 2, // High Quality (2x resolution)
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: 1200,
      height: 800,
      windowWidth: 1200,
      windowHeight: 800,
      x: 0,
      y: 0,
      imageTimeout: 0,
      removeContainer: false,
    });

    document.body.removeChild(container);
    return canvas;
  } catch (error) {
    document.body.removeChild(container);
    console.error('Erro em renderHTMLToImage:', error);
    throw error;
  }
};

/**
 * Detecta se o tema escuro está ativo
 */
const isDarkModeActive = () => {
  return document.documentElement.classList.contains('dark');
};

/**
 * Exporta simulação para PDF
 */
export const exportToPDF = async (simulation, algorithm) => {
  if (!simulation || !simulation.steps) {
    throw new Error('Simulação não encontrada');
  }

  const totalSteps = simulation.steps.length;
  const isDark = isDarkModeActive();
  
  console.log(`Gerando PDF com ${totalSteps} páginas (tema: ${isDark ? 'escuro' : 'claro'})...`);

  const overlay = createLoadingOverlay(totalSteps, 'PDF');

  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1200, 800],
      hotfixes: ['px_scaling'],
    });

    for (let i = 0; i < totalSteps; i++) {
      const step = simulation.steps[i];
      updateProgress(i + 1, totalSteps);
      console.log(`Processando passo ${i + 1}/${totalSteps}...`);

      // Gerar HTML do passo
      const htmlContent = generateStepHTML(
        step,
        i + 1,
        totalSteps,
        algorithm?.name || 'Simulação',
        isDark,
        simulation.gantt || []
      );

      // Renderizar e capturar em alta qualidade
      const canvas = await renderHTMLToImage(htmlContent);
      const imgData = canvas.toDataURL('image/png'); // PNG para máxima qualidade

      // Adicionar página
      if (i > 0) {
        pdf.addPage();
      }
      
      // Imagem em alta resolução, redimensionada para caber na página
      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 800, undefined, 'FAST');
      console.log(`Página ${i + 1} adicionada ao PDF`);
    }
    
    removeOverlay();
    
    const fileName = `${algorithm?.name || 'Simulacao'}_${isDark ? 'Dark' : 'Light'}.pdf`;
    pdf.save(fileName);
    
    console.log('PDF gerado com sucesso!');
    return { success: true, pages: totalSteps };
  } catch (error) {
    removeOverlay();
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};
