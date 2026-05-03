#!/usr/bin/env bash
# scripts/setup-labels.sh
# Run once after repo creation. Requires `gh` CLI authenticated.
# Idempotent: re-running updates label colours/descriptions.
set -euo pipefail

REPO="onufole87/lina2"

create_label() {
  local name="$1" color="$2" description="$3"
  gh label create "$name" --color "$color" --description "$description" --repo "$REPO" --force >/dev/null
  echo "  $name"
}

echo "Creating labels for $REPO..."

echo "Type labels:"
create_label "type/epic"        "5319E7" "A large piece of work spanning multiple stories"
create_label "type/story"       "0E8A16" "A user-facing capability"
create_label "type/arch-task"   "1D76DB" "Technical design for a story"
create_label "type/eng-subtask" "C5DEF5" "A single implementation unit"
create_label "type/bug"         "B60205" "A defect in existing functionality"
create_label "type/spike"       "FBCA04" "Time-boxed investigation"

echo "Role labels:"
create_label "role/owner"     "0052CC" "Awaiting Owner decision"
create_label "role/ba"        "5319E7" "BA agent is working"
create_label "role/architect" "1D76DB" "Architect agent is working"
create_label "role/engineer"  "0E8A16" "Engineer is working"
create_label "role/qa"        "FBCA04" "QA agent is working"

echo "Workflow signal labels (drive automation in Phase 5):"
create_label "needs/refinement"     "FEF2C0" "BA: please refine"
create_label "needs/design"         "FEF2C0" "Architect: please design"
create_label "needs/implementation" "FEF2C0" "Engineer: please implement"
create_label "needs/review"         "FEF2C0" "Owner: please review"
create_label "needs/qa"             "FEF2C0" "QA: please verify"
create_label "blocked"              "B60205" "Blocked by external factor or decision"

echo "Priority labels:"
create_label "priority/p0" "B60205" "Drop everything"
create_label "priority/p1" "D93F0B" "Must be in next batch"
create_label "priority/p2" "FBCA04" "Should be done soon"
create_label "priority/p3" "C2E0C6" "Nice to have"

echo "Special labels:"
create_label "agent/automated"  "BFD4F2" "Created or modified by an agent"
create_label "good-first-task"  "7057FF" "Suitable for engineer agent to pick up autonomously"

echo "Done. Labels created/updated for $REPO."
