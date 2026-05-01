import React, { useState } from "react";

// Swiper imports (CORRECT)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper CSS (IMPORTANT)
import "swiper/css";

import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://in.pinterest.com/pin/620652392437418823/",
  "https://in.pinterest.com/pin/620652392437418823/",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
];

const ProGallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="bg-black py-20 overflow-hidden">
      
      <h2 className="text-center text-3xl md:text-5xl font-bold mb-12 text-white">
        Gym <span className="text-orange-500">Gallery</span>
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        className="px-6"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <motion.div
                onClick={() => setSelected(img)}
                className={`h-[300px] rounded-xl overflow-hidden cursor-pointer transition duration-500 ${
                  isActive
                    ? "scale-110 z-10"
                    : "scale-90 opacity-40"
                }`}
              >
                <img
                  src={img}
                  alt="gym"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* FULLSCREEN */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              alt="preview"
              className="max-w-[90%] max-h-[80%] rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProGallery;