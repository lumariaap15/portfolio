/**
 * Front-page "cut": a vintage workstation drawn as a newspaper engraving —
 * ink outlines, line hatching for shade, the screen printed in reverse.
 * Authored SVG so it inherits the page's ink, paper and typewriter face.
 */

const INK = "currentColor";
const PAPER = "var(--color-paper)";

const CODE: { indent: number; parts: { text: string; bold?: boolean }[] }[] = [
  { indent: 0, parts: [{ text: "function", bold: true }, { text: " ship(idea) {" }] },
  { indent: 2, parts: [{ text: "let", bold: true }, { text: " plan = scope(idea);" }] },
  { indent: 2, parts: [{ text: "return", bold: true }, { text: " build(plan)" }] },
  { indent: 4, parts: [{ text: ".then(test)" }] },
  { indent: 4, parts: [{ text: ".then(launch);" }] },
  { indent: 0, parts: [{ text: "}" }] },
  { indent: 0, parts: [{ text: "> ship(yourIdea)" }] },
];

/** Monospace advance at the screen's 12px size (Courier Prime is 0.6em). */
const CH = 7.2;
const CODE_X = 218;
const CODE_Y = 101;
const LINE = 17;

function keyboardKeys() {
  const keys: { x: number; y: number; w: number }[] = [];
  const pitch = 17;
  for (let r = 0; r < 3; r++) {
    const y = 360 + r * 8.5;
    const left = 106 - r * 5;
    const count = Math.floor((534 + r * 5 - left) / pitch);
    // Bottom row: one long space bar replaces the middle keys.
    const gapFrom = Math.round(count * 0.3);
    const gapTo = Math.round(count * 0.7);
    for (let k = 0; k < count; k++) {
      if (r === 2 && k >= gapFrom && k < gapTo) continue;
      keys.push({ x: left + k * pitch, y, w: 14 });
    }
    if (r === 2) keys.push({ x: left + gapFrom * pitch, y, w: (gapTo - gapFrom - 1) * pitch + 14 });
  }
  return keys;
}

