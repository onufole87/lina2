# Label Taxonomy

24 labels organised in five groups. Every issue and PR carries at least one `type/*` label and may carry one each from the other groups. Agents apply labels via the GitHub API or connector when they create or transition issues.

---

## Group 1: type/* (always exactly one per issue)

Identifies what kind of work item it is.

| Label | Applied when | Applied by |
|---|---|---|
| `type/epic` | A large piece of work that spans multiple stories | Owner or BA |
| `type/story` | A user-facing capability (the BA's primary output) | BA agent |
| `type/arch-task` | Technical design for a story | Architect agent |
| `type/eng-subtask` | A single implementation unit (one PR per subtask) | Architect agent |
| `type/bug` | A defect in existing functionality | Anyone |
| `type/spike` | Time-boxed investigation, no deliverable expected | BA or Architect |

---

## Group 2: role/* (exactly one per issue, indicates current holder)

Indicates which agent or human is currently responsible for moving the item forward. Updated on every handoff.

| Label | Meaning |
|---|---|
| `role/owner` | Human Owner needs to decide or approve |
| `role/ba` | BA agent is working or input is needed |
| `role/architect` | Architect agent is working |
| `role/engineer` | Engineer is implementing |
| `role/qa` | QA agent is verifying |

When transitioning an item between roles, the previous `role/*` label is removed and the new one applied.

---

## Group 3: needs/* (signals what action is required next)

Drives automation in Phase 5. Agents poll for items with their `needs/*` signal and act accordingly. Each issue should have at most one `needs/*` label; remove the previous one when transitioning.

| Label | Triggers | Replaced by |
|---|---|---|
| `needs/refinement` | BA agent picks up the item | `needs/design` after BA finishes |
| `needs/design` | Architect agent picks up the item | `needs/implementation` after Architect splits into Eng Subtasks |
| `needs/implementation` | Engineer picks up the subtask | (removed when PR opened) |
| `needs/review` | Owner reviews the PR or completed work | (removed when reviewed) |
| `needs/qa` | QA agent picks up the open PR | (removed when QA completes verification) |

`needs/refinement` is also applied to bugs awaiting initial triage.

---

## Group 4: priority/* (at most one per issue)

| Label | Meaning |
|---|---|
| `priority/p0` | Drop everything; production-impacting or release-blocking |
| `priority/p1` | Must be in the next batch of work |
| `priority/p2` | Should be done soon |
| `priority/p3` | Nice to have, no commitment |

Applied by the Owner when triaging from Backlog. Agents may suggest a priority but the Owner sets the final label.

---

## Group 5: special

| Label | Meaning |
|---|---|
| `blocked` | Work is blocked by an external factor or unresolved decision. Document the blocker in an issue comment. Co-applies with whatever `role/*` label held the item when it became blocked. |
| `agent/automated` | Issue or PR was created or substantially modified by an agent (vs. the Owner). Used for filtering and audit. |
| `good-first-task` | Suitable for the Engineer to pick up autonomously without needing additional Owner clarification. The Architect applies this when an Eng Subtask is sufficiently specified. |

---

## Label transitions in a typical Story flow

```
Owner creates Story (manually or via BA)  →  type/story, role/ba, needs/refinement
BA refines, hands to Owner for gate 1     →  type/story, role/owner, needs/review
Owner approves, hands to Architect        →  type/story, role/architect, needs/design
Architect creates Arch Task               →  type/arch-task, role/architect, needs/design
Architect splits into Eng Subtasks        →  type/eng-subtask, role/engineer, needs/implementation, good-first-task
Engineer opens PR (auto-links)            →  PR labelled type/eng-subtask, role/qa, needs/qa
QA reviews and approves                   →  PR labelled role/owner, needs/review
Owner merges                              →  (issue auto-closed)
```

---

## Conventions

- Do not create new labels without updating this taxonomy and `setup-labels.sh`.
- Do not apply a `role/*` label unless you also remove the previous `role/*` label.
- The `needs/*` and `role/*` labels are kept in sync with the GitHub Project's Status and Role fields by the sync workflow (Phase 4). Agents should update labels; the workflow updates the Project fields.
