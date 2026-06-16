"use client";

import { useEffect, useState } from "react";

export default function SavedNotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("/api/notes/list");
      const data = await response.json();
      setNotes(data.notes || []);
    }

    loadNotes();
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-sky-50 to-blue-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-500">Saved Notes</h1>
        </div>

        {notes.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-sky-200 bg-white/70 p-8 text-center">
            <h2 className="text-lg font-semibold text-sky-300">
              No Saved Notes Yet
            </h2>
            <p className="mt-2 text-slate-400">
              Once notes are saved, they will show up on this page.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.name}
                className="rounded-3xl bg-white/90 p-5 shadow-lg shadow-sky-100"
              >
                <h2 className="font-semibold text-slate-700">{note.name}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Saved in Azure Blob Storage
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}