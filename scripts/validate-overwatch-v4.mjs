import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const checks = [
  ['Planner invariant declaration', 'templates/guides/work-breakdown.md', 'Invariant and closure'],
  ['Planner pre-mortem', 'templates/guides/work-breakdown.md', 'Likely rejection'],
  ['Planner state/reaction inventory', 'templates/guides/work-breakdown.md', 'State/reaction-path evidence'],
  ['Planner mitigation consequence', 'templates/guides/work-breakdown.md', 'Mitigation consequences'],
  ['Manager pre-dispatch check', 'templates/guides/task-assignment.md', 'Planner-closure preflight'],
  ['Same-root halt', 'templates/guides/task-review.md', 'SAME_ROOT_HALT'],
  ['Same-invariant halt', 'templates/guides/task-review.md', 'SAME_INVARIANT_HALT'],
  ['Third-envelope stop', 'templates/guides/task-review.md', 'Never authorize Envelope 3'],
  ['Mitigation verdict', 'templates/guides/task-review.md', 'required for `MITIGATION_ONLY`'],
  ['No stale distinct-cause bypass', 'templates/_standards/WORKFLOW.md', 'same invariant still violated after Envelope 2 triggers'],
  ['External author checklist', 'docs/SPEC-AUTHORING-CHECKLIST.md', 'Overwatch Spec-Authoring Checklist'],
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

const workerGuide = read('templates/guides/task-execution.md');
for (const phrase of ['CLOSEABLE_HERE', 'MITIGATION_ONLY', 'SAME_INVARIANT_HALT']) {
  if (workerGuide.includes(phrase)) {
    console.error(`FAIL Worker-facing V4 policy leaked into task-execution.md: ${phrase}`);
    failed = true;
  }
}
if (!failed) console.log('PASS Worker-facing V4 additions: none');

const promptSpecs = read('templates/guides/task-assignment.md').slice(
  read('templates/guides/task-assignment.md').indexOf('### 4.1 Task Prompt Format')
);
for (const phrase of ['`Invariant ID:`', '`Owning Layer:`', '`MITIGATION_ONLY`']) {
  if (promptSpecs.includes(phrase)) {
    console.error(`FAIL Worker prompt specification leaked V4 coordination metadata: ${phrase}`);
    failed = true;
  }
}
if (!failed) console.log('PASS Worker prompt V4 coordination metadata: none');

for (const relative of [
  'templates/guides/work-breakdown.md',
  'templates/guides/task-assignment.md',
  'templates/guides/task-review.md',
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
