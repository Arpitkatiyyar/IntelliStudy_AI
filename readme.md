#  IntelliStudy AI

> An AI-powered study assistant that transforms questions and documents into structured learning material including summaries, flashcards, quizzes, and learning analytics.

---

##  Overview

IntelliStudy AI is a full-stack AI learning platform designed to help students study smarter and faster.

Users can either ask questions directly or upload study materials such as **PDF, DOCX, and TXT files**. The platform automatically analyzes the content and generates:

-  Concise Summaries
-  Flashcards
-  Multiple-Choice Quizzes
-  Learning Analytics
-  Study Session History

The application combines modern web technologies with AI models to provide an interactive and personalized learning experience.

---

##  Features

###  Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure API Access

###  AI-Powered Study Generation

- Generate study material from any topic
- AI-generated summaries
- Automatic flashcard creation
- Multiple-choice quiz generation
- Ollama (Llama 3) integration
- Gemini integration support

###  Document Analysis

- Upload PDF files
- Upload DOCX files
- Upload TXT files
- Automatic text extraction
- AI-powered content analysis
- Generate study material from notes and documents

###  Flashcard Learning System

- Review generated flashcards
- Mark flashcards as:
  - Known
  - Difficult
- Track learning progress
- Measure mastery percentage

###  Quiz System

- AI-generated quizzes
- Multiple-choice questions
- Difficulty levels
- Instant answer validation

###  Learning Analytics

- Total Study Sessions
- Total Flashcards
- Known Flashcards
- Difficult Flashcards
- Mastery Percentage
- Weak Topic Detection

###  Study History

- Save AI-generated study sessions
- View previous sessions
- Open detailed session pages
- Delete sessions

###  Redis Caching

- Redis-based caching for document analysis
- Faster repeated document processing
- Reduced AI response time
- Minimized redundant LLM requests

---

##  Technical Highlights

- Implemented JWT-based authentication and protected routes.
- Built AI-powered study material generation using Ollama and Gemini.
- Integrated Redis caching to reduce repeated document processing.
- Designed relational database models using Prisma ORM and MySQL.
- Added support for PDF, DOCX, and TXT document ingestion.
- Implemented flashcard progress tracking and weak-topic analytics.
- Created a scalable backend architecture using controllers, services, middleware, and utilities.

---

##  System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express Backend
 │
 ├── JWT Authentication
 │
 ├── Prisma ORM
 │       │
 │       ▼
 │     MySQL
 │
 ├── Redis Cache
 │
 ├── PDF / DOCX / TXT Extraction
 │
 └── AI Layer
         │
         ├── Ollama (Llama 3)
         └── Gemini
```

---

##  Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- React Context API

### Backend

- Node.js
- Express.js

### Database

- MySQL
- Prisma ORM

### AI & NLP

- Ollama (Llama 3)
- Google Gemini API

### Caching

- Redis

### File Processing

- pdf-parse
- Mammoth

### Authentication

- JWT (JSON Web Tokens)

---

##  Project Structure

```text
AI-STUDY-PROJECT
│
├── backend
│   ├── prisma
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── routes
│       ├── services
│       ├── utils
│       └── validations
│
├── frontend
│   └── src
│       ├── components
│       ├── context
│       ├── layouts
│       ├── pages
│       └── services
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/Arpitkatiyyar/IntelliStudy_AI.git

cd IntelliStudy_AI
```

### 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/intellistudy"

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key

REDIS_URL=redis://localhost:6379
```

Run Prisma:

```bash
npx prisma migrate dev

npx prisma generate
```

Start Backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

### 4. Start Redis

Using Docker:

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

Verify:

```bash
docker ps
```

---

### 5. Start Ollama

Pull Llama 3:

```bash
ollama pull llama3
```

Start Ollama:

```bash
ollama serve
```

---

##  Future Improvements

- AI Recommendation Engine
- Study Streak Tracking
- Dark Mode
- Collaborative Study Sessions
- Quiz Attempt Analytics

---


##  Support

If you found this project useful, consider giving it a star on GitHub.