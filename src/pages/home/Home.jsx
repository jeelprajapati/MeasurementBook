import React, { useEffect } from "react";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <div>
      <div className="home-container">
        <div className="home-left">
          <Sidebar id={1} />
        </div>
        <div className="home-right">
        </div>
      </div>
    </div>
  );
};

export default Home;
