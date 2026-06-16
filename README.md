# Study Notes Assistant

Study Notes Assistant is a web application that helps students organize and review study material using AI-powered tools. Users can paste lecture notes, textbook content, or study material and generate summaries, key phrases, practice questions, and flashcards. Notes can also be saved to Azure Blob Storage for future access.

## Features

### AI Summary Generation

* Generate concise summaries from study notes using Azure OpenAI.
* Beginner-friendly summaries that highlight key concepts.
* Copy summaries to the clipboard.
* Save summaries to Azure Blob Storage.

### Key Phrase Extraction

* Extract important terms and concepts from study notes.
* Highlights keywords that are useful for studying and review.

### Practice Questions

* Automatically generate practice questions from notes.
* Includes answers for self-testing and review.
* Helps reinforce understanding of course material.

### Flashcards

* Convert study notes into interactive flashcards.
* Flip cards to reveal definitions and explanations.
* Navigate between generated flashcards for review.

### Saved Notes

* Save generated summaries to Azure Blob Storage.
* View saved summaries from the Saved Notes page.
* Delete saved summaries when no longer needed.

## Technologies Used

### Frontend

* Next.js
* React
* Tailwind CSS
* Lucide React Icons

### Backend

* Next.js API Routes
* Azure OpenAI Service
* Azure Blob Storage

## Team Roles and Responsibilities

| Team Member                       | Responsibilities                                                                                                                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mary Garcia**                   | • Project Proposal Document<br>• Next.js project setup<br>• GitHub repository setup<br>• UI/UX Design<br>• AI Summary integration<br>• Azure Blob Storage integration and Save/Delete functionality<br>• Testing and debugging |
| **Jared Lopez**                   | • Azure Blob Storage setup<br>• API creation for saving and retrieving notes<br>• Storage management functionality<br>• Backend testing                                                                                        |
| **Utsanakorn Chinkonglar (Kate)** | • Azure AI Services setup via Azure AI Foundry<br>• Built API routes for Key Phrase Extraction, Practice Questions, and Flashcard Generation<br>• Built AI Study Tools section<br>• AI prompt engineering and response testing |

## Project Structure

```text
app/
├── api/
│   ├── summarize/
│   ├── keyphrases/
│   ├── questions/
│   ├── flashcards/
│   └── notes/
│       ├── save/
│       ├── list/
│       └── delete/
├── saved/
├── page.js

components/
├── NoteInput.jsx
├── SummaryCard.jsx
├── StudyToolsSection.jsx
├── KeyPhrasesCard.jsx
├── QuestionsCard.jsx
└── FlashcardsCard.jsx

lib/
└── blobStorage.js
```

## Azure Services

### Azure OpenAI

Used to generate:

* Summaries
* Key Phrases
* Practice Questions
* Flashcards

### Azure Blob Storage

Used to:

* Store saved summaries
* Retrieve saved summaries
* Delete saved summaries

## Future Improvements

* Edit saved note titles
* Search saved notes
* User authentication
* Download summaries as PDF
* Study history and analytics
