import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0f172a] text-white">

      {/* Animated Background Blobs */}
      <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl bottom-[-120px] right-[-120px] animate-pulse" />

      <Navbar />

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6 z-10">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
        >
          MentorMatch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-300 mb-10"
        >
          Connect. Learn. Grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-6"
        >
          <button
            onClick={() => navigate("/auth")}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition transform shadow-xl shadow-purple-500/30"
          >
            Get Started
          </button>

          <button
            className="px-10 py-4 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            Explore Mentors
          </button>
        </motion.div>
      </div>

      {/* WHY SECTION */}
      <div className="py-20 px-10 bg-[#111827] z-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why MentorMatch?
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              Secure & Verified
            </h3>
            <p className="text-gray-400">
              Only verified mentors and learners.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-pink-400">
              Skill Based Matching
            </h3>
            <p className="text-gray-400">
              Smart mentor pairing using skills.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">
              Flexible Scheduling
            </h3>
            <p className="text-gray-400">
              Mentors set their own availability.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Private Communication
            </h3>
            <p className="text-gray-400">
              Contact details revealed after acceptance.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
