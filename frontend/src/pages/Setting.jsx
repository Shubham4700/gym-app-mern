import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
  Lock, 
  Globe,
  Trash2
} from "lucide-react";

export default function Settings() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("EN");

  /* ================= THEME ================= */
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    window.location.replace("/login");
  };

  /* ================= DELETE ACCOUNT ================= */
  const deleteAccount = async () => {
    const confirmDelete = confirm("Are you sure? 😨");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/user/delete/${user._id}`, {
        method: "DELETE",
      });

      localStorage.clear();
      window.location.replace("/login");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b0b] to-[#1a0a00] text-white">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <h1 className="text-lg font-bold text-orange-400">
          Settings ⚙️
        </h1>

        <div className="flex items-center gap-2">
          <img
            src={user?.image || "https://i.pravatar.cc/40"}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{user?.name}</span>
        </div>
      </div>

      {/* 🔥 BODY */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-md space-y-4">

          {/* PROFILE */}
          <Glass>
            <div className="flex items-center gap-4">
              <img
                src={user?.image || "https://i.pravatar.cc/100"}
                className="w-14 h-14 rounded-full border-2 border-orange-500"
              />
              <div>
                <h2>{user?.name}</h2>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
          </Glass>

          {/* EDIT PROFILE */}
          <Item icon={<User />} title="Edit Profile" onClick={() => window.location.href="/profile"} />

          {/* CHANGE PASSWORD */}
          <Item icon={<Lock />} title="Change Password" onClick={() => alert("Backend not connect 🔐")} />

          {/* NOTIFICATION TOGGLE */}
          <ToggleItem
            icon={<Bell />}
            title="Notifications"
            value={notifications}
            onChange={() => setNotifications(!notifications)}
          />

          {/* DARK MODE */}
          <ToggleItem
            icon={dark ? <Sun /> : <Moon />}
            title="Dark Mode"
            value={dark}
            onChange={() => setDark(!dark)}
          />

          {/* LANGUAGE */}
          <ToggleItem
            icon={<Globe />}
            title={`Language (${language})`}
            value={language === "EN"}
            onChange={() => setLanguage(language === "EN" ? "HI" : "EN")}
          />

          {/* DELETE */}
          <Item icon={<Trash2 />} title="Delete Account" danger onClick={deleteAccount} />

          {/* LOGOUT */}
          <Item icon={<LogOut />} title="Logout" danger onClick={handleLogout} />

        </div>
      </div>
    </div>
  );
}

/* 🔥 CARD */
const Glass = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
  >
    {children}
  </motion.div>
);

/* 🔥 NORMAL ITEM */
const Item = ({ icon, title, onClick, danger }) => (
  <motion.div
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex justify-between items-center p-4 rounded-xl cursor-pointer
    ${danger
      ? "bg-red-500/10 border border-red-500/30 text-red-400"
      : "bg-white/5 border border-white/10 hover:bg-white/10"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{title}</span>
    </div>
    <span>›</span>
  </motion.div>
);

/* 🔥 TOGGLE ITEM */
const ToggleItem = ({ icon, title, value, onChange }) => (
  <motion.div
    className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10"
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{title}</span>
    </div>

    <div
      onClick={onChange}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        value ? "bg-orange-500" : "bg-gray-500"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          value ? "translate-x-6" : ""
        }`}
      />
    </div>
  </motion.div>
);