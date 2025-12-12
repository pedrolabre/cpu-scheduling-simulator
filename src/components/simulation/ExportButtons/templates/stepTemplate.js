/**
 * Gera o HTML completo de um passo da simulação
 * Visualmente idêntico à tela de simulação (suporta tema claro/escuro)
 */
export const generateStepHTML = (step, stepNumber, totalSteps, algorithmName, isDark = false, gantt = []) => {
  const safeStep = {
    time: step?.time ?? 0,
    phase: step?.phase ?? 'N/A',
    action: step?.action ?? 'N/A',
    explanation: step?.explanation ?? '',
    executing: step?.executing ?? null,
    queue: step?.queue ?? [],
    completed: step?.completed ?? [],
    remaining: step?.remaining ?? [],
    decision: step?.decision ?? '',
    arrived: step?.arrived ?? [],
    metrics: step?.metrics ?? null,
  };

  // Cores baseadas no tema
  const theme = isDark ? {
    bg: '#0f172a',
    bgCard: '#1e293b',
    bgSecondary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#475569',
    accent: '#818cf8',
    accentBg: '#312e81',
  } : {
    bg: '#eff6ff',
    bgCard: '#ffffff',
    bgSecondary: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#4f46e5',
    accentBg: '#eef2ff',
  };

  // Cores das fases
  const phaseColors = {
    'INÍCIO': '#3b82f6',
    'CHEGADA': '#22c55e',
    'CPU OCIOSA': '#9ca3af',
    'ANÁLISE': '#eab308',
    'SELEÇÃO': '#6366f1',
    'PREEMPÇÃO': '#ef4444',
    'EXECUÇÃO': '#a855f7',
    'QUANTUM': '#f97316',
    'CONCLUSÃO': '#14b8a6',
    'FINALIZADO': '#ec4899'
  };

  // Cores dos processos
  const processColors = ['#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#ef4444', '#06b6d4'];
  const getProcessColor = (id) => {
    if (!id || id === 'idle') return '#9ca3af';
    const index = id.charCodeAt(0) - 65;
    return processColors[index % processColors.length];
  };

  const phaseColor = phaseColors[safeStep.phase] || '#6b7280';

  // Calcular largura total do Gantt e ajustar proporcionalmente
  const maxGanttWidth = 1140; // Largura disponível (1200 - 60 de padding)
  const totalGanttDuration = gantt.length > 0 ? gantt.reduce((sum, item) => sum + (item.end - item.start), 0) : 0;
  const pixelsPerUnit = totalGanttDuration > 0 ? Math.min(40, maxGanttWidth / totalGanttDuration) : 40;

  // Gerar HTML do Gantt - mostrar TODAS as barras com tamanho proporcional
  const ganttHTML = gantt.length > 0 ? gantt.map((item, idx) => {
    const duration = item.end - item.start;
    const width = Math.max(35, duration * pixelsPerUnit);
    const color = getProcessColor(item.process);
    const isCompleted = safeStep.time >= item.end;
    const isCurrent = safeStep.time >= item.start && safeStep.time < item.end;
    const isFuture = safeStep.time < item.start;
    
    let bgColor = isFuture ? '#d1d5db' : color;
    let textColor = isFuture ? '#6b7280' : 'white';
    let extraStyle = isCurrent ? 'box-shadow: inset 0 0 0 3px #facc15; animation: pulse 1s infinite;' : '';
    
    return `<div style="background: ${bgColor}; color: ${textColor}; width: ${width}px; min-width: ${width}px; padding: 8px 4px; text-align: center; border-right: 2px solid white; flex-shrink: 0; ${extraStyle}">
      <div style="font-size: 14px; font-weight: bold;">${item.process}</div>
      <div style="font-size: 9px; background: rgba(0,0,0,0.2); padding: 2px 4px; border-radius: 3px; margin-top: 3px; display: inline-block;">${item.start}-${item.end}</div>
    </div>`;
  }).join('') : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${theme.bg};
      color: ${theme.text};
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  </style>
</head>
<body>
  <div style="width: 1200px; height: 800px; padding: 20px; display: flex; flex-direction: column; background: ${theme.bg};">
    
    <!-- Header -->
    <div style="background: ${phaseColor}; color: white; padding: 15px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <div>
        <div style="font-size: 12px; opacity: 0.9;">${algorithmName} - ${safeStep.phase}</div>
        <div style="font-size: 20px; font-weight: bold;">${safeStep.action}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 11px; opacity: 0.9;">Tempo</div>
        <div style="font-size: 28px; font-weight: bold;">t = ${safeStep.time}</div>
      </div>
    </div>
    
    <!-- Content -->
    <div style="flex: 1; background: ${theme.bgCard}; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Explicação e Decisão -->
      <div style="display: flex; gap: 15px; margin-bottom: 15px;">
        <div style="flex: 1; background: ${theme.bgSecondary}; border: 2px solid ${isDark ? '#1e3a5f' : '#bfdbfe'}; border-radius: 8px; padding: 12px;">
          <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px;">📖 Explicação</div>
          <div style="font-size: 12px; color: ${theme.textSecondary}; white-space: pre-wrap; line-height: 1.5;">${safeStep.explanation}</div>
        </div>
        <div style="flex: 1; background: ${theme.bgSecondary}; border: 2px solid ${isDark ? '#4c1d95' : '#ddd6fe'}; border-radius: 8px; padding: 12px;">
          <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px;">💡 Decisão</div>
          <div style="font-size: 12px; color: ${theme.textSecondary}; font-weight: 600;">${safeStep.decision}</div>
        </div>
      </div>
      
      <!-- Banner de Chegada -->
      ${safeStep.arrived && safeStep.arrived.length > 0 ? `
        <div style="background: ${isDark ? '#14532d' : '#dcfce7'}; border: 2px solid ${isDark ? '#166534' : '#22c55e'}; border-radius: 8px; padding: 10px 15px; margin-bottom: 15px; font-weight: bold; color: ${isDark ? '#86efac' : '#166534'}; font-size: 13px;">
          🆕 Novo(s): ${safeStep.arrived.join(', ')}
        </div>
      ` : ''}
      
      <!-- CPU, Fila, Status -->
      <div style="display: flex; gap: 15px; margin-bottom: 15px;">
        <!-- CPU -->
        <div style="flex: 1; background: ${theme.bgSecondary}; border: 2px solid ${theme.border}; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px;">⚙️ CPU</div>
          <div style="padding: 20px; border-radius: 8px; ${safeStep.executing ? 'background: linear-gradient(135deg, #22c55e, #16a34a); color: white;' : `background: ${isDark ? '#374151' : '#e5e7eb'}; color: ${isDark ? '#9ca3af' : '#6b7280'};`}">
            <div style="font-size: 28px; font-weight: bold;">${safeStep.executing || '—'}</div>
            <div style="font-size: 11px; margin-top: 4px;">${safeStep.executing ? 'EXECUTANDO' : 'OCIOSA'}</div>
          </div>
        </div>
        
        <!-- Fila -->
        <div style="flex: 1; background: ${theme.bgSecondary}; border: 2px solid ${theme.border}; border-radius: 8px; padding: 12px;">
          <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px;">📋 Fila</div>
          ${safeStep.queue.length > 0 ? safeStep.queue.map(p => `
            <div style="background: ${p.highlight ? (isDark ? '#713f12' : '#fef3c7') : (isDark ? '#334155' : '#f8fafc')}; border-left: 4px solid ${p.highlight ? '#eab308' : (isDark ? '#475569' : '#cbd5e1')}; padding: 8px 10px; margin-bottom: 6px; border-radius: 4px; display: flex; justify-content: space-between; font-size: 12px; ${p.highlight ? 'font-weight: bold;' : ''}">
              <span style="font-family: monospace; font-weight: bold;">${p.id}</span>
              <span style="color: ${theme.textSecondary};">${p.remaining ? `R:${p.remaining}` : p.pc ? `PC:${p.pc}` : p.priority ? `P:${p.priority}` : ''}</span>
            </div>
          `).join('') : `<div style="color: ${theme.textSecondary}; font-size: 12px; font-style: italic; text-align: center;">Vazia</div>`}
        </div>
        
        <!-- Status -->
        <div style="flex: 1; background: ${theme.bgSecondary}; border: 2px solid ${theme.border}; border-radius: 8px; padding: 12px;">
          <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px;">📊 Status</div>
          <div style="padding: 8px; border-radius: 6px; margin-bottom: 8px; background: ${isDark ? '#14532d' : '#dcfce7'}; border: 1px solid ${isDark ? '#166534' : '#86efac'};">
            <div style="font-size: 10px; color: ${theme.textSecondary};">Concluídos</div>
            <div style="font-size: 12px; font-weight: bold; color: ${isDark ? '#86efac' : '#166534'};">${safeStep.completed.length > 0 ? safeStep.completed.join(', ') : 'Nenhum'}</div>
          </div>
        </div>
      </div>
      
      <!-- Gantt Chart -->
      ${gantt.length > 0 ? `
        <div style="background: ${theme.bgSecondary}; border: 2px solid ${theme.border}; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
          <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px;">📊 Diagrama de Gantt (${gantt.length} blocos)</div>
          <div style="display: flex; flex-wrap: nowrap; border: 2px solid ${isDark ? '#475569' : '#9ca3af'}; border-radius: 6px; overflow: hidden;">
            ${ganttHTML}
          </div>
        </div>
      ` : ''}
      
      <!-- Métricas -->
      ${safeStep.metrics ? `
        <div style="background: ${isDark ? 'linear-gradient(135deg, #14532d, #166534)' : 'linear-gradient(135deg, #dcfce7, #bbf7d0)'}; border: 2px solid ${isDark ? '#22c55e' : '#16a34a'}; border-radius: 8px; padding: 15px;">
          <div style="font-weight: bold; font-size: 14px; color: ${isDark ? '#86efac' : '#166534'}; margin-bottom: 10px;">🎯 Resultados Finais</div>
          <div style="display: flex; gap: 15px;">
            <div style="background: ${theme.bgCard}; padding: 12px 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-size: 10px; color: ${theme.textSecondary}; margin-bottom: 4px;">Turnaround Médio</div>
              <div style="font-size: 22px; font-weight: bold; color: ${isDark ? '#22c55e' : '#16a34a'};">${safeStep.metrics.avgTurnaround?.toFixed(2) || '0.00'}</div>
            </div>
            <div style="background: ${theme.bgCard}; padding: 12px 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-size: 10px; color: ${theme.textSecondary}; margin-bottom: 4px;">Espera Média</div>
              <div style="font-size: 22px; font-weight: bold; color: ${isDark ? '#22c55e' : '#16a34a'};">${safeStep.metrics.avgWaiting?.toFixed(2) || '0.00'}</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
    
    <!-- Footer -->
    <div style="background: ${theme.bgCard}; border-top: 4px solid ${theme.accent}; padding: 12px 20px; margin-top: 15px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 12px; font-weight: bold; color: ${theme.textSecondary};">Passo ${stepNumber} de ${totalSteps}</div>
      <div style="font-size: 11px; color: ${theme.textSecondary};">${algorithmName}</div>
    </div>
  </div>
</body>
</html>
  `;
};
