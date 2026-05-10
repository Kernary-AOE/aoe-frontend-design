/**
 * Persona + voice resolution.
 *
 * Translates `compileDSL` params (school, flavor, attitude, voice_tone)
 * into a materialized `PersonaConstraints` object the rest of the compile
 * pipeline can read. Pulls from `@P01/school-*`, `@P01/flavor-*`,
 * `@P01/attitude-*`, `@V01/tone-*` atoms.
 *
 * Extracted from compiler.ts 2026-04-17.
 */

import type { Atom } from "./data.ts";
import { getAtom, getAtomsByModule } from "./atom-helpers.ts";

export interface CompileDSLParams {
  task: string;
  persona_school?: string;
  persona_flavor?: string[];
  persona_attitude?: string;
  voice_tone?: string;
  features?: string[];
  hue?: number;
  chroma?: number;
}

export interface PersonaConstraints {
  school: string;
  description: string;
  font_display: string[];
  font_body: string[];
  font_display_google?: string[];
  font_body_google?: string[];
  font_exclude: string[];
  spacing: string;
  density: string;
  radius: number;
  border: string;
  fw_display: number;
  fw_body: number;
  color_strategy: string;
  color_chroma_accent: number;
  color_chroma_bg: number;
  bg_tone: string;
  motion: string;
  type_scale_ratio: number;
  space_base: number;
  letter_spacing_display: string;
  /**
   * Literal brand colors — populated only when the persona atom specifies
   * concrete hex/rgba values (workspace-tool schools like notion/stripe).
   * When present, renderTokens uses these instead of OKLCH generation.
   * Classical schools leave these undefined and get computed OKLCH tokens.
   */
  brand_bg?: string;
  brand_surface?: string;
  brand_ink?: string;
  brand_accent?: string;
  css_overrides: string;
  narrative_activation: string;
  narrative_tired_of: string[];
  narrative_closing: string;
  compatible_with: string[];
  incompatible_with: string[];
}

export interface VoiceProfile {
  tone: string;
  markers: string[];
  pattern: string;
}

export const DEFAULT_PERSONA: PersonaConstraints = {
  school: "default",
  description: "Thoughtful generalist — no specific school, but opinionated about craft.",
  font_display: ["Instrument Serif", "Söhne"],
  font_body: ["Söhne", "IBM Plex Sans"],
  font_display_google: ["Cormorant Garamond", "Playfair Display"],
  font_body_google: ["Outfit", "Sora"],
  font_exclude: [],
  spacing: "normal",
  density: "comfortable",
  radius: 4,
  border: "1px solid",
  fw_display: 600,
  fw_body: 400,
  color_strategy: "balanced",
  color_chroma_accent: 0.12,
  color_chroma_bg: 0.01,
  bg_tone: "light",
  motion: "subtle",
  type_scale_ratio: 1.2,
  space_base: 8,
  letter_spacing_display: "-0.01em",
  css_overrides: `:root { --radius: 4px; --fw-display: 600; --fw-body: 400; }`,
  narrative_activation:
    "You are a senior design director who cares deeply about craft.\nEvery decision must be intentional. Default to bold, not safe.",
  narrative_tired_of: ["generic SaaS", "Inter everywhere", "Tailwind defaults"],
  narrative_closing: "Don't hold back. Default to extraordinary, not correct.",
  compatible_with: [],
  incompatible_with: [],
};

