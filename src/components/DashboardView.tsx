import { useMemo, useState } from 'react';
import type { Task } from '../types/task';
import { textIncludesQuery } from '../utils/search';
import { SearchField } from './SearchField';
import { StatCard } from './StatCard';
import { TaskTable } from './TaskTable';

interface DashboardViewProps {
  tasks: Task[];
}

export function DashboardView({ tasks }: DashboardViewProps) {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');

  const visibleTasks = useMemo(
    () => tasks.filter((task) => textIncludesQuery(task.title, titleSearchTerm)),
    [tasks, titleSearchTerm],
  );

  const hasTitleSearch = titleSearchTerm.trim().length > 0;
  const openTasks = visibleTasks.filter((task) => task.status === 'Open').length;
  const inProgressTasks = visibleTasks.filter((task) => task.status === 'In Progress').length;
  const completedTasks = visibleTasks.filter((task) => task.status === 'Completed').length;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'High').length;
  const searchResultSummary = hasTitleSearch
    ? `Showing ${visibleTasks.length} of ${tasks.length} tasks matching the title search.`
    : `Showing all ${tasks.length} tasks.`;

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

      <section className="search-card" aria-labelledby="search-heading">
        <div className="search-card__header">
          <div>
            <p className="eyebrow">Find work faster</p>
            <h2 id="search-heading">Search tasks</h2>
          </div>
          <p className="search-card__description">
            Search by task title to quickly locate the work item a customer or teammate is asking about.
          </p>
        </div>

        <div className="search-card__fields">
          <SearchField
            id="task-title-search"
            label="Task title"
            value={titleSearchTerm}
            onChange={setTitleSearchTerm}
            placeholder="Search task titles..."
            helperText="Matches are case-insensitive and update instantly."
            clearLabel="Clear task title search"
          />
        </div>

        <p className="search-card__results" aria-live="polite">
          {searchResultSummary}
        </p>
      </section>

      <TaskTable
        tasks={visibleTasks}
        emptyStateTitle="No matching task titles"
        emptyStateDescription={
          hasTitleSearch
            ? `No task title matches “${titleSearchTerm.trim()}”. Try a broader keyword.`
            : 'No tasks have been added yet.'
        }
        emptyStateAction={
          hasTitleSearch ? (
            <button className="secondary-button" type="button" onClick={() => setTitleSearchTerm('')}>
              Clear title search
            </button>
          ) : undefined
        }
      />
    </main>
  );
}
