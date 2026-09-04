# 18-THEME TYPOGRAPHY & TYPE SCALING DESIGN SYSTEM

Use this typography system together with the corresponding 18-theme visual branding and color system.

The typography system must communicate the personality of the selected brand while maintaining excellent readability, responsive scaling, accessibility, and visual hierarchy.

---

# GLOBAL TYPOGRAPHY RULES

## Font Architecture

Every theme uses two primary font families:

* `--font-display` — headings, hero statements, large numbers, section titles
* `--font-body` — paragraphs, navigation, forms, buttons, labels, UI content

Optional:

* `--font-mono` — code, technical data, security logs, financial figures, metadata

Never use more than 3 font families in one interface.

---

# RESPONSIVE TYPE SCALE

Use fluid typography with `clamp()` wherever possible.

```css
:root {
  --text-xs: clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);
  --text-sm: clamp(0.8125rem, 0.78rem + 0.12vw, 0.875rem);
  --text-base: clamp(0.9375rem, 0.9rem + 0.15vw, 1rem);
  --text-lg: clamp(1.0625rem, 1rem + 0.25vw, 1.125rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 0.8vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.2vw, 2.75rem);
  --text-4xl: clamp(2.25rem, 1.7rem + 1.8vw, 3.5rem);
  --text-5xl: clamp(2.75rem, 2rem + 2.5vw, 4.5rem);
  --text-6xl: clamp(3.25rem, 2.2rem + 3.5vw, 6rem);
}
```

---

# SEMANTIC TYPE TOKENS

```css
:root {
  --heading-weight: 700;
  --body-weight: 400;
  --body-medium-weight: 500;

  --heading-tracking: -0.02em;
  --body-tracking: 0em;

  --heading-leading: 1.1;
  --body-leading: 1.6;

  --display-max-width: 18ch;
  --paragraph-max-width: 68ch;
}
```

---

# TYPOGRAPHY HIERARCHY

## Display / Hero

```css
.text-display {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--heading-weight);
  line-height: var(--heading-leading);
  letter-spacing: var(--heading-tracking);
}
```

## H1

```css
h1 {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--heading-weight);
  line-height: 1.08;
  letter-spacing: var(--heading-tracking);
}
```

## H2

```css
h2 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 650;
  line-height: 1.12;
  letter-spacing: -0.02em;
}
```

## H3

```css
h3 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
}
```

## H4

```css
h4 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.25;
}
```

## Body

```css
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--body-weight);
  line-height: var(--body-leading);
  letter-spacing: var(--body-tracking);
}
```

## Small Text

```css
.text-small {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: 1.45;
}
```

## Eyebrow / Overline

```css
.text-eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.2;
  text-transform: uppercase;
}
```

---

# 01 — ORGANIC WELLNESS

## Personality

Premium, grounded, sustainable, natural and sophisticated.

### Fonts

Display:

```css
--font-display: "Fraunces", serif;
```

Alternative:

```css
--font-display: "Cabinet Grotesk", sans-serif;
```

Body:

```css
--font-body: "Plus Jakarta Sans", sans-serif;
```

Alternative:

```css
--font-body: "Inter", sans-serif;
```

### Type Settings

```css
--heading-weight: 700;
--heading-tracking: -0.02em;
--heading-leading: 1.1;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.6;
```

Use elegant serif headlines combined with clean modern body text.

---

# 02 — VIBRANT SUPERFOOD

## Personality

Energetic, youthful, playful and high-impact.

### Fonts

Display:

```css
--font-display: "Clash Display", sans-serif;
```

Alternative:

```css
--font-display: "Syne", sans-serif;
```

Body:

```css
--font-body: "DM Sans", sans-serif;
```

Alternative:

```css
--font-body: "Satoshi", sans-serif;
```

### Type Settings

```css
--heading-weight: 700;
--heading-tracking: -0.01em;
--heading-leading: 1.15;

--body-weight: 400;
--body-tracking: 0em;
--body-leading: 1.5;
```

Use oversized expressive headlines and compact supporting copy.

---

# 03 — MINIMALIST CLEAN-EATS

## Personality

Precise, modern, clinical and intelligent.

### Fonts

Display:

```css
--font-display: "Space Grotesk", sans-serif;
```

Alternative:

```css
--font-display: "Albert Sans", sans-serif;
```

Body:

```css
--font-body: "IBM Plex Sans", sans-serif;
```

### Type Settings

