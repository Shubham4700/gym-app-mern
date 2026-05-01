import React, { useState } from "react";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 SIMPLE STATIC AUTH (for now)
    if (email === "admin@gmail.com" && password === "admin123") {

      sessionStorage.setItem("adminToken", "true");

      alert("✅ Login Successful");

      window.location.href = "/admindashboard";

    } else {
      alert("❌ Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">

      <form
        onSubmit={handleLogin}
        className="bg-white/5 p-8 rounded-xl border border-white/10 w-[350px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black border border-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 rounded font-bold"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default AdminLogin;