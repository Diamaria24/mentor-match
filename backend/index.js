const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get("/create-test-profile", async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Test User",
        role: "mentor"
      }
    ])
    .select();

  if (error) return res.json(error);
  res.json(data);
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
