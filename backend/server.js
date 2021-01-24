const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

// Init Middleware

app.use(express.json({ extended: false }));

//Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API RUNNING");
});

app.listen(PORT, () => console.log(`BACKEND STARTED AT ${PORT}`));
