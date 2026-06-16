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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-violet-50 rounded-lg">
            <Tag className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Key Phrases</h3>
        </div>
        {generated && keyphrases.length > 0 && (
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {keyphrases.length} found
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
          Extract the most important terms and concepts from your notes.
        </p>
      )}

      {/* Key phrases display */}
      {generated && keyphrases.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {keyphrases.map((phrase, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-violet-50 text-violet-700 border border-violet-100"
            >
              {phrase}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
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
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
