import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function MentorDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mentorData, setMentorData] = useState(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      navigate("/");
      return;
    }

    console.log("Logged user role:", data.role); // DEBUG

    if (data.role?.toLowerCase() !== "mentor") {
      navigate("/learner-dashboard");
      return;
    }

    setMentorData(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {mentorData.full_name}
      </h1>

      <div className="bg-white/10 p-6 rounded-xl mb-6">
        <p><strong>Skills:</strong> {mentorData.skills}</p>
        <p><strong>Experience:</strong> {mentorData.experience_level}</p>
        <p><strong>Availability:</strong> {mentorData.availability}</p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-6 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}

export default MentorDashboard;
