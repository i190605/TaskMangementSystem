# Task Management System

A frontend-first task management dashboard for tracking customer work by priority, status, due date, and assignee.

## Initial milestone: Building Atoms of Dashboards

This first commit establishes the dashboard building blocks and a static dashboard view containing:

- Task title
- Customer name
- Priority: High, Medium, Low
- Status: Open, In Progress, Completed
- Due date
- Assignee

## Search

The dashboard supports instant search by task title and customer name so operators can quickly locate work items without scanning the full queue.

## Filtering

The dashboard supports priority, status, and assignee filtering to help teams focus high-urgency work, lifecycle stages, and ownership while preserving their current search context.

Urgent work is highlighted when it is high priority, overdue, or due within two days. CSMs can also switch to an urgent-only view for quick triage.

## Task details

Selecting a task from the work queue displays its full description, customer information, priority, status, due date, and assignee in a dedicated details panel.

CSMs can update a selected task status directly from the details panel to keep work moving without leaving the dashboard context.

## Create task

Users can create a new local task with title, description, priority, due date, and assignee. Newly created tasks start in the Open status and appear at the top of the queue.

## Data source

**Selected option: C — local JSON data.**

| Option | Description | Decision |
| --- | --- | --- |
| A | Use a public mock API | Not selected because public mock APIs can be slow, unavailable, or shaped around generic data that does not match this task-management domain. |
| B | Create a mocked backend | Not selected yet because the current milestone is validating dashboard workflows before committing to API routes, persistence behavior, or backend contracts. |
| C | Use local JSON data | Selected because it is deterministic, fast to review, domain-specific, and keeps the frontend workflow independent from network availability. |

Seed tasks live in `src/data/tasks.json` and are adapted through `src/data/tasks.ts` so the UI still receives typed `Task` objects. This gives us realistic dashboard data now while preserving a clear migration path to a backend/service layer later.

## Product thinking and assumptions

Non-functional expectations, workflow assumptions, user personas, state handling, and future product decisions are documented in [`docs/product-thinking.md`](docs/product-thinking.md).

UX information architecture, interaction design, form behavior, and microinteraction decisions are documented in [`docs/ux-interaction-design.md`](docs/ux-interaction-design.md).

## Tech stack

- React for composing dashboard UI
- TypeScript for domain-safe task models
- Vite for fast local development and production builds
- Plain CSS with scoped class naming in `src/styles.css` for a low-dependency initial foundation

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Architecture notes

Important architectural decisions are documented in [`docs/architecture-decisions.md`](docs/architecture-decisions.md).
