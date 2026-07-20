import { useMemo, useState, type FormEvent } from 'react';
import type { CreateTaskInput, TaskPriority } from '../types/task';
import { getTodayDateInputValue } from '../utils/date';

const priorityOptions: TaskPriority[] = ['High', 'Medium', 'Low'];

type FieldName = 'title' | 'description' | 'dueDate' | 'assignee';
type FieldErrors = Partial<Record<FieldName, string>>;

interface TaskCreateFormProps {
  onCreateTask: (input: CreateTaskInput) => void;
}

function validateForm(values: Pick<CreateTaskInput, 'title' | 'description' | 'dueDate' | 'assignee'>, today: string) {
  const errors: FieldErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Add a short title so teammates can recognize the task in the queue.';
  }

  if (!values.description.trim()) {
    errors.description = 'Describe the outcome, context, or next action needed.';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Choose a due date so the team can prioritize the work.';
  } else if (values.dueDate < today) {
    errors.dueDate = 'Due date cannot be in the past.';
  }

  if (!values.assignee.trim()) {
    errors.assignee = 'Assign the task to an owner to avoid unclear handoffs.';
  }

  return errors;
}

export function TaskCreateForm({ onCreateTask }: TaskCreateFormProps) {
  const today = useMemo(() => getTodayDateInputValue(), []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState(today);
  const [assignee, setAssignee] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackTone, setFeedbackTone] = useState<'success' | 'error' | 'neutral'>('neutral');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDirty = Boolean(title || description || assignee || priority !== 'Medium' || dueDate !== today);
  const hasErrors = Object.keys(errors).length > 0;

  function clearFieldError(fieldName: FieldName) {
    setErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate(today);
    setAssignee('');
    setErrors({});
  }

  function handleClearDraft() {
    if (!isDirty) {
      setFeedbackMessage('There is no draft to clear.');
      setFeedbackTone('neutral');
      return;
    }

    const shouldClear = window.confirm('Clear this task draft? Your unsaved title, description, due date, and assignee will be removed.');

    if (!shouldClear) {
      setFeedbackMessage('Draft kept. You can continue editing.');
      setFeedbackTone('neutral');
      return;
    }

    resetForm();
    setFeedbackMessage('Draft cleared.');
    setFeedbackTone('neutral');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedAssignee = assignee.trim();

    const nextErrors = validateForm(
      {
        title: trimmedTitle,
        description: trimmedDescription,
        dueDate,
        assignee: trimmedAssignee,
      },
      today,
    );

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedbackMessage('Review the highlighted fields before creating the task.');
      setFeedbackTone('error');
      return;
    }

    setIsSubmitting(true);

    onCreateTask({
      title: trimmedTitle,
      description: trimmedDescription,
      priority,
      dueDate,
      assignee: trimmedAssignee,
    });

    setFeedbackMessage(`Created “${trimmedTitle}” as an open task.`);
    setFeedbackTone('success');
    resetForm();
    setIsSubmitting(false);
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

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        {hasErrors ? (
          <div className="form-alert" role="alert">
            <strong>Some required details need attention.</strong>
            <span>Use the inline messages below to recover quickly.</span>
          </div>
        ) : null}

        <label className={errors.title ? 'form-field form-field--invalid' : 'form-field'} htmlFor="new-task-title">
          <span>Title <em>Required</em></span>
          <input
            aria-describedby={errors.title ? 'new-task-title-error' : 'new-task-title-helper'}
            aria-invalid={Boolean(errors.title)}
            id="new-task-title"
            maxLength={90}
            onChange={(event) => {
              setTitle(event.target.value);
              clearFieldError('title');
            }}
            placeholder="e.g. Schedule implementation kickoff"
            required
            type="text"
            value={title}
          />
          {errors.title ? (
            <span className="form-field__error" id="new-task-title-error">
              {errors.title}
            </span>
          ) : (
            <span className="form-field__helper" id="new-task-title-helper">
              Keep it specific enough to scan in the work queue.
            </span>
          )}
        </label>

        <label
          className={errors.description ? 'form-field form-field--wide form-field--invalid' : 'form-field form-field--wide'}
          htmlFor="new-task-description"
        >
          <span>Description <em>Required</em></span>
          <textarea
            aria-describedby={errors.description ? 'new-task-description-error' : 'new-task-description-helper'}
            aria-invalid={Boolean(errors.description)}
            id="new-task-description"
            onChange={(event) => {
              setDescription(event.target.value);
              clearFieldError('description');
            }}
            placeholder="Describe the outcome, context, and next action..."
            required
            rows={4}
            value={description}
          />
          {errors.description ? (
            <span className="form-field__error" id="new-task-description-error">
              {errors.description}
            </span>
          ) : (
            <span className="form-field__helper" id="new-task-description-helper">
              Include enough context for the assignee to act without asking for clarification.
            </span>
          )}
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
          <span className="form-field__helper">Medium is the default for normal intake.</span>
        </label>

        <label className={errors.dueDate ? 'form-field form-field--invalid' : 'form-field'} htmlFor="new-task-due-date">
          <span>Due date <em>Required</em></span>
          <input
            aria-describedby={errors.dueDate ? 'new-task-due-date-error' : 'new-task-due-date-helper'}
            aria-invalid={Boolean(errors.dueDate)}
            id="new-task-due-date"
            min={today}
            onChange={(event) => {
              setDueDate(event.target.value);
              clearFieldError('dueDate');
            }}
            required
            type="date"
            value={dueDate}
          />
          {errors.dueDate ? (
            <span className="form-field__error" id="new-task-due-date-error">
              {errors.dueDate}
            </span>
          ) : (
            <span className="form-field__helper" id="new-task-due-date-helper">
              Past dates are blocked to reduce intake mistakes.
            </span>
          )}
        </label>

        <label className={errors.assignee ? 'form-field form-field--invalid' : 'form-field'} htmlFor="new-task-assignee">
          <span>Assignee <em>Required</em></span>
          <input
            aria-describedby={errors.assignee ? 'new-task-assignee-error' : 'new-task-assignee-helper'}
            aria-invalid={Boolean(errors.assignee)}
            id="new-task-assignee"
            onChange={(event) => {
              setAssignee(event.target.value);
              clearFieldError('assignee');
            }}
            placeholder="e.g. Ayesha Khan"
            required
            type="text"
            value={assignee}
          />
          {errors.assignee ? (
            <span className="form-field__error" id="new-task-assignee-error">
              {errors.assignee}
            </span>
          ) : (
            <span className="form-field__helper" id="new-task-assignee-helper">
              Use the owner teammates already recognize.
            </span>
          )}
        </label>

        <div className="task-form__actions">
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create task'}
          </button>
          <button className="ghost-button" type="button" onClick={handleClearDraft}>
            Clear draft
          </button>
          <p className={`task-form__feedback task-form__feedback--${feedbackTone}`} aria-live="polite">
            {feedbackMessage}
          </p>
        </div>
      </form>
    </section>
  );
}
