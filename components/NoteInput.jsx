export default function NoteInput({
  notes,
  setNotes,
  onGenerate,
  isLoading,
}) {
  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-sky-100">
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Example: Paste lecture notes, textbook notes, or study material here..."
        className="h-64 w-full resize-none rounded-2xl border border-sky-200 p-4 text-slate-900 outline-none focus:border-sky-400"
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {notes.length} characters
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setNotes("")}
            disabled={!notes.trim()}
            className="px-2 py-3 text-sm font-medium text-slate-500 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear Notes
          </button>

          <button
            onClick={onGenerate}
            disabled={!notes.trim() || isLoading}
            className="rounded-xl bg-linear-to-r from-green-300 to-green-400 px-5 py-3 font-medium text-white
             hover:from-green-500 hover:to-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate Summary"}
          </button>
        </div>
      </div>
    </div>
  );
}