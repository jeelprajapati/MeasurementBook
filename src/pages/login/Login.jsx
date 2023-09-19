import React, { useState } from "react";
import "./Login.css";
import makeRequesInstance from "../../makeRequest";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import Sidebar from '../../component/sidebar/Sidebar.jsx'
const Login = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const alert = useAlert();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLoginAndSetId = async (token) => {
    const makeRequest = makeRequesInstance(token);
    try {
      const res = await makeRequest.get("/Account/GetUserInfo");
      localStorage.setItem(
        "organizationId",
        res.data.organizations[0].organizationID
      );
    } catch (error) {
      if(error.response){
        alert.show(error.response.data.title,{type:'info'})
      }
      else if(error.code==='ERR_NETWORK'){
        alert.show(error.message,{type:'error'})
      }
      else{
        alert.show('Iternal server error',{type:'error'})
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://dev-api.measurekaro.com/api/Authentication/login",
        data
      );
      if (res.status === 200) {
        handleLoginAndSetId(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      if(error?.response.status===401){
        alert.show('Invalid Username Or Password',{type:'error'})
      }
      else if(error.response){
        alert.show(error.response.data.title,{type:'info'})
      }
      else if(error.code==='ERR_NETWORK'){
        alert.show(error.message,{type:'error'})
      }
      else{
        alert.show('Iternal server error',{type:'error'})
      }
    }
  };

  return (
    <div className="main-login-container">
       <div className="client-left"><Sidebar id={0}/></div>
        <div className="login-right">
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
        <div className="link-register">
          Go to register <Link to='/register'>Register</Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
