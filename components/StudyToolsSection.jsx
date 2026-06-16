"use client";

import KeyPhrasesCard from "./KeyPhrasesCard";
import QuestionsCard from "./QuestionsCard";
import FlashcardsCard from "./FlashcardsCard";
import { Sparkles } from "lucide-react";

export default function StudyToolsSection({ noteText }) {
  const hasText = noteText && noteText.trim().length > 0;

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-sky-400" />

        <h2 className="text-xl font-semibold text-slate-700">
          AI Study Tools
        </h2>
      </div>

      <div className="space-y-5">
        <KeyPhrasesCard noteText={noteText} />
        <QuestionsCard noteText={noteText} />
        <FlashcardsCard noteText={noteText} />
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        AI-generated content may be incomplete or inaccurate. Always review
        against your original notes.
      </p>
    </section>
  );
}