"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout } from "antd";
import {
  AUTH_CONFIG,
  HEADER_BRAND,
  HEADER_NAV_ITEMS,
  HeaderNavItem,
  UI_CONFIG,
} from "@/config";

const { Header } = Layout;

type PublicHeaderProps = {
  children?: ReactNode;
  navItems?: HeaderNavItem[];
  brand?: {
    href: string;
    label: string;
  };
};

function canShow(item: HeaderNavItem, hasToken: boolean) {
  if (!item.audience || item.audience === "all") return true;
  if (item.audience === "guest") return !hasToken;
  return hasToken;
}

export function PublicHeader({
  children,
  navItems = HEADER_NAV_ITEMS,
  brand = HEADER_BRAND,
}: PublicHeaderProps) {
  const pathname = usePathname();

  /**
   * need to check token existence on client side to determine which nav items to show
   */
  // const hasToken =
  //   typeof document !== "undefined" &&
  //   document.cookie.includes(`${AUTH_CONFIG.tokenCookieName}=`);

  // const visibleItems = navItems.filter((item) => canShow(item, hasToken));

  const headerStyle: React.CSSProperties = {
    color: "#fff",
    height: UI_CONFIG.layout.headerHeight,
    paddingInline: 48,
    backgroundColor: "#4096ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  };

  return (
    <Header style={headerStyle}>
      <Link href={brand.href} style={{ color: "#fff", fontWeight: 700 }}>
        {brand.label}
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ color: "#fff", opacity: isActive ? 1 : 0.8 }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {children}
      </div>
    </Header>
  );
}
