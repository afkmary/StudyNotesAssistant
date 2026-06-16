"use client";

import { useState } from "react";
import { Layers, ChevronLeft, ChevronRight, RotateCcw, Loader2, AlertCircle } from "lucide-react";

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: "1000px", height: "180px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-xs font-medium text-emerald-500 uppercase tracking-widest mb-3">
            Term
          </span>
          <p className="text-lg font-semibold text-gray-800 text-center">{front}</p>
          <span className="mt-4 text-xs text-emerald-400">Tap to flip</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-xs font-medium text-teal-200 uppercase tracking-widest mb-3">
            Definition
          </span>
          <p className="text-sm text-white text-center leading-relaxed">{back}</p>
          <span className="mt-4 text-xs text-teal-300">Tap to flip back</span>
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
  const next = () => setCurrentIndex((i) => Math.min(flashcards.length - 1, i + 1));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Flashcards</h3>
        </div>
        {generated && flashcards.length > 0 && (
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {currentIndex + 1} / {flashcards.length}
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 rounded-xl p-3 mb-4 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty state */}
      {!generated && !loading && !error && (
        <p className="text-sm text-gray-400 mb-4">
          Turn your notes into flashcards. Tap each card to reveal the definition.
        </p>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center h-[180px] bg-gray-50 rounded-2xl mb-4">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Creating flashcards...</span>
          </div>
        </div>
      )}

      {/* Flashcard viewer */}
      {generated && flashcards.length > 0 && !loading && (
        <>
          <div className="mb-4">
            <FlipCard
              key={currentIndex}
              front={flashcards[currentIndex].front}
              back={flashcards[currentIndex].back}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {flashcards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-emerald-500 w-4"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex === flashcards.length - 1}
              className="p-2 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : generated ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </>
          ) : (
            "Create Flashcards"
          )}
        </button>
        {generated && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
