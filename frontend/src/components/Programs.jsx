import React from "react";
import { motion } from "framer-motion";

const programs = [
  {
    title: "BOXING",
    time: "30 min",
    desc: "Boost your stamina, speed, and punching power with high-intensity boxing drills.",
    benefits: ["Cardio", "Fat Loss", "Self Defense"],
  },
  {
    title: "MMA",
    time: "30 min",
    desc: "Learn mixed martial arts techniques combining striking and grappling.",
    benefits: ["Strength", "Combat Skills", "Endurance"],
  },
  {
    title: "KARATE",
    time: "30 min",
    desc: "Master discipline, balance, and traditional martial arts techniques.",
    benefits: ["Discipline", "Flexibility", "Focus"],
  },
  {
    title: "CROSSFIT",
    time: "30 min",
    desc: "High-intensity functional training to improve strength and conditioning.",
    benefits: ["Strength", "HIIT", "Full Body"],
  },
  {
    title: "STRETCHING",
    time: "15 min",
    desc: "Improve flexibility and reduce muscle stiffness with guided stretches.",
    benefits: ["Flexibility", "Recovery", "Mobility"],
  },
  {
    title: "GYMNASTICS",
    time: "45 min",
    desc: "Enhance body control, balance, and core strength with gymnastic moves.",
    benefits: ["Balance", "Core", "Control"],
  },
  {
    title: "YOGA",
    time: "45 min",
    desc: "Relax your mind and body with breathing exercises and yoga postures.",
    benefits: ["Mental Peace", "Flexibility", "Relaxation"],
  },
  {
    title: "FIT BOXING",
    time: "45 min",
    desc: "Fun boxing workouts focused on fitness, rhythm, and calorie burning.",
    benefits: ["Fun", "Cardio", "Fat Burn"],
  },
];

const Programs = () => {
  return (
    <section id="programs" className="bg-black text-white py-16 px-6">

      {/* Heading */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-4xl md:text-6xl font-bold overflow-hidden">
          OUR <span className="text-yellow-500">PROGRAMS</span>
        </h2>

        <p className="text-gray-400 mt-4 md:mt-0 max-w-md">
          Choose the training format that fits you best, whether you're into strength,
          conditioning, or stretching.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {programs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 p-6 rounded-xl relative overflow-hidden group cursor-pointer"
          >

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 transition duration-300"></div>

            {/* Time */}
            <p className="text-yellow-400 text-sm mb-2">
              ⏱ {item.time}
            </p>

            {/* Title */}
            <h3 className="text-xl font-bold group-hover:text-yellow-400 transition">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mt-2">
              {item.desc}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2 mt-4">
              {item.benefits.map((b, i) => (
                <span
                  key={i}
                  className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded"
                >
                  {b}
                </span>
              ))}
            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default Programs;