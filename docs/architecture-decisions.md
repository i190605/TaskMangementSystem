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
