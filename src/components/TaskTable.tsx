import type { Task } from '../types/task';
import { Badge } from './Badge';
import { priorityTone, statusTone } from './badgeTones';

interface TaskTableProps {
  tasks: Task[];
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <section className="table-card" aria-labelledby="tasks-heading">
      <div className="table-card__header">
        <div>
          <p className="eyebrow">Work queue</p>
          <h2 id="tasks-heading">Tasks</h2>
        </div>
        <span className="table-card__count">{tasks.length} records</span>
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
            {tasks.map((task) => (
              <tr key={task.id}>
                <td data-label="Task title">
                  <strong>{task.title}</strong>
                </td>
                <td data-label="Customer name">{task.customerName}</td>
                <td data-label="Priority">
                  <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
                </td>
                <td data-label="Status">
                  <Badge tone={statusTone[task.status]}>{task.status}</Badge>
                </td>
                <td data-label="Due date">{dateFormatter.format(new Date(task.dueDate))}</td>
                <td data-label="Assignee">{task.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
