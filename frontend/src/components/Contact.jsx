// import React, { useState } from "react";
// import { ClipLoader } from "react-spinners";

// const Contact = () => {

// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [message, setMessage] = useState("");
// const [loading, setLoading] = useState(false);

// const handleSubmit = async (e) => {

// e.preventDefault();

// const response = await fetch("http://localhost:5000/api/contact",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// name,
// email,
// message
// })
// });

// const data = await response.json();

// alert(data.message);

// };
// return (

// <section id="contact" className="contact">

// <form onSubmit={handleSubmit}>

// <h1>CONTACT US</h1>

// <div>
// <label>Name</label>
// <input
// type="text"
// value={name}
// onChange={(e) => setName(e.target.value)}
// required
// />
// </div>

// <div>
// <label>Email</label>
// <input
// type="email"
// value={email}
// onChange={(e) => setEmail(e.target.value)}
// required
// />
// </div>

// <div>
// <label>Message</label>
// <input
// type="text"
// value={message}
// onChange={(e) => setMessage(e.target.value)}
// required
// />
// </div>

// <button
// type="submit"
// disabled={loading}
// style={{
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// gap:"10px"
// }}
// >

// {loading && <ClipLoader size={18} color="white" />}

// Send Message

// </button>

// </form>

// </section>

// );
// };

// export default Contact;