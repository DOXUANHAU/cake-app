"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AUTH_PATHS = ["/login", "/register"] as const;

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
] as const;

export function PublicHeader() {
  const pathname = usePathname();

  const hideAuthLinks = AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  const visibleLinks = NAV_LINKS.filter((link) => {
    if (!hideAuthLinks) return true;
    return !AUTH_PATHS.includes(link.href as (typeof AUTH_PATHS)[number]);
  });

  return (
    <header className="w-full border-b border-black/10 px-6 py-4">
      <nav className="mx-auto flex w-full max-w-6xl justify-end gap-4">
        {visibleLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}