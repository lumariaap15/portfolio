import {
  siNodedotjs,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siPostgresql,
  siDocker,
  siGraphql,
  siVercel,
  siSentry,
  siJest,
  siGithubactions,
  siI18next,
  siDatadog,
  siLaravel,
  siPhp,
  siMysql,
  siThreedotjs,
  siBootstrap,
  siJquery,
  siJavascript,
  type SimpleIcon,
} from "simple-icons";

/** Only technologies with a real, recognizable brand mark get a logo — everything else stays plain text. */
const TECH_LOGOS: Record<string, SimpleIcon> = {
  "Node.js": siNodedotjs,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  PostgreSQL: siPostgresql,
  Docker: siDocker,
  GraphQL: siGraphql,
  Vercel: siVercel,
  Sentry: siSentry,
  Jest: siJest,
  "GitHub Actions": siGithubactions,
  i18next: siI18next,
  Datadog: siDatadog,
  Laravel: siLaravel,
  PHP: siPhp,
  MySQL: siMysql,
  "Three.js": siThreedotjs,
  Bootstrap: siBootstrap,
  jQuery: siJquery,
  JavaScript: siJavascript,
};

export function TechLogo({
  name,
  className = "",
  style,
  decorative = false,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  decorative?: boolean;
}) {
  const icon = TECH_LOGOS[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : icon.title}
      aria-hidden={decorative || undefined}
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d={icon.path} />
    </svg>
  );
}
