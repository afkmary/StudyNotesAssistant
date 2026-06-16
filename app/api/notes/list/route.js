import { initContainer, listNotes } from "@/lib/blobStorage";

export async function GET() {
  await initContainer();

  const notes = await listNotes();

  return Response.json({ notes });
}