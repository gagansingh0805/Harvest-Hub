require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const cropRoutes = require("./routes/cropRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const marketRoutes = require("./routes/marketRoutes");
connectDb();

const app = express();

// middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" })); // Increased limit for plant images

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/market", marketRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
