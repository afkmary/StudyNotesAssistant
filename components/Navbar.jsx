import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Study Notes Assistant
        </Link>

        <div className="flex gap-4">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Home
          </Link>

          <Link href="/saved" className="text-slate-600 hover:text-slate-900">
            Saved Notes
          </Link>
        </div>
      </div>
    </nav>
  );
}