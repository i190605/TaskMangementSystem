export type TaskPriority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Open' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  customerName: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
}
