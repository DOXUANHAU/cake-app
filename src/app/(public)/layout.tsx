import type { ReactNode } from "react";
import { PublicFooter, PublicHeader } from "@/components/shared/layout";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
      <PublicFooter />
    </div>
  );    
}