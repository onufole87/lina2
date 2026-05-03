# Requirements Document Template

Every Requirement saved under `requirements/` follows this structure exactly. The PO produces it; the Architect reads it as the source of truth for design.

The template below shows all sections. Optional sections may be omitted only if marked optional. Required sections must always be present, even if the content is "None".

---

```markdown
# Requirement: <Concise Title>

## Metadata

- **Owner:** <github username, e.g. @onufole87>
- **Drafted by:** PO Agent
- **Drafted on:** <YYYY-MM-DD>
- **Priority:** <P0 | P1 | P2 | P3>
- **Status:** Draft (set to `Approved` after Owner gate 1)

## Context

<2–4 sentences. Why does this matter? What problem does it solve? What's the current state without this?>

## Goal

<One sentence describing the outcome users will get when this is shipped.>

## User Stories

This Requirement contains the following stories. The Architect will create one GitHub Story issue per story below.

### Story 1: <Title>

**As a** <persona>
**I want** <capability>
**So that** <benefit>

**Acceptance Criteria**

```
Scenario: <descriptive scenario name>
  Given <precondition>
  When <action>
  Then <expected outcome>
```

[Add additional Scenario blocks as needed. Each must be independently verifiable.]

**Out of Scope**
- <explicit non-goal>

**Open Questions for Architect**
- <technical decisions deferred to design, or "None">

---

### Story 2: <Title>

[Same structure. Repeat for each story.]

---

## Cross-Cutting Constraints (optional)

Concerns that apply across all stories above:

- **Accessibility:** <e.g. keyboard-navigable, WCAG AA contrast>
- **Performance:** <e.g. first paint < 1s on cable broadband>
- **Security:** <e.g. no PII in URLs, all forms CSRF-protected>
- **Browser support:** <e.g. last 2 versions of Chrome, Safari, Firefox>
- **Mobile:** <e.g. responsive, breakpoint at 768px>
- **Internationalisation:** <e.g. en-GB only for v1>

Omit this section entirely if no cross-cutting constraints apply.

## Dependencies

External factors this Requirement relies on:

- **Upstream Requirements:** <other Requirement docs that must be done first, or "None">
- **Stack Decisions Needed:** <e.g. "Frontend framework not yet chosen — Architect must decide before Eng Subtasks", or "None">
- **External Services:** <e.g. "Requires FRED API access", or "None">
- **Design Inputs:** <e.g. "Wireframes from Figma file XYZ", or "None">

## Open Questions for Owner

Things only the Owner can decide. Must be resolved before this Requirement moves out of Draft status.

- <question 1>
- <question 2>

If there are no open questions, write "None" and the Requirement may move to Approved on Owner sign-off.

## Out of Scope (Requirement-Level)

Features or behaviours explicitly NOT covered by this Requirement, beyond what's listed per-Story.

- <e.g. Password reset is out of scope; covered by separate Auth Requirement>

## Definition of Done (Requirement-Level)

This Requirement is considered Done when:

- [ ] All Stories above have Eng Subtasks merged via PRs
- [ ] All acceptance criteria verified by QA
- [ ] All Open Questions for Owner have been resolved
- [ ] Cross-Cutting Constraints have been verified
- [ ] User-facing documentation updated (if applicable)
```

---

## Conventions

- **Filename:** kebab-case derived from the title, in `requirements/<name>.md`. Examples: `requirements/landing-page.md`, `requirements/sector-filter-watchlist.md`.
- **Stories per Requirement:** prefer 1–5. If you find yourself with more, the Requirement is probably too broad and should be split.
- **Acceptance Criteria language:** Gherkin (`Given/When/Then`). Each scenario must be independently verifiable by a human or automated test.
- **No implementation details:** acceptance criteria describe behaviour ("the count badge shows the filtered total"), not implementation ("the React component re-renders on filter state change").
- **Versioning:** Requirements are immutable once approved. Changes go in a new Requirement Document. Bug fixes against existing functionality go through GitHub Issues with the `type/bug` template, not a new Requirement.
