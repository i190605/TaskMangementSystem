import type { TaskPriority, TaskStatus } from '../types/task';

export type BadgeTone = 'danger' | 'warning' | 'success' | 'neutral' | 'info';

export const priorityTone: Record<TaskPriority, BadgeTone> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

export const statusTone: Record<TaskStatus, BadgeTone> = {
  Open: 'neutral',
  'In Progress': 'info',
  Completed: 'success',
};
