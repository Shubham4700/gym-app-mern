import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";

const plans = [
  {
    title: "Monthly",
    price: "₹1000",
    duration: "1 Month",
    features: [
      "✅ Equipment Access",
      "✅ Gym Access (6 AM–10 PM)",
      "✅ Basic Diet Plan",
      "❌ No Personal Trainer",
      "❌ No Freezing Option",
      "❌ No Priority Support"
    ],
  },
  {
    title: "Quarterly",
    price: "₹2500",
    duration: "3 Months",
    popular: true,
    features: [
      "✅ Equipment Access",
      "✅ Full-Day Access",
      "✅ Group Training Sessions",
      "✅ Full Diet Plan Provide",
      "✅ 10 Days Freezing Option",
      "✅ Standard Support"
    ],
  },
  {
    title: "Half Yearly", // ✅ IMPORTANT FIX
    price: "₹5000",
    duration: "6 Months",
    features: [
      "✅ Equipment + Full-Day Access ",
      "✅ Personal Trainer (2–3 sessions/week)",
      "✅ Customized Diet Plan",
      "✅ 20 Days Freezing Option",
      "✅ Priority Support (Fast response)",
      "✅ Body Progress Tracking"
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  const handleJoin = (plan) => {
    navigate("/join", {
      state: {
        plan: plan.title,   // ✅ PLAN PASS
        price: plan.price   // 🔥 BONUS (future use)
      }
    });
  };

  return (
    <section id="membership" className="bg-black text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 overflow-hidden">
          Our <span className="text-yellow-500">Membership Plans</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 shadow-xl ${
                plan.popular ? "scale-105 border-orange-500 shadow-orange-500/20" : ""
              }`}
            >

              {/* Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 text-sm rounded-full font-semibold">
                  Most Popular 🔥
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold mb-5">{plan.title}</h3>

              {/* Price */}
              <h1 className="text-4xl font-bold mb-2 overflow-hidden">
                {plan.price}
              </h1>

              <p className="text-gray-400 mb-4">For {plan.duration}</p>

              <hr className="border-gray-700 mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {/* <FaCheck className="text-orange-500" /> */}
                    {item}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => handleJoin(plan)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,165,0,0.6)]"
              >
                Join Now 
              </button>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Pricing;