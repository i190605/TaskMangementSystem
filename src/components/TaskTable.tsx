import type { ReactNode } from 'react';
import type { Task } from '../types/task';
import { formatDisplayDate } from '../utils/date';
import { Badge } from './Badge';
import { priorityTone, statusTone } from './badgeTones';

interface TaskTableProps {
  tasks: Task[];
  selectedTaskId?: string;
  onSelectTask?: (taskId: string) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateAction?: ReactNode;
}

export function TaskTable({
  tasks,
  selectedTaskId,
  onSelectTask,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateAction,
}: TaskTableProps) {
  const recordLabel = `${tasks.length} ${tasks.length === 1 ? 'record' : 'records'}`;

  return (
    <section className="table-card" aria-labelledby="tasks-heading">
      <div className="table-card__header">
        <div>
          <p className="eyebrow">Work queue</p>
          <h2 id="tasks-heading">Tasks</h2>
        </div>
        <span className="table-card__count">{recordLabel}</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Task title</th>
              <th scope="col">Customer name</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Due date</th>
              <th scope="col">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                const isSelected = task.id === selectedTaskId;

                return (
                  <tr className={isSelected ? 'task-row task-row--selected' : 'task-row'} key={task.id}>
                    <td data-label="Task title">
                      {onSelectTask ? (
                        <button
                          aria-controls="task-detail-panel"
                          aria-label={`View details for ${task.title}`}
                          aria-pressed={isSelected}
                          className="task-title-button"
                          type="button"
                          onClick={() => onSelectTask(task.id)}
                        >
                          <strong>{task.title}</strong>
                        </button>
                      ) : (
                        <strong>{task.title}</strong>
                      )}
                    </td>
                    <td data-label="Customer name">{task.customerName}</td>
                    <td data-label="Priority">
                      <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
                    </td>
                    <td data-label="Status">
                      <Badge tone={statusTone[task.status]}>{task.status}</Badge>
                    </td>
                    <td data-label="Due date">{formatDisplayDate(task.dueDate)}</td>
                    <td data-label="Assignee">{task.assignee}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state" role="status">
                    <strong>{emptyStateTitle ?? 'No tasks available'}</strong>
                    <p>{emptyStateDescription ?? 'There are no tasks to display right now.'}</p>
                    {emptyStateAction}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
