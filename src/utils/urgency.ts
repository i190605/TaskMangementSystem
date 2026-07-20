import type { Task } from '../types/task';
import { getDaysUntilDate } from './date';

const urgentDueWindowInDays = 2;

export function isTaskUrgent(task: Task) {
  if (task.status === 'Completed') {
    return false;
  }

  const isHighPriority = task.priority === 'High';
  const isDueSoonOrOverdue = getDaysUntilDate(task.dueDate) <= urgentDueWindowInDays;

  return isHighPriority || isDueSoonOrOverdue;
}

export function getUrgencyReason(task: Task) {
  const daysUntilDue = getDaysUntilDate(task.dueDate);

  if (task.status === 'Completed') {
    return 'Completed tasks are not treated as urgent.';
  }

  if (daysUntilDue < 0) {
    return 'Overdue customer work';
  }

  if (daysUntilDue === 0) {
    return 'Due today';
  }

  if (daysUntilDue <= urgentDueWindowInDays) {
    return `Due in ${daysUntilDue} ${daysUntilDue === 1 ? 'day' : 'days'}`;
  }

  if (task.priority === 'High') {
    return 'High priority customer work';
  }

  return 'Not currently urgent';
}
