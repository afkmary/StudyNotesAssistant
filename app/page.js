"use client";

import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import SummaryCard from "@/components/SummaryCard";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Study Notes Assistant
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Paste your study notes, generate a short summary, and save your notes
            for later review.
          </p>
        </div>

        <NoteInput
          notes={notes}
          setNotes={setNotes}
          onGenerate={() =>
            setSummary("This is where the AI-generated summary will appear.")
          }
        />

        <SummaryCard summary={summary} />
      </section>
    </main>
  );
}