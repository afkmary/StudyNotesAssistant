"use client";

import StudyToolsSection from "@/components/StudyToolsSection";
import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import SummaryCard from "@/components/SummaryCard";
import { Sparkles, Cloud, Server } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-sky-50 to-blue-50 px-6 py-5">
      <section className="mx-auto max-w-4xl">
        <NoteInput
          notes={notes}
          setNotes={setNotes}
          isLoading={isLoading}
          onGenerate={() => {
            setIsLoading(true);

            setTimeout(() => {
              setSummary("/api/summarize");
              setIsLoading(false);
            }, 1000);
          }}
        />

        <SummaryCard
          summary={summary}
          isLoading={isLoading}
          onSave={() => {
            console.log("Save feature will be connected to Azure Blob Storage later.");
          }}
        />

        {/* Kate - AI Study Tools */}
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
    </main >
  );
}