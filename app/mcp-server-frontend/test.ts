#!/usr/bin/env bun
/**
 * Test the 6-step compiler pipeline — verify persona differentiation
 */

import { loadAtoms, loadGraph, buildIndex } from "./data.ts";
import {
  compileAtoms,
  compileMandates,
  compileChecklist,
  compileDSL,
  compileTemplate,
} from "./compiler.ts";

const PRIME_ROOT = new URL("../primes/", import.meta.url).pathname;

console.log("Loading...");
const atoms = await loadAtoms(PRIME_ROOT);
const edges = await loadGraph(PRIME_ROOT);
const tagIndex = buildIndex(atoms);
console.log(`${atoms.size} atoms, ${edges.length} edges, ${tagIndex.size} tags\n`);

// ─── Test 1: BRUTALIST + Admin Dashboard ────────────────────
console.log("=" .repeat(60));
console.log("TEST 1: BRUTALIST + admin-dashboard (hue=0)");
console.log("=" .repeat(60));
const brutalist = compileDSL(
  {
    task: "admin-dashboard",
    persona_school: "brutalist",
    persona_attitude: "provocative",
    hue: 0,
  },
  atoms, tagIndex, edges,
);
console.log(brutalist);
console.log(`\n→ ${Math.ceil(brutalist.length / 4)} tokens\n`);

// ─── Test 2: EDITORIAL + Admin Dashboard ────────────────────
console.log("=" .repeat(60));
console.log("TEST 2: EDITORIAL + admin-dashboard (hue=35)");
console.log("=" .repeat(60));
const editorial = compileDSL(
  {
    task: "admin-dashboard",
    persona_school: "editorial",
    persona_flavor: ["warm"],
    hue: 35,
  },
  atoms, tagIndex, edges,
);
console.log(editorial);
console.log(`\n→ ${Math.ceil(editorial.length / 4)} tokens\n`);

// ─── Test 3: TOKYO-MINIMAL + Marketing Page ────────────────
console.log("=" .repeat(60));
console.log("TEST 3: TOKYO-MINIMAL + marketing-page (hue=210)");
console.log("=" .repeat(60));
const tokyo = compileDSL(
  {
    task: "marketing-page",
    persona_school: "tokyo-minimal",
    hue: 210,
  },
  atoms, tagIndex, edges,
);
console.log(tokyo);
console.log(`\n→ ${Math.ceil(tokyo.length / 4)} tokens\n`);

// ─── Test 4: DENSE-PRAGMATIST + Data Viz ────────────────────
console.log("=" .repeat(60));
console.log("TEST 4: DENSE-PRAGMATIST + data-viz (hue=160)");
console.log("=" .repeat(60));
const dense = compileDSL(
  {
    task: "data-viz",
    persona_school: "dense-pragmatist",
    hue: 160,
  },
  atoms, tagIndex, edges,
);
console.log(dense);
console.log(`\n→ ${Math.ceil(dense.length / 4)} tokens\n`);

// ─── Test 5: WARM-INSTITUTIONAL + Content Site ──────────────
console.log("=" .repeat(60));
console.log("TEST 5: WARM-INSTITUTIONAL + content-site (hue=25)");
console.log("=" .repeat(60));
const warm = compileDSL(
  {
    task: "content-site",
    persona_school: "warm-institutional",
    persona_flavor: ["organic"],
    hue: 25,
  },
  atoms, tagIndex, edges,
);
console.log(warm);
console.log(`\n→ ${Math.ceil(warm.length / 4)} tokens\n`);

// ─── Test 6: SWISS-MODERNIST + Design System ───────────────
console.log("=" .repeat(60));
console.log("TEST 6: SWISS-MODERNIST + design-system (hue=0)");
console.log("=" .repeat(60));
const swiss = compileDSL(
  {
    task: "design-system",
    persona_school: "swiss-modernist",
    hue: 0,
  },
  atoms, tagIndex, edges,
);
console.log(swiss);
console.log(`\n→ ${Math.ceil(swiss.length / 4)} tokens\n`);

// ─── Test 7: No persona (default) ──────────────────────────
console.log("=" .repeat(60));
console.log("TEST 7: NO PERSONA + admin-dashboard (default)");
console.log("=" .repeat(60));
const nopersona = compileDSL(
  { task: "admin-dashboard" },
  atoms, tagIndex, edges,
);
console.log(nopersona);
console.log(`\n→ ${Math.ceil(nopersona.length / 4)} tokens\n`);

// ─── DIFFERENTIATION CHECK ──────────────────────────────────
console.log("=" .repeat(60));
console.log("DIFFERENTIATION CHECK");
console.log("=" .repeat(60));

function extractValue(text: string, pattern: RegExp): string {
  const m = text.match(pattern);
  return m ? m[1].trim() : "(not found)";
}

const tests = [
  { name: "Brutalist", text: brutalist },
  { name: "Editorial", text: editorial },
  { name: "Tokyo-Min", text: tokyo },
  { name: "Dense-Prag", text: dense },
  { name: "Warm-Inst", text: warm },
  { name: "Swiss-Mod", text: swiss },
];

console.log("\n  Font Display:");
for (const t of tests) {
  console.log(`    ${t.name.padEnd(12)} → ${extractValue(t.text, /--font-d:\s*'([^']+)'/)}`);
}

console.log("\n  Font Body:");
for (const t of tests) {
  console.log(`    ${t.name.padEnd(12)} → ${extractValue(t.text, /--font-b:\s*'([^']+)'/)}`);
}

console.log("\n  Radius:");
for (const t of tests) {
  console.log(`    ${t.name.padEnd(12)} → ${extractValue(t.text, /--radius:\s*(\S+);/)}`);
}

console.log("\n  FW Display:");
for (const t of tests) {
  console.log(`    ${t.name.padEnd(12)} → ${extractValue(t.text, /--fw-d:\s*(\S+);/)}`);
}

console.log("\n  Background Lightness:");
for (const t of tests) {
  console.log(`    ${t.name.padEnd(12)} → ${extractValue(t.text, /--bg:\s*oklch\(([^)]+)\)/)}`);
}

console.log("\n  Token count:");
for (const t of tests) {
  console.log(`    ${t.name.padEnd(12)} → ${Math.ceil(t.text.length / 4)} tok`);
}

// ─── Legacy tests ───────────────────────────────────────────
console.log("\n" + "=" .repeat(60));
console.log("LEGACY: prime_mandate()");
console.log("=" .repeat(60));
const mandateText = compileMandates(atoms);
console.log(`  → ${Math.ceil(mandateText.length / 4)} tokens\n`);

console.log("=" .repeat(60));
console.log("LEGACY: prime_template(@T01/oklch-palette, HUE=65)");
console.log("=" .repeat(60));
const templateText = compileTemplate(
  { id: "@T01/oklch-palette", variables: { HUE: 65 } },
  atoms,
);
console.log(`  → ${Math.ceil(templateText.length / 4)} tokens\n`);
