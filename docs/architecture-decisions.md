# Architecture Decisions

## ADR 001: Start with a frontend-first React dashboard

**Decision:** Use React, TypeScript, and Vite for the initial dashboard implementation.

**Why:**

- React gives us a component model that fits the requested step-by-step dashboard evolution.
- TypeScript keeps task fields such as priority and status constrained to supported values.
- Vite provides a small, fast setup without requiring a larger full-stack framework before backend needs are defined.

## ADR 002: Model dashboard data before introducing APIs

**Decision:** Store the first task list in typed local fixture data under `src/data/tasks.ts`.

**Why:**

- The requested milestone is a dashboard view, not persistence or backend integration.
- Local typed data lets us build and validate UI atoms before committing to an API contract.
- Future steps can replace the fixture data with a repository/service layer while keeping UI components stable.

## ADR 003: Build reusable dashboard atoms first

**Decision:** Split UI into small components: badges, summary cards, and the task table.

**Why:**

- Priority and status badges are reusable visual atoms.
- Summary cards can grow into analytics widgets later.
- The task table isolates display concerns from the root application shell.

## ADR 004: Keep styling dependency-free for the first commit

**Decision:** Use a single CSS file with semantic class names instead of a UI component library.

**Why:**

- It keeps the initial project simple and easy to inspect.
- It avoids locking the project into a design system before dashboard requirements mature.
- Component class names still create clear extension points for future styling improvements.

## ADR 005: Make search local, instant, and accessible first

**Decision:** Implement task-title and customer-name search as controlled React inputs with local filtering.

**Why:**

- The current dashboard data is local, so local filtering keeps the interaction fast and dependency-free.
- Search is case-insensitive and accent-tolerant through a shared normalization utility.
- Multiple search fields compose with `AND` logic so operators can progressively narrow large queues.
- The results count uses `aria-live` and the empty state provides a clear recovery action for keyboard and screen-reader users.

## ADR 006: Add filters as composable dashboard controls

**Decision:** Implement priority, status, and assignee filtering with a reusable `FilterSelect` component and compose filters with existing search predicates.

**Why:**

- A reusable select control gives future filters a consistent accessible structure.
- Priority, status, and assignee filtering are applied alongside search with predictable `AND` logic.
- Assignee options are derived from task data so ownership filters stay current as the task list changes.
- Keeping filtering local is appropriate while the dashboard uses local fixture data and keeps the interaction instant.
