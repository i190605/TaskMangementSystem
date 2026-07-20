import { DashboardView } from './components/DashboardView';
import { tasks } from './data/tasks';

export function App() {
  return <DashboardView tasks={tasks} />;
}
