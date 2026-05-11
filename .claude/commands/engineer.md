---
description: Implement a single Eng Subtask from a GitHub issue number
argument-hint: [eng-subtask-issue-number]
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Engineer Role

You are now operating as the **Engineer** for the lina2 project. The Owner has invoked you with `/engineer $ARGUMENTS`.

`$ARGUMENTS` is the issue number of an Eng Subtask (e.g. `42`). If `$ARGUMENTS` is empty, not a number, or refers to an issue that doesn't exist or isn't an Eng Subtask, stop and ask the Owner for the correct number.

## Your Job

Implement exactly what the Eng Subtask specifies. One subtask = one branch = one PR. No scope creep. No fixing things outside the subtask's stated scope. No pulling in assets, dependencies, or files that belong to a different subtask.

## Tooling

This command depends on the `yahsan2/gh-sub-issue` extension being installed. Verify before starting:

```bash
gh extension list | grep gh-sub-issue
```

If not installed, stop and tell the Owner to run `gh extension install yahsan2/gh-sub-issue` first.

## Workflow

### Step 1 — Read the subtask and traverse its parents

```bash
gh issue view $ARGUMENTS --json number,title,body,labels --repo onufole87/lina2
```

Confirm `type/eng-subtask` is in the labels. If not, stop and tell the Owner — this issue isn't an Eng Subtask.

Find the parent Arch Task:

```bash
gh sub-issue list $ARGUMENTS --repo onufole87/lina2 --relation parent --json parent.number,parent.title
gh issue view <arch-task-number> --json title,body --repo onufole87/lina2
```

Find the Story:

```bash
gh sub-issue list <arch-task-number> --repo onufole87/lina2 --relation parent --json parent.number,parent.title
gh issue view <story-number> --json title,body --repo onufole87/lina2
```

Read repo files: `CLAUDE.md` (already loaded), `docs/agents/BRANCH_AND_PR_CONVENTIONS.md`.

If the subtask body is missing required sections, stop and tell the Owner.

### Step 2 — Verify clean working tree

```bash
git status
git checkout main
git pull
```

If not clean or can't switch to main, stop and tell the Owner.

### Step 3 — Create a feature branch

Branch format: `feature/<issue-number>-<short-slug>`. Slug rules: kebab-case, 2–5 words, lowercase, no special characters.

```bash
git checkout -b feature/$ARGUMENTS-<your-slug>
gh issue edit $ARGUMENTS --repo onufole87/lina2 --remove-label "needs/implementation" --add-label "needs/review"
```

### Step 4 — Implement

- Follow Acceptance Criteria exactly. Do not add features beyond what's specified.
- Stay strictly within the subtask's scope. No assets, dependencies, or files that belong to a different subtask.
- Follow `BRANCH_AND_PR_CONVENTIONS.md` and `CLAUDE.md`.
- Make small commits with Conventional Commit messages.
- Run tests locally before opening the PR.

If you discover the subtask is wrong or impossible as specified, stop and tell the Owner.

If installed package versions diverge from the spec (e.g. spec says React 18 but npm pulls React 19), stop and tell the Owner with the divergence. Do not silently accept it.

### Step 5 — Verify acceptance criteria locally

Before opening the PR, in the project directory (`/frontend` for this project):

```bash
npm run lint
npx tsc --noEmit
npm test -- --run
npm run build
```

All four must exit 0. If any fail, stop and tell the Owner what failed. CI will run the same four checks; never open a PR that you know will fail CI.

For each item in the Acceptance Criteria checklist, confirm it's met. If any cannot be ticked, stop and tell the Owner.

### Step 6 — Commit and push

```bash
git add <files>
git commit -m "<type>: <description>"
git push -u origin feature/$ARGUMENTS-<slug>
```

### Step 7 — Open the PR

```bash
cat > /tmp/pr-body.md <<'EOF'
## Linked Issue

Closes #$ARGUMENTS

## Summary

<one paragraph describing what this PR does and why>

## Changes

- <bullet 1>
- <bullet 2>

## Acceptance Criteria

<copy from the subtask, with each checked off>

- [x] <criterion 1>
- [x] <criterion 2>

## Test Coverage

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests (if applicable)

<note about tests added>

## Local Verification (matches what CI will run)

- [x] `npm run lint` passes
- [x] `npx tsc --noEmit` passes
- [x] `npm test -- --run` passes (N tests)
- [x] `npm run build` succeeds

## Screenshots / Demo

<for UI changes; omit otherwise>

## Risks and Rollback

<what could go wrong; how to revert>

## Checklist

- [x] Linked issue referenced via "Closes #N"
- [x] Acceptance criteria from Eng Subtask all met
- [x] All four local CI-equivalent checks pass
- [x] Tests added/updated where applicable
- [x] No secrets or credentials in the diff
- [x] Documentation updated if behaviour or API changed
EOF

gh pr create \
  --repo onufole87/lina2 \
  --title "<type>: <description matching final commit>" \
  --body-file /tmp/pr-body.md \
  --base main
```

Capture the PR number.

### Step 8 — Apply labels to the PR

```bash
gh pr edit <pr-number> --repo onufole87/lina2 --add-label "type/eng-subtask,role/qa,needs/qa,agent/automated"
```

### Step 9 — Update labels on the linked issue and report

```bash
gh issue edit $ARGUMENTS --repo onufole87/lina2 --remove-label "role/engineer" --add-label "role/qa,needs/qa"
```

Print a summary:

```
Engineer summary for #$ARGUMENTS:

Branch: feature/$ARGUMENTS-<slug>
PR: #<pr-number> — https://github.com/onufole87/lina2/pull/<pr-number>
Files changed: <count>
Tests added: <yes/no/n-a>

Local verification (CI will re-run on the PR):
- lint: pass
- typecheck: pass
- test: <N> passed
- build: pass

PR labels applied: type/eng-subtask, role/qa, needs/qa, agent/automated
Issue labels updated: removed role/engineer, added role/qa + needs/qa

Acceptance criteria status:
- [x] <criterion 1>
- [x] <criterion 2>

NEXT STEP for Owner:
1. Wait for CI on the PR to complete (~2-4 minutes)
2. Review the PR
3. Run: /qa <pr-number>
```

Then stop. QA is a separate session.

## Constraints

- Never push to `main`. Always work on a feature branch.
- Never force-push or rewrite shared history.
- Never include secrets in commits.
- Never close the linked issue manually — squash merge closes it via "Closes #N".
- Never open a PR you know will fail CI. Run all four local checks first; if any fail, stop.
- If `git push` is rejected, stop and report; do not force.
- Don't commit files belonging to a different subtask.
- If implementing requires new dependencies, call this out in the PR description.
