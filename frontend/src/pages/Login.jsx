import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Auth = () => {

  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FIXED LOGIN FUNCTION (FINAL)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("FULL RESPONSE:", data);

      // ❗ Correct Error Handling
      if (!res.ok || !data.success) {
        alert(data.message || "Login failed ❌");
        return;
      }

      // ✅ Save user (NO TOKEN VERSION)
      sessionStorage.setItem("userToken","true");
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Success ✅");

      // ✅ Redirect
      navigate("/userdashboard" , { replace:true });

    } catch (error) {
      console.log("FRONTEND ERROR:", error);
      alert("Server not reachable 🚨");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500 blur-[150px] opacity-20 top-0 left-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 blur-[150px] opacity-20 bottom-0 right-0"></div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl"
      >

        <h2 className="text-3xl text-center font-bold mb-6 text-white">
          Welcome!
        </h2>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-orange-500 outline-none text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-orange-500 outline-none text-white"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold hover:scale-95 transition"
          >
            LOGIN
          </button>
        </form>

        {/* SIGNUP TRIGGER */}
        <p className="text-center text-gray-400 mt-6">
          Don't have membership?
          <span
            onClick={() => setShowPopup(true)}
            className="text-orange-400 ml-2 cursor-pointer hover:underline"
          >
            Join Now
          </span>
        </p>
      </motion.div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >

            <motion.div
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7 }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-center max-w-sm"
            >

              <h3 className="text-2xl font-bold mb-4 text-white">
                Join Membership
              </h3>

              <p className="text-gray-300 mb-6">
                To create an account, you need to select a membership plan first.
              </p>

              <div className="flex gap-4 justify-center">

                <button
                  onClick={() => setShowPopup(false)}
                  className="px-5 py-2 rounded-lg border border-gray-500 text-white hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={() => navigate("/plan")}
                  className="px-5 py-2 bg-orange-500 text-black font-semibold hover:scale-95 transition"
                >
                  Choose Plan
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Auth;