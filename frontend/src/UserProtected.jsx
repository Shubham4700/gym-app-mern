import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {

  const token = sessionStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtected;