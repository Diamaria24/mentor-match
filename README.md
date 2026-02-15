🎯 MentorMatch

A peer-to-peer mentorship platform built using React + Node.js + Supabase that connects learners with suitable mentors using smart matching logic.

👥 Team Details

Team Name: CodeQueens
College: Saintgits College of Engineering, Kottayam

Team Members:
Anakh Sasidhara Kurup – Backend Development & Database Design
Dia Maria Varghese – Frontend Development & UI/UX

🔗 Hosted Project Link

Frontend: http://localhost:5173

Backend API: http://localhost:5000

(Replace with deployed links if hosted)

📌 Project Description

MentorMatch is a smart mentorship platform that connects learners with mentors based on skills, availability, and compatibility.
It uses algorithmic matching and real-time updates to create an interactive and scalable mentoring experience.

❗ Problem Statement

Many learners struggle to find the right mentor who matches their skills, interests, and availability.
Existing platforms lack intelligent matching and real-time interaction.

✅ Our Solution

MentorMatch solves this by:

Matching mentors and learners using a compatibility score

Enabling mentorship requests and approvals

Providing ratings and reviews for credibility

Supporting real-time status updates

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Supabase Client

Backend

Node.js

Express.js

Supabase (Database + Auth)

dotenv

Database

Supabase PostgreSQL

Row Level Security (RLS)

Realtime Subscriptions

🚀 Key Features
1️ Smart Matching Score

Calculates compatibility %

Based on:

Skills match (70%)

Availability match (30%)

Displays: “85% Compatibility”

2️ Rating System

Learners rate mentors (1–5 stars)
Helps build mentor credibility

3  Mentor Badges

Top Rated

Most Active

Verified Mentor

5️ Role-Based Access (RLS)
Users can insert/update only their own profile

Secure database policies

6 Algorithmic AI (Smart Matching Logic)

📂 Project Structure
mentor-match/
│
├── backend/                     # Supabase
│   ├── node_modules/            # Installed dependencies
│   ├── index.js                 # Main server file
│   ├── package.json             # Backend dependencies & scripts
│   ├── package-lock.json
│   └── .env                     # Environment variables (NOT pushed to Git)
│
├── frontend/                    # React (Vite) frontend
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/              # Images, icons
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── supabaseClient.js    # Supabase configuration
│   │   ├── App.jsx              # Main App component
│   │   ├── main.jsx             # Entry point
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── .gitignore
├── .gitattributes
└── README.md

⚙ Installation
Backend
cd backend
npm install

Create .env file:

SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
PORT=5000

Run:

node index.js

Frontend
cd frontend
npm install
npm run dev

📡 API Endpoints
GET /test

Returns all profiles

POST /create-test-profile

Creates a test profile in Supabase

POST /request-mentorship

Creates mentorship request
🔐 Database Tables
profiles

id (UUID)

name

role (mentor/learner)

bio

availability

skills (text[])

contact_method

contact_value

created_at

mentorship_requests

id

learner_id

mentor_id

status

created_at

🏗 System Architecture

User (Frontend React)
⬇
Express Backend
⬇
Supabase (PostgreSQL + Auth + Realtime)

🎥 Demo

https://drive.google.com/file/d/1fklYnmwLFD3eruHqixYgJDuBDeC-tzIh/view?usp=drivesdk


🔐 Database Tables
profiles

id (UUID)

name

role (mentor/learner)

bio

availability

skills (text[])

contact_method

contact_value

created_at

mentorship_requests

id

learner_id

mentor_id

status

created_at

🏗 System Architecture

User (Frontend React)
⬇
Express Backend
⬇
Supabase (PostgreSQL + Auth + Realtime)

🎥 Demo


🤖 AI Tools Used

Tool: ChatGPT
Purpose:

Backend debugging

Matching algorithm logic

Code structuring

Documentation formatting

Approximate AI-generated assistance: ~30%

👨‍💻 Team Contributions

Anakha Sasidhara Kurup

Backend API development

Supabase integration

RLS configuration

Matching algorithm logic

Dia Maria Varghese

UI/UX design

React components

Frontend integration

User flow implementation

📄 License

This project is licensed under the MIT License.
