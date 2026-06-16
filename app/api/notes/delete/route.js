import { initContainer, deleteNote } from "@/lib/blobStorage";

export async function DELETE(req) {
  try {
    await initContainer();

    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Note ID is required." },
        { status: 400 }
      );
    }

    await deleteNote(id);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete note error:", error);

    return Response.json(
      { error: "Failed to delete note." },
      { status: 500 }
    );
  }
}