import React, { useEffect, useState } from "react";
import "./Register.css";
import makeRequesInstance from "../../makeRequest";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from '../../component/sidebar/Sidebar.jsx'
const Register = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [planId, setPlanID] = useState(null);
  const navigate = useNavigate();
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  useEffect(() => {
    const getPlanId = async () => {
      setLoading(true);
      try{
        const res = await axios.get(
        "https://dev-api.measurekaro.com/api/Standard/GetPlans"
      );
      console.log(res.data);  
      setPlanID(res.data);
      }
      catch(error){
        console.log(error)
      }
      setLoading(false);
    };
    return () => {
      getPlanId();
    };
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await makeRequest.post("/Authentication/register/subscriber", data);
    if (res.status === 200) {
      navigate("/login");
      console.log(res)
      setLoading(false);
      setError(null);
    } else {
      setError(res.response.data);
      setLoading(true);
    }
  };

  return (
    <>
    <div style={{display:'flex'}}>
    <div className="client-left"><Sidebar id={0}/></div>
      <div className="register-right">
      <div className="main-register-container">
      <div className="sub-container">
        <div className="register-title">Register</div>
        <div className="register-container">
          <input
            type="text"
            placeholder="username*"
            name="username"
            className="register-input"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Name*"
            name="name"
            className="register-input"
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email*"
            name="email"
            className="register-input"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="password*"
            name="password"
            className="register-input"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="organizationname*"
            name="organizationname"
            className="register-input"
            onChange={handleChange}
          />
          <br />
          <select name="plan" className="register-select" id="" onChange={handleChange}>
            <option value=""> select plan*</option>
            {!loading &&
              planId?.map((item) => (
                <option value={item?.planID}>{item?.planName}</option>
              ))}
          </select>
          </div>
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <div className="link-login">Go To <Link to='/login'>Login</Link></div>
      </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Register;
