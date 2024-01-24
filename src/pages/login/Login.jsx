import React, { useEffect, useState } from "react";
import "./login.css";
import makeRequesInstance from "../../utils/makeRequest.js";
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
    email: "",
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
            alert.show(error.response.data.title, { type: "error" });
          } else {
            alert.show("something went wrong", { type: "info" });
          }
        }
      }
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "error" });
      } else {
        alert.show("something went wrong", { type: "info" });
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
              `${process.env.REACT_APP_BASE_URL}/Authentication/login`,
              values
            );
            if (res.status === 200) {
          
              localStorage.setItem("token", res.data.token);
              handleLoginAndSetId(res.data.token);
              action.resetForm();
            }
          } catch (error) {
            if (error.response) {
              if (error.response.status === 401) {
                alert.show("Invalid Email Or Password", { type: "error" });
              } else {
                alert.show(error.response.data.title, { type: "error" });
              }
            } else if (error.request) {
              alert.show("something went wrong", { type: "info" });
            } else {
              alert.show(error.message, { type: "error" });
            }
          }
          setLoading(false);
        };
        handleLogin();
      },
    });

    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSubmit();
        }
      };
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
      <div className="loginContainer">
        <div className="loginTitle">Login</div>
        <div className="loginWrapper">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="loginInput"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<Error touch={touched.email} error={errors.email} />}
        </div>
        <div className="loginWrapper">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            className="loginInput"
            onChange={handleChange}
          />
          {<Error touch={touched.password} error={errors.password} />}
        </div>
        <div className="buttonContainer">
          <button
            className={`${
              loading ? "loginButton reload" : "loginButton pointer"
            }`}
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link className="link" to='/forget-password' style={{flex:'1'}}>
            <button
              className={`${
                loading ? "forgetButton reload" : "forgetButton pointer"
              }`}
            >
              Forget Password
            </button>
          </Link>
        </div>
        <div className="linkRegister">
          Don't have an account ? <Link to="/register">sign up</Link>
        </div>
      </div>
  );
};

export default Login;
