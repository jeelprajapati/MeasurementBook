import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginScema } from "../../utils/scemas/index.js";
import Error from "../../component/error/Error.jsx";
import { getOrganizationId, login } from "../../actions/authentication.js";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleLoginAndSetId = async (token) => {
    setLoading(true)
    getOrganizationId(token, (organizationId) => {
      localStorage.setItem("organizationId", organizationId);
      navigate('/')
    });
    setLoading(false);
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginScema,
      onSubmit: (values, action) => {
        setLoading(true);
        login(values, (token) => {
          localStorage.setItem("token", token);
          handleLoginAndSetId(token);
          action.resetForm();
        });
        setLoading(false);
      },
    });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Link className="link" to="/forget-password" style={{ flex: "1" }}>
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
