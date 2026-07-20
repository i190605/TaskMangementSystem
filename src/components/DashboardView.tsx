import type { Task } from '../types/task';
import { StatCard } from './StatCard';
import { TaskTable } from './TaskTable';

interface DashboardViewProps {
  tasks: Task[];
}

export function DashboardView({ tasks }: DashboardViewProps) {
  const openTasks = tasks.filter((task) => task.status === 'Open').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length;
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'High').length;

  return (
    <main className="dashboard-shell">
      <section className="hero-card" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">Task Management System</p>
          <h1 id="dashboard-title">Dashboard View</h1>
          <p className="hero-copy">
            Track customer tasks by priority, status, due date, and ownership from a single focused workspace.
          </p>
        </div>
        <div className="hero-metadata" aria-label="Dashboard summary">
          <span>{tasks.length} total tasks</span>
          <span>{highPriorityTasks} high priority</span>
        </div>
      </section>

      <section className="stats-grid" aria-label="Task status summary">
        <StatCard label="Open" value={openTasks} helper="Ready to be picked up" />
        <StatCard label="In Progress" value={inProgressTasks} helper="Currently being handled" />
        <StatCard label="Completed" value={completedTasks} helper="Closed successfully" />
      </section>

      <TaskTable tasks={tasks} />
    </main>
  );
}
