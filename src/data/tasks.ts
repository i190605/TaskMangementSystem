import type { Task, TaskPriority, TaskStatus } from '../types/task';
import seedTasks from './tasks.json';

const supportedPriorities: TaskPriority[] = ['High', 'Medium', 'Low'];
const supportedStatuses: TaskStatus[] = ['Open', 'In Progress', 'Completed'];

function toTaskPriority(value: string): TaskPriority {
  if (supportedPriorities.includes(value as TaskPriority)) {
    return value as TaskPriority;
  }

  throw new Error(`Unsupported task priority in local JSON data: ${value}`);
}

function toTaskStatus(value: string): TaskStatus {
  if (supportedStatuses.includes(value as TaskStatus)) {
    return value as TaskStatus;
  }

  throw new Error(`Unsupported task status in local JSON data: ${value}`);
}

export const tasks: Task[] = seedTasks.map((task) => ({
  ...task,
  priority: toTaskPriority(task.priority),
  status: toTaskStatus(task.status),
}));
