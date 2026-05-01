import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Settings,
  Menu,
  X,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function UserDashboard() {

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);

  /* ================= FETCH USER + NOTIFICATIONS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const email = localUser?.email;

        if (!email) return;

        // ✅ USER
        const userRes = await fetch(
          `http://localhost:5000/api/membership/me/${email}`
        );
        const userData = await userRes.json();
        setUser(userData);

        // ✅ NOTIFICATIONS
        const notifyRes = await fetch(
          `http://localhost:5000/api/admin/notifications/${email}`
        );
        const notifyData = await notifyRes.json();
        setNotifications(notifyData);

      } catch (err) {
        console.log("DASHBOARD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userImage = user?.image || "https://i.pravatar.cc/100";
  const username = user?.name || "User";

  const isActive =
    user?.expiryDate && new Date(user.expiryDate) > new Date();

  const downloadInvoice = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `http://localhost:5000/api/membership/invoice/${user.email}`
      );

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      console.log(err);
      alert("❌ Download failed");
    }
  };    


  const goTo = (path) => {
    window.location.href = path;
  };

  const data = [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 40 },
    { name: "Wed", value: 30 },
    { name: "Thu", value: 60 },
    { name: "Fri", value: 50 },
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-[#1a0a00] text-white">

      {/* MOBILE MENU */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        {openSidebar ? (
          <X onClick={() => setOpenSidebar(false)} />
        ) : (
          <Menu onClick={() => setOpenSidebar(true)} />
        )}
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-40 h-full w-[70px] bg-[#0c0c14] flex flex-col items-center py-6 gap-6 border-r border-white/10 transition-all ${
          openSidebar ? "left-0" : "-left-[100px]"
        } md:left-0`}
      >
        <div className="w-10 h-10 bg-orange-500 rounded-xl" />

        <IconBtn icon={Home} onClick={() => goTo("/")} />
        <IconBtn icon={User} onClick={() => goTo("/profile")} />
        <IconBtn icon={Settings} onClick={() => goTo("/setting")} />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6">

        {/* TOP */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-lg md:text-2xl text-orange-400">
              Welcome, {username}
            </h1>
            <p className="text-gray-400 text-xs md:text-sm">
              Track your performance
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card title="Calories" value="520 kcal" />
          <Card title="Workout" value="1h 20m" />
          <Card title="Protein" value="120g" />
          <Card title="Plan" value={user?.plan || "No Plan"} />
        </div>

        {/* GRAPH */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
          <h3 className="text-orange-400 text-sm mb-2">Activity</h3>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f97316" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <div className="bg-white/5 p-4 rounded-xl mt-6">
          <h2 className="text-xl mb-4">🔔 Notifications</h2>

          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="p-3 border-b border-gray-700">
                <p className="font-bold text-orange-400">{n.title}</p>
                <p className="text-gray-300">{n.message}</p>
              </div>
            ))
          )}
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:block w-[260px] bg-[#0c0c14] p-5 border-l border-white/10">
        <div className="text-center mb-4">
          <img src="https://i.pinimg.com/736x/12/cc/fd/12ccfd84cc520d74a813b1286e2d05c8.jpg" /* {userImage} */ className="w-14 h-14 rounded-full mx-auto" />
          <p>{username}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <p>Plan: {user?.plan}</p>

          {/* <p>
            Payment Mode : 
            <span className="text-green-400">
              {user?.paymentMethod?.toLowerCase() === "cash" ? "Cash" 
              : user?.paymentMethod?.toLowerCase() === "online" ? "Online" : "Online"}
            </span>
            </p> */}

          <p>
            Expiry:{" "}
            {user?.expiryDate
              ? new Date(user.expiryDate).toLocaleDateString("en-IN")
              : "N/A"}
          </p>

          <p className={isActive ? "text-green-400" : "text-red-400"}>
            {isActive ? "Active" : "Expired"}
          </p>
        </div>

              {user.trainer === "yes" && (
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">

          <p className="text-orange-400 font-semibold mb-2">
          Personal Trainer Info
          </p>

          <div className="flex items-center gap-3">

            <img
              src="https://i.pinimg.com/1200x/f7/f4/2c/f7f42c6216858d895306580753290bc9.jpg"
              alt="trainer"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <p className="font-semibold">{user.trainerName}</p>

              <a
                href={user.trainerInsta}
                target="_blank"
                className="text-sm text-blue-400"
              >
                Instagram
              </a>
            </div>
          </div>

          <a
            href={`https://wa.me/${user.trainerPhone}`}
            target="_blank"
            className="block mt-3 text-center bg-green-500 py-2 rounded-lg font-semibold"
          >
            Chat on WhatsApp 💬
          </a>

        </div>
      )}      
      <button
      onClick={downloadInvoice}
      className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold"
      >
        Download Invoice 📄
      </button>
        
      </div>
    </div>
  );
}

/* COMPONENTS */

const IconBtn = ({ icon: Icon, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    onClick={onClick}
    className="p-3 rounded-xl cursor-pointer text-gray-400 hover:bg-white/10"
  >
    <Icon size={20} />
  </motion.div>
);

const Card = ({ title, value }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10"
  >
    <p className="text-gray-400 text-xs">{title}</p>
    <h2 className="text-sm md:text-lg text-orange-400 mt-1">
      {value}
    </h2>
  </motion.div>
);