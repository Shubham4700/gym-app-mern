import React, { useState, useEffect } from "react";
import {
  Star,
  ArrowUp,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW STATES
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // 🔥 FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/feedback");
      const data = await res.json();

      setReviews(data.feedbacks.slice(0, 3));
      setAvgRating(data.avgRating);
      setTotalReviews(data.total);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);

    fetchReviews(); // 🔥 load on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 SUBMIT FUNCTION
  const handleSubmit = async () => {
    if (!rating || !message) {
      alert("Please give rating and write feedback");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, message }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Server error");
      }

      alert("✅ Feedback submitted");

      setRating(0);
      setMessage("");

      fetchReviews(); // 🔥 refresh after submit

    } catch (err) {
      console.error("❌ Error:", err.message);
      alert(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="relative text-white py-24 px-6 text-center overflow-hidden">

        {/* 🔥 BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black"></div>

          <div className="absolute top-[-150px] left-[20%] w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[140px] rounded-full animate-[spin_20s_linear_infinite]"></div>

          <div className="absolute bottom-[-150px] right-[20%] w-[500px] h-[500px] bg-yellow-500 opacity-20 blur-[140px] rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>

        {/* TITLE */}
        <h2 className="text-4xl font-semibold tracking-wide text-yellow-400 mb-4 overflow-hidden">
          Feedback
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto text-sm mb-6">
          Premium fitness experience with expert trainers and real transformation results.
        </p>

        {/* ⭐ AVG RATING (DYNAMIC) */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="flex gap-1">
            {[1,2,3,4,5].map((i) => (
              <Star
                key={i}
                size={18}
                className={
                  i <= Math.round(avgRating)
                    ? "text-yellow-400"
                    : "text-gray-600"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-300 ml-2">
            {avgRating || 0} · {totalReviews} reviews
          </span>
        </div>

        {/* ⭐ USER RATING */}
        <div className="flex justify-center gap-1 mb-3">
          {[1,2,3,4,5].map((star) => (
            <Star
              key={star}
              size={20}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition ${
                rating >= star
                  ? "text-yellow-400"
                  : "text-gray-600 hover:text-yellow-300"
              }`}
            />
          ))}
        </div>

        {/* INPUT */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your experience..."
          className="w-full max-w-md mx-auto bg-transparent border-b border-gray-700 text-sm px-2 py-2 outline-none focus:border-yellow-500 text-center"
        />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading || !rating || !message}
          className="mt-5 px-6 py-2 bg-yellow-500 text-black rounded-full text-sm font-medium hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed w-40"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* 🔥 LIVE REVIEWS */}
        <div className="mt-10 max-w-xl mx-auto text-left space-y-4">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10"
            >
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i <= item.rating
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              <p className="text-sm text-gray-300">
                {item.message}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <p className="text-gray-500 text-xs mt-12">
          © {new Date().getFullYear()} Fitness Point. ALL RIGHT RESERVED
        </p>

      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917976097513"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 left-5 bg-green-500 p-3 rounded-full shadow hover:scale-110 transition"
      >
        <MessageCircle size={18} />
      </a>

      {/* Arrow */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-yellow-500 hover:text-black transition"
        >
          <ArrowUp size={14} />
        </button>
      )}
    </>
  );
};

export default Footer;