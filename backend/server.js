const express = require("express")
const cors = require('cors')
const connectDb = require("./config/db")
const authRoutes=require("./routes/authRoutes")

require("dotenv").config();
connectDb();

const app = express()

// middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    
})