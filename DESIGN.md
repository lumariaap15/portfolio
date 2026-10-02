---
name: Luisa Alzate — Portfolio
description: A personal typed letter from Luisa to the visitor, printed as a single-edition broadsheet — blackletter nameplate, news-serif headlines, typewriter body copy on warm newsprint.
colors:
  accent: "#9a3324"
  accent-soft: "#7a281c"
  accent-bg: "#f1e2dd"
  ink: "#221f1a"
  muted: "#6b6255"
  faint: "#6b6255"
  line: "#d5ccb8"
  paper: "#f3eee2"
  paper-soft: "#ebe4d3"
typography:
  nameplate:
    fontFamily: "UnifrakturMaguntia, Newsreader, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  display:
    fontFamily: "Newsreader, 'Iowan Old Style', Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Newsreader, 'Iowan Old Style', Georgia, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Newsreader, 'Iowan Old Style', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "-0.018em"
  body:
    fontFamily: "'Courier Prime', ui-monospace, SFMono-Regular, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "'Courier Prime', ui-monospace, SFMono-Regular, monospace"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Courier Prime', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "0.05em"
  caption:
    fontFamily: "'Courier Prime', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.375
rounded:
  print: "2px"
spacing:
  tag-x: "12px"
  field-x: "12px"
  button-x: "24px"
  gutter: "24px"
  gutter-wide: "32px"
  item: "32px"
  section-bottom: "96px"
  column: "48rem"
  sheet: "56rem"
  header-h: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.print}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.paper}"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.print}"
    padding: "12px 24px"
  button-submit-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.print}"
    padding: "8px 12px"
  tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.print}"
    padding: "4px 12px"
  masthead:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.nameplate}"
    height: "{spacing.header-h}"
---

# Design System: Luisa Alzate — Portfolio

## Overview

**Creative North Star: "The Typed Letter, Set as a Broadsheet"**

The page is one personal letter from Luisa to the visitor, typed on a manuscript typewriter and then printed as a single-edition newspaper. The letter supplies the voice: every paragraph, label, caption and control is set in Courier Prime, and there is one ribbon-red ink for the few things that ask to be acted on. The broadsheet supplies the structure, added at the user's request: a blackletter nameplate in the fixed masthead, a dateline band under it, news-serif headlines, a drop cap on each lead paragraph, heavy-over-hairline rules between sections, column rules between side-by-side facts, and grayscale halftone photographs with italic captions.

Everything sits on one continuous sheet of warm newsprint. The paper texture is fixed over the whole viewport and above every layer, so ink, photographs and chrome all read as printed on the same stock rather than as a texture placed behind content. Depth comes from print, never from lift: no shadows, no cards, no floating surfaces.

Density is that of a letter, not a front page: one text column (48rem) centered on the sheet, generous vertical rhythm, sections separated by a rule rather than by full-viewport emptiness. The broadsheet devices frame the letter; they never turn it into a multi-column news grid.

**Key Characteristics:**
- Warm newsprint ground with a fixed grain, fibre and mottle overlay above all content.
- Three faces with fixed jobs: blackletter for the nameplate only, news serif for headlines, typewriter for everything read.
- One accent ink (ribbon red) for calls to action, active states, service headlines and reading progress.
- Rules, not boxes: a double rule under the masthead, a heavy-over-hairline rule between sections, hairlines between list items and columns.
- Printed photographs: grayscale, multiplied into the paper, halftone-screened, ink-bordered, captioned in italic.
- Near-square corners (2px) on every control; no pills.

## Colors

A three-ink press run on warm stock: near-black ink, one muted ribbon red, and a small family of paper and rule tones.

### Primary
- **Ribbon Red** (accent): the typewriter-ribbon red. The booking button, the header contact link, the active language, the reading-progress line, form focus borders, the focus ring, text selection, and the large service headlines. It carries action and one class of headline; it never fills a surface larger than a button.
- **Pressed Ribbon** (accent-soft): the hover and pressed state of anything in Ribbon Red.
- **Ribbon Wash** (accent-bg): a pale red wash defined in the palette but not used by any shipped surface; reserve it for a tinted state before inventing a new tint.

### Neutral
- **Press Ink** (ink): headlines, the nameplate, body emphasis, photo frames, the masthead and section rules, the drop cap, and the dark submit button.
- **Faded Ink** (muted / faint): secondary text, running body copy in sections, captions, labels, the dateline, inactive index entries. `faint` is an alias of `muted` by design: there is exactly one secondary text voice.
- **Column Rule** (line): hairlines between list items, column rules, tag and field outlines, underline decoration on quiet links, the scrollbar thumb.
- **Newsprint** (paper): the sheet, the masthead background, field backgrounds, text on accent and ink buttons.
- **Soft Newsprint** (paper-soft): the backing tone inside the portrait frame, where the cut-out photograph leaves paper showing.

### Named Rules
**The One Ribbon Rule.** Ribbon Red is the only chromatic ink. Tech logos, photographs, icons and texture are all ink or grayscale; nothing else on the sheet carries hue.

**The One Secondary Voice Rule.** Secondary text has one color. Do not introduce a third, lighter text gray; `faint` exists only as a name for `muted`.

