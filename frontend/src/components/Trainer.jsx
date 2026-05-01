import React from "react";
import {useEffect,useState} from "react";
import { motion } from "framer-motion";
import { FaFacebook,FaTwitter,FaInstagram } from "react-icons/fa";


const trainers = [
  {
    name: "Ronnie Coleman",
    role: "Specialist in All",
    img: "https://i.pinimg.com/736x/6a/74/c6/6a74c63de8e7a3b75c4f3847bd8cb33f.jpg",
  },
  {
    name: "Arnold",
    role: "Strength Coach",
    img: "https://i.pinimg.com/736x/ea/a4/bf/eaa4bf6a086274696ff76683b7078355.jpg",
  },
  {
    name: "Shreya",
    role: "Coach",
    img: "https://i.pinimg.com/736x/7c/9d/b2/7c9db280ea541e4474c4b9632d257bef.jpg",
  },
  {
    name: "Hrithik Roshan",
    role: "Body Builder",
    img: "https://i.pinimg.com/736x/ac/06/32/ac0632779b52c7144ba08d108e78aff8.jpg",
  },
];

const Trainers = () => {

    
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-16 px-6 text-center text-white">

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold mb-12 overflow-hidden">
        Meet the <span className="text-orange-500">Trainers</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {trainers.map((trainer, index) => (
          <motion.div
            key={index}
            
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group overflow-hidden p-6"
            
          >

            {/* Image */}
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-orange-500 transition duration-300">

              <img
                src={trainer.img}
                alt={trainer.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                {/* <p className="text-sm">View Profile</p> */}
              </div>
            </div>

            {/* Name */}
            <h3 className="mt-4 text-lg font-semibold group-hover:text-orange-500 transition">
              {trainer.name}
            </h3>

            {/* Role */}
            <p className="text-gray-400 text-sm">{trainer.role}</p>

            {/* Social icons */}
            <div className="flex justify-center gap-4 mt-3 text-gray-400">
              <i className="fab fa-facebook hover:text-orange-500 cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-orange-500 cursor-pointer"></i>
              <i className="fab fa-instagram hover:text-orange-500 cursor-pointer"></i>
            </div>

            {/* Button */}
            {/* <button className="
            mt-6 mb-4
            px-6 py-2 
            bg-orange-500 
            rounded-full 
            text-sm 
            transition 
            duration-300
            hover:scale-105">
              Book Session
            </button> */}

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Trainers;