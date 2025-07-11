const mongoose = require("mongoose");

const urlShortnerSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "user",
  },
  longUrl: {
    type: String,
    required: true, 
  },
  shortUrl: {
    type: String,
    required: true,
  },
});

const UrlShortner = mongoose.model("UrlShortner", urlShortnerSchema);

module.exports = UrlShortner;
