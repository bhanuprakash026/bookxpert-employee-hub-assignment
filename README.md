# Tech Stack

Frontend: React 18, TypeScript
Build Tool: Vite
State Management: Redux Toolkit
Routing: React Router DOM
Forms & Validation: React Hook Form, Zod
Styling: Tailwind CSS
Mock Backend: json-server

Linting: ESLint

# Project Structure:
bookxpert-employee-hub-assignment/
└─ employee-hub/
   ├─ src/
   │  ├─ components/
   │  ├─ pages/
   │  ├─ services/
   │  ├─ hooks/
   │  ├─ store/
   │  ├─ lib/
   │  └─ main.tsx
   ├─ db.json
   ├─ vite.config.ts
   ├─ tsconfig*.json
   ├─ package.json
   └─ index.html

Prerequisites

Make sure you have the following installed on your system:

Node.js ≥ 18
node -v

# Clone the Repository
git clone https://github.com/bhanuprakash026/bookxpert-employee-hub-assignment.git

# Navigate into the project folder:
cd bookxpert-employee-hub-assignment/employee-hub

# Install dependencies:
npm install

# Running the Application Locally
The project uses two servers:

  1. Vite Dev Server – Frontend
  2. json-server – Mock backend API

# Start the Mock Backend (json-server)
npm run server
  # Runs on: http://localhost:3001

# Start the Vite Dev Server
npm run dev
  # Runs on: http://localhost:5173
