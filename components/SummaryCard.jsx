import { Copy, Check, FileText } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function SummaryCard({ summary, onSave, isLoading }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading) {
    return (
      <section className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-sky-400" />
          <h2 className="text-xl font-semibold text-slate-700">
            Generating Summary
          </h2>
        </div>

        <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-sky-100">
          <LoadingSpinner />

          <p className="text-center text-slate-500">
            AI is processing your notes...
          </p>
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-sky-400" />
          <h2 className="text-xl font-semibold text-slate-700">Summary</h2>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-sky-200 bg-white/70 p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-700">
            No Summary Yet
          </h3>

          <p className="mt-2 text-slate-500">
            Enter your notes and click Generate Summary to see the result here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center gap-2">
        <FileText className="h-5 w-5 text-sky-400" />
        <h2 className="text-xl font-semibold text-slate-700">Summary</h2>
      </div>

      <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-sky-100">
        <div className="flex items-start justify-between gap-4">
          <p className="flex-1 leading-7 text-slate-700">
            {summary}
          </p>

          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-sky-100 px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
          >
            {saved ? (
              <span className="flex items-center gap-2">
                <Check size={16} />
                Saved
              </span>
            ) : (
              "Save Summary"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}