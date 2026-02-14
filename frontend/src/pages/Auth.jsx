import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("signup");
  const [role, setRole] = useState("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      showMessage("🎉 Signup successful! Please create your profile.");
      setTimeout(() => {
        navigate(`/create-profile/${role}`);
      }, 1500);
    } else {
      showMessage(error.message);
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      const { data: userData } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (data?.role === "mentor") {
        navigate("/mentor-dashboard");
      } else {
        navigate("/learner-dashboard");
      }
    } else {
      showMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">

      <Navbar />

      <div className="flex flex-1">

        {/* LEFT SIDE */}
        <div className="w-1/2 flex items-center justify-center p-10">

          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">

            <h2 className="text-3xl font-bold mb-6 text-center">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>

            {/* ROLE SELECT */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setRole("learner")}
                className={`px-4 py-2 rounded-xl transition ${
                  role === "learner"
                    ? "bg-green-600"
                    : "bg-white/20 hover:bg-green-600/70"
                }`}
              >
                Learner
              </button>

              <button
                onClick={() => setRole("mentor")}
                className={`px-4 py-2 rounded-xl transition ${
                  role === "mentor"
                    ? "bg-pink-600"
                    : "bg-white/20 hover:bg-pink-600/70"
                }`}
              >
                Mentor
              </button>
            </div>

            <input
              className="w-full mb-4 p-3 rounded-xl bg-white/20 outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full mb-4 p-3 rounded-xl bg-white/20 outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* MAIN BUTTON */}
            <button
              onClick={mode === "signup" ? handleSignup : handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl hover:scale-105 transition mb-4"
            >
              {mode === "signup" ? "Signup" : "Login"}
            </button>

            {/* MODE SWITCH (MOVED TO BOTTOM) */}
            <div className="text-center">
              {mode === "signup" ? (
                <p className="text-sm text-gray-300">
                  Already registered?{" "}
                  <span
                    className="text-pink-400 cursor-pointer"
                    onClick={() => setMode("login")}
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-300">
                  New here?{" "}
                  <span
                    className="text-purple-400 cursor-pointer"
                    onClick={() => setMode("signup")}
                  >
                    Create Account
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex items-center justify-center p-16 bg-black/40">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">
              Why MentorMatch?
            </h2>
            <ul className="space-y-4 text-lg text-gray-300">
              <li>✔ Secure & Verified Users</li>
              <li>✔ Skill Based Matching</li>
              <li>✔ Flexible Scheduling</li>
              <li>✔ Private Communication</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM DIALOG MESSAGE */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-white/20"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Auth;
