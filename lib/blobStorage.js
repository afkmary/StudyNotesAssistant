import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "notes";

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient =
  blobServiceClient.getContainerClient(containerName);

export async function initContainer() {
  await containerClient.createIfNotExists();
}

// save note
export async function saveNote(id, content) {
  const blob = containerClient.getBlockBlobClient(id);
  await blob.upload(content, Buffer.byteLength(content));
}

// get note
export async function getNote(id) {
  const blob = containerClient.getBlockBlobClient(id);
  const response = await blob.download();

  return streamToString(response.readableStreamBody);
}

// saved noteds list
export async function listNotes() {
  const notes = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    notes.push({
      name: blob.name,
      createdOn: blob.properties.createdOn,
    });
  }

  return notes;
}

// helper
function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", (d) => chunks.push(d.toString()));
    stream.on("end", () => resolve(chunks.join("")));
    stream.on("error", reject);
  });
}