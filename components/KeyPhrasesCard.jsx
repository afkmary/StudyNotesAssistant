"use client";

import { useState } from "react";
import { Tag, Loader2, AlertCircle } from "lucide-react";

export default function KeyPhrasesCard({ noteText }) {
  const [keyphrases, setKeyphrases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!noteText || noteText.trim().length < 20) {
      setError("Please paste some notes first before extracting key phrases.");
      return;
    }

    setLoading(true);
    setError("");
    setKeyphrases([]);

    try {
      const response = await fetch("/api/keyphrases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noteText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to extract key phrases.");
        return;
      }

      setKeyphrases(data.keyphrases || []);
      setGenerated(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKeyphrases([]);
    setGenerated(false);
    setError("");
  };

  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-sky-100 border border-sky-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-400">
            <Tag className="h-4 w-4" />
          </div>

          <h3 className="font-semibold text-slate-700">Key Phrases</h3>
        </div>

        {generated && keyphrases.length > 0 && (
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-500 border border-sky-100">
            {keyphrases.length} found
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
          Extract the most important terms and concepts from your notes.
        </p>
      )}

      {generated && keyphrases.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {keyphrases.map((phrase, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-600"
            >
              {phrase}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-purple-300 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:bg-slate-200"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Extracting...
            </>
          ) : generated ? (
            "Re-extract"
          ) : (
            "Extract Key Phrases"
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