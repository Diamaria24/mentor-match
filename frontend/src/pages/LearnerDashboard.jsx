import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LearnerDashboard() {
  const [learnerProfile, setLearnerProfile] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ NEW — message + urgency state per mentor
  const [messages, setMessages] = useState({});
  const [urgencies, setUrgencies] = useState({});

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    await fetchLearnerProfile();
  };

  const fetchLearnerProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setLearnerProfile(data);

    fetchMentors(data);
    fetchRequests(user.id);
  };

  // ===============================
  // AI SCORE
  // ===============================
  const calculateScore = (mentor, learner) => {
    if (!learner) return 0;

    let score = 0;

    if (
      learner.skills &&
      mentor.skills &&
      mentor.skills.toLowerCase().includes(learner.skills.toLowerCase())
    ) {
      score += 5;
    }

    if (
      learner.learning_goals &&
      mentor.skills &&
      mentor.skills
        .toLowerCase()
        .includes(learner.learning_goals.toLowerCase())
    ) {
      score += 4;
    }

    if (mentor.experience_level === "Expert") score += 4;
    if (mentor.experience_level === "Intermediate") score += 2;

    if (mentor.availability === "Full-Time") score += 3;

    score += mentor.avgRating || 0;

    return score;
  };

  // ===============================
  // FETCH MENTORS
  // ===============================
  const fetchMentors = async (learnerData) => {
    const { data: mentorsData } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "mentor");

    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("*");

    const ratingMap = {};

    (reviewsData || []).forEach((review) => {
      if (!ratingMap[review.mentor_id]) {
        ratingMap[review.mentor_id] = [];
      }
      ratingMap[review.mentor_id].push(review.rating);
    });

    const mentorsWithRatings = (mentorsData || []).map((mentor) => {
      const ratings = ratingMap[mentor.id] || [];

      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      return {
        ...mentor,
        avgRating,
        score: calculateScore({ ...mentor, avgRating }, learnerData),
      };
    });

    const sortedMentors = mentorsWithRatings.sort(
      (a, b) => b.score - a.score
    );

    setMentors(sortedMentors);
    setFilteredMentors(sortedMentors);
  };

  // ===============================
  // FETCH REQUESTS
  // ===============================
  const fetchRequests = async (learnerId) => {
    const { data } = await supabase
      .from("mentorship_requests")
      .select("*")
      .eq("learner_id", learnerId)
      .order("urgency_days", { ascending: true });

    setRequests(data || []);
  };

  // ===============================
  // SEARCH
  // ===============================
  useEffect(() => {
    const filtered = mentors.filter(
      (mentor) =>
        mentor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMentors(filtered);
  }, [searchTerm, mentors]);

  // ===============================
  // SEND REQUEST (UPDATED)
  // ===============================
  const sendRequest = async (mentorId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("mentorship_requests").insert([
      {
        mentor_id: mentorId,
        learner_id: user.id,
        status: "pending",
        urgency_days: urgencies[mentorId] || 3,
        message:
          messages[mentorId] || "I'd love to learn from you!",
      },
    ]);

    // reset after send
    setMessages((prev) => ({ ...prev, [mentorId]: "" }));
    setUrgencies((prev) => ({ ...prev, [mentorId]: "" }));

    fetchRequests(user.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white flex flex-col">
      <Navbar />

      <div className="flex-1 px-8 py-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Learner Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 mb-10 rounded-xl bg-white/10 border border-white/20"
        />

        <h2 className="text-2xl font-semibold mb-6">
          Smart Mentor Recommendations
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl"
            >
              {mentor.score >= 7 && (
                <span className="text-green-400 text-xs mb-2 block">
                  🔥 AI Recommended
                </span>
              )}

              <h3 className="text-xl font-bold mb-2">
                {mentor.full_name}
              </h3>

              <p>Skills: {mentor.skills}</p>
              <p>Experience: {mentor.experience_level}</p>

              <p className="text-yellow-400">
                ⭐{" "}
                {mentor.avgRating
                  ? mentor.avgRating.toFixed(1)
                  : "No ratings"}
              </p>

              <p className="text-purple-400 mb-4">
                AI Score: {mentor.score}
              </p>

              {/* ✅ MESSAGE FIELD */}
              <textarea
                placeholder="Write a message..."
                value={messages[mentor.id] || ""}
                onChange={(e) =>
                  setMessages((prev) => ({
                    ...prev,
                    [mentor.id]: e.target.value,
                  }))
                }
                className="w-full p-2 mb-3 rounded-lg bg-white/10 border border-white/20"
              />

              {/* ✅ URGENCY FIELD */}
              <input
                type="number"
                placeholder="Urgency (days)"
                value={urgencies[mentor.id] || ""}
                onChange={(e) =>
                  setUrgencies((prev) => ({
                    ...prev,
                    [mentor.id]: e.target.value,
                  }))
                }
                className="w-full p-2 mb-4 rounded-lg bg-white/10 border border-white/20"
              />

              <button
                onClick={() => sendRequest(mentor.id)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>

        {/* REQUESTS */}
        <h2 className="text-2xl font-semibold mb-6">
          My Requests
        </h2>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white/10 p-4 rounded-xl"
            >
              <p className="mb-1">
                <strong>Message:</strong> {req.message}
              </p>

              <p className="text-sm text-gray-300 mb-1">
                Urgency: {req.urgency_days} days
              </p>

              <p>Status: {req.status}</p>

              {req.urgency_days <= 2 && (
                <span className="text-red-400 text-sm">
                  ⚡ High Priority
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LearnerDashboard;
