export default function SummaryCard({ summary }) {
  if (!summary) {
    return (
      <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-700">
          No Summary Yet
        </h2>

        <p className="mt-2 text-slate-500">
          Enter your notes and click Generate Summary to see the result here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl border-2 border-dashed border-sky-200 bg-white/70 p-8 text-center">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Summary
        </h2>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
          Generated
        </span>
      </div>

      <p className="leading-7 text-slate-700">
        {summary}
      </p>
    </div>
  );
}