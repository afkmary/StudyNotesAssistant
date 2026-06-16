export default function SaveSummaryPopup({
  showSavePopup,
  noteTitle,
  setNoteTitle,
  onCancel,
  onSave,
}) {
  return (
    <>
      {showSavePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-sky-100">
            <h2 className="text-xl font-semibold text-slate-700">
              Save Summary
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Give your saved summary a title.
            </p>

            <input
              value={noteTitle}
              onChange={(event) => setNoteTitle(event.target.value)}
              placeholder="Example: OOP Notes"
              className="mt-5 w-full rounded-2xl border border-sky-200 p-3 text-slate-700 outline-none placeholder:italic placeholder:text-slate-300 focus:border-sky-400"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-400 hover:bg-sky-50"
              >
                Cancel
              </button>

              <button
                onClick={onSave}
                className="rounded-xl bg-green-300 px-4 py-2 text-sm font-medium text-white hover:bg-green-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}