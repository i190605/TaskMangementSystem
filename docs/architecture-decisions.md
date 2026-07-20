# Architecture Decisions

## ADR 001: Start with a frontend-first React dashboard

**Decision:** Use React, TypeScript, and Vite for the initial dashboard implementation.

**Why:**

- React gives us a component model that fits the requested step-by-step dashboard evolution.
- TypeScript keeps task fields such as priority and status constrained to supported values.
- Vite provides a small, fast setup without requiring a larger full-stack framework before backend needs are defined.

## ADR 002: Use local JSON data before introducing APIs

**Decision:** Use **Option C — local JSON data**. Store seed tasks in `src/data/tasks.json` and expose typed task objects through `src/data/tasks.ts`.

**Options considered:**

| Option | Description | Assessment |
| --- | --- | --- |
| A | Use a public mock API | Rejected for this stage. Public mock APIs introduce network dependency, possible downtime, rate limits, and generic schemas that may not represent task-management workflows well. |
| B | Create a mocked backend | Deferred. A mocked backend is useful once API boundaries, persistence semantics, and integration flows are clearer, but it adds infrastructure before the product workflow is validated. |
| C | Use local JSON data | Selected. Local JSON is deterministic, domain-specific, easy to review in Git, and keeps iteration speed high while dashboard behavior is still evolving. |

**Why:**

- The requested milestone is a dashboard view, not persistence or backend integration.
- Local JSON keeps the app deterministic, fast to run, and reviewable without network dependencies.
- A small typed adapter keeps priority and status aligned with the TypeScript domain model.
- Future steps can replace the fixture data with a repository/service layer while keeping UI components stable.

**Tradeoffs:**

- Local JSON does not provide cross-device persistence or multi-user collaboration.
- Created tasks currently live in browser memory only; backend persistence should be added when API requirements are defined.

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

## ADR 007: Keep task details contextual to the dashboard

**Decision:** Display selected task details in a persistent side panel instead of navigating away from the dashboard.

**Why:**

- Operators can inspect a task without losing search/filter context.
- The task table remains focused on scanning while the details panel owns richer customer and description content.
- Selection is handled through accessible buttons so keyboard and screen-reader users can open details predictably.

## ADR 008: Create tasks locally until persistence is defined

**Decision:** Add task creation with local React state and the requested minimum fields: title, description, priority, due date, and assignee.

**Why:**

- The project does not have a backend/API contract yet, so local creation validates the product workflow without inventing persistence details.
- New tasks default to `Open`, which matches a natural intake workflow.
- Customer data is intentionally marked as unassigned for created tasks because customer selection is not part of this milestone.

## ADR 009: Track product thinking as a first-class project artifact

**Decision:** Maintain non-functional expectations, personas, assumptions, state handling, and workflow tradeoffs in `docs/product-thinking.md`.

**Why:**

- The dashboard is intended to evolve step by step, so product assumptions must be visible and revisited as requirements grow.
- Non-functional expectations such as accessibility, empty states, error handling, and onboarding directly affect usability for hundreds of customers.
- Keeping product reasoning in version control makes future implementation decisions easier to review and challenge.

## ADR 010: Treat form recovery and microinteractions as product requirements

**Decision:** Improve the create-task workflow with inline validation, helper text, success/error feedback, draft clearing confirmation, and documented UX interaction principles.

**Why:**

- Task intake quality affects every downstream workflow, so validation should guide users instead of only rejecting bad input.
- Confirmation is reserved for possible data loss, such as clearing an unsaved draft, to avoid unnecessary friction.
- Documenting interaction design in `docs/ux-interaction-design.md` keeps UX decisions explicit for future iterations.