## Typography

**Nameplate Font:** UnifrakturMaguntia (with Newsreader, serif)
**Headline Font:** Newsreader (with Iowan Old Style, Georgia, serif), optical sizing on
**Body Font:** Courier Prime (with ui-monospace, SFMono-Regular, monospace), weights 400 and 700

**Character:** A broadsheet's apparatus around a typed letter. The blackletter and serif announce the paper; the typewriter is Luisa speaking. The contrast between a drawn news serif and a monospaced typed face is the whole identity.

### Hierarchy
- **Nameplate** (400, 1.5rem rising to 1.875rem, line-height 1): Luisa's name in the fixed masthead. Nowhere else.
- **Display** (800, 3rem / 3.75rem / 4.5rem across breakpoints, line-height 1.02, tracking -0.03em): the hero headline only, which types itself on arrival.
- **Headline** (700, 2.25rem rising to 3rem, line-height 1.05, tracking -0.018em, balanced wrap): section headings. Service headlines use the same face larger (2.25rem to 3.75rem, line-height 1.02) in Ribbon Red.
- **Title** (700, 1.25rem rising to 1.5rem): process steps, case-study titles, FAQ questions (1.125rem to 1.25rem), the contact heading (1.875rem to 2.25rem).
- **Body** (400, 1rem, line-height 1.625, max about 36rem): all running copy, in Faded Ink. The hero lead runs at 1.125rem.
- **Label** (400, 0.75rem, tracking 0.05em, uppercase): form labels and case-study fact labels (Problem / Approach / Outcome at 11px). The dateline band uses the same treatment at 11px to 12px with wider tracking (0.14em).
- **Caption** (400 italic, 0.75rem): under every photograph, in Faded Ink.
- **Drop Cap** (Newsreader 800, 3.6em, line-height 0.82, Press Ink): the first letter of a lead paragraph, floated three lines deep.

### Named Rules
**The Typed Body Rule.** Anything meant to be read as prose, labels, captions, buttons, navigation or form copy is Courier Prime. Newsreader is for headlines and drop caps only; it never sets a paragraph.

**The One Nameplate Rule.** Blackletter appears once: the masthead name. Never set a heading, number or ornament in it.

## Layout

A single centered text column on a full-width sheet. Section content sits at 48rem wide; the hero, dateline and masthead widen to 56rem so the portrait and headline can sit side by side (a 240px portrait column plus the headline column from the md breakpoint up, stacked below it). Side gutters are 24px, 32px from the sm breakpoint.

Each section clears the fixed masthead: top padding is the header height plus 4rem, bottom padding 96px. Short sections (the hero) hold a full viewport and center their content; long sections take their natural height. Items inside a section (services, steps, case studies, FAQ entries) stack at 32px vertical padding separated by a Column Rule hairline; the first item carries no rule.

Case-study facts sit in three columns from the sm breakpoint, divided by vertical column rules (24px left padding); below sm they stack with horizontal rules.

Services, with motion allowed and a viewport at least 600px tall, become a pinned reel: a sticky frame below the masthead, about four viewports of scroll, and the three services crossfading in place. The panel scales down to fit short viewports; if it would need to shrink below 82%, or motion is reduced, the section falls back to the ordinary stacked list.

