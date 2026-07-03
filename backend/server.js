require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Bienvenue sur l'API de réservation 🚀"
  });
});

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});