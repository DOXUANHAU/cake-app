import { ROUTES } from "./routes.config";

export type HeaderNavAudience = "all" | "guest" | "authenticated";

export type HeaderNavItem = {
  href: string;
  label: string;
  audience?: HeaderNavAudience;
};

export const HEADER_BRAND = {
  href: ROUTES.public.home,
  label: "Cake App",
};

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { href: ROUTES.public.home, label: "Home", audience: "all" },
  { href: ROUTES.public.login, label: "Login", audience: "guest" },
  { href: ROUTES.public.register, label: "Register", audience: "guest" },
  { href: ROUTES.protected.data, label: "Data", audience: "authenticated" },
];
