import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Dashboard() {
  const [mentors, setMentors] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
    fetchMentors();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const fetchMentors = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "mentor");

    if (!error) {
      setMentors(data);
    }
  };

  const sendRequest = async (mentorId) => {
    const { error } = await supabase.from("mentorship_requests").insert({
      mentor_id: mentorId,
      learner_id: user.id,
      status: "pending",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Request sent!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Available Mentors</h1>

      <div className="grid gap-4">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{mentor.name}</h2>
              <p className="text-gray-600">{mentor.bio}</p>
            </div>

            <button
              onClick={() => sendRequest(mentor.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
