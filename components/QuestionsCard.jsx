"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Loader2, AlertCircle } from "lucide-react";

function QuestionItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex gap-3 items-start">
          <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-gray-800">{question}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="ml-9 p-3 bg-blue-50 rounded-lg border-l-2 border-blue-200">
            <p className="text-sm text-blue-800">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuestionsCard({ noteText }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!noteText || noteText.trim().length < 50) {
      setError("Please paste more notes before generating questions.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noteText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate questions.");
        return;
      }

      setQuestions(data.questions || []);
      setGenerated(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestions([]);
    setGenerated(false);
    setError("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <HelpCircle className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Practice Questions</h3>
        </div>
        {generated && questions.length > 0 && (
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {questions.length} questions
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
          Generate practice questions to test your understanding. Tap each question to reveal the answer.
        </p>
      )}

      {/* Questions list */}
      {generated && questions.length > 0 && (
        <div className="space-y-2 mb-4">
          {questions.map((q, index) => (
            <QuestionItem
              key={index}
              index={index}
              question={q.question}
              answer={q.answer}
            />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : generated ? (
            "Regenerate"
          ) : (
            "Generate Questions"
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
