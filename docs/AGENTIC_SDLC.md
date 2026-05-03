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
    │     [Owner reviews PR]
    ▼
QA (Claude Code: /qa <pr-number>)
    │
    │  5. reviews diff, verifies acceptance criteria,
    │     suggests/adds tests, posts findings
    │     [Owner approves at gate 3 and merges]
    ▼
Done
```

## Roles

### Owner (human)

You. Defines high-level goals, approves at three gates, resolves Open Questions raised by agents, has final say on prioritisation, merges PRs.

### PO Agent (Claude Project: "lina2 — PO")

A claude.ai Project with the PO system prompt and shared knowledge files. Produces a structured `requirements/<name>.md` file by chatting with the Owner. Does not write to GitHub directly.

### Architect (Claude Code, /architect command)

A Claude Code session invoked with `/architect requirements/<name>.md`. Reads the requirement, creates a Story issue per User Story, drafts an Arch Task with technical design and risks, splits into Eng Subtasks, applies labels. Has `gh` CLI access.

### Engineer (Claude Code, /engineer command)

A Claude Code session invoked with `/engineer <issue-number>` for an Eng Subtask. Creates a feature branch, implements per the subtask spec, commits, pushes, opens a PR. Has full repo write access.

### QA (Claude Code, /qa command)

A Claude Code session invoked with `/qa <pr-number>`. Reads the PR diff, verifies acceptance criteria from the linked Eng Subtask, runs tests, suggests or adds missing tests, posts findings as PR review comments.

## Owner Approval Gates

Three gates. Owner must explicitly approve before the next phase runs.

| Gate | When | What Owner reviews |
|---|---|---|
| Gate 1 | After PO drafts requirement | The `requirements/*.md` file before Architect runs on it |
| Gate 2 | After Architect creates issues | The Story + Arch Task + Eng Subtasks in GitHub before Engineer picks them up |
| Gate 3 | After QA reviews PR | The PR with QA findings before squash-merge |

## Issue Lifecycle (Project Status)

```
Backlog → Refining → Ready for Design → In Design → Ready for Dev →
In Dev → In Review → In QA → Done
```

`Blocked` is reachable from any state.

| Status | Set when | Set by |
|---|---|---|
| Backlog | Issue created | Auto (Project workflow) |
| Refining | PO is drafting in chat | (Pre-issue stage; tracked in chat, not on issue) |
| Ready for Design | Requirement doc merged, ready for Architect | Owner |
| In Design | `/architect` running | Architect (label transition) |
| Ready for Dev | Architect done, Eng Subtasks created | Architect |
| In Dev | `/engineer` running, branch open | Engineer (label transition) |
| In Review | PR opened, awaiting Owner / QA | Engineer |
| In QA | `/qa` running on the PR | QA |
| Done | PR merged | Auto (Project workflow on PR merge) |

## Branching, Commits, PRs

See `BRANCH_AND_PR_CONVENTIONS.md`.

- `main` is the only long-lived branch
- Feature branches: `feature/<issue-number>-<short-slug>`
- Conventional Commits
- Squash merge into `main`
- One Eng Subtask = one PR

## Definition of Done (per Story)

1. All linked Eng Subtask PRs merged
2. All acceptance criteria verified by QA
3. Tests passing (Phase 3 will add coverage gates)
4. Documentation updated where behaviour changed
5. Story issue auto-closed by the merging PR

## File Locations

| File | Purpose | Audience |
|---|---|---|
| `requirements/*.md` | Approved Requirement Documents | Architect input |
| `docs/AGENTIC_SDLC.md` | This file | All agents |
| `docs/agents/REQUIREMENTS_DOC_TEMPLATE.md` | Doc structure | PO |
| `docs/agents/ISSUE_TEMPLATES_REFERENCE.md` | Issue field reference | Architect, QA |
| `docs/agents/LABEL_TAXONOMY.md` | Labels | All agents |
| `docs/agents/BRANCH_AND_PR_CONVENTIONS.md` | Git/PR rules | Engineer |
| `CLAUDE.md` (repo root, future) | Claude Code project context | Claude Code |
| `.claude/commands/{architect,engineer,qa}.md` (future) | Slash command prompts | Claude Code |

## Communication Conventions

- Decisions made in chat that affect the project must be reflected in the corresponding file or issue.
- "Open Questions" sections are for the Owner; agents should not invent answers.
- When an agent is uncertain, it asks rather than guesses.
- When an agent disagrees with another agent's output, it raises the disagreement to the Owner.

## Tools

| Tool | Purpose |
|---|---|
| GitHub Issues + Project (`lina2_agentic`) | State, source of truth for status |
| Claude Project ("lina2 — PO") | PO chat-based drafting |
| Claude Code | Architect, Engineer, QA execution |
| `gh` CLI | All GitHub write operations |
| GitHub Actions | CI (Phase 3), automation (Phase 4), agent triggers (Phase 5) |
