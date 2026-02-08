# AI-Product-Manager


HackathonPM.ai

HackathonPM.ai is an AI-powered Product Manager dashboard that helps hackathon teams convert an idea into a complete product plan instantly.

It generates:
 Overview
 Roadmap
 MVP Plan
 Tech Stack
 Critic Review
 Presentation Script
 Architecture Diagram

It also includes Tambo-powered AI tools like:
 AI Assistant Panel
 Improves Inline Section
 Bug Fix Assistant


Tech Stack:
 Frontend: React + Vite
 Backend: Node.js + Express
 AI: Groq LLM + Tambo React SDK


Tambo (@tambo-ai/react) is integrated in the frontend using TamboProvider and useTambo() to enable:
 AI assistant chat
 Inline improvements
 Bug fixing & code review tools


Setup
 Backend:
  cd Backend
  npm install
  npm start

 Frontend:
  cd frontend/pm-ai
  npm install
  npm run dev


Create .env in frontend:
 tambo api-key && projectId
 Backend Url
