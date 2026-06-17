import Link from "next/link";
import { site } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#learning", label: "Learning" },
  { href: "/projects", label: "Projects" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-line) bg-(--color-ink)/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-(--color-paper) transition-colors hover:text-(--color-accent)"
        >
          {site.name.toLowerCase().replace(" ", "_")}
        </Link>
        <ul className="flex items-center gap-5 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-(--color-muted) transition-colors hover:text-(--color-paper)"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
