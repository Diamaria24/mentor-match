import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LearnerDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      fetchProfile(user.id);
      fetchMentors();
      fetchRequests(user.id);
    }
  };

  const fetchProfile = async (id) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    setProfile(data);
  };

  const fetchMentors = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "mentor");

    setMentors(data || []);
  };

  const fetchRequests = async (learnerId) => {
    const { data } = await supabase
      .from("requests")
      .select("*")
      .eq("learner_id", learnerId);

    setRequests(data || []);
  };

  const sendRequest = async (mentorId) => {
    await supabase.from("requests").insert([
      {
        mentor_id: mentorId,
        learner_id: user.id,
        status: "pending",
      },
    ]);

    fetchRequests(user.id);
  };

  const countByStatus = (status) =>
    requests.filter((r) => r.status === status).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col">
      <Navbar />

      <div className="flex-1 p-10 max-w-7xl mx-auto">

        {/* Welcome Section */}
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {profile?.full_name} 👋
        </h1>
        <p className="text-gray-300 mb-8">
          Here’s your mentorship activity overview.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Pending Requests" value={countByStatus("pending")} />
          <StatCard title="Accepted" value={countByStatus("accepted")} />
          <StatCard title="Rejected" value={countByStatus("rejected")} />
        </div>

        {/* Mentor Suggestions */}
        <h2 className="text-2xl font-semibold mb-6">
          Recommended Mentors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20"
            >
              <h3 className="text-xl font-bold mb-2">
                {mentor.full_name}
              </h3>
              <p className="text-gray-300 mb-2">
                Skills: {mentor.skills}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Experience: {mentor.experience_level}
              </p>

              <button
                onClick={() => sendRequest(mentor.id)}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-2 rounded-xl hover:opacity-90 transition"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>

        {/* My Requests */}
        <h2 className="text-2xl font-semibold mb-6">
          My Requests
        </h2>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white/10 backdrop-blur-xl p-4 rounded-xl flex justify-between items-center border border-white/20"
            >
              <span>Mentor ID: {req.mentor_id}</span>
              <StatusBadge status={req.status} />
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 text-center">
      <h3 className="text-lg text-gray-300">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    pending: "bg-yellow-500",
    accepted: "bg-green-500",
    rejected: "bg-red-500",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default LearnerDashboard;
