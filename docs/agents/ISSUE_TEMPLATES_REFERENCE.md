# Issue Template Reference

This document describes the exact field structure of each issue template in this repo. Agents creating issues via the GitHub API or connector must fill the body in a format that mirrors the YAML form fields, so the resulting issue is parseable and consistent.

When creating issues programmatically (without the form UI), include each field as a markdown section with the field's heading as `### <Label>`, followed by the content. The default labels listed below are applied automatically when the form UI is used; when creating via API, the agent must apply them explicitly.

---

## 1. User Story (`01-user-story.yml`)

**Owner:** BA agent
**Title format:** `[Story] <concise summary>`
**Default labels:** `type/story`, `needs/refinement`, `role/ba`

### Required fields

- **User Story** — single sentence, format: "As a [persona], I want [capability], so that [benefit]."
- **Acceptance Criteria** — Gherkin scenarios. Each scenario must be independently verifiable. Format:
  ```
  Scenario: <name>
    Given <precondition>
    When <action>
    Then <expected outcome>
  ```

### Optional fields

- **Out of Scope** — bullet list of what this story is explicitly NOT responsible for.
- **Dependencies** — references to other issues, services, or decisions.
- **Open Questions for Owner** — questions BA flagged for the human to resolve before design starts.

### Example body (markdown form for API creation)

```markdown
### User Story
As an analyst, I want to filter the watchlist by sector, so that I can focus my review on one industry at a time.

### Acceptance Criteria
Scenario: Filter watchlist by single sector
  Given the watchlist contains tickers from multiple sectors
  When the user selects "Technology" from the sector filter
  Then only Technology tickers are shown
  And the count badge updates to reflect the filtered total

### Out of Scope
- Multi-sector filtering (separate story)
- Persisting the filter across sessions

### Dependencies
- None

### Open Questions for Owner
- Should sectors come from GICS or a custom taxonomy?
```

---

## 2. Architecture Task (`02-arch-task.yml`)

**Owner:** Architect agent
**Title format:** `[Arch] <concise summary>`
**Default labels:** `type/arch-task`, `needs/design`, `role/architect`

### Required fields

- **Parent Story** — issue number of the User Story this design serves (e.g. `#42`).
- **Technical Approach** — high-level design plus rationale: why this approach over alternatives considered.
- **Components Affected** — files, modules, services this change touches.
- **Risks and Trade-offs** — what could go wrong, what's deferred, what assumptions are made.
- **Sub-task Breakdown** — markdown checklist of Eng Subtasks to be created from this design.
- **Test Strategy** — what kinds of tests are expected; QA uses this to plan coverage.

### Optional fields

- **Data Model Changes** — new tables, columns, schema changes; whether migration is required.
- **API Contract Changes** — new endpoints, modified responses, breaking changes.

---

## 3. Engineering Subtask (`03-eng-subtask.yml`)

**Owner:** Architect creates; Engineer implements
**Title format:** `[Eng] <concise summary>`
**Default labels:** `type/eng-subtask`, `needs/implementation`, `role/engineer`

### Required fields

- **Parent Arch Task** — issue number of the Arch Task this implements.
- **What to Implement** — concrete, unambiguous description of what needs to be coded.
- **Acceptance Criteria** — markdown checklist; each item must be checkable by automated tests where possible.
- **Test Requirements** — specific tests that must pass; references the parent's Test Strategy.

### Optional fields

- **Files Expected to Change** — best-guess list of files to create or modify.
- **Implementation Notes** — hints, gotchas, or constraints from the Architect.

---

## 4. Bug (`04-bug.yml`)

**Owner:** Anyone (Owner, BA, QA most commonly)
**Title format:** `[Bug] <concise summary>`
**Default labels:** `type/bug`, `needs/refinement`

### Required fields

- **Summary** — one sentence describing the bug.
- **Steps to Reproduce** — numbered list.
- **Expected Behaviour**
- **Actual Behaviour**
- **Severity Assessment** — impact on users, blocking nature, data integrity concerns.

### Optional fields

- **Environment** — browser, OS, deployment (local/staging/prod), git SHA if known.

---

## Conventions for all templates

- Issue titles are prefixed with the type marker (`[Story]`, `[Arch]`, `[Eng]`, `[Bug]`) so the type is visible in lists even when labels collapse.
- When creating via API, set the default labels explicitly.
- Linked sub-issues (e.g. Eng Subtasks under an Arch Task) should use GitHub's native sub-issue feature, which auto-populates the Project's Parent issue field.
- Do not invent fields not defined in the template. If something doesn't fit, either expand an existing field or raise an Open Question to the Owner.
