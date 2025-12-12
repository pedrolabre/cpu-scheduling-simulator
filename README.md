# 🖥️ CPU Scheduling Simulator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.1-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.7-646CFF.svg?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Sistema interativo de simulação de algoritmos de escalonamento de CPU**

[📖 Documentação](./docs/documentation.html) | [🚀 Demo](#instalação) | [📊 Algoritmos](#algoritmos-suportados)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Algoritmos Suportados](#-algoritmos-suportados)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Exportação](#-exportação)
- [Modo Escuro](#-modo-escuro)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **CPU Scheduling Simulator** é uma ferramenta educacional interativa desenvolvida para auxiliar no aprendizado de algoritmos de escalonamento de CPU utilizados em Sistemas Operacionais.

O simulador permite:
- Visualizar **passo a passo** a execução de cada algoritmo
- Compreender as **decisões** tomadas pelo escalonador
- Analisar **métricas** de desempenho (turnaround, tempo de espera)
- Exportar a simulação para **PDF** e **PPTX**

---

## ✨ Funcionalidades

### 🎮 Simulação Interativa
- Navegação passo a passo com controles intuitivos
- Visualização em tempo real do estado da CPU
- Fila de processos com destaque para processos selecionados
- Diagrama de Gantt dinâmico

### 📊 Métricas Detalhadas
- Tempo de turnaround médio
- Tempo de espera médio
- Visualização por processo individual

### 🌙 Modo Escuro
- Suporte completo a tema claro e escuro
- Alternância via configurações
- Cores invertidas para melhor visualização

### 📥 Exportação
- **PDF**: Documento com todas as páginas da simulação
- **PPTX**: Apresentação de slides profissional
- Preview antes da exportação
- Alta qualidade (2x resolution)

---

## 🔧 Algoritmos Suportados

### Não-Preemptivos
| Algoritmo | Descrição | Critério |
|-----------|-----------|----------|
| **FIFO** | First In, First Out | Ordem de chegada |
| **SJF** | Shortest Job First | Menor tempo de execução |
| **Prioridade** | Priority Scheduling | Menor número = maior prioridade |

### Preemptivos
| Algoritmo | Descrição | Critério |
|-----------|-----------|----------|
| **SRTF** | Shortest Remaining Time First | Menor tempo restante |
| **Round Robin** | Quantum-based | Fatia de tempo fixa |
| **Prioridade** | Priority Preemptive | Com interrupção |

---

## 🛠️ Tecnologias

### Frontend
- **React 19.2.1** - Biblioteca de UI
- **Vite 7.2.7** - Build tool e dev server
- **Tailwind CSS 3.4.17** - Framework de estilos
- **Lucide React** - Ícones modernos

### Exportação
- **jsPDF** - Geração de PDFs
- **PptxGenJS** - Geração de PowerPoints
- **html2canvas** - Captura de elementos DOM

### Desenvolvimento
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **PostCSS** - Processamento de CSS

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/cpu-scheduling-simulator.git

# Entrar no diretório
cd cpu-scheduling-simulator

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

---

## 🎮 Uso

### 1. Selecionar Tipo de Algoritmo
Na tela inicial, escolha entre **Não-Preemptivo** ou **Preemptivo**.

### 2. Escolher Algoritmo
Selecione um dos algoritmos disponíveis.

### 3. Configurar Processos
- Adicione processos com tempo de chegada e duração
- Para algoritmos de prioridade, defina a prioridade
- Para Round Robin, configure o quantum

### 4. Iniciar Simulação
Clique em "Iniciar Simulação" para começar.

### 5. Navegar pela Simulação
Use os controles:
- ⏮️ Primeiro passo
- ◀️ Passo anterior
- ▶️ Próximo passo
- ⏭️ Último passo

### 6. Exportar (Opcional)
Clique em "Exportar PDF" ou "Exportar PPTX" para salvar.

---

## 📁 Estrutura do Projeto

```
cpu-scheduling-simulator/
├── 📄 index.html              # HTML principal (Vite entry)
├── 📄 package.json            # Dependências e scripts
├── 📄 vite.config.js          # Configuração Vite
├── 📄 tailwind.config.js      # Configuração Tailwind
├── 📁 docs/                   # Documentação
│   └── documentation.html     # Documentação completa
├── 📁 public/                 # Assets estáticos
└── 📁 src/
    ├── 📄 main.jsx            # Entry point React
    ├── 📄 App.jsx             # Componente principal
    ├── 📄 index.css           # Estilos globais
    │
    ├── 📁 components/         # Componentes React
    │   ├── 📁 common/         # Componentes reutilizáveis
    │   ├── 📁 configuration/  # Configuração de processos
    │   ├── 📁 layout/         # Layout (Header, Menu, Nav)
    │   ├── 📁 simulation/     # Tela de simulação
    │   └── 📁 visualization/  # Visualizações (Gantt, CPU)
    │
    ├── 📁 config/             # Configurações
    │   ├── algorithms.config.js
    │   ├── app.config.js
    │   └── theme.config.js
    │
    ├── 📁 contexts/           # React Contexts
    │   └── ThemeContext.jsx   # Gerenciamento de tema
    │
    ├── 📁 core/               # Lógica de negócio
    │   ├── 📁 algorithms/     # Implementações dos algoritmos
    │   ├── 📁 constants/      # Constantes e defaults
    │   ├── 📁 engine/         # Motor de simulação
    │   ├── 📁 stepGenerators/ # Geradores de passos
    │   ├── 📁 tests/          # Testes automatizados
    │   └── 📁 types/          # Definições de tipos
    │
    ├── 📁 hooks/              # React Hooks customizados
    │   ├── 📁 processes/      # useProcesses
    │   └── 📁 simulation/     # useSimulation
    │
    └── 📁 utils/              # Utilitários
        ├── 📁 formatters/     # Formatadores
        ├── 📁 helpers/        # Funções auxiliares
        └── 📁 validators/     # Validadores
```

---

## 📥 Exportação

### PDF
- Formato paisagem 1200x800px
- Qualidade 2x (High Quality)
- Uma página por passo da simulação
- Suporte a tema claro e escuro

### PPTX (PowerPoint)
- Slides 10" x 7.5"
- Imagens em alta resolução
- Compatível com Microsoft PowerPoint e Google Slides

### Preview
Antes de exportar, você pode:
- Visualizar cada página/slide
- Navegar entre os passos
- Verificar se está correto

---

## 🌙 Modo Escuro

O simulador suporta modo escuro completo:

1. Clique no ícone ⚙️ (Configurações) no menu principal
2. Ative/desative o modo escuro
3. A preferência é salva automaticamente

O modo escuro:
- Inverte cores de fundo e texto
- Mantém contraste adequado
- Aplica efeitos de glass morphism nos modais
- Exporta documentos respeitando o tema atual

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Verificar lint
npm run lint

# Formatar código
npm run format
```

---

## 🏗️ Build

```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Pedro** - Desenvolvedor

---

<div align="center">

Feito com ❤️ para fins educacionais

</div>
