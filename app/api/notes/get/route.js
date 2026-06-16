import { initContainer, getNote } from "@/lib/blobStorage";

export async function POST(req) {
  try {
    await initContainer();

    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Note ID is required." },
        { status: 400 }
      );
    }

    const content = await getNote(id);

    return Response.json({ content });
  } catch (error) {
    console.error("Get note error:", error);

    return Response.json(
      { error: "Failed to get note." },
      { status: 500 }
    );
  }
}