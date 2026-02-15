MentorMatch – Peer-to-Peer Mentorship Platform


👥 Team Details

Team Name: CodeQueens

College: Saintgits College of Engineering, Kottayam

Team Members

Anakh Sasidhara Kurup – Backend Development & Database Design

Dia Maria Varghese – Frontend Development & UI/UX

🔗 Hosted Project Link

Frontend (Local): http://localhost:5173

Backend API (Local): http://localhost:5000

Deployed Link: https://mentor-match-rust.vercel.app/auth

📌 Project Description

A smart mentorship platform connecting learners and mentors

Uses algorithmic matching logic

Supports real-time interaction & updates

Secure and scalable architecture

❗ Problem Statement

Learners struggle to find suitable mentors

Lack of intelligent skill-based matching

No real-time interaction in existing platforms

✅ Our Solution

MentorMatch solves this by:

✔ Matching mentors using a compatibility score

✔ Enabling mentorship requests & approvals

✔ Providing ratings & reviews

✔ Supporting real-time updates

✔ Ensuring secure role-based access

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Supabase Client

React Router DOM

Backend

Node.js

Express.js

Supabase (Database + Auth)

dotenv

Database

Supabase PostgreSQL

Row Level Security (RLS)

Realtime Subscriptions

Deployment

Vercel (Frontend)

GitHub (Version Control)

🚀 Key Features
1️⃣ Smart Matching Score

Calculates compatibility percentage

Based on:

Skills match (70%)

Availability match (30%)

Example: “85% Compatibility”

2️⃣ Rating System

Learners rate mentors (1–5 stars)

Builds mentor credibility

3️⃣ Mentor Badges

🏆 Top Rated

⚡ Most Active

✅ Verified Mentor

4️⃣ Role-Based Access (RLS)

Users can modify only their own data

Secure database policies

5️⃣ Algorithmic Matching Logic

AI-inspired compatibility scoring

<img width="1035" height="674" alt="image" src="https://github.com/user-attachments/assets/7a900e7c-7e57-4ac7-81ad-059548b89763" />

API Endpoints

GET /test → Returns all profiles

POST /create-test-profile → Creates test profile

POST /request-mentorship → Creates mentorship request

🗄 Database Tables
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

System Architecture 

<img width="1134" height="748" alt="image" src="https://github.com/user-attachments/assets/702e1fe5-6e57-4178-84be-3fbe3924ddd4" />

Architecture Flow

User (React Frontend)
⬇
Express Backend (API Layer)
⬇
Supabase (PostgreSQL + Auth + Realtime)

Database ER marks 

Entity Relationships

profiles → linked to mentorship_requests

mentorship_requests → linked to learners & mentors

Optional: reviews, messages tables

🎥 Demo Video

🔗 https://drive.google.com/file/d/1fklYnmwLFD3eruHqixYgJDuBDeC-tzIh/view?usp=drivesdk

🤖 AI Tools Used

Tool: ChatGPT

Used For:

Backend debugging

Matching algorithm logic

Code structuring

Documentation formatting

Approximate AI assistance: ~30%

👨‍💻 Team Contributions
Anakh Sasidhara Kurup

Backend API Development

Supabase Integration

RLS Configuration

Matching Algorithm Logic

Dia Maria Varghese

UI/UX Design

React Component Development

Frontend Integration

User Flow Implementation

📄 License

MIT License




Skill overlap detection

Dynamic ranking of mentors
