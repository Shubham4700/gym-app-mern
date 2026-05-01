import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Contact = () => {
  // ✅ STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ API BASE (future deployment ready)
  const API_URL = "http://localhost:5000";

  // ✅ SUBMIT FUNCTION (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      // ❗ Important fix
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(data.message || "Message sent successfully ✅");

      // reset form
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, link: "https://facebook.com" },
    { icon: FaInstagram, link: "https://instagram.com" },
    { icon: FaTwitter, link: "https://twitter.com" },
    { icon: FaLinkedinIn, link: "https://linkedin.com" },
  ];

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558611848-73f7eb4001a1')] bg-cover bg-center opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 overflow-hidden"
        >
          <span className="text-orange-400">Contact</span> Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6 border-b border-blue-400 inline-block">
              Get In Touch
            </h3>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-blue-400 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-blue-400 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-blue-400 outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-cyan-400 rounded-lg font-semibold hover:scale-90 transition duration-300 flex items-center justify-center gap-2"
              >
                {loading && <ClipLoader size={18} color="white" />}
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold border-b border-blue-400 inline-block">
              Contact Details
            </h3>

            <p className="text-gray-400">
              Ready to transform your body? Contact us today and start your fitness journey.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-green-500 text-xl" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-white-400 text-xl" />
                <p>fitness@gym.com</p>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-400 text-xl" />
                <p>Ajmer, Rajasthan, India</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-blue-500 transition hover:scale-90"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;