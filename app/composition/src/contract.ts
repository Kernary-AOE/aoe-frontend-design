import { parse } from "@prime-lang/parser";
import type { CompositionContract } from "./types.ts";
import { readFileSync } from "fs";

// ─── AST shape helpers (mirrors @prime-lang/types ObjectNode / ArrayNode) ────

interface ObjectNode {
  type: "Object";
  fields: FieldNode[];
}

interface ArrayNode {
  type: "Array";
  items: ValueNode[];
}

interface FieldNode {
  type: "Field";
  key: string;
  value: ValueNode;
}

interface StringNode {
  type: "String";
  value: string;
}

type ValueNode = ObjectNode | ArrayNode | StringNode | { type: string; [k: string]: any };

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Read a .prime source file, parse its AST, and extract the
 * `composition: { ... }` block into a typed CompositionContract.
 *
 * Returns null when:
 *  - the file cannot be parsed
 *  - the atom has no composition field
 *  - the composition field value is not an Object node
 */
export function extractContract(primePath: string): CompositionContract | null {
  const src = readFileSync(primePath, "utf-8");
  const { ast } = parse(src, primePath);

  if (!ast?.body) return null;

  // Both PrimeAST and AtomDeclaration carry a body: FieldNode[] array.
  const compositionField = (ast.body as FieldNode[]).find(
    (f) => f.key === "composition"
  );
  if (!compositionField) return null;

  const obj = compositionField.value;
  if (obj.type !== "Object") return null;
  const compObj = obj as ObjectNode;

  // Derive the canonical atom id from the parsed AST.
  // AtomDeclaration exposes { name, kind }.  PrimeAST exposes { name }.
  // We fall back to the file path if neither yields a useful id.
  const atomId = deriveAtomId(ast, primePath);

  return {
    source_atom: atomId,
    must_include:        extractStringArray(compObj, "must-include"),
    must_avoid:          extractStringArray(compObj, "must-avoid"),
    typography_required: extractStringRecord(compObj, "typography-required"),
    color_required:      extractStringRecord(compObj, "color-required"),
    motion_prescriptions: extractStringArray(compObj, "motion-prescriptions"),
    raw: compObj,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Derive a canonical `@scope/name` atom id from the parsed AST node.
 *
 * Strategy:
 *  1. If the body contains an `id:` field with a string value, use it verbatim
 *     (e.g. `id: "@community/persona-stripe"`).
 *  2. Otherwise attempt to derive it from the file path by matching the pattern
 *     `.../@<scope>/<name>.prime`.
 *  3. Fall back to the raw primePath string.
 */
function deriveAtomId(ast: any, primePath: string): string {
  // 1. Explicit id field
  if (Array.isArray(ast.body)) {
    const idField = ast.body.find((f: FieldNode) => f.key === "id");
    if (idField && idField.value?.type === "String") {
      return (idField.value as StringNode).value;
    }
  }

  // 2. Parse from file path: matches `@scope/atom-name.prime`
  const pathMatch = primePath.match(/@([^/]+)\/([^/]+)\.prime$/);
  if (pathMatch) {
    return `@${pathMatch[1]}/${pathMatch[2]}`;
  }

  // 3. Fall back to raw path
  return primePath;
}

/**
 * Extract a `string[]` from a named field inside an ObjectNode.
 *
 * The field value is expected to be an ArrayNode whose items are either:
 *  - StringNode  (type === "String", value is the atom id string)
 *  - IdentNode   (type === "Ident", value is a bare identifier)
 *  - EnumValueNode (type === "EnumValue", value is "@…" decorator text)
 *
 * Any item that doesn't yield a usable string is silently skipped.
 */
function extractStringArray(obj: ObjectNode, key: string): string[] {
  const field = obj.fields.find((f) => f.key === key);
  if (!field) return [];

  const val = field.value;
  if (val.type !== "Array") return [];

  const results: string[] = [];
  for (const item of (val as ArrayNode).items) {
    const str = valueToString(item);
    if (str !== null) results.push(str);
  }
  return results;
}

/**
 * Extract a `Record<string, string>` from a named field inside an ObjectNode.
 *
 * The field value is expected to be an ObjectNode where each entry has a
 * StringNode (or Ident/EnumValue) value.
 */
function extractStringRecord(
  obj: ObjectNode,
  key: string
): Record<string, string> {
  const field = obj.fields.find((f) => f.key === key);
  if (!field) return {};

  const val = field.value;
  if (val.type !== "Object") return {};

  const record: Record<string, string> = {};
  for (const entry of (val as ObjectNode).fields) {
    const str = valueToString(entry.value);
    if (str !== null) {
      record[entry.key] = str;
    }
  }
  return record;
}

/**
 * Coerce any scalar-like ValueNode to a string, or return null.
 *
 * Handles:
 *  - StringNode   → node.value (the parsed string content)
 *  - IdentNode    → node.value (bare identifier, e.g. `stripe`)
 *  - EnumValueNode → node.value (e.g. "@measurable")
 *  - NumberNode   → String(node.value)
 *  - BooleanNode  → String(node.value)
 *
 * Returns null for structural nodes (Object, Array, Arrow, Step…).
 */
function valueToString(node: ValueNode): string | null {
  switch (node.type) {
    case "String":
    case "Ident":
    case "EnumValue":
      return (node as any).value as string;
    case "Number":
      return String((node as any).value);
    case "Boolean":
      return String((node as any).value);
    default:
      return null;
  }
}
