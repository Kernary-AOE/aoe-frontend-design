import { readFileSync } from "fs";

/** L1 — parse HTML, check semantic structure & a11y basics. Pure regex/string scan, no real parser. */
export function checkL1Structure(htmlPath: string): { pass: boolean; issues: string[] } {
  const html = readFileSync(htmlPath, "utf-8");
  const issues: string[] = [];

  // Required:
  if (!/<html[^>]*>/i.test(html)) issues.push("missing <html> tag");
  if (!/<title>/i.test(html)) issues.push("missing <title>");
  if (!/<meta[^>]*viewport/i.test(html)) issues.push("missing viewport meta");
  if (!/<meta[^>]*charset/i.test(html)) issues.push("missing charset meta");

  // Headings:
  if (!/<h1/i.test(html)) issues.push("missing h1");

  // a11y:
  // - Images should have alt
  const imgs = html.matchAll(/<img[^>]*>/gi);
  let imgCount = 0, altMissing = 0;
  for (const m of imgs) { imgCount++; if (!/alt\s*=/i.test(m[0])) altMissing++; }
  if (altMissing > 0) issues.push(`${altMissing}/${imgCount} <img> missing alt`);

  // - Buttons should have either text content or aria-label
  // (skip: hard to check without real parser)

  // - Form labels
  const inputs = html.matchAll(/<input[^>]*>/gi);
  for (const m of inputs) {
    if (!/aria-label\s*=/i.test(m[0]) && !/<label[^>]*for/i.test(html)) {
      issues.push("input may lack label/aria-label");
      break;
    }
  }

  return { pass: issues.length === 0, issues };
}
