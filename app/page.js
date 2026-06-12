"use client";

import { useState } from "react";
import NoteInput from "@/components/NoteInput";
import SummaryCard from "@/components/SummaryCard";
import { Sparkles, Cloud, Server } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-sky-50 to-blue-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-lg text-slate-600">
            Paste your notes below to generate an AI summary and save them for future review.
          </p>
        </div>

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

        <div className="mt-10 flex justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
            <Sparkles size={16} />
            <span>AI Summaries</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-700">
            <Cloud size={16} />
            <span>Cloud Storage</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
            <Server size={16} />
            <span>Azure Hosted</span>
          </div>
        </div>
      </section>
    </main >
  );
}