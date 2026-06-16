"use client";

import StudyToolsSection from "@/components/StudyToolsSection";
import SaveSummaryPopup from "@/components/SaveSummaryPopup";
import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import SummaryCard from "@/components/SummaryCard";
import { Sparkles, Cloud, Server } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showSavePopup, setShowSavePopup] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const [saved, setSaved] = useState(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: notes }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSummary(data.error || "Failed to generate summary.");
        return;
      }

      setSummary(data.summary);
    } catch {
      setSummary("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSummary = async () => {
    if (!noteTitle.trim()) return;

    const id = `${noteTitle.trim()}.txt`;

    await fetch("/api/notes/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content: summary,
      }),
    });

    setShowSavePopup(false);
    setNoteTitle("");
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-sky-50 to-blue-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-lg text-slate-600">
            Paste your notes below to generate an AI summary and save them for
            future review.
          </p>
        </div>

        <NoteInput
          notes={notes}
          setNotes={setNotes}
          isLoading={isLoading}
          onGenerate={handleGenerateSummary}
        />

        <SummaryCard
          summary={summary}
          isLoading={isLoading}
          onSave={() => setShowSavePopup(true)}
          saved={saved}
        />

        <StudyToolsSection noteText={notes} />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span>AI Summaries</span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-2">
            <Cloud size={16} />
            <span>Cloud Storage</span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-2">
            <Server size={16} />
            <span>Azure Hosted</span>
          </div>
        </div>
      </section>

      <SaveSummaryPopup
        showSavePopup={showSavePopup}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        onCancel={() => {
          setShowSavePopup(false);
          setNoteTitle("");
        }}
        onSave={handleSaveSummary}
        saveMessage={saveMessage}
      />
    </main>
  );
}