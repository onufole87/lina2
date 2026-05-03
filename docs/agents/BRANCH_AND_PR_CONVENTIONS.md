# Branch and PR Conventions

This document defines the rules the Engineer must follow when implementing an Eng Subtask: branch naming, commit messages, PR structure, and merge process. Other agents (Architect, QA) and the Owner should also know these conventions to verify Engineer output.

---

## Branch Naming

All work happens on feature branches off `main`. Branches follow this format:

```
<type>/<issue-number>-<short-slug>
```

Where:

- `<type>` matches the issue type:
  - `feature/` — for `type/eng-subtask` items implementing a new capability
  - `fix/` — for `type/bug` items
  - `chore/` — for non-code changes (config, tooling, docs)
  - `refactor/` — for code restructuring with no behaviour change
- `<issue-number>` is the GitHub issue number (without `#`)
- `<short-slug>` is 2–5 kebab-case words summarising the work

### Examples

```
feature/42-sector-filter
fix/57-null-pointer-on-empty-watchlist
chore/12-add-prettier-config
refactor/89-extract-score-calculator
```

### Rules

- Branches are short-lived: opened, merged, deleted, all within hours or days
- Never reuse a branch name after merge
- Never branch off another feature branch (always off `main`)
- Branches are deleted automatically after merge (configured in repo settings)

---

## Commit Messages

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org). Format:

```
<type>: <description>

<optional body>

<optional footer>
```

### Allowed types

| Type | Use for |
|---|---|
| `feat` | New user-facing functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no code change) |
| `refactor` | Code restructure with no behaviour change |
| `test` | Adding or modifying tests |
| `chore` | Tooling, config, dependencies |
| `perf` | Performance improvement |

### Rules

- Description: imperative mood ("add", not "added"), lowercase, no trailing period
- Description: under 72 characters
- Body: optional; explain *why*, not *what* (the diff shows what)
- Footer: include `Closes #N` to auto-close the linked issue when the PR merges

### Examples

```
feat: add sector filter to watchlist

Implements the dropdown defined in #42. Filters re-render the
visible rows without refetching from the API.

Closes #42
```

```
fix: handle empty array in score calculator

The reduce() call threw when the input array was empty. Default
to a neutral score of 0.5 in that case, matching the spec.

Closes #57
```

```
chore: pin Node version in CI to 20.18
```

---

## Pull Requests

### One Eng Subtask = one PR

Engineers do not bundle multiple subtasks into one PR. If an implementation grows beyond its subtask, raise this in a comment on the parent Arch Task and ask the Architect to split.

### PR title

Mirrors the commit message subject: `<type>: <description>`.

When squash-merged (the only allowed merge style on this repo), the PR title becomes the commit on `main`, so it must follow Conventional Commits.

### PR description

Follows `.github/PULL_REQUEST_TEMPLATE.md`. Required sections:

- **Linked Issue** — `Closes #N` (this auto-closes the issue and links it in the project)
- **Summary** — one paragraph
- **Changes** — bullet list of significant changes
- **Acceptance Criteria** — copy from the linked Eng Subtask, check items as completed
- **Test Coverage** — what tests were added or modified
- **Screenshots / Demo** — for UI changes
- **Risks and Rollback** — what could go wrong, how to revert
- **Checklist** — the standard checklist from the template

### Linking the issue

The PR description must contain `Closes #N` or `Fixes #N` referencing the Eng Subtask issue. This:

1. Auto-closes the issue when the PR merges
2. Links the PR and issue in GitHub's UI
3. Drives the Project automation that moves both to `Done`

---

## Review and Merge Process

1. Engineer opens PR. The PR auto-receives:
   - CODEOWNERS review request (the Owner)
   - Project Status `In Review` (Phase 4 sync workflow)
2. Engineer applies labels: `role/qa`, `needs/qa`, removes `needs/implementation`
3. QA agent picks up `needs/qa` items, reviews diff, verifies acceptance criteria, posts findings
4. If QA requests changes, Engineer addresses them
5. When QA approves, QA applies `role/owner`, `needs/review`, removes `needs/qa`
6. Owner reviews and merges (squash) — Project Status auto-moves to `Done`, branch auto-deletes
7. Linked issue auto-closes

### Self-merge by Owner

Required approvals on the ruleset is 0, so the Owner can self-approve and merge. This is intentional for solo work. The CODEOWNERS rule still triggers a review request for visibility.

---

## What Engineer must verify before opening a PR

- Branch name follows the format above
- All commits follow Conventional Commits
- Code passes whatever tests exist locally (Phase 3 will add CI to enforce this)
- PR description is complete per the template
- `Closes #N` references the correct Eng Subtask
- No secrets, keys, or credentials in the diff
- No unrelated files (e.g. local IDE settings, OS metadata)
