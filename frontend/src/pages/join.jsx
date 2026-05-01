import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Join = () => {

  const location = useLocation();
  const selectedPlan = location.state?.plan || "Monthly";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    plan: selectedPlan,
    payment: "UPI",
    batch: "Morning",
    trainer: "no"   // ✅ FIX DEFAULT
  });

  let months = 1;
  let basePrice = 0;

  // PLAN PRICE
  if (form.plan === "Monthly") {
    basePrice = 1000;
    months = 1;
  }

  if (form.plan === "Quarterly") {
    basePrice = 2500;
    months = 3;
  }

  if (form.plan === "Half Yearly") {
    basePrice = 5000;
    months = 6;
  }

  if (form.plan === "Yearly") {
    basePrice = 9000;
    months = 12;
  }

  let trainerFee = 0;

  if (form.trainer === "yes") {
    trainerFee = 1000 * months;
  }

  const totalPrice = basePrice + trainerFee; // ✅ FINAL PRICE

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 MAIN PAYMENT FLOW
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.age || !form.plan || !form.batch || !form.trainer) {
      alert("All fields required");
      return;
    }

    if (!window.Razorpay) {
      alert("❌ Razorpay not loaded");
      return;
    }

    try {

      console.log("🔥 SENDING:", form.plan, form.trainer);

      // 🔥 STEP 1: CREATE ORDER
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          plan: form.plan,        // ✅ FIXED
          trainer: form.trainer   // ✅ FIXED
        })
      });

      const order = await res.json();

      if (!res.ok) {
        alert(order.message || "Order failed");
        return;
      }

      // 🔥 STEP 2: OPEN RAZORPAY
      const options = {
        key: "rzp_test_Sb2vHV8kSzQgbp",
        amount: order.amount * 100, // ✅ FIXED (backend returns rupees)
        currency: "INR",
        name: "Fitness Point",
        description: "Membership Payment",
        order_id: order.id,

        handler: async function (response) {

          try {

            const saveRes = await fetch("http://localhost:5000/api/membership/create-after-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,

                name: form.name,
                email: form.email,
                phone: form.phone,
                age: Number(form.age),
                plan: form.plan,
                price: totalPrice,     // ✅ FIXED FINAL PRICE
                batch: form.batch,
                trainer: form.trainer
              }),
            });

            const text = await saveRes.text();

            let data;
            try {
              data = JSON.parse(text);
            } catch {
              alert("Server error");
              return;
            }

            if (!saveRes.ok) {
              alert(data.message || "❌ Failed");
              return;
            }

            alert("✅ Membership Purchased");

            localStorage.setItem("user", JSON.stringify({
              email: form.email
            }));

            window.location.href = "/login";

          } catch (err) {
            console.log(err);
            alert("❌ Save failed");
          }
        },

        theme: {
          color: "#f97316"
        },

        method: {
          upi: true,
          card: true,
          netbanking: true
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("❌ Payment Failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-orange-500 blur-[150px] opacity-20 top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 blur-[150px] opacity-20 bottom-10 right-10"></div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full px-6 z-10">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-5xl font-bold mb-6 overflow-hidden">
            Transform <span className="text-orange-500">Your Body</span>
          </h1>

          <p className="text-gray-400 mb-6">
            Join the best fitness community and achieve your dream physique with expert trainers.
          </p>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-lg">
              Selected Plan:
              <span className="text-orange-400 font-semibold ml-2">
                {form.plan}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl space-y-5"
        >

          <h2 className="text-3xl font-bold mb-4 text-center">
            Join Membership
          </h2>

          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-orange-500 outline-none" />

          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-orange-500 outline-none" />

          <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-orange-500 outline-none" />

          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:border-orange-500 outline-none" />

          <select name="plan" value={form.plan} onChange={handleChange} className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-orange-500 outline-none">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Half Yearly</option>
            <option>Yearly</option>
          </select>

          <div>
            <p className="mb-2 text-gray-400">Batch</p>
            <select name="batch" value={form.batch} onChange={handleChange} className="w-full p-3 rounded-lg bg-black border border-gray-600">
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-gray-400">Trainer</p>

            <select
              name="trainer"
              value={form.trainer}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-600"
            >
              <option value="no">No ( I'm okay with public trainer )</option>
              <option value="yes">Yes ( I Need Personal Trainer )</option>
            </select>

            <div className="mt-3 bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400">
                Plan Price: ₹{basePrice}
              </p>

              <p className="text-sm text-gray-400">
                Trainer Fee: ₹{trainerFee}
              </p>

              <p className="text-lg font-bold text-orange-400 mt-1">
                Total: ₹{totalPrice}
              </p>
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold">
            Pay & Start Membership 💳
          </button>

        </motion.form>
      </div>
    </section>
  );
};

export default Join;