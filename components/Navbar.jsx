"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-sky-100 bg-slate-50 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-sky-700"
        >
          Study Notes Assistant
        </Link>

        <div className="flex gap-2">
          <Link
            href="/"
            className={`rounded-lg px-4 py-2 ${pathname === "/"
              ? "bg-sky-100 text-sky-700"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            Home
          </Link>

          <Link
            href="/saved"
            className={`rounded-lg px-4 py-2 ${pathname === "/saved"
              ? "bg-sky-100 text-sky-700"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            Saved Notes
          </Link>
        </div>
      </div>
    </nav>
  );
}