import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProtected = ({ children }) => {

  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    // 🔥 Prevent browser back cache
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  if (!token) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default AdminProtected;