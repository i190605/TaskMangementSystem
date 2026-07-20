export type TaskPriority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Open' | 'In Progress' | 'Completed';

export interface CustomerInformation {
  contactName: string;
  email?: string;
  accountTier?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customer: CustomerInformation;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
}
