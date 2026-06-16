"use client";

import { useEffect, useState } from "react";
import StudyToolsSection from "@/components/StudyToolsSection";
import { FileText, Trash2 } from "lucide-react";

export default function SavedNotesPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedContent, setSelectedContent] = useState("");

  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("/api/notes/list");
      const data = await response.json();
      setNotes(data.notes || []);
    }

    loadNotes();
  }, []);

  const handleOpenNote = async (id) => {
    const response = await fetch("/api/notes/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    setSelectedNote(id);
    setSelectedContent(data.content || "");
  };

  const handleDelete = async (id) => {
    await fetch("/api/notes/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.name !== id)
    );

    if (selectedNote === id) {
      setSelectedNote(null);
      setSelectedContent("");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-sky-50 to-blue-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-500">
            Saved Notes
          </h1>
        </div>

        {!selectedContent && (
          <>
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
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => handleOpenNote(note.name)}
                        className="flex cursor-pointer items-center gap-3 text-left transition-opacity hover:opacity-80"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-400">
                          <FileText size={18} />
                        </div>

                        <div>
                          <h2 className="font-semibold text-slate-700">
                            {note.name}
                          </h2>

                          <p className="mt-1 text-sm text-slate-400">
                            Click to view summary
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleDelete(note.name)}
                        className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {selectedContent && (
          <section className="mt-8">
            <div className="mb-4">
              <button
                onClick={() => {
                  setSelectedNote(null);
                  setSelectedContent("");
                }}
                className="rounded-xl bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200"
              >
                ← Back to Saved Notes
              </button>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-400" />

              <h2 className="text-xl font-semibold text-slate-700">
                {selectedNote}
              </h2>
            </div>

            <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-sky-100">
              <p className="whitespace-pre-line leading-7 text-slate-700">
                {selectedContent}
              </p>
            </div>

            <StudyToolsSection noteText={selectedContent} />
          </section>
        )}
      </section>
    </main>
  );
}