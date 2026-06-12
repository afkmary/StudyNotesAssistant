# Study Notes Assistant

## Overview

Study Notes Assistant is a web application that helps students review study materials more efficiently. Users can paste study notes into the application, generate AI-powered summaries, and save notes for future review.

This project was developed for the INTP302 Emerging Trends in Software Development Midterm Team Mini Project.

---

## Features

### Current Features

* Paste study notes into the application
* Generate AI summaries
* Copy generated summaries
* Save summaries (UI implemented)
* Loading and empty states
* Responsive and user-friendly interface
* Navigation between Home and Saved Notes pages

### Planned Features

* Azure AI-powered summarization
* Azure Blob Storage integration
* Saved notes history
* Retrieval of previously saved summaries

---

## Technologies Used

### Frontend

* Next.js
* React
* Tailwind CSS
* Lucide React Icons

### Cloud Services

* Azure App Service
* Azure Blob Storage
* Azure AI Language Service / Azure OpenAI

---

## How to Run Locally

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Open Application

```text
http://localhost:3000
https://study-notes-assistant.vercel.app/
```

## Azure Services

| Service                                  | Purpose                    |
| ---------------------------------------- | -------------------------- |
| Azure App Service                        | Hosts the application      |
| Azure AI Language Service / Azure OpenAI | Generates summaries        |
| Azure Blob Storage                       | Stores notes and summaries |

---

## Known Limitations

* Current summary generation uses placeholder data until Azure AI integration is completed.
* Save Summary functionality is currently a frontend placeholder until Blob Storage integration is completed.
* Saved Notes page is currently a prototype and does not yet display stored notes.

---

## Team Members

* Mary Garcia – Frontend Development and Deployment
* Jared Lopez – Backend Development and Storage Integration
* Kate Chinkonglar – AI Integration

---

## Course Information

INTP302 – Emerging Trends in Software Development
SAIT
Midterm Team Mini Project
