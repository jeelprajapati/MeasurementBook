import React, { useState } from "react";
import "./Register.css";
import makeRequesInstance from "../../makeRequest";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await makeRequest.post("/Authentication/register", data);
    if (res.status === 200) {
      navigate("/login");
      setLoading(false);
      setError(null);
    } else {
      setError(res.response.data);
      setLoading(true);
    }
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <div className="login-title">Register</div>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="login-input"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="login-input"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
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
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <br />
        {loading && (
          <div className="warning">
            {error?.map((item) => (
              <span>{item}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
