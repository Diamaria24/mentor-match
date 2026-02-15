import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!data) {
      navigate("/create-profile/learner");
      return;
    }

    if (data.role === "mentor") {
      navigate("/mentor-dashboard");
    } else {
      navigate("/learner-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white">
      <div className="bg-white/10 p-10 rounded-3xl w-96 backdrop-blur-xl">
        <h2 className="text-3xl mb-6 text-center">Login</h2>

        <input
          className="w-full p-3 mb-4 rounded-xl bg-white/20"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded-xl bg-white/20"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
