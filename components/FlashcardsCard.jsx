"use client";

import { useState } from "react";
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: "1000px", height: "180px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="mb-3 text-xs font-medium uppercase tracking-widest text-sky-400">
            Term
          </span>

          <p className="text-center text-lg font-semibold text-slate-700">
            {front}
          </p>

          <span className="mt-4 text-xs text-sky-400">Tap to flip</span>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-300 p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="mb-3 text-xs font-medium uppercase tracking-widest text-white/80">
            Definition
          </span>

          <p className="text-center text-sm leading-relaxed text-white">
            {back}
          </p>

          <span className="mt-4 text-xs text-white/80">Tap to flip back</span>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardsCard({ noteText }) {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!noteText || noteText.trim().length < 50) {
      setError("Please paste more notes before generating flashcards.");
      return;
    }

    setLoading(true);
    setError("");
    setFlashcards([]);
    setCurrentIndex(0);

    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noteText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate flashcards.");
        return;
      }

      setFlashcards(data.flashcards || []);
      setGenerated(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFlashcards([]);
    setGenerated(false);
    setError("");
    setCurrentIndex(0);
  };

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setCurrentIndex((i) => Math.min(flashcards.length - 1, i + 1));

  return (
    <div className="rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-lg shadow-sky-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-400">
            <Layers className="h-4 w-4" />
          </div>

          <h3 className="font-semibold text-slate-700">Flashcards</h3>
        </div>

        {generated && flashcards.length > 0 && (
          <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs text-sky-500">
            {currentIndex + 1} / {flashcards.length}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!generated && !loading && !error && (
        <p className="mb-4 text-sm text-slate-400">
          Turn your notes into flashcards. Tap each card to reveal the
          definition.
        </p>
      )}

      {loading && (
        <div className="mb-4 flex h-[180px] items-center justify-center rounded-2xl bg-sky-50">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm">Creating flashcards...</span>
          </div>
        </div>
      )}

      {generated && flashcards.length > 0 && !loading && (
        <>
          <div className="mb-4">
            <FlipCard
              key={currentIndex}
              front={flashcards[currentIndex].front}
              back={flashcards[currentIndex].back}
            />
          </div>

          <div className="mb-4 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="rounded-xl p-2 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5 text-slate-500" />
            </button>

            <div className="flex gap-1.5">
              {flashcards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === currentIndex
                    ? "w-4 bg-emerald-300"
                    : "w-2 bg-sky-100 hover:bg-sky-200"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex === flashcards.length - 1}
              className="rounded-xl p-2 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-sky-300 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-200"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : generated ? (
            <>
              <RotateCcw className="h-4 w-4" />
              Regenerate
            </>
          ) : (
            "Create Flashcards"
          )}
        </button>

        {generated && (
          <button
            onClick={handleReset}
            className="rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-sky-50 hover:text-sky-500"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}