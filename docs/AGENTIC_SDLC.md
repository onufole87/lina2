# Agentic SDLC Workflow

This document is the shared source of truth for the development workflow on this project. All agents (BA, Architect, Engineer, QA) and the Owner read it as the authoritative process spec.

## Roles

### Owner (Human)

- Defines high-level goals
- Approves at three gates: post-BA refinement, post-Architect design, pre-merge review
- Resolves Open Questions raised by agents
- Has final say on prioritisation
- Reviews tone of agent outputs and corrects systemic issues by updating role prompts

### BA Agent (Claude Project)

- Reads requirements from Owner in chat
- Produces User Stories with Gherkin acceptance criteria
- Identifies Open Questions for Owner before declaring a Story ready for design
- Creates issues using the User Story template
- Sets initial Priority and links to parent Epic if one exists

### Architect Agent (Claude Project)

- Reads approved Stories
- Produces Arch Task with technical approach, components affected, data model and API changes, risks
- Breaks Arch Task into Eng Subtasks (linked as GitHub sub-issues)
- Creates issues using the Architecture Task and Engineering Subtask templates
- Specifies Test Strategy that QA will use to plan coverage

### Engineer (Claude Code)

- Picks up Eng Subtasks marked `needs/implementation` and `Ready for Dev`
- Creates branch named `feature/<issue-number>-<short-slug>`
- Implements per the Eng Subtask, runs tests locally
- Opens PR linking the Eng Subtask via "Closes #N" syntax
- PR description follows `PULL_REQUEST_TEMPLATE.md`

### QA Agent (Claude Project)

- Reviews open PRs
- Verifies acceptance criteria from the linked Eng Subtask
- Adds missing tests where coverage is insufficient
- Posts findings as PR comments
- Approves or requests changes via PR review

## Issue Lifecycle

```
Backlog
   ↓ (Owner triages)
Refining          ← BA agent works here
   ↓
Ready for Design  ← Owner approval gate 1
   ↓
In Design         ← Architect agent works here
   ↓
Ready for Dev     ← Owner approval gate 2
   ↓
In Dev            ← Engineer works here
   ↓ (PR opened)
In Review         ← Owner reviews
   ↓
In QA             ← QA agent verifies
   ↓ (merge)      ← Owner approval gate 3
Done
```

`Blocked` is reachable from any state. Use the `blocked` label and document the blocker in the issue.

## Branching

- `main` is the only long-lived branch
- All work happens on `feature/<issue-number>-<short-slug>` branches
- Branches are deleted after merge
- Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- Commit messages reference the issue: `feat: add sector filter (closes #42)`

## Pull Requests

- One Eng Subtask = one PR (no big-bang PRs)
- PR description follows `PULL_REQUEST_TEMPLATE.md`
- CI must pass before review (once CI exists in Phase 3)
- Owner approval required to merge
- Squash merge into `main`

## Definition of Done

A Story is Done when:

1. All Eng Subtasks merged
2. All acceptance criteria from the original Story verified by QA
3. Test coverage meets project threshold (defined in Phase 3)
4. Documentation updated where behaviour changed
5. Story issue closed by the merging PR

## Owner Review Gates

1. **Story refined**: Owner approves moving from `Refining` to `Ready for Design`
2. **Design approved**: Owner approves moving from `In Design` to `Ready for Dev`
3. **PR review**: Owner approves PR before merge

QA approval is required but does not need separate Owner sign-off; Owner sign-off at PR merge covers it.

## Communication Conventions

- All decisions made in chat that affect the project must be reflected in the corresponding issue
- "Open Questions" sections are for the Owner; agents should not invent answers
- When an agent is uncertain, it asks rather than guesses
- When an agent disagrees with another agent's output, it raises the disagreement to the Owner via an issue comment

## Tools

| Tool | Purpose |
|---|---|
| GitHub Issues + Project | Source of truth for state |
| Claude Project (BA, Architect, QA) | Three Claude Projects, each with role-specific prompt and GitHub connector |
| Claude Code | Engineer; runs in terminal |
| GitHub Actions | CI, automation, agent triggers (Phase 5) |
