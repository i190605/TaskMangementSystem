import { useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { tasks as initialTasks } from './data/tasks';
import type { CreateTaskInput, Task, TaskStatus } from './types/task';

function createTaskId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `task-${Date.now()}`;
}

function buildTask(input: CreateTaskInput): Task {
  return {
    id: createTaskId(),
    title: input.title,
    description: input.description,
    customerName: 'Unassigned customer',
    customer: {
      contactName: 'Not assigned',
      accountTier: 'Unassigned',
    },
    priority: input.priority,
    status: 'Open',
    dueDate: input.dueDate,
    assignee: input.assignee,
  };
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleCreateTask(input: CreateTaskInput) {
    const task = buildTask(input);

    setTasks((currentTasks) => [task, ...currentTasks]);

    return task;
  }

  function handleUpdateTaskStatus(taskId: string, status: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  }

  return <DashboardView tasks={tasks} onCreateTask={handleCreateTask} onUpdateTaskStatus={handleUpdateTaskStatus} />;
}
