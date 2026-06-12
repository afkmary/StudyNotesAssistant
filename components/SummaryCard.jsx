export default function SummaryCard({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h2 className="mb-2 text-lg font-semibold text-slate-900">
        Summary
      </h2>

      <p className="text-slate-700">
        {summary}
      </p>
    </div>
  );
}