export function Workbench({ label, className = "" }: { label: string; className?: string }) {
  const keys = keyboardKeys();

  return (
    <svg
      viewBox="0 0 640 430"
      role="img"
      aria-label={label}
      className={`text-(--color-ink) ${className}`}
      fill="none"
      stroke={INK}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <defs>
        <pattern id="wb-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.9" />
        </pattern>
        <pattern id="wb-hatch-dense" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="2.6" stroke={INK} strokeWidth="1" />
        </pattern>
        <pattern id="wb-hatch-h" width="4" height="3.2" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0.5" x2="4" y2="0.5" stroke={INK} strokeWidth="0.8" />
        </pattern>
        <pattern id="wb-scan" width="4" height="3" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0.5" x2="4" y2="0.5" style={{ stroke: PAPER }} strokeWidth="0.6" strokeOpacity="0.09" />
        </pattern>
        <linearGradient id="wb-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="wb-desk-mask">
          <rect x="0" y="394" width="640" height="36" fill="url(#wb-fade)" />
        </mask>
      </defs>

      {/* Desk: top edge and a fading engraved front. */}
      <line x1="8" y1="392" x2="632" y2="392" strokeWidth="2" />
      <rect x="8" y="394" width="624" height="36" fill="url(#wb-hatch-h)" stroke="none" mask="url(#wb-desk-mask)" />

      {/* System unit */}
      <path d="M510 300 L546 266 L546 312 L510 346 Z" fill="url(#wb-hatch-dense)" strokeWidth="2" />
      <path d="M130 300 L166 266 L546 266 L510 300 Z" fill="url(#wb-hatch)" strokeWidth="2" />
      <rect x="130" y="300" width="380" height="46" rx="3" style={{ fill: PAPER }} strokeWidth="2.2" />
      <circle cx="152" cy="323" r="4" style={{ fill: "var(--color-accent)" }} stroke="none" />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} x1={176 + i * 7} y1="313" x2={176 + i * 7} y2="334" strokeWidth="1.2" />
      ))}
      <rect x="352" y="311" width="130" height="11" rx="2" fill={INK} stroke="none" />
      <rect x="352" y="328" width="130" height="7" rx="2" strokeWidth="1.2" />
      <rect x="466" y="326" width="10" height="11" rx="1.5" style={{ fill: PAPER }} strokeWidth="1" />

      {/* Monitor: depth, top, then the face */}
      <path d="M460 48 L496 14 L496 250 L460 284 Z" fill="url(#wb-hatch-dense)" strokeWidth="2" />
      <path d="M178 48 L214 14 L496 14 L460 48 Z" fill="url(#wb-hatch)" strokeWidth="2" />
      <rect x="170" y="48" width="290" height="236" rx="12" style={{ fill: PAPER }} strokeWidth="2.4" />
      {/* Shade along the face's lower and right edges */}
      <path d="M176 272 Q 176 278 186 278 L 446 278 Q 454 278 454 270 L 454 64" stroke={INK} strokeWidth="0.8" strokeOpacity="0.55" />

      {/* Bezel + tube */}
      <rect x="192" y="66" width="246" height="176" rx="18" style={{ fill: PAPER }} strokeWidth="1.6" />
      <path d="M198 234 Q 198 236 206 236 L 424 236 Q 432 236 432 226 L 432 80" stroke={INK} strokeWidth="5" strokeOpacity="0.18" />
      <rect x="204" y="78" width="222" height="152" rx="13" fill={INK} stroke="none" />
      <rect x="204" y="78" width="222" height="152" rx="13" fill="url(#wb-scan)" stroke="none" />

      <g
        stroke="none"
        fontSize="12"
        style={{ fill: PAPER, fontFamily: "var(--font-type)" }}
      >
        {CODE.map((line, i) => (
          <text key={i} x={CODE_X + line.indent * CH} y={CODE_Y + i * LINE} xmlSpace="preserve">
            {line.parts.map((part, j) => (
              <tspan key={j} fontWeight={part.bold ? 700 : 400}>
                {part.text}
              </tspan>
            ))}
          </text>
        ))}
      </g>
      <rect
        className="caret-blink"
        x={CODE_X + 16 * CH + 2}
        y={CODE_Y + 6 * LINE - 11}
        width="7"
        height="13"
        style={{ fill: PAPER }}
        stroke="none"
      />
      {/* Glass glare */}
      <path d="M214 90 Q 216 84 226 84 L 300 84 L 236 116 Q 216 124 212 138 Z" style={{ fill: PAPER }} fillOpacity="0.1" stroke="none" />

      {/* Face details: maker's plate and two knobs */}
      <rect x="292" y="254" width="46" height="12" rx="1.5" strokeWidth="1.2" />
      <line x1="300" y1="260" x2="330" y2="260" strokeWidth="1" />
      <circle cx="414" cy="261" r="6" style={{ fill: PAPER }} strokeWidth="1.4" />
      <circle cx="436" cy="261" r="6" fill="url(#wb-hatch)" strokeWidth="1.4" />

      {/* Keyboard cable */}
      <path d="M100 372 C 56 374, 60 326, 130 326" strokeWidth="2" />

      {/* Keyboard */}
      <path d="M100 356 L540 356 L556 384 L84 384 Z" style={{ fill: PAPER }} strokeWidth="2.2" />
      <path d="M84 384 L556 384 L556 391 L84 391 Z" fill="url(#wb-hatch-h)" strokeWidth="1.6" />
      {keys.map((k, i) => (
        <rect key={i} x={k.x} y={k.y} width={k.w} height="6.5" rx="1.2" strokeWidth="1" />
      ))}

      {/* 3½" floppy, leaning against the unit */}
      <g transform="translate(28 326) rotate(-9)">
        <rect x="0" y="0" width="62" height="62" rx="3" style={{ fill: PAPER }} strokeWidth="2" />
        <rect x="16" y="0" width="30" height="20" fill="url(#wb-hatch-dense)" strokeWidth="1.4" />
        <rect x="34" y="4" width="7" height="12" style={{ fill: PAPER }} strokeWidth="1" />
        <rect x="8" y="30" width="46" height="28" rx="1.5" strokeWidth="1.2" />
        <line x1="13" y1="38" x2="48" y2="38" strokeWidth="0.9" />
        <line x1="13" y1="45" x2="44" y2="45" strokeWidth="0.9" />
        <line x1="13" y1="52" x2="38" y2="52" strokeWidth="0.9" />
      </g>

      {/* Coffee */}
      <path d="M598 356 Q 616 356 616 368 Q 616 380 598 380" strokeWidth="2.2" />
      <rect x="566" y="344" width="34" height="48" rx="3" style={{ fill: PAPER }} strokeWidth="2.2" />
      <rect x="588" y="347" width="10" height="42" fill="url(#wb-hatch)" stroke="none" />
      <path d="M576 334 C 570 324, 584 318, 578 306" strokeWidth="1.3" />
      <path d="M590 334 C 584 324, 598 316, 592 302" strokeWidth="1.3" />
    </svg>
  );
}
