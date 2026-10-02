/**
 * Small engraved "spot cuts" for each service line, drawn in the same
 * ink-and-hatching hand as the front-page Workbench.
 */

type Category = "custom" | "integration" | "modernization";

const PAPER = { fill: "var(--color-paper)" };

function Hatch({ id, gap = 3.2 }: { id: string; gap?: number }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2={gap} stroke="currentColor" strokeWidth="1" />
    </pattern>
  );
}

/** Custom build: an application window being drafted, pencil in hand. */
function Build() {
  return (
    <>
      <defs>
        <Hatch id="sc-build" />
      </defs>
      <rect x="8" y="14" width="74" height="62" rx="3" style={PAPER} strokeWidth="2" />
      <line x1="8" y1="25" x2="82" y2="25" strokeWidth="1.6" />
      <circle cx="15" cy="19.5" r="1.8" />
      <circle cx="21.5" cy="19.5" r="1.8" />
      <circle cx="28" cy="19.5" r="1.8" />
      <rect x="15" y="32" width="24" height="36" fill="url(#sc-build)" strokeWidth="1.4" />
      <line x1="46" y1="36" x2="74" y2="36" strokeWidth="1.3" />
      <line x1="46" y1="44" x2="70" y2="44" strokeWidth="1.3" />
      <line x1="46" y1="52" x2="66" y2="52" strokeWidth="1.3" />
      <path d="M44 34 L39 39 L44 44" strokeWidth="1.2" />
      {/* Pencil */}
      <path d="M58 92 L90 60 L97 67 L65 99 Z" style={PAPER} strokeWidth="1.8" />
      <path d="M84 66 L91 73" strokeWidth="1.2" />
      <path d="M88 62 L95 69" strokeWidth="1.2" />
      <path d="M58 92 L54 101 L65 99" style={{ fill: "currentColor" }} strokeWidth="1.2" />
    </>
  );
}

/** Integration: a plug meeting its socket, cables running out either side. */
function Connect() {
  return (
    <>
      <defs>
        <Hatch id="sc-connect" gap={2.6} />
      </defs>
      <path d="M2 64 C 10 64, 12 50, 22 50" strokeWidth="2" />
      <rect x="22" y="38" width="22" height="24" rx="3" style={PAPER} strokeWidth="2" />
      <line x1="28" y1="38" x2="28" y2="62" strokeWidth="1" />
      <line x1="44" y1="44" x2="54" y2="44" strokeWidth="2.4" />
      <line x1="44" y1="56" x2="54" y2="56" strokeWidth="2.4" />
      <rect x="58" y="34" width="26" height="32" rx="3" fill="url(#sc-connect)" strokeWidth="2" />
      <rect x="58" y="41" width="5" height="6" style={PAPER} strokeWidth="1" />
      <rect x="58" y="53" width="5" height="6" style={PAPER} strokeWidth="1" />
      <path d="M84 50 C 92 50, 90 34, 98 34" strokeWidth="2" />
      {/* Contact marks */}
      <line x1="51" y1="31" x2="53" y2="25" strokeWidth="1.3" />
      <line x1="56" y1="32" x2="60" y2="27" strokeWidth="1.3" />
      <line x1="51" y1="69" x2="53" y2="75" strokeWidth="1.3" />
      <line x1="56" y1="68" x2="60" y2="73" strokeWidth="1.3" />
    </>
  );
}

/** Modernization: a gear with a wrench laid across it. */
function Repair() {
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <>
      <defs>
        <Hatch id="sc-repair" />
      </defs>
      <g transform="translate(40 42)">
        {teeth.map((deg) => (
          <rect key={deg} x="-5" y="-31" width="10" height="10" rx="1.5" transform={`rotate(${deg})`} style={PAPER} strokeWidth="1.8" />
        ))}
        <circle r="23" fill="url(#sc-repair)" strokeWidth="2" />
        <circle r="23" strokeWidth="2" />
        <circle r="9" style={PAPER} strokeWidth="1.8" />
      </g>
      <g transform="translate(58 60) rotate(45)">
        <rect x="4" y="-5" width="48" height="10" rx="5" style={PAPER} strokeWidth="1.8" />
        <circle cx="0" cy="0" r="12" style={PAPER} strokeWidth="1.8" />
        <path d="M-13 -4.5 L-3 -4.5 L-3 4.5 L-13 4.5" style={PAPER} stroke="none" />
        <path d="M-11.2 -4.5 L-3 -4.5 L-3 4.5 L-11.2 4.5" strokeWidth="1.6" />
        <line x1="14" y1="0" x2="44" y2="0" strokeWidth="1" />
      </g>
    </>
  );
}

const CUTS: Record<Category, () => React.JSX.Element> = {
  custom: Build,
  integration: Connect,
  modernization: Repair,
};

export function ServiceCut({ category, className = "" }: { category: Category; className?: string }) {
  const Cut = CUTS[category];
  return (
    <svg
      viewBox="0 0 100 104"
      aria-hidden="true"
      className={`text-(--color-ink) ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Cut />
    </svg>
  );
}
