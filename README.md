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

## Task details

Selecting a task from the work queue displays its full description, customer information, priority, status, due date, and assignee in a dedicated details panel.

## Create task

Users can create a new local task with title, description, priority, due date, and assignee. Newly created tasks start in the Open status and appear at the top of the queue.

## Data source

**Selected option: C — local JSON data.**

Seed tasks live in `src/data/tasks.json` and are adapted through `src/data/tasks.ts` so the UI still receives typed `Task` objects. This keeps the project deterministic, fast to review, and independent from external API availability while the product workflow is still being shaped.

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
