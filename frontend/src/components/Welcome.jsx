import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const Welcome = () => {

  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 px-6 md:px-16">

      <div className="grid md:grid-cols-2 gap-10 items-center ">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="group overflow-hidden p-6"
        >
          <p className="text-orange-500 uppercase tracking-widest text-sm mb-2">
            About Fitness Point
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight overflow-hidden">
            Welcome to{" "}
            <span className="text-orange-500">Our Gym</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6 ">
            Transform your body and mindset with our modern fitness programs.
            From strength training to cardio and yoga, we provide a complete
            fitness experience with expert guidance.
          </p>

          <button 
          onClick={() => navigate("/read")}
          className="
          bg-orange-500 
          hover:bg-orange-600 
          transition px-6 py-3 
          rounded-full 
          font-semibold shadow-lg
          mt-6 mb-4
          hover:scale-10">
            Read More
          </button>
        </motion.div>

        {/* RIGHT VIDEO CARD */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-lg">

            {/* VIDEO */}
            <video
              src="/wel.mp4"
              autoPlay
              loop
              muted
              className="w-full h-[300px] md:h-[400px] object-cover"
            />

            {/* PLAY ICON */}
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-orange-500 p-4 rounded-full cursor-pointer animate-pulse">
                ▶
              </div>
            </div> */}
          </div>

          {/* SMALL THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            <img
              src="https://i.pinimg.com/736x/40/2c/4b/402c4ba44ca366d79846651d9d6daa81.jpg"
              className="w-20 h-16 object-cover rounded-lg border border-white/10"
            />
            <img
              src="https://i.pinimg.com/736x/6b/7f/17/6b7f171f5c63ffde7f2d410ca7415cc4.jpg"
              className="w-20 h-16 object-cover rounded-lg border border-white/10"
            />
            <img
              src="https://i.pinimg.com/736x/f4/55/07/f455074f54bb5199f8271832e802df89.jpg"
              className="w-20 h-16 object-cover rounded-lg border border-white/10"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Welcome;