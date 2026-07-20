import type { Task } from '../types/task';
import { formatDisplayDate } from '../utils/date';
import { Badge } from './Badge';
import { priorityTone, statusTone } from './badgeTones';

interface TaskDetailsPanelProps {
  task: Task | null;
}

export function TaskDetailsPanel({ task }: TaskDetailsPanelProps) {
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

  return (
    <aside className="details-panel" id="task-detail-panel" aria-labelledby="task-detail-heading" aria-live="polite">
      <div className="details-panel__header">
        <div>
          <p className="eyebrow">Task details</p>
          <h2 id="task-detail-heading">{task.title}</h2>
        </div>
        <div className="details-panel__badges" aria-label="Selected task priority and status">
          <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
          <Badge tone={statusTone[task.status]}>{task.status}</Badge>
        </div>
      </div>

      <p className="details-panel__description">{task.description}</p>

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
          <dd>
            <a href={`mailto:${task.customer.email}`}>{task.customer.email}</a>
          </dd>
        </div>
        <div>
          <dt>Account tier</dt>
          <dd>{task.customer.accountTier}</dd>
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
