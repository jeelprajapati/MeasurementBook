import React, { useState } from "react";
import "./Login.css";
import makeRequesInstance from "../../makeRequest";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const Login = () => {
  const [data, setData] = useState(null);
  const [loading,setLoading]=useState(false);
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
      if(res.status===200){
        try {
          const clients= await makeRequest.get(`Client?page=${1}&pageSize=${100}&organizationId=${res.data.organizations[0].organizationID}`) 
          if(clients.data.items.length===0){
            navigate('/client');
          }
          else{
            navigate('/');
          }
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
      }
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
    setLoading(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://dev-api.measurekaro.com/api/Authentication/login",
        data
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        handleLoginAndSetId(res.data.token);
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
        alert.show('Internal server error',{type:'error'})
      }
    }
    setLoading(false);
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <div className="login-title">Login</div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="login-input"
          onChange={handleChange}
         />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="login-input"
          onChange={handleChange}
        />
        <br />
        <div className="button-container">
          <button className={`${loading?'login-button reload':'login-button pointer'}`} onClick={handleLogin}>
            Login
          </button>
          <button className={`${loading?'forget-button reload':'forget-button pointer'}`}>Forget Password</button>
        </div>
        <div className="link-register">
          Don't have an account ? <Link to='/register'>sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
