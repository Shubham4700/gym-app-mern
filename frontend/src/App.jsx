import React from "react";
import {useEffect,useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; 
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "./App.css";


import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import ReadMore from "./components/ReadMore";
import Programs from "./components/Programs";
import Trainer from "./components/Trainer";
// import WorkoutSessions from "./components/WorkoutSessions";
import Stats from "./components/Stats";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
// import FitnessPlans from "./components/FitnessPlans";
// import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import BMICalculator from "./components/BMICalculator";
import Footer from "./components/Footer";

import Join from "./pages/join"; //Join page 
import WorkoutDetail from "./pages/WorkoutDetail"; 
import Schedule from "./pages/Schedule"; 
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtected from "./AdminProtected";
import UserProtected from "./UserProtected";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

const App = () => {

  const [stats, setStats] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/stats")
    .then(res => res.json())
    .then(data => {

      console.log(data);

      setStats([
        { value: data.experience, label: "Years Experience", suffix: "+" },
        { value: data.members, label: "Happy Members", suffix: "+" },
        { value: data.trainers, label: "Expert Trainers", suffix: "+" },
        { value: data.access, label: "Gym Access", suffix: "/7" },
      ]);
    })
    .catch(err => console.log(err));
}, []);


// ======================= LAYOUT  =======================

const Layout = () => {

  const location = useLocation();

  const hideNavbarRoutes = [
    "/login",
    "/join",
    "/read",
    "/userdashboard",
    "/profile",
    "/setting",
    "/admindashboard"
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <NavBar/>}

      <Routes>
        <Route path="/" element={
          <>
            <Hero/>
            <Welcome/>
            <Programs/>
            <Trainer/>
            {/* <WorkoutSessions/> */}
            {/* <Gallery/> */}
            <Pricing/>
            {/* <FitnessPlans/> */}
            {/* <Contact/> */}
            <ContactForm/>
            <Stats stats={stats} />
            {/* <BMICalculator/> */}
            <Footer/>
          </>
        }/>

        <Route path ="/join" element={<Join/>}/> 
        <Route path ="/read" element={<ReadMore/>}/>
        { <Route path ="/Workout/:type" element={<WorkoutDetail />}/>  /*:type = dynamic routing  */}
        <Route path ="/schedule" element={<Schedule/>}/>
        <Route path ="/workout" element={<Programs/>}/>
        <Route path ="/plan" element={<Pricing/>}/>
        <Route path ="/gallery" element={<Gallery/>}/>  
        <Route path ="/contact" element={<ContactForm/>}/>
        {/* <Route path = "/" element={<Home/>}/> */}
        <Route path ="/login" element={<Login/>}/>
        {/* <Route path ="/userdashboard" element={<UserDashboard/>}/> */}

        <Route 
        path = "/userdashboard" 
        element={
        <UserProtected>
          <UserDashboard/>
        </UserProtected>} 
        />

        <Route 
        path = "/admindashboard" 
        element={
        <AdminProtected>
          <AdminDashboard/>
        </AdminProtected>} 
        />
        <Route path = "/adminlogin" element={<AdminLogin/>} />

        <Route path = "/profile" element={<Profile/>} />
        <Route path = "/setting" element={<Setting/>}/>

      </Routes>
    </>
  );
};


// ======================= RETURN =======================

  return (
    <Router>
        <Layout/>
        <ToastContainer theme="dark" position="top-center"/>
    </Router> 
  )
}

export default App;