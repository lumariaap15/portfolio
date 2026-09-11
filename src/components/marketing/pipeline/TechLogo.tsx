import {
  siNodedotjs,
  siTypescript,
  siReact,
  siPostgresql,
  siSentry,
  siJest,
  siGithubactions,
  siI18next,
  type SimpleIcon,
} from "simple-icons";

/** Only technologies with a real, recognizable brand mark get a logo — everything else stays plain text. */
const TECH_LOGOS: Record<string, SimpleIcon> = {
  "Node.js": siNodedotjs,
  TypeScript: siTypescript,
  React: siReact,
  PostgreSQL: siPostgresql,
  Sentry: siSentry,
  Jest: siJest,
  "GitHub Actions": siGithubactions,
  i18next: siI18next,
};

export function TechLogo({ name, className = "" }: { name: string; className?: string }) {
  const icon = TECH_LOGOS[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      fill="currentColor"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