```css
--heading-weight: 500;
--heading-tracking: -0.03em;
--heading-leading: 1.2;

--body-weight: 400;
--body-tracking: 0.02em;
--body-leading: 1.55;
```

Use structured typography with strong alignment and minimal decoration.

---

# 04 — SOVEREIGN VAULT

## Personality

Elite, institutional, secure and authoritative.

### Fonts

Display:

```css
--font-display: "Inter Tight", sans-serif;
```

Alternative:

```css
--font-display: "PP Neue Montreal", sans-serif;
```

Body:

```css
--font-body: "Inter", sans-serif;
```

Technical:

```css
--font-mono: "IBM Plex Mono", monospace;
```

### Type Settings

```css
--heading-weight: 700;
--heading-tracking: -0.04em;
--heading-leading: 1.05;

--body-weight: 400;
--body-tracking: -0.01em;
--body-leading: 1.5;
```

Use compact headlines and extremely clean data typography.

---

# 05 — NEXT-GEN SENTINEL

## Personality

Futuristic, technical, disruptive and fast.

### Fonts

Display:

```css
--font-display: "Space Mono", monospace;
```

Alternative:

```css
--font-display: "JetBrains Mono", monospace;
```

Body:

```css
--font-body: "Mona Sans", sans-serif;
```

Technical:

```css
--font-mono: "JetBrains Mono", monospace;
```

### Type Settings

```css
--heading-weight: 700;
--heading-tracking: 0em;
--heading-leading: 1.2;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.6;
```

Use monospace selectively for technical identity. Do not make every paragraph monospace.

---

# 06 — TRANSPARENT DECENTRALIZED

## Personality

Accessible, modern, trustworthy and community-oriented.

### Fonts

Display:

```css
--font-display: "General Sans", sans-serif;
```

Alternative:

```css
--font-display: "Urbanist", sans-serif;
```

Body:

```css
--font-body: "Inter", sans-serif;
```

Alternative:

```css
--font-body: "Switzer", sans-serif;
```

### Type Settings

```css
--heading-weight: 600;
--heading-tracking: -0.01em;
--heading-leading: 1.2;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.5;
```

Prioritize accessibility and easy scanning.

---

# 07 — SERENGETI RESERVE

## Personality

Heritage luxury, wilderness, exclusivity and refinement.

### Fonts

Display:

```css
--font-display: "Cormorant Garamond", serif;
```

Alternative:

```css
--font-display: "Playfair Display", serif;
```

Body:

```css
--font-body: "Lato", sans-serif;
```

### Type Settings

```css
--heading-weight: 500;
--heading-tracking: 0.02em;
--heading-leading: 1.2;

--body-weight: 400;
--body-tracking: 0.02em;
--body-leading: 1.65;
```

Use elegant serif headlines with generous spacing.

---

# 08 — NORDIC FJORDS

## Personality

Architectural, quiet, minimalist and sophisticated.

### Fonts

Display:

```css
--font-display: "Tenor Sans", sans-serif;
```

Alternative:

```css
--font-display: "Oswald", sans-serif;
```

Body:

```css
--font-body: "Source Sans 3", sans-serif;
```

Alternative:

```css
--font-body: "Nunito Sans", sans-serif;
```

### Type Settings

```css
--heading-weight: 400;
--heading-tracking: 0.15em;
--heading-leading: 1.3;

--body-weight: 400;
--body-tracking: 0.03em;
--body-leading: 1.6;
```

Use uppercase headings sparingly and emphasize architectural spacing.

---

# 09 — TROPICAL CANOPY

## Personality

Exotic, spiritual, luxurious and rejuvenating.

### Fonts

Display:

```css
--font-display: "Lora", serif;
```

Alternative:

```css
--font-display: "Cinzel", serif;
```

Body:

```css
--font-body: "Alegreya Sans", sans-serif;
```

Alternative:

```css
--font-body: "Open Sans", sans-serif;
```

### Type Settings

```css
--heading-weight: 500;
--heading-tracking: -0.01em;
--heading-leading: 1.25;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.6;
```

Combine editorial serif headlines with relaxed body typography.

---

# 10 — YOUNG INVENTOR

## Personality

Smart, energetic, educational and approachable.

### Fonts

Display:

```css
--font-display: "Outfit", sans-serif;
```

Alternative:

```css
--font-display: "Lexend Deca", sans-serif;
```

Body:

```css
--font-body: "Lexend", sans-serif;
```

### Type Settings

