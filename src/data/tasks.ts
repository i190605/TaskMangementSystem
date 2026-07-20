import type { Task } from '../types/task';

export const tasks: Task[] = [
  {
    id: 'task-001',
    title: 'Prepare onboarding checklist',
    customerName: 'Acme Manufacturing',
    priority: 'High',
    status: 'Open',
    dueDate: '2026-07-24',
    assignee: 'Ayesha Khan',
  },
  {
    id: 'task-002',
    title: 'Review quarterly service report',
    customerName: 'Northwind Traders',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-07-28',
    assignee: 'Bilal Ahmed',
  },
  {
    id: 'task-003',
    title: 'Resolve invoice approval blocker',
    customerName: 'BluePeak Logistics',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-07-22',
    assignee: 'Sara Malik',
  },
  {
    id: 'task-004',
    title: 'Confirm rollout timeline',
    customerName: 'Contoso Retail',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2026-07-20',
    assignee: 'Hamza Noor',
  },
  {
    id: 'task-005',
    title: 'Update customer success notes',
    customerName: 'Globex Services',
    priority: 'Medium',
    status: 'Open',
    dueDate: '2026-07-31',
    assignee: 'Mina Farooq',
  },
];
