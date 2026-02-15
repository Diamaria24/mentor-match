import { BrowserRouter, Routes, Route } from "react-router-dom";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import LearnerDashboard from "./pages/LearnerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import CreateProfile from "./pages/CreateProfile";

import ProtectedRoute from "./components/ProtectedRoute"; // ✅ THIS WAS MISSING
import Auth from "./pages/Auth";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route
  path="/create-profile/:role"
  element={
    <ProtectedRoute>
      <CreateProfile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/create-profile/:role"
  element={
    <ProtectedRoute>
      <CreateProfile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/create-profile/:role"
  element={
    <ProtectedRoute>
      <CreateProfile />
    </ProtectedRoute>
  }
/>


        {/* PROTECTED ROUTES */}
        <Route
          path="/learner-dashboard"
          element={
            <ProtectedRoute>
              <LearnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
