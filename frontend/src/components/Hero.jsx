import React from 'react';
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const Hero = () => {
    return (

         <div className="relative h-screen w-full overflow-hidden">

      {/* 🎬 VIDEO */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/gym.mp4" type="video/mp4" />
      </video>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 pt-40 mt-20">

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-3xl 
            sm:text-4xl 
            md:text-6xl 
            lg:text-7xl 
            font-bold
            overflow-hidden 
          "
        >
          HARD WORK IS THE GAME
        </motion.h1>

        <motion.p
          className="
            text-yellow-400 
            mt-4 
            text-sm 
            sm:text-lg 
            md:text-2xl
          "
        >
          TIME TO CHANGE YOUR BODY
        </motion.p>


        <Link to ="/plan">
            <motion.button
            whileHover={{ scale: 1.1 }}
            className="
                
                px-4 py-2 
                sm:px-6 sm:py-3 
                bg-yellow-500 
                text-black 
                rounded-full 
                text-sm 
                sm:text-base
                w-fit
                mx-auto
                mt-6 mb-4
                hover:scale-105
            "
            >
            JOIN NOW
            </motion.button>
        </Link>

      </div>
    </div>
  );
};

export default Hero; 


        /* // <section className='hero'>
        //     <div className="content">
        //         <div className="title">
        //             <h3>LET'S</h3>
        //             <h3>GET</h3>
        //             <h3>MOVING</h3>
        //         </div>

        //         <div className="sub-title">
        //             <p>Your Journey to Fitness Start here</p>
        //             <p>Unleash Your Potential</p>
        //         </div>
                
        //         <div className="buttons">
        //             <Link to ="/plan">
        //                 <button className="btn">Start Your Journey</button>    
        //             </Link>
        //             <Link to ="/schedule">
        //                 <button className="btn">Schedule</button>    
        //             </Link>
                    
        //         </div>
        //     </div>
        // </section> */
//     )
// }

// export default Hero;