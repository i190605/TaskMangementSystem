import { useMemo, useState } from 'react';
import type { Task, TaskPriority, TaskStatus } from '../types/task';
import { textIncludesQuery } from '../utils/search';
import { FilterSelect, type SelectOption } from './FilterSelect';
import { SearchField } from './SearchField';
import { StatCard } from './StatCard';
import { TaskTable } from './TaskTable';

type PriorityFilter = 'All' | TaskPriority;
type StatusFilter = 'All' | TaskStatus;

const priorityOptions: SelectOption<PriorityFilter>[] = [
  { label: 'All priorities', value: 'All' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];

const statusOptions: SelectOption<StatusFilter>[] = [
  { label: 'All statuses', value: 'All' },
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
];

interface DashboardViewProps {
  tasks: Task[];
}

export function DashboardView({ tasks }: DashboardViewProps) {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const assigneeOptions = useMemo<SelectOption<string>[]>(() => {
    const uniqueAssignees = Array.from(new Set(tasks.map((task) => task.assignee))).sort((first, second) =>
      first.localeCompare(second),
    );

    return [
      { label: 'All assignees', value: 'All' },
      ...uniqueAssignees.map((assignee) => ({ label: assignee, value: assignee })),
    ];
  }, [tasks]);

  const [assigneeFilter, setAssigneeFilter] = useState('All');

  const visibleTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          textIncludesQuery(task.title, titleSearchTerm) &&
          textIncludesQuery(task.customerName, customerSearchTerm) &&
          (priorityFilter === 'All' || task.priority === priorityFilter) &&
          (statusFilter === 'All' || task.status === statusFilter) &&
          (assigneeFilter === 'All' || task.assignee === assigneeFilter),
      ),
    [assigneeFilter, customerSearchTerm, priorityFilter, statusFilter, tasks, titleSearchTerm],
  );

  const hasTitleSearch = titleSearchTerm.trim().length > 0;
  const hasCustomerSearch = customerSearchTerm.trim().length > 0;
  const hasPriorityFilter = priorityFilter !== 'All';
  const hasStatusFilter = statusFilter !== 'All';
  const hasAssigneeFilter = assigneeFilter !== 'All';
  const hasAnySearch = hasTitleSearch || hasCustomerSearch;
  const hasAnyControl = hasAnySearch || hasPriorityFilter || hasStatusFilter || hasAssigneeFilter;
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
    setStatusFilter('All');
    setAssigneeFilter('All');
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
            Search by task title or customer name, then filter by priority, status, and assignee to focus the queue around the work that matters most.
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
          <FilterSelect
            id="status-filter"
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            helperText="Focus on work by lifecycle stage."
          />
          <FilterSelect
            id="assignee-filter"
            label="Assignee"
            value={assigneeFilter}
            onChange={setAssigneeFilter}
            options={assigneeOptions}
            helperText="Review ownership without changing the task list structure."
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
