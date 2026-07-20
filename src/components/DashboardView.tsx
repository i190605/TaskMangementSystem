import { useMemo, useState } from 'react';
import type { Task, TaskPriority } from '../types/task';
import { textIncludesQuery } from '../utils/search';
import { FilterSelect, type SelectOption } from './FilterSelect';
import { SearchField } from './SearchField';
import { StatCard } from './StatCard';
import { TaskTable } from './TaskTable';

type PriorityFilter = 'All' | TaskPriority;

const priorityOptions: SelectOption<PriorityFilter>[] = [
  { label: 'All priorities', value: 'All' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];

interface DashboardViewProps {
  tasks: Task[];
}

export function DashboardView({ tasks }: DashboardViewProps) {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');

  const visibleTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          textIncludesQuery(task.title, titleSearchTerm) &&
          textIncludesQuery(task.customerName, customerSearchTerm) &&
          (priorityFilter === 'All' || task.priority === priorityFilter),
      ),
    [customerSearchTerm, priorityFilter, tasks, titleSearchTerm],
  );

  const hasTitleSearch = titleSearchTerm.trim().length > 0;
  const hasCustomerSearch = customerSearchTerm.trim().length > 0;
  const hasPriorityFilter = priorityFilter !== 'All';
  const hasAnySearch = hasTitleSearch || hasCustomerSearch;
  const hasAnyControl = hasAnySearch || hasPriorityFilter;
  const openTasks = visibleTasks.filter((task) => task.status === 'Open').length;
  const inProgressTasks = visibleTasks.filter((task) => task.status === 'In Progress').length;
  const completedTasks = visibleTasks.filter((task) => task.status === 'Completed').length;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'High').length;
  const searchResultSummary = hasAnyControl
    ? `Showing ${visibleTasks.length} of ${tasks.length} tasks matching your search and filters.`
    : `Showing all ${tasks.length} tasks.`;

  function clearControls() {
    setTitleSearchTerm('');
    setCustomerSearchTerm('');
    setPriorityFilter('All');
  }

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
            Search by task title or customer name, then filter by priority to focus the queue around the work that matters most.
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
          <SearchField
            id="customer-name-search"
            label="Customer name"
            value={customerSearchTerm}
            onChange={setCustomerSearchTerm}
            placeholder="Search customer names..."
            helperText="Combine with task-title search to narrow the queue."
            clearLabel="Clear customer name search"
          />
          <FilterSelect
            id="priority-filter"
            label="Priority"
            value={priorityFilter}
            onChange={setPriorityFilter}
            options={priorityOptions}
            helperText="Filter urgent work without losing the current search context."
          />
        </div>

        <p className="search-card__results" aria-live="polite">
          {searchResultSummary}
        </p>
      </section>

      <TaskTable
        tasks={visibleTasks}
        emptyStateTitle="No matching tasks"
        emptyStateDescription={
          hasAnyControl
            ? 'No tasks match the current search and filters. Try a broader keyword or clear one of the controls.'
            : 'No tasks have been added yet.'
        }
        emptyStateAction={
          hasAnyControl ? (
            <button className="secondary-button" type="button" onClick={clearControls}>
              Clear search and filters
            </button>
          ) : undefined
        }
      />
    </main>
  );
}
