import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi";

const LandingPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]); // all history

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/url/shorten", {
        originalUrl,
      });
      setOriginalUrl("");
      fetchHistory(); // refresh history after creation
    } catch (err) {
      console.error(err);
      alert("❌ URL shortening failed.");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/url/history");
      //   console.log("response:",res.data)
      setUrls(res.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = (id) => {
    try {
       axios.delete(`http://localhost:4000/api/url/${id}`);
      alert("🗑️ URL deleted");
      fetchHistory(); // refresh after delete
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          🚀 URL Shortener
        </h1>
        <p className="text-lg max-w-xl mx-auto text-white/80 font-medium">
          Enter a long URL and get a short, shareable link instantly.
        </p>
      </header>

      {/* Glassmorphism Form Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-xl space-y-4">
        <form
          onSubmit={handleShorten}
          className="w-full flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="url"
            placeholder="Paste your long URL here..."
            className="flex-grow p-3 rounded w-full bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded hover:bg-purple-100 transition"
          >
            Shorten
          </button>
        </form>
      </div>

      {/* URL History */}
      <div className="mt-10 w-full max-w-xl bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔗 URL History</h3>
        {urls.length === 0 ? (
          <p className="text-white/70">No URLs shortened yet.</p>
        ) : (
          <div className="space-y-3">
            {urls.map((item, index) => (
              <div key={index} className="bg-white/20 p-3 rounded-md">
                <p className="text-sm text-white/70">Original:</p>
                <a
                  href={item.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline break-all"
                >
                  {item.longUrl}
                </a>
                <p className="text-sm mt-1 text-white/70">Short:</p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 underline break-all flex-grow"
                  >
                    {item.shortUrl}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.shortUrl);
                      alert("✅ URL copied to clipboard!");
                    }}
                    className=" text-white px-2 py-1 rounded hover:bg-purple-200 transition"
                    title="Copy to clipboard"
                  >
                    <FiCopy size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-white px-2 py-1 rounded hover:bg-red-500 transition"
                    title="Delete URL"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} URL Shortener. Built with ❤️ by
        Abhishek.
      </footer>
    </div>
  );
};

export default LandingPage;