Persistent chrome is two pieces: the fixed masthead (location left, nameplate center, contact link and language toggle right) and a quiet section index fixed bottom-left (the full list from sm up, only the current section's name below sm).

## Elevation & Depth

Flat, printed, no shadows anywhere. Depth is expressed as ink on paper: rules of different weights, ink borders around photographs, and the newsprint overlay that sits above everything. The overlay is two fixed, non-interactive layers at the top of the stack: one of fine grain, pulp specks and long horizontal fibres (55% opacity), one of broad uneven mottling with a warm edge tone toward the viewport corners (50% opacity). The masthead is separated from the sheet by a 3px ink rule band, not by a shadow; reading progress draws across it in Ribbon Red.

### Named Rules
**The Same Stock Rule.** The paper texture sits above content, not behind it. Any new surface, photo or control is printed on the same sheet; never lift one above the texture or give it its own background image.

**The No Lift Rule.** No box-shadows, no elevated cards, no blur. If something needs separation, rule it.

## Shapes

Corners are print-square: 2px on buttons, fields and tags, and on the focus ring. Nothing is a pill. Containers are not boxes: sections, list items and columns are defined by rules, not by borders on all four sides. The only fully bordered objects are photographs, each in a 1px Press Ink frame.

The section break is the signature form: every section after the first opens with a folio line (page number A2–A6, section name in bold, edition) over a 3px ink rule above a 1px ink rule, set to the text column's width (48rem or the viewport less 3rem). The footer opens with a 4px double ink rule. The portrait is a cut-out PNG in a 4:5 ink-bordered frame on Soft Newsprint, with the halftone screen masked to the figure's silhouette so the paper around it stays clean.

## Components

### Buttons
Plain printed blocks: a solid ink rectangle with typed text.
- **Shape:** print-square (2px).
- **Primary (booking):** Ribbon Red fill, Newsprint text, 12px by 24px, 0.875rem Courier. Used for "book a call" in the hero and the closing section.
- **Submit:** Press Ink fill, Newsprint text, same size; hovers to Ribbon Red. Disabled at 60% opacity.
- **Hover / Focus:** color transition only; focus shows the 2px Ribbon Red ring at a 3px offset.

### Links
- **Quiet link:** Faded Ink text with a Column Rule underline at a 4px offset, darkening to Press Ink on hover; at least 44px tall. Used for LinkedIn, GitHub and CV.
- **Accent link:** Ribbon Red text, underlined, darkening to Pressed Ribbon. Used for the header contact link and the in-step booking link.

### Tags
- **Style:** Column Rule outline, 2px corners, 4px by 12px, 0.875rem Faded Ink text, no fill. Process-step deliverables.
- **Service tags:** not boxed; bold Press Ink text with a thick 35% Ribbon Red underline, set in a two-column list.

### Inputs / Fields
- **Style:** Newsprint background, 1px Column Rule border, 2px corners, 8px by 12px, Press Ink text; uppercase Label above each field.
- **Focus:** border turns Ribbon Red, with the global focus ring.
- **Error:** a single line of Ribbon Red text under the form.

### Navigation
- **Masthead:** fixed, 3.5rem tall, Newsprint background, three-column grid (location, nameplate, contact link plus language toggle). Its bottom edge is an ink rule band with the reading-progress line drawn over it.
- **Language toggle:** "EN / ES" in 0.75rem; the current locale in Ribbon Red, others in Faded Ink darkening on hover.
- **Section index:** 0.875rem, bottom-left; the current entry bold Press Ink, others Faded Ink. Below sm it collapses to a single labelled chip on Newsprint with a Column Rule border.

### Dateline Band
A full-width strip ruled in ink above and below, holding location, tagline and edition in uppercase 11px to 12px labels, justified apart. Sits directly under the masthead at the top of the hero.

### Printed Photograph
Grayscale at contrast 1.12, multiplied into the paper, with a 3.5px halftone dot screen multiplied over it; 1px Press Ink frame; italic Caption below. The portrait masks the screen to its cut-out; the teaching photograph is a full-bleed crop within the column (224px to 320px tall).

### Typewriter Headline
The one signature motion: a headline types itself at 75ms per character when it scrolls into view, with a solid block caret that blinks once typing completes. It runs on the hero headline, each service headline, and the closing heading. Inside the services reel the service headlines are scrubbed by scroll instead of timed: scrolling forward types them, scrolling back erases them. The text's final width is reserved invisibly so nothing reflows, a screen-reader copy carries the full text, and under reduced motion the full headline renders immediately with no caret.

### Services Reel
A pinned scroll sequence of three services. Each panel crossfades in and settles 14px upward as it arrives, its headline types with the scroll, then its tools stamp in one by one (opacity, a 1.18 to 1 scale and a 3px blur settling to sharp). A row of service numbers at the bottom-right marks the current one in bold. Disabled under reduced motion and on viewports too short to fit a panel.

### Sheet Stack
Each section is a sheet of the paper with its own Newsprint ground and a 1px ink edge. As you read, a section pins once its bottom reaches the viewport, and the next sheet slides up over it; the covered page shrinks by up to 5% and darkens under a 30% ink wash, then hides once fully covered. The folio rule draws across with the incoming sheet's travel, the folio text fades in after it, and the section headline (plus its intro line) inks in once the sheet is a third of the way up: opacity, a 5px blur and 12px of travel settling over 700–900ms. Section anchors are zero-height markers so links land correctly. The contact sheet is the last page and never pins. Under reduced motion, sheets stay in normal flow and nothing animates.

### Tools Line
Under each service body, a Column Rule hairline and an uppercase Label ("Tools") followed by the real tech logos for that service, each a 20px ink mark (simple-icons) beside its name in 0.875rem Press Ink. Shown in both the reel and the stacked list.

## Do's and Don'ts

### Do:
- **Do** set every paragraph, label, caption, button and control in Courier Prime, and every headline in Newsreader.
- **Do** separate sections with the heavy-over-hairline ink rule at column width, and items with a single Column Rule hairline.
- **Do** print every photograph through the halftone treatment, in a 1px ink frame, with an italic caption.
- **Do** keep Ribbon Red for action, active state, focus, selection, progress and service headlines.
- **Do** keep corners at 2px on anything interactive.
- **Do** keep the newsprint overlay fixed above all content and non-interactive.
- **Do** honor reduced motion: typed headlines render complete, the services reel falls back to the stacked list, smooth scrolling turns off.

### Don't:
- **Don't** add shadows, elevated cards, glass or blur; depth is ink and rules.
- **Don't** use pill shapes or large radii on buttons, fields or tags.
- **Don't** set blackletter anywhere except the masthead nameplate.
- **Don't** set body copy in Newsreader, or headlines in Courier.
- **Don't** introduce a second chromatic color, or tint logos and icons; they print in ink.
- **Don't** split the page into a multi-column news grid; the letter keeps one text column, with columns only for short side-by-side facts.
- **Don't** add new typing animations beyond the three shipped headline placements.
