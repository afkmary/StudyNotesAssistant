"use client";

import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
} from "lucide-react";

function QuestionItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left transition hover:bg-sky-50"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-500">
            {index + 1}
          </span>

          <span className="text-sm font-medium text-slate-700">
            {question}
          </span>
        </div>

        {open ? (
          <ChevronUp className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4">
          <div className="ml-10 rounded-2xl border-l-2 border-sky-200 bg-sky-50 p-3">
            <p className="text-sm text-slate-600">{answer}</p>
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
    <div className="rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-lg shadow-sky-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-400">
            <HelpCircle className="h-4 w-4" />
          </div>

          <h3 className="font-semibold text-slate-700">
            Practice Questions
          </h3>
        </div>

        {generated && questions.length > 0 && (
          <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs text-sky-500">
            {questions.length} questions
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
          Generate practice questions to test your understanding. Tap each
          question to reveal the answer.
        </p>
      )}

      {generated && questions.length > 0 && (
        <div className="mb-4 space-y-3">
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

      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-indigo-300 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-200"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
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
            className="rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-sky-50 hover:text-sky-500"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}