/** Materialize a PersonaConstraints from params + atom pool. */
export function resolve(params: CompileDSLParams, atoms: Map<string, Atom>): PersonaConstraints {
  if (!params.persona_school) return { ...DEFAULT_PERSONA };

  // Try core @P01/school-* first; then workspace-tool @community/school-*
  // (notion / stripe / linear / toss / vercel).
  const personaAtom =
    getAtom(atoms, `@P01/school-${params.persona_school}`) ??
    getAtom(atoms, `@community/school-${params.persona_school}`);
  if (!personaAtom) return { ...DEFAULT_PERSONA, school: params.persona_school };

  const imp = ((personaAtom as unknown as { implies?: Record<string, unknown> }).implies || {}) as Record<string, unknown>;
  const nar = ((personaAtom as unknown as { narrative?: Record<string, unknown> }).narrative || {}) as Record<string, unknown>;
  const cssOverrides = (personaAtom as unknown as { css_overrides?: string }).css_overrides || "";
  const compatibleWith = ((personaAtom as unknown as { compatible_with?: string[] }).compatible_with || []);
  const incompatibleWith = ((personaAtom as unknown as { incompatible_with?: string[] }).incompatible_with || []);

  const c: PersonaConstraints = {
    school: params.persona_school,
    description: (personaAtom.description as string) || DEFAULT_PERSONA.description,
    font_display: (imp.font_display as string[]) || DEFAULT_PERSONA.font_display,
    font_body: (imp.font_body as string[]) || DEFAULT_PERSONA.font_body,
    font_display_google: imp.font_display_google as string[] | undefined,
    font_body_google: imp.font_body_google as string[] | undefined,
    font_exclude: (imp.font_exclude as string[]) || [],
    spacing: (imp.spacing as string) || DEFAULT_PERSONA.spacing,
    density: (imp.density as string) || DEFAULT_PERSONA.density,
    radius: typeof imp.radius === "number" ? imp.radius : DEFAULT_PERSONA.radius,
    border: (imp.border as string) || DEFAULT_PERSONA.border,
    fw_display: (imp.fw_display as number) || DEFAULT_PERSONA.fw_display,
    fw_body: (imp.fw_body as number) || DEFAULT_PERSONA.fw_body,
    color_strategy: (imp.color_strategy as string) || DEFAULT_PERSONA.color_strategy,
    color_chroma_accent: (imp.color_chroma_accent as number) ?? DEFAULT_PERSONA.color_chroma_accent,
    color_chroma_bg: (imp.color_chroma_bg as number) ?? DEFAULT_PERSONA.color_chroma_bg,
    bg_tone: (imp.bg_tone as string) || DEFAULT_PERSONA.bg_tone,
    motion: (imp.motion as string) || DEFAULT_PERSONA.motion,
    type_scale_ratio: (imp.type_scale_ratio as number) || DEFAULT_PERSONA.type_scale_ratio,
    // Accept both `space_base` (core schools) and `spacing_base` (workspace schools).
    space_base: (imp.space_base as number) || (imp.spacing_base as number) || DEFAULT_PERSONA.space_base,
    letter_spacing_display: (imp.letter_spacing_display as string) || DEFAULT_PERSONA.letter_spacing_display,
    // Workspace-tool schools carry literal brand hex/rgba values. Core schools
    // leave these undefined; renderTokens falls back to OKLCH generation then.
    brand_bg: typeof imp.color_bg === "string" ? (imp.color_bg as string) : undefined,
    brand_surface: typeof imp.color_surface === "string" ? (imp.color_surface as string) : undefined,
    brand_ink: typeof imp.color_ink === "string" ? (imp.color_ink as string) : undefined,
    brand_accent: typeof imp.color_accent === "string" ? (imp.color_accent as string) : undefined,
    css_overrides: cssOverrides,
    narrative_activation: (nar.activation as string) || DEFAULT_PERSONA.narrative_activation,
    narrative_tired_of: (nar.tired_of as string[]) || DEFAULT_PERSONA.narrative_tired_of,
    narrative_closing: (nar.closing as string) || DEFAULT_PERSONA.narrative_closing,
    compatible_with: compatibleWith,
    incompatible_with: incompatibleWith,
  };

  if (params.persona_flavor) {
    for (const f of params.persona_flavor) {
      const fa = getAtom(atoms, `@P01/flavor-${f}`);
      if (!fa) continue;
      const fi = ((fa as unknown as { implies?: Record<string, unknown> }).implies || {}) as Record<string, unknown>;
      if (fi.font_display) c.font_display = fi.font_display as string[];
      if (fi.font_body) c.font_body = fi.font_body as string[];
      if (fi.font_exclude) c.font_exclude.push(...(fi.font_exclude as string[]));
      if (fi.spacing) c.spacing = fi.spacing as string;
      if (fi.color_strategy) c.color_strategy = fi.color_strategy as string;
      if (fi.bg_tone) c.bg_tone = fi.bg_tone as string;
    }
  }

  if (params.persona_attitude) {
    const aa = getAtom(atoms, `@P01/attitude-${params.persona_attitude}`);
    if (aa) {
      const ai = ((aa as unknown as { implies?: Record<string, unknown> }).implies || {}) as Record<string, unknown>;
      if (ai.fw_display) c.fw_display = ai.fw_display as number;
      if (ai.motion) c.motion = ai.motion as string;
    }
  }

  return c;
}

/** Pick a voice tone: explicit param > school default > imperative fallback. */
export function resolveVoice(
  params: CompileDSLParams,
  persona: PersonaConstraints,
  atoms: Map<string, Atom>,
): VoiceProfile {
  if (params.voice_tone) {
    const va = getAtom(atoms, `@V01/tone-${params.voice_tone}`);
    if (va) {
      return {
        tone: params.voice_tone,
        markers: ((va as unknown as { markers?: string[] }).markers || []) as string[],
        pattern: ((va as unknown as { sentence_pattern?: string }).sentence_pattern || "") as string,
      };
    }
  }
  for (const va of getAtomsByModule(atoms, "V01").filter((a) => a.subtype === "tone")) {
    const defaultFor = (va as unknown as { default_for?: string[] }).default_for || [];
    if (defaultFor.includes(persona.school)) {
      return {
        tone: ((va as unknown as { value?: string }).value || "") as string,
        markers: ((va as unknown as { markers?: string[] }).markers || []) as string[],
        pattern: ((va as unknown as { sentence_pattern?: string }).sentence_pattern || "") as string,
      };
    }
  }
  return { tone: "imperative", markers: ["Use", "Set", "Never"], pattern: "verb-first, short declarative" };
}
