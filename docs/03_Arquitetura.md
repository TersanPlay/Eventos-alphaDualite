# 3. Arquitetura Técnica (Frontend)

Este documento descreve a arquitetura técnica, as tecnologias e os padrões de código utilizados no desenvolvimento do frontend do Sistema de Eventos Institucionais.

## 🛠️ Tecnologias Principais

- **Framework:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Gráficos:** [ECharts for React](https://github.com/hustcc/echarts-for-react)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Exportação:** [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para promover a modularidade e a separação de responsabilidades.

```
/src
├── /components         # Componentes reutilizáveis da UI
│   ├── /admin          # Componentes da área de Administração
│   ├── /auth           # Componentes de autenticação (ex: ProtectedRoute)
│   ├── /calendar       # Componentes da página do Calendário
│   ├── /common         # Componentes genéricos (Modal, Pagination, etc.)
│   ├── /dashboard      # Componentes do painel principal
│   ├── /events         # Componentes de gestão de eventos (lista, formulário)
│   ├── /layout         # Componentes de layout (Sidebar, Header, MainLayout)
│   └── ...             # Outros módulos de componentes
├── /contexts           # Contextos React para gerenciamento de estado global
│   ├── AuthContext.tsx # Gerencia estado de autenticação e usuário logado
│   └── DataContext.tsx # Simula um backend, gerenciando dados em memória
├── /hooks              # Hooks customizados
│   └── useExport.ts    # Lógica para exportar dados (PDF, ICS)
├── /pages              # Componentes de página (rotas principais)
│   ├── LandingPage.tsx
│   └── LoginPage.tsx
├── /types              # Definições de tipos TypeScript
│   └── index.ts
├── /utils              # Funções utilitárias e dados simulados
│   └── mockData.ts
├── App.tsx             # Componente raiz que define as rotas
├── main.tsx            # Ponto de entrada da aplicação
└── index.css           # Arquivo principal de CSS (configuração do Tailwind)
```

## 🧠 Conceitos Chave

### Gerenciamento de Estado

O estado global da aplicação é gerenciado através de dois **Contextos React**:

1.  **`AuthProvider` (`AuthContext.tsx`)**
    - **Responsabilidade:** Gerenciar o estado de autenticação do usuário.
    - **Funções:** `login`, `logout`, `updateCurrentUser`.
    - **Estado Exposto:** `user` (dados do usuário logado), `isAuthenticated` (booleano), `loading` (para operações assíncronas).
    - **Persistência:** Salva os dados do usuário no `localStorage` para simular uma sessão persistente.

2.  **`DataProvider` (`DataContext.tsx`)**
    - **Responsabilidade:** Simular um backend, gerenciando todos os dados da aplicação (eventos, usuários, notificações, etc.) em memória.
    - **Funções:** Fornece funções CRUD (Create, Read, Update, Delete) para cada tipo de dado. Ex: `addEvent`, `updateEvent`, `deleteEvent`.
    - **Reatividade:** Quando uma ação é executada (ex: `deleteEvent`), o estado é atualizado, e todos os componentes que consomem esse contexto são re-renderizados automaticamente para refletir a mudança.
    - **Auditoria:** A maioria das ações de escrita no `DataContext` também chama a função `addAuditLog` para registrar a operação, tornando a trilha de auditoria dinâmica.

### Roteamento

O roteamento é gerenciado pelo `React Router DOM`.
- **`App.tsx`:** Define a estrutura principal de rotas.
- **Rotas Públicas:** `/` (Landing Page) e `/login`.
- **Rotas Protegidas:** Todas as rotas sob `/app/*` são protegidas pelo componente `ProtectedRoute`.
- **`ProtectedRoute.tsx`:** Verifica se o usuário está autenticado através do `useAuth()`. Se não estiver, redireciona para a página de login.
- **`MainLayout.tsx`:** É o layout principal para a área autenticada, contendo o `Sidebar`, o `Header` e o `<Outlet />` do React Router, onde as páginas filhas são renderizadas.
