import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function CreateProfile() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    address: "",
    age: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    skills: "",
    goals: "",
    availability: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("profiles").insert([
      {
        id: user.id,
        role,
        ...form,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error saving profile");
      return;
    }

    alert("Profile saved successfully 🎉");

    if (role === "mentor") navigate("/mentor-dashboard");
    else navigate("/learner-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create {role} Profile
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input name="full_name" placeholder="Full Name" onChange={handleChange} className="input-field col-span-2" />

          <input name="address" placeholder="Address" onChange={handleChange} className="input-field col-span-2" />

          <input name="age" placeholder="Age" type="number" onChange={handleChange} className="input-field" />

          <input name="dob" type="date" onChange={handleChange} className="input-field" />

          <select name="gender" onChange={handleChange} className="input-field col-span-2">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input name="phone" placeholder="Phone Number" onChange={handleChange} className="input-field" />

          <input name="email" placeholder="Email" onChange={handleChange} className="input-field" />

          {role === "learner" && (
            <>
              <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="input-field col-span-2" />
              <input name="goals" placeholder="Learning Goals" onChange={handleChange} className="input-field col-span-2" />
            </>
          )}

          {role === "mentor" && (
            <>
              <input name="skills" placeholder="Skills" onChange={handleChange} className="input-field col-span-2" />
              <input name="availability" placeholder="Availability" onChange={handleChange} className="input-field" />
              <input name="experience" placeholder="Experience Level" onChange={handleChange} className="input-field" />
            </>
          )}

        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
        >
          Submit Profile
        </button>

      </form>
    </div>
  );
}

export default CreateProfile;
