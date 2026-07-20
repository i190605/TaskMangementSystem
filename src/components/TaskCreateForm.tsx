import { useMemo, useState, type FormEvent } from 'react';
import type { CreateTaskInput, TaskPriority } from '../types/task';
import { getTodayDateInputValue } from '../utils/date';

const priorityOptions: TaskPriority[] = ['High', 'Medium', 'Low'];

interface TaskCreateFormProps {
  onCreateTask: (input: CreateTaskInput) => void;
}

export function TaskCreateForm({ onCreateTask }: TaskCreateFormProps) {
  const today = useMemo(() => getTodayDateInputValue(), []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState(today);
  const [assignee, setAssignee] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedAssignee = assignee.trim();

    if (!trimmedTitle || !trimmedDescription || !dueDate || !trimmedAssignee) {
      setFeedbackMessage('Please complete title, description, due date, and assignee before creating a task.');
      return;
    }

    onCreateTask({
      title: trimmedTitle,
      description: trimmedDescription,
      priority,
      dueDate,
      assignee: trimmedAssignee,
    });

    setFeedbackMessage(`Created “${trimmedTitle}” as an open task.`);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate(today);
    setAssignee('');
  }

  return (
    <section className="create-card" aria-labelledby="create-task-heading">
      <div className="create-card__header">
        <div>
          <p className="eyebrow">Create work</p>
          <h2 id="create-task-heading">Create task</h2>
        </div>
        <p className="create-card__description">
          Add a task with the minimum required planning fields. New tasks start as Open and can be refined with customer data later.
        </p>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <label className="form-field" htmlFor="new-task-title">
          <span>Title</span>
          <input
            id="new-task-title"
            maxLength={90}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Schedule implementation kickoff"
            required
            type="text"
            value={title}
          />
        </label>

        <label className="form-field form-field--wide" htmlFor="new-task-description">
          <span>Description</span>
          <textarea
            id="new-task-description"
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the outcome, context, and next action..."
            required
            rows={4}
            value={description}
          />
        </label>

        <label className="form-field" htmlFor="new-task-priority">
          <span>Priority</span>
          <select
            id="new-task-priority"
            onChange={(event) => setPriority(event.target.value as TaskPriority)}
            value={priority}
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field" htmlFor="new-task-due-date">
          <span>Due date</span>
          <input
            id="new-task-due-date"
            min={today}
            onChange={(event) => setDueDate(event.target.value)}
            required
            type="date"
            value={dueDate}
          />
        </label>

        <label className="form-field" htmlFor="new-task-assignee">
          <span>Assignee</span>
          <input
            id="new-task-assignee"
            onChange={(event) => setAssignee(event.target.value)}
            placeholder="e.g. Ayesha Khan"
            required
            type="text"
            value={assignee}
          />
        </label>

        <div className="task-form__actions">
          <button className="primary-button" type="submit">
            Create task
          </button>
          <p className="task-form__feedback" aria-live="polite">
            {feedbackMessage}
          </p>
        </div>
      </form>
    </section>
  );
}
