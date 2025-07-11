const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./router/user");
const urlRouter=require("./router/urlShortner");
const bodyParser = require("body-parser");
const authMiddleware=require("./middleware/authMiddleware");
const app = express();
const PORT = 4000;
const cors = require("cors")


app.use(cors({
  origin:"http://localhost:5173"
}))

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/url",urlRouter);
app.use("/", urlRouter);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/url-Shortner")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
