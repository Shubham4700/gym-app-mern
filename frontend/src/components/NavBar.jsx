import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 🔥 Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false); // scroll down → hide
      } else {
        setShowNav(true); // scroll up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10"
        >
          <div className="flex justify-between items-center px-8 py-4">

            {/* LOGO */}
            <h1 className="text-xl font-bold text-orange-500 tracking-wide">
              Fitness Point
            </h1>

            {/* MENU */}
            <ul className="flex items-center gap-8 text-sm font-medium whitespace-nowrap">

              <li>
                <Link to="/" className="px-2 hover:text-orange-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/workout" className="hover:text-orange-400 transition">
                  Program
                </Link>
              </li>

              <li>
                <Link to="/plan" className="hover:text-orange-400 transition">
                  Plans
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-orange-400 transition">
                  Contact
                </Link>
              </li>


               {/* 🔥 LOGIN BUTTON */}
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 
                bg-yellow-500 
                text-black 
                rounded-full 
                text-sm 
                sm:text-base
                w-fit
                hover:scale-90"
              >
                Login
              </button>
              

            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavBar;





// import React, { useState } from "react";
// // import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const NavBar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md text-white">

//       <div className="flex justify-between items-center px-6 py-4">

//         <h1 className="text-xl font-bold text-yellow-400">
//           Fitness Point
//         </h1>

//         {/* Desktop Menu */}
//         <ul className="flex items-center gap-8 whitespace-nowrap">
//         <Link to="/" className="hover:text-yellow-400">Home</Link>
//         <Link to="/workout" className="hover:text-yellow-400">Program</Link>
//         <Link to="/plan" className="hover:text-yellow-400">Plans</Link>
//         <Link to="/contact" className="hover:text-yellow-400">Contact</Link>

//         {/* 🔥 LOGIN BUTTON */}
//         <button
//           onClick={() => navigate("/login")}
//           className="rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:scale-90  "
//         >
//           Login
//         </button>  

//         </ul>

//         {/* {/* Mobile Icon */}
//           {/* <div className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <FaTimes /> : <FaBars />}
//         </div> */}
//       </div> 

//       {/* Mobile Menu */}
//       {/* {open && (
//         <div className="md:hidden bg-black text-center py-4 space-y-4">
//           <Link to="/" className="block hover:text-yellow-400">Home</Link>
//           <Link to="/workout" className="block hover:text-yellow-400">Program</Link>
//           <Link to="/plan" className="block hover:text-yellow-400">Plans</Link>
//           <Link to="/contact" className="block hover:text-yellow-400">Contact</Link>
//         </div>
//       )} */}
//     </nav>
//   );
// };

// export default NavBar;



// // import React, { useState, useEffect } from "react";
// // import { NavLink } from "react-router-dom";
// // import "./NavBar.css";

// // const NavBar = () => {

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [scroll, setScroll] = useState(false);

// //   useEffect(() => {

// //     const handleScroll = () => {
// //       if(window.scrollY > 50){
// //         setScroll(true);
// //       } else {
// //         setScroll(false);
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);

// //   }, []);

// //   return (

// //     <nav className={scroll ? "navbar scrolled" : "navbar"}>

// //       <h2 className="logo">Fitness Point</h2>

// //       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
// //         ☰
// //       </div>

// //       <ul className={menuOpen ? "nav-links active" : "nav-links"}>

// //         <li>
// //           <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
// //             Home
// //           </NavLink>
// //         </li>

// //         <li>
// //           <a href="/workout" className={({isActive}) => isActive ? "active" : ""}>
// //             Workout
// //           </a>
// //         </li>

// //         <li>
// //           <a href="/gallery" className={({isActive}) => isActive ? "active" : ""}>
// //             Gallery
// //           </a>
// //         </li>

// //         <li>
// //           <a href="/plan" className={({isActive}) => isActive ? "active" : ""}>
// //             Plans
// //           </a>
// //         </li>

// //         <li>
// //           <NavLink to="/schedule" className={({isActive}) => isActive ? "active" : ""}>
// //             Schedule
// //           </NavLink>
// //         </li>

// //         <li>
// //           <NavLink to ="/contact" className={({isActive}) => isActive ? "active" : ""}>
// //             Contact
// //           </NavLink>
// //         </li>

// //       </ul>

// //     </nav>

// //   );
// // };

// // export default NavBar;