import { initContainer, saveNote } from "@/lib/blobStorage";

export async function POST(req) {
  await initContainer(); // Step 6 used here

  const { id, content } = await req.json();

  await saveNote(id, content);

  return Response.json({ success: true });
}