import React, { useEffect } from "react";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const Id = localStorage.getItem("organizationId");
  console.log(Id);
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
          home</div>
      </div>
    </div>
  );
};

export default Home;
