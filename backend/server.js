require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});