export default function SavedNotesPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-sky-50 to-blue-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-sky-700">
            Saved Notes
          </h1>

          <p className="mt-3 text-slate-600">
            Your saved notes and summaries will appear here.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-sky-200 bg-white/70 p-8 text-center">
          <h2 className="text-lg font-semibold text-sky-700">
            No Saved Notes Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Once notes are saved, they will show up on this page.
          </p>
        </div>
      </section>
    </main>
  );
}