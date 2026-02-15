import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ IMPORTANT: redirect to create profile page
    navigate(`/create-profile/${role}`);
  };

  return (
    <div>
      {/* your UI remains same */}
    </div>
  );
}

export default Auth;
