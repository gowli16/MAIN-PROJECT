const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in /:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /users:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    }

    return res.status(401).json({ message: "Invalid username or password" });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ message: "Database error" });
  }
});

app.get("/medicines", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const pattern = `${search}%`;

    const result = await pool.query(
      `
      SELECT
        medicines.*,
        pharmacies.name AS pharmacy,
        pharmacies.address,
        pharmacies.phone,
        pharmacies.distance,
        pharmacies.timing,
        pharmacies.delivery
      FROM medicines
      JOIN pharmacies ON medicines.pharmacy_id = pharmacies.id
      WHERE LOWER(medicines.medicine) LIKE LOWER($1)
        OR LOWER(medicines.brand) LIKE LOWER($1)
        OR LOWER(medicines.category) LIKE LOWER($1)
      `,
      [pattern]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error in /medicines:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});