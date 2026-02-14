import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import CreateProfile from "./pages/CreateProfile";
import LearnerDashboard from "./pages/LearnerDashboard";
import MentorDashboard from "./pages/MentorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-profile/:role" element={<CreateProfile />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
