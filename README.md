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

## Team Contributions

### Mary Garcia

* User Interface design and styling
* Summary generation feature
* Azure OpenAI integration
* Azure Blob Storage integration
* Saved Notes page
* Save and Delete functionality
* README documentation

### Kate

* Key Phrase Extraction feature
* Practice Questions feature
* Flashcards feature
* AI Study Tools integration
* Azure OpenAI API routes for study tools

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

## Authors

Mary Garcia
Kate
