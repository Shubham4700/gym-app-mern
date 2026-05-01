import React from "react";
import { motion } from "framer-motion";

const ReadMore = () => {
  return (
    <section className="bg-black text-white max-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 overflow-hidden"
        >
          About <span className="text-orange-500">Fitness Point</span>
        </motion.h1>

        {/* DIRECTOR */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">

          <motion.img
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            src="https://i.pinimg.com/1200x/2c/d9/ba/2cd9bab2276a34d04130b4b84c0abf2e.jpg"
            className="rounded-2xl shadow-xl sm-3 "
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold text-orange-400 mb-4">
              Gym Owner
            </h2>

            <p className="text-gray-400 mb-4">
              Our gym is led by an experienced fitness expert who has trained
              hundreds of clients and transformed lives through dedication and discipline.
            </p>

            <p className="text-gray-400">
              With years of experience, our director ensures high-quality training and motivation.
            </p>
          </motion.div>

        </div>

        {/* HISTORY */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-orange-400 mb-6">
            Our Journey
          </h2>

          <p className="text-gray-400 mb-4">
            Fitness Point started with a vision to provide a modern and motivating fitness environment.
          </p>

          <p className="text-gray-400 mb-4">
            Over time, we have grown into a community of passionate individuals committed to fitness.
          </p>

          <p className="text-gray-400">
            Today, we offer advanced equipment, expert trainers, and personalized plans.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ReadMore;