import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center text-center px-6">
      
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to MentorMatch
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Connect. Learn. Grow.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </Link>

        <Link
          to="/dashboard"
          className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Explore Mentors
        </Link>
      </div>
    </div>
  );
}
