"use client";

import { useEffect, useState } from "react";

export default function NoteInput({
  notes,
  setNotes,
  onGenerate,
  isLoading,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasNotes = mounted && notes.trim().length > 0;

  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-sky-100">
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Example: Paste lecture notes, textbook notes, or study material here..."
        className="h-64 w-full resize-none rounded-2xl border border-sky-200 p-4 text-slate-900 outline-none focus:border-sky-400 placeholder:italic placeholder:text-slate-300"
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">{notes.length} characters</p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!notes.trim()) return;
              setNotes("");
            }}
            className={`px-2 py-3 text-sm font-medium ${notes.trim()
                ? "text-slate-500 hover:text-red-400"
                : "cursor-not-allowed text-slate-300"
              }`}
          >
            Clear Notes
          </button>

          <button
            onClick={() => {
              if (!notes.trim() || isLoading) return;
              onGenerate();
            }}
            className={`rounded-xl px-5 py-3 font-medium text-white ${notes.trim() && !isLoading
                ? "bg-linear-to-r from-green-300 to-green-400 hover:from-green-500 hover:to-green-600"
                : "cursor-not-allowed bg-slate-200"
              }`}
          >
            {isLoading ? "Generating..." : "Generate Summary"}
          </button>
        </div>
      </div>
    </div>
  );
}