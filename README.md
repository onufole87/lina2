# lina2

Project built using an agentic SDLC workflow under human oversight.

## Workflow Roles

| Role | Responsibility | Tool |
|---|---|---|
| Owner | Defines high-level requirements, approves at gates | Human (you) |
| BA | Splits requirements into Stories with acceptance criteria | Claude Project: BA |
| Architect | Designs technical approach, creates Eng Subtasks | Claude Project: Architect |
| Engineer | Implements code, opens PRs | Claude Code (terminal) |
| QA | Reviews PRs, verifies criteria, adds tests | Claude Project: QA |

## Issue Lifecycle

`Backlog → Refining → Ready for Design → In Design → Ready for Dev → In Dev → In Review → In QA → Done`

`Blocked` is reachable from any state.

## Branching

- `main` is the only long-lived branch
- Feature branches named `feature/<issue-number>-<short-slug>`
- Conventional Commits for commit messages
- Squash merges into `main`

## Repository Structure

To be defined once stack is chosen.

## Local Development

To be defined once stack is chosen.

## Full Workflow Specification

See [`docs/AGENTIC_SDLC.md`](docs/AGENTIC_SDLC.md).

