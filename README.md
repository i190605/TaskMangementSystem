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
