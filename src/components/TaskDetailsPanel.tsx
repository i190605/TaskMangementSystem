import { useState } from 'react';
import type { Task, TaskStatus } from '../types/task';
import { formatDisplayDate } from '../utils/date';
import { getUrgencyReason, isTaskUrgent } from '../utils/urgency';
import { Badge } from './Badge';
import { priorityTone, statusTone } from './badgeTones';

const statusOptions: TaskStatus[] = ['Open', 'In Progress', 'Completed'];

interface TaskDetailsPanelProps {
  task: Task | null;
  onUpdateStatus?: (taskId: string, status: TaskStatus) => void;
}

export function TaskDetailsPanel({ task, onUpdateStatus }: TaskDetailsPanelProps) {
  const [feedbackMessage, setFeedbackMessage] = useState('');

  if (!task) {
    return (
      <aside className="details-panel" id="task-detail-panel" aria-labelledby="task-detail-heading">
        <p className="eyebrow">Task details</p>
        <h2 id="task-detail-heading">No task selected</h2>
        <p className="details-panel__description">
          Select a task from the work queue to review its description, customer information, and ownership details.
        </p>
      </aside>
    );
  }

  function handleStatusChange(status: TaskStatus) {
    if (!task || !onUpdateStatus) {
      return;
    }

    onUpdateStatus(task.id, status);
    setFeedbackMessage(`Status updated to ${status}.`);
  }

  const isUrgent = isTaskUrgent(task);

  return (
    <aside className="details-panel" id="task-detail-panel" aria-labelledby="task-detail-heading" aria-live="polite">
      <div className="details-panel__header">
        <div>
          <p className="eyebrow">Task details</p>
          <h2 id="task-detail-heading">{task.title}</h2>
        </div>
        <div className="details-panel__badges" aria-label="Selected task priority and status">
          {isUrgent ? <span className="badge badge--urgent">Urgent</span> : null}
          <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
          <Badge tone={statusTone[task.status]}>{task.status}</Badge>
        </div>
      </div>

      {isUrgent ? <p className="details-panel__urgency">{getUrgencyReason(task)}</p> : null}

      <p className="details-panel__description">{task.description}</p>

      {onUpdateStatus ? (
        <div className="details-panel__status-control">
          <label htmlFor={`status-update-${task.id}`}>Update status</label>
          <select
            id={`status-update-${task.id}`}
            value={task.status}
            onChange={(event) => handleStatusChange(event.target.value as TaskStatus)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <p aria-live="polite">{feedbackMessage}</p>
        </div>
      ) : null}

      <dl className="details-list">
        <div>
          <dt>Customer</dt>
          <dd>{task.customerName}</dd>
        </div>
        <div>
          <dt>Customer contact</dt>
          <dd>{task.customer.contactName}</dd>
        </div>
        <div>
          <dt>Customer email</dt>
          <dd>{task.customer.email ? <a href={`mailto:${task.customer.email}`}>{task.customer.email}</a> : 'Not provided'}</dd>
        </div>
        <div>
          <dt>Account tier</dt>
          <dd>{task.customer.accountTier ?? 'Not assigned'}</dd>
        </div>
        <div>
          <dt>Due date</dt>
          <dd>{formatDisplayDate(task.dueDate)}</dd>
        </div>
        <div>
          <dt>Assignee</dt>
          <dd>{task.assignee}</dd>
        </div>
      </dl>
    </aside>
  );
}