```css
--heading-weight: 700;
--heading-tracking: -0.01em;
--heading-leading: 1.1;

--body-weight: 400;
--body-tracking: 0.03em;
--body-leading: 1.55;
```

Prioritize readability for children and parents.

---

# 11 — CURIOSITY LAB

## Personality

Playful, imaginative, experimental and adventurous.

### Fonts

Display:

```css
--font-display: "Bungee", sans-serif;
```

Alternative:

```css
--font-display: "Fredoka", sans-serif;
```

Body:

```css
--font-body: "Quicksand", sans-serif;
```

### Type Settings

```css
--heading-weight: 700;
--heading-tracking: 0.02em;
--heading-leading: 1.0;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.5;
```

Use playful display typography for major headings only.

---

# 12 — ECO-MAKER SHOP

## Personality

Warm, sustainable, handmade and Montessori-inspired.

### Fonts

Display:

```css
--font-display: "Comfortaa", sans-serif;
```

Alternative:

```css
--font-display: "Sniglet", sans-serif;
```

Body:

```css
--font-body: "Nunito", sans-serif;
```

### Type Settings

```css
--heading-weight: 600;
--heading-tracking: -0.02em;
--heading-leading: 1.2;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.6;
```

Use rounded typography with generous spacing.

---

# 13 — DERMATOLOGY CLINIC

## Personality

Clinical, scientific, objective and premium.

### Fonts

Display:

```css
--font-display: "Helvetica Neue", "Arial", sans-serif;
```

Alternative:

```css
--font-display: "Arimo", sans-serif;
```

Body:

```css
--font-body: "Inter", sans-serif;
```

Alternative:

```css
--font-body: "Roboto", sans-serif;
```

### Type Settings

```css
--heading-weight: 400;
--heading-tracking: 0.05em;
--heading-leading: 1.3;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.5;
```

Typography should feel objective rather than decorative.

---

# 14 — BOTANICAL ALCHEMY

## Personality

High-fashion, botanical, luxurious and sophisticated.

### Fonts

Display:

```css
--font-display: "Italiana", serif;
```

Alternative:

```css
--font-display: "Bodoni Moda", serif;
```

Body:

```css
--font-body: "Montserrat", sans-serif;
```

### Type Settings

```css
--heading-weight: 400;
--heading-tracking: 0.08em;
--heading-leading: 1.2;

--body-weight: 300;
--body-tracking: 0.04em;
--body-leading: 1.6;
```

Use very generous whitespace and editorial product photography.

---

# 15 — MINIMALIST DERMAL CARE

## Personality

Avant-garde, ultra-luxury, architectural and restrained.

### Fonts

Display:

```css
--font-display: "DM Serif Display", serif;
```

Alternative:

```css
--font-display: "Cormorant Garamond", serif;
```

Body:

```css
--font-body: "Inter", sans-serif;
```

Alternative:

```css
--font-body: "Manrope", sans-serif;
```

### Type Settings

```css
--heading-weight: 400;
--heading-tracking: -0.015em;
--heading-leading: 1.15;

--body-weight: 400;
--body-tracking: 0.01em;
--body-leading: 1.6;
```

Use large editorial headlines with minimal UI decoration.

---

# 16 — INSTITUTIONAL ESG

## Personality

Professional, conservative, trustworthy and financially sophisticated.

### Fonts

Display:

```css
--font-display: "Inter Tight", sans-serif;
```

Alternative:

```css
--font-display: "Manrope", sans-serif;
```

Body:

```css
--font-body: "Inter", sans-serif;
```

Financial data:

```css
--font-mono: "IBM Plex Mono", monospace;
```

### Type Settings

```css
--heading-weight: 650;
--heading-tracking: -0.025em;
--heading-leading: 1.1;

--body-weight: 400;
--body-tracking: -0.005em;
--body-leading: 1.55;
```

Use tabular/monospace typography selectively for financial figures and metrics.

---

# 17 — UNIVERSAL TYPE SCALE FOR DASHBOARDS

For SaaS dashboards, ERP systems, admin panels and financial applications:

```css
--dashboard-xs: 0.6875rem;
--dashboard-sm: 0.75rem;
--dashboard-md: 0.8125rem;
--dashboard-base: 0.875rem;
--dashboard-lg: 1rem;
--dashboard-xl: 1.125rem;
--dashboard-2xl: 1.375rem;
--dashboard-3xl: 1.75rem;
```

