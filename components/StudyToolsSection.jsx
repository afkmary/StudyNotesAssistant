"use client";

import KeyPhrasesCard from "./KeyPhrasesCard";
import QuestionsCard from "./QuestionsCard";
import FlashcardsCard from "./FlashcardsCard";
import { Sparkles } from "lucide-react";

export default function StudyToolsSection({ noteText }) {
  const hasText = noteText && noteText.trim().length > 0;

  return (
    <section className="mt-8">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-gray-400" />
        <h2 className="text-base font-semibold text-gray-700">AI Study Tools</h2>
        {!hasText && (
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full ml-1">
            Paste notes above to unlock
          </span>
        )}
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <KeyPhrasesCard noteText={noteText} />
        <QuestionsCard noteText={noteText} />
        <FlashcardsCard noteText={noteText} />
      </div>

      {/* Responsible AI notice */}
      <p className="mt-4 text-xs text-gray-400 text-center">
        AI-generated content may be incomplete or inaccurate. Always review against your original notes.
      </p>
    </section>
  );
}
