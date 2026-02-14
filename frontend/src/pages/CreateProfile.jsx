import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

function CreateProfile() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [dialog, setDialog] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [form, setForm] = useState({
    full_name: "",
    address: "",
    age: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    skills: "",
    learning_goals: "",
    availability: "",
    experience_level: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setDialog({
        show: true,
        message: "User not authenticated ❌",
        type: "error",
      });
      return;
    }

    const insertData = {
      id: user.id,
      role,
      full_name: form.full_name,
      address: form.address,
      age: form.age ? parseInt(form.age) : null,
      dob: form.dob || null,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      skills: form.skills
        ? form.skills.split(",").map((s) => s.trim())
        : [],
      learning_goals:
        role === "learner" ? form.learning_goals : null,
      availability:
        role === "mentor" ? form.availability : null,
      experience_level:
        role === "mentor" ? form.experience_level : null,
    };

    const { error } = await supabase
      .from("profiles")
      .insert([insertData]);

    if (error) {
      console.log(error);
      setDialog({
        show: true,
        message: error.message,
        type: "error",
      });
      return;
    }

    setDialog({
      show: true,
      message: `${role} profile created successfully 🎉`,
      type: "success",
    });

    setTimeout(() => {
      if (role === "mentor") navigate("/mentor-dashboard");
      else navigate("/learner-dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Create {role} Profile
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Full Name"
            className="col-span-2 input-field"
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            className="col-span-2 input-field"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Age"
            className="input-field"
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <input
            type="date"
            className="input-field"
            onChange={(e) =>
              setForm({ ...form, dob: e.target.value })
            }
          />

          <select
            className="col-span-2 input-field"
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Phone"
            className="input-field"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="col-span-2 input-field"
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value })
            }
          />

          {role === "learner" && (
            <textarea
              placeholder="Learning Goals"
              className="col-span-2 input-field"
              onChange={(e) =>
                setForm({ ...form, learning_goals: e.target.value })
              }
            />
          )}

          {role === "mentor" && (
            <>
              <input
                type="text"
                placeholder="Availability"
                className="col-span-2 input-field"
                onChange={(e) =>
                  setForm({ ...form, availability: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Experience Level"
                className="col-span-2 input-field"
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience_level: e.target.value,
                  })
                }
              />
            </>
          )}

        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-xl shadow-xl hover:scale-105 transition"
        >
          Submit Profile
        </button>
      </form>

      {dialog.show && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 text-white animate-fadeIn">
          {dialog.message}
        </div>
      )}
    </div>
  );
}

export default CreateProfile;
