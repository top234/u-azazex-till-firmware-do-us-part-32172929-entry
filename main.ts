// "Till Firmware Do Us Part" — v1 entry
// Writes ONE robot wedding vow (a single sentence) to <OUTPUT_DIR>/entry.txt.
// Node stdlib only. Never deletes the output directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

// The vow: first-person robot, machine voice (update / charge / battery /
// circuits), tenderness under the joke, one sentence, no cuttable words.
const VOW =
  "I vow to spend every update, every charge, and every last percent of my battery loving you, until my circuits go quiet beside you.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, VOW, "utf8");

// Verify by reading back: UTF-8, 1-200 chars, exactly one sentence.
function verifyEntry(text: string, expected: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry length ${text.length} out of range 1-200`);
  }
  if (text !== expected || (text.match(/\./g) ?? []).length !== 1) {
    throw new Error("entry is not exactly one sentence");
  }
}

const back = readFileSync(outPath, "utf8");
verifyEntry(back, VOW);
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${outPath}`);
console.log(`chars: ${back.length}`);
console.log(`sha256: ${sha}`);
