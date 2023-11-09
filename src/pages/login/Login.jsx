import React, { useState } from "react";
import "./Login.css";
import makeRequesInstance from "../../makeRequest";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { loginScema } from "../../scemas/index.js";
import Error from "../../component/error/Error.jsx";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const initialValues = {
    username: "",
    password: "",
  };
  const handleLoginAndSetId = async (token) => {
    const makeRequest = makeRequesInstance(token);
    try {
      const res = await makeRequest.get("/Account/GetUserInfo");
      localStorage.setItem(
        "organizationId",
        res.data.organizations[0].organizationID
      );
      if (res.status === 200) {
        try {
          const clients = await makeRequest.get(
            `Client?page=${1}&pageSize=${100}&organizationId=${
              res.data.organizations[0].organizationID
            }`
          );
          if (clients.data.items.length === 0) {
            navigate("/client");
          } else {
            navigate("/");
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
            alert.show(error.message, { type: "error" });
          } else {
            alert.show("Iternal server error", { type: "error" });
          }
        }
      }
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "info" });
      } else if (error.code === "ERR_NETWORK") {
        alert.show(error.message, { type: "error" });
      } else {
        alert.show("Iternal server error", { type: "error" });
      }
    }
    setLoading(false);
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginScema,
      onSubmit: (values, action) => {
        const handleLogin = async () => {
          setLoading(true);
          try {
            const res = await axios.post(
              "https://dev-api.measurekaro.com/api/Authentication/login",
              values
            );
            if (res.status === 200) {
              console.log('jele')
              localStorage.setItem("token", res.data.token);
              handleLoginAndSetId(res.data.token);
              action.resetForm();
            }
          } catch (error) {
            if (error.response) {
              if (error.response.status === 401) {
                alert.show("Invalid Username Or Password", { type: "error" });
              } else {
                alert.show(error.response.data.title, { type: "error" });
              }
            } else if (error.request) {
              alert.show("something want wrong", { type: "info" });
            } else {
              alert.show(error.message, { type: "error" });
            }
          }
          setLoading(false);
        };
        handleLogin();
      },
    });

  return (
      <div className="login-container">
        <div className="login-title">Login</div>
        <div className="login-wrapper">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="login-input"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<Error touch={touched.username} error={errors.username} />}
        </div>
        <div className="login-wrapper">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            className="login-input"
            onChange={handleChange}
          />
          {<Error touch={touched.password} error={errors.password} />}
        </div>
        <div className="button-container">
          <button
            className={`${
              loading ? "login-button reload" : "login-button pointer"
            }`}
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link to="/reset" className="link" style={{flex:'1'}}>
            <button
              className={`${
                loading ? "forget-button reload" : "forget-button pointer"
              }`}
            >
              Forget Password
            </button>
          </Link>
        </div>
        <div className="link-register">
          Don't have an account ? <Link to="/register">sign up</Link>
        </div>
      </div>
  );
};

export default Login;