Recommended dashboard hierarchy:

```text
Page title       → 28–32px / 650
Section heading  → 20–24px / 600
Card heading     → 15–18px / 600
Body             → 14–16px / 400
Table text       → 13–14px / 400
Labels           → 12–13px / 500
Metadata         → 11–12px / 500
```

---

# 18 — UNIVERSAL MARKETING LANDING PAGE SCALE

For premium landing pages:

```text
Hero eyebrow      → 12–14px
Hero headline     → 52–96px
Hero description  → 18–22px
Primary CTA       → 15–16px
Section eyebrow   → 12–14px
Section heading   → 40–64px
Section body      → 17–20px
Card heading      → 20–28px
Card description  → 14–17px
```

Use `clamp()` to make all major headings responsive.

---

# BUTTON TYPOGRAPHY

```css
.button {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.005em;
}
```

Small button:

```css
.button-sm {
  font-size: 0.8125rem;
}
```

Large CTA:

```css
.button-lg {
  font-size: 1rem;
  font-weight: 600;
}
```

---

# NAVIGATION TYPOGRAPHY

```css
.nav-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.005em;
}
```

Luxury brands may use:

```css
.nav-link {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

---

# FORM TYPOGRAPHY

```css
label {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.4;
}

input,
textarea,
select {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.5;
}
```

---

# DATA / METRIC TYPOGRAPHY

For financial, cybersecurity, analytics and SaaS interfaces:

```css
.metric-value {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.3rem + 1vw, 3rem);
  font-weight: 650;
  line-height: 1;
  letter-spacing: -0.035em;
}
```

Technical identifiers:

```css
.metric-code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
}
```

---

# TYPOGRAPHIC ACCESSIBILITY

The generated website must:

* Never use font sizes below 11px for meaningful information.
* Maintain readable line lengths.
* Keep body paragraphs around 45–75 characters per line where practical.
* Use sufficient contrast.
* Never rely exclusively on font weight to communicate status.
* Avoid excessive uppercase text.
* Avoid extremely tight letter spacing on body text.
* Avoid decorative fonts for long paragraphs.
* Respect browser text scaling.
* Respect `prefers-reduced-motion`.
* Ensure headings remain readable on mobile.

---

# FONT LOADING

Use optimized font loading.

Prefer:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Load only the required font weights.

Avoid loading every available font weight.

Recommended weights:

```text
400 — body
500 — medium/UI
600 — semibold
700 — headings
800 — hero emphasis where required
```

---

# TAILWIND CSS MAPPING

When implementing with Tailwind CSS, map the typography tokens into the theme.

Example:

```css
@theme {
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --text-display: clamp(3rem, 2.2rem + 3vw, 6rem);
  --text-h1: clamp(2.5rem, 2rem + 2vw, 4.5rem);
  --text-h2: clamp(2rem, 1.6rem + 1.5vw, 3.5rem);
  --text-h3: clamp(1.5rem, 1.2rem + 1vw, 2.5rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
}
```

---

# CSS IMPLEMENTATION PATTERN

Every theme should expose typography through semantic variables.

Example:

```css
:root {
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --heading-weight: 650;
  --body-weight: 400;

  --heading-tracking: -0.025em;
  --body-tracking: 0em;

  --heading-leading: 1.1;
  --body-leading: 1.6;
}
```

Components must consume these variables instead of hardcoding fonts.

---

# FINAL AI WEBSITE BUILDER INSTRUCTION

When generating a website:

1. Identify the selected brand theme.
2. Load the corresponding display and body fonts.
3. Apply the theme's exact typography settings.
4. Apply the matching color/design-token system.
5. Use the display font for hero headlines and major section headings.
6. Use the body font for paragraphs, navigation, buttons, forms and UI.
7. Use the mono font only where technically appropriate.
8. Apply the specified tracking and line height.
9. Use responsive `clamp()` typography.
10. Maintain consistent hierarchy across every page.
11. Do not randomly change fonts between sections.
12. Do not use decorative fonts for long-form content.
13. Keep typography accessible on mobile.
14. Maintain consistent font weights.
15. Ensure typography and colors communicate the same brand personality.
16. Never introduce a new font unless the existing theme fonts cannot satisfy the required use case.
17. Optimize font loading performance.
18. Keep heading line lengths visually controlled.
19. Use typography as a major part of the brand identity, not merely as text styling.
20. The finished website should feel like a professionally art-directed brand system rather than an AI-generated template.
