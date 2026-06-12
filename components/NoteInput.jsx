export default function NoteInput({ notes, setNotes, onGenerate }) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
      <label className="block text-sm font-medium text-slate-700">
        Enter your study notes
      </label>

      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Paste your notes here..."
        className="mt-3 h-64 w-full resize-none rounded-xl border border-slate-300 p-4 text-slate-900 outline-none focus:border-slate-500"
      />

      <button
        onClick={onGenerate}
        className="mt-4 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
      >
        Generate Summary
      </button>
    </div>
  );
}