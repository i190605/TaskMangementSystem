# User Experience and Interaction Design Notes

This document explains the UX decisions behind the task dashboard. The intent is to keep the product easy to operate for different personas while avoiding unnecessary visual complexity.

## Information architecture

The dashboard is organized in the order users naturally evaluate work:

1. **Overview:** The hero and summary cards establish where the user is and show high-level workload counts.
2. **Create work:** Task creation appears before search/filtering because intake is a primary workflow and should be easy to discover.
3. **Find and narrow:** Search and filters are grouped together because they jointly control the task queue.
4. **Act on work:** The queue and details panel are paired so users can scan, select, and understand tasks without navigation.

This hierarchy supports both quick scanning and deeper investigation.

## Interaction design principles

- **Immediate feedback:** Search/filter updates happen instantly; create-task success is announced inline.
- **Context preservation:** Selecting a task opens details beside the queue instead of navigating away.
- **Recoverability:** Empty states include clear recovery actions; create-task validation identifies exactly what needs attention.
- **Discoverability:** Labels, helper text, section headers, and descriptive button text explain what each control does.
- **Low-friction defaults:** New tasks default to `Medium` priority and `Open` status so users only change fields when needed.

## Form UX decisions

| Concern | Decision | Reasoning |
| --- | --- | --- |
| Validation | Required fields are validated inline on submit and errors clear as users edit. | Users get precise recovery guidance without being blocked before they try to submit. |
| Helpful messages | Each field has helper copy or an error message. | The form teaches the expected quality of task intake. |
| Input handling | Title length is capped, due dates cannot be in the past, and text inputs are trimmed before creation. | Prevents common data quality mistakes. |
| Submission feedback | A success message confirms the created task and the new task is selected automatically. | Users can immediately verify what they created. |
| Draft recovery | Clear draft asks for confirmation when unsaved input exists. | Prevents accidental loss without adding confirmation friction to every action. |

## Microinteractions

- Hover states on buttons and task-title links indicate interactivity.
- Focus-visible outlines support keyboard navigation.
- Selected rows are visually highlighted to connect the queue with the details panel.
- Inline success/error feedback uses `aria-live` for screen-reader announcements.
- Submit button supports a transient `Creating...` state so the action has a clear pressed/submitting affordance.

## Empty, loading, error, and success states

- **Empty:** The queue explains when no tasks match current search/filters and offers a clear reset action.
- **Loading:** Not currently shown because local JSON loads synchronously. Loading indicators should be added with async APIs.
- **Error:** Form-level and field-level errors help users recover from incomplete task creation.
- **Success:** Creation success is announced inline and reflected immediately in the queue/details panel.

## User onboarding

The current onboarding is lightweight:

- The hero describes the dashboard purpose.
- Section labels explain create, search, filter, queue, and details areas.
- Form helper text teaches what “good” task intake looks like.

Future onboarding could add first-run guidance, sample task templates, and contextual help for advanced filters when the product grows.
