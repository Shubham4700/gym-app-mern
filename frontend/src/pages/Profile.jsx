import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    age: user?.age || ""
  });

  // 🔥 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Save Profile
  const handleSave = () => {
    const updatedUser = { ...user, ...form };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowEdit(false);
  };

  // 🔥 Image Upload (frontend only)
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);

      const updatedUser = { ...user, image: imageURL };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex justify-center p-6">

      <div className="w-full max-w-5xl">

        {/* 🔥 PROFILE HEADER */}
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] border border-orange-500/20 rounded-2xl p-6 flex items-center gap-6">

          {/* IMAGE UPLOAD */}
          <div className="relative group cursor-pointer">
            <label>
              <img
                src={user?.image || "https://i.pinimg.com/736x/12/cc/fd/12ccfd84cc520d74a813b1286e2d05c8.jpg"}
                alt=""
                className="w-28 h-28 rounded-full border-4 border-orange-500"
              />
              <input
                type="file"
                hidden
                onChange={handleImage}
              />
            </label>

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full text-sm">
              Change
            </div>
          </div>

          {/* INFO */}
          <div>
            <h2 className="text-2xl font-bold text-orange-400">
              {user?.name}
            </h2>
            <p className="text-gray-400">{user?.email}</p>

            <div className="flex gap-6 mt-3">
              <div>
                <h3 className="font-bold text-orange-300">120</h3>
                <p className="text-gray-400 text-sm">Workouts</p>
              </div>
              <div>
                <h3 className="font-bold text-orange-300">50</h3>
                <p className="text-gray-400 text-sm">Sessions</p>
              </div>
              <div>
                <h3 className="font-bold text-green-400">+12%</h3>
                <p className="text-gray-400 text-sm">Progress</p>
              </div>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setShowEdit(true)}
            className="ml-auto bg-orange-500 px-4 py-2 rounded-lg text-black font-semibold hover:scale-95 w-40"
          >
            Edit
          </button>

        </div>

        {/* 🔥 INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="bg-[#1e293b] p-5 rounded-xl">
            <h3 className="text-orange-400 mb-3">Personal Info</h3>
            <p>📞 {user?.phone || "Not added"}</p>
            <p>🎂 Age: {user?.age || "N/A"}</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-xl">
            <h3 className="text-orange-400 mb-3">Membership</h3>
            <p>🏷 Plan: {user?.plan || "Basic"}</p>
            <p>💰 ₹{user?.price || 0}</p>
          </div>

        </div>

      </div>

      {/* 🔥 EDIT POPUP */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="bg-[#1e293b] p-6 rounded-xl w-[350px]"
            >

              <h2 className="text-xl mb-4 text-orange-400">
                Edit Profile
              </h2>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 mb-3 rounded bg-[#020617]"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 mb-3 rounded bg-[#020617]"
              />

              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full p-2 mb-3 rounded bg-[#020617]"
              />

              <div className="flex justify-between mt-4">

                <button
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-orange-500 text-black rounded"
                >
                  Save
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Profile;