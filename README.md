# TaskFlow — React.js

Aplicação responsiva de gerenciamento de tarefas.

## Tecnologias
- React.js com componentes funcionais
- Vite
- CSS responsivo
- Hooks: `useState`, `useEffect`, `useMemo`, `useCallback` e `useContext`
- Context API para gerenciamento de estado global

## Componentes obrigatórios
1. **Accordion:** múltiplas perguntas, com um item aberto por vez.
2. **Pagination:** páginas específicas, anterior/próxima, página atual e botões desabilitados nos limites.
3. **ProgressBar:** recebe valor por props e apresenta progresso de 0 a 100%.
4. **Tabs:** alterna entre painéis de conteúdo.
5. **Dropdown:** abre opções, fecha ao selecionar, clicar fora ou pressionar Escape.
6. **Toast:** feedback temporário, com opção de fechar manualmente.

## Organização dos arquivos

```text
atividade-react/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── context/
    │   └── TaskContext.jsx
    └── components/
        ├── Accordion.jsx
        ├── Dropdown.jsx
        ├── Pagination.jsx
        ├── ProgressBar.jsx
        ├── Tabs.jsx
        └── Toast.jsx
```

## Requisitos

- **Componentização:** cada componente visual obrigatório está em seu próprio arquivo.
- **Props:** dados são enviados para Accordion, Pagination, ProgressBar, Tabs, Dropdown e Toast.
- **Estado local:** abas, acordeão, dropdown, paginação, filtro e toast usam estado React.
- **Estado global (desafio extra):** `TaskContext` compartilha tarefas e a função de alternância entre componentes.
- **Eventos:** cliques, seleção de filtros e alteração dos checkboxes atualizam a interface.
- **Efeito:** `useEffect` controla o fechamento do menu e o tempo de exibição do toast.
- **Acessibilidade:** HTML semântico, rótulos, foco visível, `aria-expanded`, `aria-controls`, `role`, `aria-live` e estados de seleção.
- **Responsividade:** media queries reorganizam menu, cartões, abas e lista em telas menores.

