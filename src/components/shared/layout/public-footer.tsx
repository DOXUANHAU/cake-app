"use client";

import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-center px-4 text-sm text-gray-600">
        <span>
          © {new Date().getFullYear()} Cake App ·{" "}
          <Link href="/home" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
        </span>
      </div>
    </footer>
  );
}
