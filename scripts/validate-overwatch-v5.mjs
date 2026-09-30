import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const checks = [
  ['Planner cannot implement', 'templates/commands/apm-1-initiate-planner.md', 'Do not edit product code, create implementation commits or PRs'],
  ['Planner transition is explicit', 'templates/commands/apm-1-initiate-planner.md', 'you are now the Manager'],
  ['Planner keeps discovery', 'templates/commands/apm-1-initiate-planner.md', 'research, read-only exploration, delegated discovery'],
  ['Spec owns product outcomes', 'templates/apm/spec.md', '## Product Outcomes'],
  ['Spec owns invariants', 'templates/apm/spec.md', '## Product Invariants and Non-Goals'],
  ['Plan records closure sources', 'templates/guides/work-breakdown.md', '*Closure sources:*'],
  ['Dispatch fixes closure checklist', 'templates/commands/apm-2-initiate-manager.md', 'Each dispatch fixes a short closure checklist'],
  ['Closure sources include later rulings', 'templates/guides/task-assignment.md', 'later quoted User rulings'],
  ['Closure changes require ruling', 'templates/guides/task-assignment.md', 'amendments require a quoted User ruling'],
  ['Planning edits cannot invent scope', 'templates/guides/task-review.md', 'Any change to those categories requires a quoted User ruling'],
  ['Conditional preflight permits setup', 'templates/guides/task-assignment.md', 'Setup or harness creation/repair may proceed'],
  ['Runtime claims require proof', 'templates/guides/task-assignment.md', 'do not claim runtime acceptance'],
  ['Rejected candidate unit', 'templates/guides/task-review.md', 'Count once per candidate, regardless of critic count or cause'],
  ['Third candidate stops task', 'templates/guides/task-review.md', 'block further correction work or dispatch for that Task'],
  ['Direct fixes cannot bypass stop', 'templates/guides/task-review.md', 'before continuity, direct fixes, or follow-up dispatch'],
  ['Scope amendment does not reset count', 'templates/guides/task-review.md', 'Scope amendments and new findings do not reset the count'],
  ['Unrelated work continues', 'templates/guides/task-review.md', 'Unrelated authorized Tasks may continue'],
  ['Relay attribution', 'templates/commands/apm-2-initiate-manager.md', '`composed-by` and `authorized-by`'],
  ['Authority ownership', 'templates/commands/apm-2-initiate-manager.md', '**Authority ownership:**'],
  ['Stale grants removed', 'templates/guides/work-breakdown.md', 'Remove entries incompatible with the approved session scope'],
  ['Continuity checks stop first', 'templates/guides/task-review.md', 'before continuity, direct fixes, or follow-up dispatch'],
  ['Autonomous Manager mode', 'templates/commands/apm-2-initiate-manager.md', 'Operating mode: autonomous within boundaries'],
  ['Manager exit conditions', 'templates/commands/apm-2-initiate-manager.md', '`BLOCKER`'],
  ['Manager stage-complete exit', 'templates/commands/apm-2-initiate-manager.md', '`STAGE_COMPLETE`'],
  ['Manager QA-gate exit', 'templates/commands/apm-2-initiate-manager.md', '`QA_GATE`'],
  ['Kickoff task listing', 'templates/commands/apm-2-initiate-manager.md', 'Immediately after the initiation reads and before first dispatch'],
  ['Continuous stage dispatch', 'templates/guides/task-assignment.md', 'Plan approval already authorizes continuation within the Stage'],
  ['Statistical honesty', 'templates/_standards/WORKFLOW.md', 'no prevalence rate is claimed'],
];

let failed = false;
for (const [label, relative, phrase] of checks) {
  if (!read(relative).includes(phrase)) {
    console.error(`FAIL ${label}: missing ${phrase} in ${relative}`);
    failed = true;
  } else {
    console.log(`PASS ${label}`);
  }
}

const runtimeFiles = [
  'templates/commands/apm-1-initiate-planner.md',
  'templates/commands/apm-2-initiate-manager.md',
  'templates/guides/work-breakdown.md',
  'templates/guides/task-assignment.md',
  'templates/guides/task-review.md',
  'templates/guides/task-execution.md',
  'templates/_standards/WORKFLOW.md',
];
for (const phrase of ['SAME_ROOT_HALT', 'SAME_INVARIANT_HALT', 'Correction Envelope', 'MITIGATION_ONLY', 'CLOSEABLE_HERE', 'Scope Echo', 'Remediation value gate']) {
  const leaked = runtimeFiles.filter((relative) => read(relative).includes(phrase));
  if (leaked.length) {
    console.error(`FAIL Removed machinery remains (${phrase}): ${leaked.join(', ')}`);
    failed = true;
  }
}
if (!failed) console.log('PASS Removed machinery: absent');

for (const relative of [
  'templates/guides/work-breakdown.md',
  'templates/guides/task-assignment.md',
  'templates/guides/task-review.md',
  'templates/guides/task-execution.md',
  'templates/commands/apm-1-initiate-planner.md',
  'templates/commands/apm-2-initiate-manager.md',
  'templates/apm/spec.md',
  'templates/apm/tracker.md',
  'templates/_standards/WORKFLOW.md',
]) {
  const source = read(relative);
  const begins = (source.match(/<!-- OVERWATCH BEGIN -->/g) || []).length;
  const ends = (source.match(/<!-- OVERWATCH END -->/g) || []).length;
  if (begins !== ends) {
    console.error(`FAIL Marker balance in ${relative}: ${begins}/${ends}`);
    failed = true;
  } else {
    console.log(`PASS Marker balance ${relative}: ${begins}/${ends}`);
  }
}

process.exit(failed ? 1 : 0);
