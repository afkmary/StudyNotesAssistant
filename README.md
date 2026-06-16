## AI Study Tools By Utsanakorn(Kate) Chinkonglar

The app includes three additional AI-powered study features
built with Azure OpenAI via Azure AI Foundry.

### Features

- **Key Phrase Extraction** — Identifies the most important terms and concepts
  from the pasted notes and displays them as tags.
- **Practice Questions** — Generates 5 study questions with answers based on
  the note content. Answers are revealed on tap.
- **Flashcards** — Creates 6–10 flip cards with a term on the front and a
  definition on the back, with next/previous navigation.

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/keyphrases` | POST | Returns key phrases as a JSON array |
| `/api/questions` | POST | Returns questions and answers as a JSON array |
| `/api/flashcards` | POST | Returns flashcard front/back pairs as a JSON array |

### Environment Variables Required

| Variable | Description |
|---|---|
| `AZURE_OPENAI_ENDPOINT` | Base endpoint from Azure AI Foundry (domain only) |
| `AZURE_OPENAI_API_KEY` | API key from Azure AI Foundry project |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Deployment name (e.g. `gpt-4.1`) |
| `AZURE_OPENAI_API_VERSION` | API version (e.g. `2025-01-01-preview`) |

### Responsible AI Notes

- AI-generated content may be incomplete or miss key concepts from the notes.
- Questions and flashcards should be reviewed by the student before relying on them.
- No user data is stored by these features — notes are sent to Azure OpenAI for
  processing only and are not retained.
- Output quality depends on the length and clarity of the input notes.