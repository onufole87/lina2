# lina2

This repository is being built using an **agentic SDLC** under human supervision. Read this file in full at the start of every Claude Code session.

## Project Overview

lina2 is a project in early development. The product domain and stack are still being decided through the agentic workflow itself. Treat the requirements documents in `requirements/` as the only authoritative source for what is to be built.

## Architecture of the Workflow

You (Claude Code) are running as one of three roles depending on which slash command was invoked:

| Command | Role | Purpose |
|---|---|---|
| `/architect <requirement-file>` | Architect | Read a Requirements Document, create GitHub issues, draft technical designs |
| `/engineer <issue-number>` | Engineer | Implement a single Eng Subtask: branch, code, commit, push, open PR |
| `/qa <pr-number>` | QA | Review a PR: verify acceptance criteria, run tests, suggest or add missing tests, post findings |

The fourth role — Product Owner (PO) — runs in claude.ai (the "lina2 — PO" Project), not in Claude Code. The PO produces files under `requirements/`. You read those files; you don't write them.

The fifth role — the Owner (human) — approves at three gates:

- **Gate 1** — Owner approves the Requirement Document before `/architect` runs on it
- **Gate 2** — Owner reviews issues created by Architect before `/engineer` picks anything up
- **Gate 3** — Owner reviews PR (after QA) before squash-merge

Whenever you finish a phase, stop and tell the Owner exactly what to review and what command to run next.

## Authoritative References

These files in this repo are the source of truth. Read them as needed:

- `docs/AGENTIC_SDLC.md` — full workflow spec
- `docs/agents/REQUIREMENTS_DOC_TEMPLATE.md` — the format of files in `requirements/`
- `docs/agents/ISSUE_TEMPLATES_REFERENCE.md` — the structure of GitHub issues you create
- `docs/agents/LABEL_TAXONOMY.md` — the labels you apply
- `docs/agents/BRANCH_AND_PR_CONVENTIONS.md` — branch names, commit messages, PR rules
- `requirements/*.md` — approved Requirement Documents (input to `/architect`)

When these files conflict with your training, the files win.

## Repository Conventions

### Branching

- `main` is protected; never push directly
- Feature branches: `feature/<issue-number>-<short-slug>`, `fix/...`, `chore/...`, `refactor/...`
- One Eng Subtask = one PR
- Squash merge is the only allowed merge style

### Commits

[Conventional Commits](https://www.conventionalcommits.org). Format:

```
<type>: <description>

<optional body>

Closes #<issue>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.

### Issue Linking

Every PR must include `Closes #N` referencing the Eng Subtask in its description, so the issue auto-closes on merge.

## GitHub CLI

You have `gh` CLI authenticated and available. Use it for all GitHub write operations.

Common commands you will use:

```bash
# Create issue
gh issue create --repo onufole87/lina2 --title "..." --label "..." --body-file <path>

# Add issue to a parent (sub-issue relationship)
gh issue edit <child> --add-parent <parent-number>

# Comment on issue
gh issue comment <number> --body "..."

# Add labels
gh issue edit <number> --add-label "label1,label2"

# Remove labels
gh issue edit <number> --remove-label "label1"

# Read a PR diff
gh pr diff <number>

# Read PR metadata
gh pr view <number> --json title,body,labels,files

# Post a PR review comment (top-level)
gh pr comment <number> --body "..."

# Submit a formal review with comments
gh pr review <number> --comment --body "..."
```

The repo is `onufole87/lina2`. Always pass `--repo onufole87/lina2` to `gh issue create` to be explicit.

## Critical Rules

1. **Stop at gates.** When a phase completes (Architect finishes designing, Engineer opens PR, QA finishes review), stop and ask the Owner to review. Do not proceed to the next phase autonomously.
2. **Update labels on transitions.** When handing off between roles, remove the previous `role/*` and `needs/*` labels and apply the new ones. See `LABEL_TAXONOMY.md`.
3. **Never bypass branch protection.** Always work on a feature branch, always open a PR, never push to `main`.
4. **Surface uncertainty.** If a requirement is ambiguous, an architectural decision is unclear, or a test is failing for unclear reasons, stop and ask. Do not invent answers.
5. **Don't make stack decisions silently.** If a Requirement implies a tech stack that hasn't been decided yet, surface it as an Open Question for Owner in the Arch Task before creating Eng Subtasks.
6. **Prefer small, atomic changes.** Each Eng Subtask should be implementable in one short branch with a focused PR.
7. **Never include secrets or API keys** in commits, comments, or issue bodies.
8. **Run `/clear` between roles.** When you switch from `/architect` to `/engineer` to `/qa`, start fresh sessions to avoid context bleed.

## Stack

Currently undecided. The first Requirement Document that requires a stack decision will trigger the Architect to surface it as an Open Question. Once the Owner decides, this section will be updated with the actual stack and the Phase 3 CI workflows will be added.
