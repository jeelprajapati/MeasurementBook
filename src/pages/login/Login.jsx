import React, { useState } from "react";
import "./Login.css";
import makeRequesInstance from "../../makeRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const Login = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const alert = useAlert();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLoginAndSetId = async (token) => {
    const makeRequest = makeRequesInstance(token);
    const res = await makeRequest.get("/Account/GetUserInfo");
    localStorage.setItem(
      "organizationId",
      res.data.organizations[0].organizationID
    );
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://billbookapi-env-1.eba-ue94tp4s.ap-south-1.elasticbeanstalk.com/api/Authentication/login",
        data
      );
      if (res.status === 200) {
        handleLoginAndSetId(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert.show("Invalid Username Or Password", { type: "error" });
    }
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <div className="login-title">Login</div>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="login-input"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="login-input"
          onChange={handleChange}
        />
        <br />
        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <button className="forget-button">Forget Password</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
