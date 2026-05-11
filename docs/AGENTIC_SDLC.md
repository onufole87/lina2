# Agentic SDLC Workflow

Source of truth for how lina2 is built. Read by all agents (PO, Architect, Engineer, QA) and referenced by the Owner.

## Architecture Overview

```
Owner (human)
    │
    │  1. high-level ask in chat
    ▼
PO Agent (Claude Project: "lina2 — PO")
    │
    │  2. produces requirements/<name>.md, committed via PR
    ▼
Architect (Claude Code: /architect <file>)
    │
    │  3. creates GitHub issues: 1 Story per User Story
    │     1 Arch Task per Story with technical design
    │     N Eng Subtasks per Arch Task
    │     [Owner approves at gate 2]
    ▼
Engineer (Claude Code: /engineer <issue-number>)
    │
    │  4. branches, codes, commits, opens PR
    │     [CI runs frontend-ci on the PR]
    │     [Owner reviews PR]
    ▼
QA (Claude Code: /qa <pr-number>)
    │
    │  5. reads CI status, reviews diff, verifies acceptance
    │     criteria, suggests/adds tests, posts findings
    │     [Owner approves at gate 3 and merges]
    ▼
Done
    │
    │  6. Owner manually closes Arch Task and Story when all
    │     Eng Subtasks merged (automation in Phase 4)
    ▼
```

## Roles

### Owner (human)

Defines high-level goals, approves at three gates, resolves Open Questions, has final say on prioritisation, merges PRs, manually closes Arch Tasks and Stories (until Phase 4 automates this).

### PO Agent (Claude Project: "lina2 — PO")

Produces a structured `requirements/<name>.md` file by chatting with the Owner. Does not write to GitHub directly.

### Architect (Claude Code, /architect command)

Reads a Requirement, creates a Story issue per User Story, drafts an Arch Task with technical design and risks, splits into Eng Subtasks, applies labels. Uses `gh sub-issue add` for parent-child links.

### Engineer (Claude Code, /engineer command)

Creates a feature branch, implements per subtask spec, runs local CI-equivalent checks (lint, typecheck, test, build), pushes, opens a PR with `Closes #N`, applies labels to the PR.

### QA (Claude Code, /qa command)

Reads PR diff, checks CI status, verifies acceptance criteria, adds missing tests as new commits to the PR branch, posts a structured review. Does not approve or merge.

## Owner Approval Gates

| Gate | When | What Owner reviews |
|---|---|---|
| Gate 1 | After PO drafts requirement | The `requirements/*.md` file before Architect runs |
| Gate 2 | After Architect creates issues | The Story + Arch Task + Eng Subtasks before Engineer picks them up |
| Gate 3 | After QA reviews PR | The PR with QA findings before squash-merge |

## Continuous Integration

The `frontend-ci` GitHub Actions workflow (`.github/workflows/frontend-ci.yml`) runs on every PR targeting `main` when changes touch `frontend/**` or the workflow file itself. Steps:

1. Checkout
2. Set up Node 20 (from `.nvmrc`)
3. `npm ci`
4. `npm run lint`
5. `npx tsc --noEmit`
6. `npm test -- --run --coverage`
7. `npm run build`
8. Upload coverage as artifact

The `frontend-ci` check is a required status check on `main` (configured in the ruleset). PRs cannot merge until it passes.

Engineer runs the same four checks locally (lint, typecheck, test, build) before opening a PR. QA verifies CI has passed before proceeding with manual review.

## Issue Lifecycle (Project Status)

```
Backlog → Refining → Ready for Design → In Design → Ready for Dev →
In Dev → In Review → In QA → Done
```

`Blocked` is reachable from any state.

| Status | Set when | Set by |
|---|---|---|
| Backlog | Issue created | Auto (Project workflow) |
| Refining | PO drafting in chat | Pre-issue stage; tracked in chat |
| Ready for Design | Requirement doc merged | Owner |
| In Design | `/architect` running | Architect (label transition) |
| Ready for Dev | Architect done, subtasks exist | Architect |
| In Dev | `/engineer` running | Engineer (label transition) |
| In Review | PR opened, CI running/passed | Engineer |
| In QA | `/qa` running | QA |
| Done | PR merged | Auto (Project workflow on PR merge) |

## Branching, Commits, PRs

See `docs/agents/BRANCH_AND_PR_CONVENTIONS.md`.

- `main` is the only long-lived branch
- Feature branches: `feature/<issue-number>-<short-slug>`
- Conventional Commits
- Squash merge into `main`
- One Eng Subtask = one PR
- `frontend-ci` must pass before merge

## Definition of Done (per Story)

1. All linked Eng Subtask PRs merged
2. All acceptance criteria verified by QA
3. Tests passing in CI (coverage reported, no threshold enforced yet)
4. Documentation updated where behaviour changed
5. Eng Subtask issues auto-closed by their merging PRs
6. Arch Task closed manually by Owner with note that design is delivered (Phase 4 will automate)
7. Story closed manually by Owner with note that user-facing capability is delivered (Phase 4 will automate)

## Manual Closure Convention (until Phase 4)

GitHub auto-closes the Eng Subtask issue when its PR merges via `Closes #N`. It does NOT auto-close the parent Arch Task or grandparent Story. The Owner closes these manually:

```bash
# After the last Eng Subtask under an Arch Task is merged:
gh issue close <arch-task-number> --reason completed \
  --comment "Design fully implemented. Subtasks merged: <list>. Closing per workflow convention."

# When all Eng Subtasks under all Arch Tasks under a Story are merged:
gh issue close <story-number> --reason completed \
  --comment "Story complete. Acceptance criteria from requirements/<file>.md verified by QA. Definition of Done met."
```

Phase 4 will add a GitHub Action that watches for sub-issue closures and auto-closes parents when their last child closes.

## File Locations

| File | Purpose | Audience |
|---|---|---|
| `requirements/*.md` | Approved Requirement Documents | Architect input |
| `docs/AGENTIC_SDLC.md` | This file | All agents |
| `docs/agents/REQUIREMENTS_DOC_TEMPLATE.md` | Doc structure | PO |
| `docs/agents/ISSUE_TEMPLATES_REFERENCE.md` | Issue field reference | Architect, QA |
| `docs/agents/LABEL_TAXONOMY.md` | Labels | All agents |
| `docs/agents/BRANCH_AND_PR_CONVENTIONS.md` | Git/PR rules | Engineer |
| `CLAUDE.md` | Claude Code project context | Claude Code |
| `.claude/commands/{architect,engineer,qa}.md` | Slash command prompts | Claude Code |
| `.github/workflows/frontend-ci.yml` | CI workflow | GitHub Actions |

## Communication Conventions

- Decisions made in chat affecting the project must be reflected in the corresponding file or issue.
- "Open Questions" sections are for the Owner; agents should not invent answers.
- When an agent is uncertain, it asks rather than guesses.
- When an agent disagrees with another agent's output, it raises the disagreement to the Owner.

## Tools

| Tool | Purpose |
|---|---|
| GitHub Issues + Project (`lina2_agentic`) | State, source of truth for status |
| Claude Project ("lina2 — PO") | PO chat-based drafting |
| Claude Code (Code tab or CLI) | Architect, Engineer, QA execution |
| `gh` CLI + `gh sub-issue` extension | All GitHub write operations |
| GitHub Actions (`frontend-ci`) | CI on every PR |
| `lina2_agentic` Project automations | Label/status sync (Phase 4 will expand this) |
