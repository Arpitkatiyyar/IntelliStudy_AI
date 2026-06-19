#  IntelliStudy AI

> An AI-powered study assistant that transforms questions and documents into structured learning material including summaries, flashcards, quizzes, and learning analytics.

---

##  Overview

IntelliStudy AI is a full-stack AI learning platform designed to help students study smarter and faster.

Users can ask questions or upload study materials such as **PDF, DOCX, and TXT files**. The platform automatically analyzes content and generates:

-  AI-powered Summaries
-  Flashcards
-  Multiple-Choice Quizzes
-  Learning Analytics
-  Study Session History

The application combines modern web technologies with Large Language Models (LLMs) to provide an interactive and personalized learning experience.

---

##  Features

###  Authentication & Security

- User Registration & Login
- JWT Authentication
- Refresh Token Authentication
- HTTP-only Cookies
- Protected Routes
- Password Hashing using bcrypt
- Secure API Access
- Rate Limiting
- Email OTP Verification

### AI-Powered Study Generation

- AI-generated summaries
- Automatic flashcard generation
- AI-generated quizzes
- Generate study material from any topic
- Ollama (Llama 3) integration
- Google Gemini integration

### Document Analysis

- PDF Upload Support
- DOCX Upload Support
- TXT Upload Support
- Automatic Text Extraction
- AI-powered Content Analysis
- Generate Study Material from Notes and Documents

### Flashcard Learning System

- Review generated flashcards
- Mark flashcards as:
  - Known
  - Difficult
- Progress Tracking
- Mastery Percentage Calculation

### Quiz System

- AI-generated MCQs
- Difficulty Levels
- Instant Answer Validation

### Learning Analytics

- Total Study Sessions
- Total Flashcards
- Known Flashcards
- Difficult Flashcards
- Mastery Percentage
- Weak Topic Detection

### Study History

- Save Study Sessions
- View Previous Sessions
- Open Session Details
- Delete Sessions

### Redis Integration

- Document Analysis Caching
- OTP Storage
- Temporary Authentication Data
- Faster Repeated Requests
- Reduced AI Response Time

<!-- ### Docker Support

- Frontend Container
- Backend Container
- MySQL Container
- Redis Container
- One-command Deployment -->

---

## System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express Backend
 │
 ├── JWT + Refresh Token Auth
 │
 ├── Prisma ORM
 │       │
 │       ▼
 │     MySQL
 │
 ├── Redis Cache
 │       ├── Document Cache
 │       └── OTP Storage
 │
 ├── File Processing Layer
 │       ├── PDF
 │       ├── DOCX
 │       └── TXT
 │
 └── AI Layer
         ├── Ollama (Llama 3)
         └── Google Gemini
```

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Context API

### Backend

- Node.js
- Express.js

### Database

- MySQL
- Prisma ORM

### Authentication

- JWT
- Refresh Tokens
- HTTP-only Cookies
- bcrypt

### AI & NLP

- Ollama (Llama 3)
- Google Gemini API

### Caching

- Redis

### File Processing

- pdf-parse
- Mammoth

### DevOps

- Docker
- Docker Compose

---

## Project Structure

```text
IntelliStudy_AI
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
<!-- ├── docker-compose.yml -->
├── README.md
└── .env
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Arpitkatiyyar/IntelliStudy_AI.git

cd IntelliStudy_AI
```

---

### 2. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
DATABASE_URL=mysql://root:password@localhost:3306/intellistudy

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret

REDIS_URL=redis://localhost:6379

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_google_app_password

GEMINI_API_KEY=your_gemini_api_key
```

---

### 3. Backend Setup

```bash
cd backend

npm install

npx prisma migrate dev

npx prisma generate

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### 4. Frontend Setup

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

### 5. Redis Setup

Using Docker:

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

Verify:

```bash
docker ps
```

---

### 6. Ollama Setup

Install Ollama and pull Llama 3:

```bash
ollama pull llama3
```

Start Ollama:

```bash
ollama serve
```

---

<!-- ## Run with Docker

Build and start all services:

```bash
docker compose up -d --build
```

Stop all services:

```bash
docker compose down
```

View containers:

```bash
docker ps
``` -->

| Service | Port |
|----------|------|
| Frontend | 5173 |
| Backend | 5000 |
| MySQL | 3307 |
| Redis | 6379 |

---

##  AI Models

### Ollama

- Runs locally
- No API cost
- Privacy-friendly
- Uses Llama 3

### Google Gemini

- Cloud-based AI
- Fast response times
- Easy deployment

---

##  Resume Highlights

- Built a full-stack AI-powered learning platform using React, Node.js, Express, Prisma, MySQL, Redis, and Ollama.
- Implemented secure authentication using JWT, Refresh Tokens, HTTP-only Cookies, Rate Limiting, and Email OTP Verification.
- Developed an AI pipeline that generates summaries, flashcards, and quizzes from user queries and uploaded documents.
- Integrated Redis caching and OTP storage to improve performance and authentication workflows.
- Containerized the complete application using Docker and Docker Compose.
- Designed analytics features including weak-topic detection, mastery tracking, and study session history.

---

##  Future Improvements

- AI Recommendation Engine
- Study Streak Tracking
- Quiz Attempt Analytics
- Collaborative Study Sessions
- Dark Mode
- Mobile Application

---

##  Support

If you found this project useful, consider giving it a star on GitHub.

---


