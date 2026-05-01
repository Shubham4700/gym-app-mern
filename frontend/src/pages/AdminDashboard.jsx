import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyBill, FaDumbbell, FaPlus, FaBars } from "react-icons/fa";

const AdminDashboard = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("all");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ NEW STATES (ADD MEMBER)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    plan: "Monthly",
    batch: "Morning",
    trainer: "no"
  });

  const morningCount = members.filter(m => m.batch === "Morning").length;
  const eveningCount = members.filter(m => m.batch === "Evening").length;

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/membership/members");
        const data = await res.json();
        setMembers(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  const sendNotice = async () => {
    if (!title || !message) return alert("Fill all fields");
    if (!window.confirm("Send this notice?")) return;

    try {
      setSending(true);

      const res = await fetch("http://localhost:5000/api/admin/send-notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: selectedEmail,
          title,
          message
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      alert("✅ Notice Sent");

      setShowModal(false);
      setTitle("");
      setMessage("");
      setSelectedEmail("all");

    } catch (err) {
      console.log(err);
      alert("❌ Failed to send notice");
    } finally {
      setSending(false);
    }
  };

  const revenue = members.reduce((sum, m) => sum + (m.price || 0), 0);
  const activePlans = [...new Set(members.map(m => m.plan))].length;

  const activeMembers = members.filter(
    (m) => new Date(m.expiryDate) > new Date()
  ).length;

  if (loading) return <h2 className="text-white text-center mt-10">Loading...</h2>;

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    window.location.href = "/adminlogin";
  };

  // ✅ UPDATED HANDLER
  const handleAddMember = () => {
    setShowAddModal(true);
  };

  // ✅ INPUT CHANGE
  const handleNewMemberChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  // ✅ ADD MEMBER API CALL
  const addMember = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/membership/admin-add-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMember)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      alert("✅ Member Added");

      setShowAddModal(false);
      setMembers(prev => [data.user, ...prev]);

    } catch (err) {
      console.log(err);
      alert("❌ Failed");
    }
  };

  return (
    <div className={`${dark ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"} flex h-screen`}>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-700">
        <FaBars onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl cursor-pointer" />
        <button onClick={() => setDark(!dark)} className="text-sm px-3 py-1 bg-orange-500 rounded">
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      {/* SIDEBAR */}
      <div className={`fixed md:static z-50 top-0 left-0 h-full w-[220px] p-6 space-y-6 border-r transition-transform duration-300
        ${dark ? "bg-[#020617]" : "bg-white"}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>

        <h2 className="text-xl font-bold">Admin Panel</h2>

        <div className="flex flex-col items-center text-center bg-white/5 p-4 rounded-xl border border-white/10">
          <img
            src="https://i.pinimg.com/736x/de/99/f5/de99f59cb3bcd5a35439084666dbddc8.jpg"
            alt="admin"
            className="w-16 h-16 rounded-full border-2 border-orange-500 mb-2"
          />
          <h3 className="font-semibold">Ronnie Coleman</h3>
          <p className="text-sm text-gray-400">Fitness Point</p>
        </div>

        <div className="space-y-3">
          <p className="opacity-70 hover:text-white cursor-pointer">Dashboard</p>
          <p className="opacity-70 hover:text-white cursor-pointer">Members</p>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10">
          
          <button 
            onClick={() => setDark(!dark)} 
            className="bg-yellow-500 px-3 py-2 rounded w-full font-medium"
          >
            Toggle Theme
          </button>

          <button 
            onClick={handleLogout} 
            className="bg-red-500 px-3 py-2 rounded w-full font-medium"
          >
            Logout
          </button>

          <button 
            onClick={handleAddMember} 
            className="bg-green-500 px-3 py-2 rounded w-full font-medium flex items-center justify-center gap-2"
          >
            {/* <FaPlus /> */}
            Add Member (Cash)
          </button>

        </div>
      </div>

      {/* MAIN (UNCHANGED) */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold">Admin Dashboard</h2>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:scale-95 transition w-40"
          >
            <FaPlus />
            Send Notice
          </button>
        </div>

        <input
          placeholder="Search member..."
          onChange={(e) => setSearch(e.target.value)}
          className="mt-6 w-full p-3 rounded-lg bg-black border border-gray-600"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Stat icon={<FaUsers />} title="Total Members" value={members.length} />
          <Stat icon={<FaMoneyBill />} title="Revenue" value={`₹${revenue}`} />
          <Stat icon={<FaDumbbell />} title="Active Plans" value={activePlans} />
          <Stat icon={<FaUsers />} title="Active Users" value={activeMembers} />
          <Stat title="Morning Batch" value={morningCount}/>
          <Stat title="Evening Batch" value={eveningCount}/>
        </div>

        <div className="mt-10 bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 overflow-x-auto">
          <h3 className="mb-4 text-lg font-semibold">Members</h3>

          <table className="min-w-[800px] w-full text-left">
            <thead className="text-yellow-400">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Plan Expired</th>
                <th>Batch</th>
                <th>Trainer</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((m, i) => {
                const isActive = new Date(m.expiryDate) > new Date();
                const expiringSoon =
                  new Date(m.expiryDate) - new Date() < 3 * 24 * 60 * 60 * 1000;

                return (
                  <tr key={i} className={`border-t border-white/10 ${expiringSoon ? "bg-yellow-900/20" : ""}`}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.plan}</td>
                    <td>₹{m.price}</td>

                    <td>
                      {isActive ? (
                        <span className="text-green-400">Active</span>
                      ) : (
                        <span className="text-red-400">Expired</span>
                      )}
                    </td>

                    <td>{m.createdAt ? new Date(m.createdAt).toLocaleDateString("en-IN") : "N/A"}</td>
                    <td>{m.expiryDate ? new Date(m.expiryDate).toLocaleDateString("en-IN") : "N/A"}</td>
                    <td>{m.batch || "N/A"}</td>

                    <td>
                      {m.trainer === "yes" ?(
                        <span className="text-green-400">Personal</span>
                      ) : (
                        <span className="text-red-400">Public</span>
                      )}
                    </td>  

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-xl w-[90%] md:w-[400px] space-y-4">
            <h3 className="text-lg font-bold">Add Member (Cash)</h3>

            <input name="name" placeholder="Name" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded" />
            <input name="email" placeholder="Email" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded" />
            <input name="phone" placeholder="Phone" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded" />
            <input name="age" placeholder="Age" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded" />

            <select name="plan" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Half Yearly</option>
              <option>Yearly</option>
            </select>

            <select name="batch" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded">
              <option>Morning</option>
              <option>Evening</option>
            </select>

            <select name="trainer" onChange={handleNewMemberChange} className="w-full p-2 bg-black border border-gray-600 rounded">
              <option value="no">Public Trainer</option>
              <option value="yes">Personal Trainer</option>
            </select>

            <div className="flex justify-between mt-4">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
              <button onClick={addMember} className="px-4 py-2 bg-green-500 rounded">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* NOTICE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-xl w-[90%] md:w-[400px] space-y-4">
            <h3 className="text-lg font-bold">Send Notification</h3>

            <select value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)} className="w-full p-2 bg-black border border-gray-600 rounded">
              <option value="all">Send to All</option>
              {members.map((m, i) => (
                <option key={i} value={m.email}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>

            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-black border border-gray-600 rounded" />
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 bg-black border border-gray-600 rounded" />

            <div className="flex justify-between mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
              <button onClick={sendNotice} className="px-4 py-2 bg-green-500 rounded">
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const Stat = ({ icon, title, value }) => (
  <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 hover:scale-105 transition">
    <div className="text-xl mb-2">{icon}</div>
    <p className="text-gray-400">{title}</p>
    <h2 className="text-xl text-orange-400">{value}</h2>
  </div>
);

export default AdminDashboard;