const urlShortner = require("../model/urlShortner");
const { nanoid } = require("nanoid");

const BASE_URL = "http://localhost:4000";

const shorten = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Long URL is required" });
  }

  try {
    const shortCode = nanoid(6);
    const shortUrl = `${BASE_URL}/${shortCode}`;

    // Save to DB
    const newUrl = await urlShortner.create({
      longUrl: originalUrl,
      shortUrl,
    });

    return res.status(201).json({ shortUrl: newUrl.shortUrl });
  } catch (err) {
    console.error("Error in shorten:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const shortUrl = `${BASE_URL}/${shortCode}`;
    const entry = await urlShortner.findOne({ shortUrl });
    if (entry) {
      return res.redirect(entry.longUrl);
    } else {
      return res.status(404).send("❌ Short URL not found");
    }
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).send("🚨 Server error");
  }
};

const getHistory = async (req, res) => {
  try {
    const urls = await urlShortner.find(); // Fetch all records
    res.json(urls);
    ``;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteUrl = async (req,res) => {
  try {
    const { id } = req.params;
    await urlShortner.findByIdAndDelete(id);
    res.json({ message: "Url deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
};
module.exports = { shorten, redirectUrl, getHistory,deleteUrl };
