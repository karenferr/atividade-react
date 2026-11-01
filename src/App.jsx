import { useCallback, useMemo, useState } from "react";
import { useTasks } from "./context/TaskContext";
import Accordion from "./components/Accordion";
import Pagination from "./components/Pagination";
import ProgressBar from "./components/ProgressBar";
import Tabs from "./components/Tabs";
import Dropdown from "./components/Dropdown";
import Toast from "./components/Toast";

const faqItems = [
  { title: "Como acompanhar o progresso?", content: "O percentual é atualizado automaticamente sempre que uma tarefa é marcada como concluída ou pendente." },
  { title: "Posso navegar entre as tarefas?", content: "Sim. Use os controles de paginação para visualizar os itens em diferentes páginas." },
  { title: "Onde os dados são compartilhados?", content: "O estado das tarefas fica no Context API, permitindo que diferentes componentes acessem os mesmos dados." }
];

export default function App() {
  const { tasks, toggleTask } = useTasks();
  const [activePage, setActivePage] = useState(1);
  const [filter, setFilter] = useState("todas");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const itemsPerPage = 4;

  const completed = tasks.filter(task => task.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const filteredTasks = useMemo(() => {
    if (filter === "concluidas") return tasks.filter(task => task.done);
    if (filter === "pendentes") return tasks.filter(task => !task.done);
    return tasks;
  }, [tasks, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / itemsPerPage));
  const visibleTasks = filteredTasks.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  function changeFilter(value) {
    setFilter(value);
    setActivePage(1);
    const labels = { todas: "Todas as tarefas", concluidas: "Tarefas concluídas", pendentes: "Tarefas pendentes" };
    setToast({ message: `Filtro aplicado: ${labels[value]}.`, type: "success" });
  }

  const closeToast = useCallback(() => setToast({ message: "", type: "success" }), []);

  function handleToggle(task) {
    toggleTask(task.id);
    setToast({
      message: task.done ? "Tarefa marcada como pendente." : "Tarefa concluída com sucesso!",
      type: "success"
    });
  }

  const tabs = [
    {
      label: "Visão geral",
      content: (
        <div className="overview-grid">
          <div className="overview-stat"><span>Progresso geral</span><strong>{progress}%</strong><small>do projeto concluído</small></div>
          <div className="overview-stat"><span>Tarefas concluídas</span><strong>{completed}</strong><small>de {tasks.length} tarefas</small></div>
          <div className="overview-stat"><span>Em andamento</span><strong>{tasks.length - completed}</strong><small>itens restantes</small></div>
        </div>
      )
    },
    {
      label: "Tarefas",
      content: <p className="tab-description">Acompanhe cada atividade na lista abaixo. Marque a caixa ao lado de uma tarefa para atualizar o progresso do projeto.</p>
    },
    {
      label: "Sobre o projeto",
      content: <p className="tab-description">O TaskFlow é uma aplicação demonstrativa desenvolvida com React.js. Ela utiliza componentes reutilizáveis, props, hooks, Context API e recursos de acessibilidade.</p>
    }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio" aria-label="TaskFlow, início">
          <span className="brand-mark">T</span><span>taskflow</span>
        </a>
        <div className="workspace-label">ESPAÇO DE TRABALHO</div>
        <nav className="side-nav" aria-label="Navegação principal">
          <a className="side-link selected" href="#inicio"><span>▦</span> Visão geral</a>
          <a className="side-link" href="#tarefas"><span>✓</span> Minhas tarefas</a>
          <a className="side-link" href="#ajuda"><span>◇</span> Ajuda e FAQ</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-avatar">ES</div>
          <div><strong>Estudante</strong><small>Projeto React</small></div>
        </div>
      </aside>

      <main className="main-content" id="inicio">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>Visão geral</strong></div>
          <div className="topbar-right"><span className="status-dot" /> Projeto em andamento</div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">PAINEL DE CONTROLE</p>
            <h1>Olá! Vamos avançar no projeto.</h1>
            <p className="subtitle">Organize suas atividades e acompanhe seu progresso em um só lugar.</p>
          </div>
          <div className="date-chip">✦ &nbsp; Seu espaço de produtividade</div>
        </section>

        <section className="content-section" aria-label="Resumo do projeto">
          <div className="section-heading"><div><h2>Resumo do projeto</h2><p>Uma visão rápida do seu desempenho.</p></div></div>
          <div className="summary-grid">
            <article className="summary-card progress-card">
              <div className="card-topline"><span className="card-icon purple">↗</span><span className="muted-label">DESEMPENHO</span></div>
              <div className="summary-number">{progress}%</div>
              <ProgressBar value={progress} label="Progresso das tarefas" />
              <p className="card-footnote">{completed} de {tasks.length} atividades concluídas</p>
            </article>
            <article className="summary-card">
              <div className="card-topline"><span className="card-icon green">✓</span><span className="muted-label">CONCLUÍDAS</span></div>
              <div className="summary-number">{completed}<span className="number-total">/{tasks.length}</span></div>
              <p className="card-footnote">Atividades finalizadas</p>
            </article>
            <article className="summary-card">
              <div className="card-topline"><span className="card-icon orange">◷</span><span className="muted-label">PENDENTES</span></div>
              <div className="summary-number">{tasks.length - completed}</div>
              <p className="card-footnote">Atividades que faltam concluir</p>
            </article>
          </div>
        </section>

        <section className="content-section panel-section">
          <div className="section-heading"><div><h2>Detalhes</h2><p>Informações organizadas por categoria.</p></div></div>
          <Tabs tabs={tabs} />
        </section>

        <section className="content-section panel-section" id="tarefas">
          <div className="section-heading task-heading">
            <div><h2>Lista de tarefas</h2><p>Gerencie as etapas do seu projeto.</p></div>
            <Dropdown
              label="Filtrar tarefas"
              options={[
                { label: "Todas as tarefas", value: "todas" },
                { label: "Concluídas", value: "concluidas" },
                { label: "Pendentes", value: "pendentes" }
              ]}
              onSelect={changeFilter}
            />
          </div>
          <div className="task-list">
            {visibleTasks.length ? visibleTasks.map(task => (
              <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}>
                <input type="checkbox" checked={task.done} onChange={() => handleToggle(task)} />
                <span className="custom-check" aria-hidden="true">{task.done ? "✓" : ""}</span>
                <span className="task-main"><strong>{task.title}</strong><small>{task.category}</small></span>
                <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
              </label>
            )) : <p className="empty-state">Nenhuma tarefa encontrada para este filtro.</p>}
          </div>
          <div className="list-footer">
            <span>Mostrando {visibleTasks.length ? (activePage - 1) * itemsPerPage + 1 : 0}–{Math.min(activePage * itemsPerPage, filteredTasks.length)} de {filteredTasks.length} tarefas</span>
            <Pagination totalPages={totalPages} currentPage={activePage} onPageChange={setActivePage} />
          </div>
        </section>

        <section className="content-section panel-section" id="ajuda">
          <div className="section-heading"><div><h2>Perguntas frequentes</h2><p>Entenda como utilizar os recursos do painel.</p></div></div>
          <Accordion items={faqItems} />
        </section>

        <footer className="footer">TaskFlow <span>•</span> Atividade acadêmica desenvolvida com React.js</footer>
      </main>

      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
    </div>
  );
}
