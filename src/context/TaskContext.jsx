import { createContext, useContext, useMemo, useState } from "react";

const TaskContext = createContext(null);

const initialTasks = [
  { id: 1, title: "Definir objetivos do projeto", category: "Planejamento", done: true, priority: "Alta" },
  { id: 2, title: "Criar estrutura inicial do React", category: "Desenvolvimento", done: true, priority: "Alta" },
  { id: 3, title: "Implementar componentes visuais", category: "Desenvolvimento", done: false, priority: "Alta" },
  { id: 4, title: "Desenvolver layout responsivo", category: "Design", done: false, priority: "Média" },
  { id: 5, title: "Testar navegação e acessibilidade", category: "Qualidade", done: false, priority: "Média" },
  { id: 6, title: "Preparar apresentação do projeto", category: "Entrega", done: false, priority: "Baixa" },
  { id: 7, title: "Revisar documentação", category: "Entrega", done: false, priority: "Baixa" }
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleTask(id) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  const value = useMemo(() => ({ tasks, toggleTask }), [tasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks deve ser usado dentro de TaskProvider.");
  return context;
}
