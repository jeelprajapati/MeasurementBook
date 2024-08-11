import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpScema } from "../../utils/scemas/index.js";
import Error from "../../component/error/Error.jsx";
import toast from "react-hot-toast";
import { getPlan } from "../../actions/standard.js";
import { register } from "../../actions/authentication.js";
const Register = () => {
  const [planId, setPlanID] = useState([]);
  const navigate = useNavigate();
  const intialvalue = {
    username: "",
    name: "",
    password: "",
    email: "",
    organizationname: "",
    plan: "",
  };

  useEffect(() => {
    getPlan((data) => {
      setPlanID(data);
    });
  }, []);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: intialvalue,
      validationSchema: signUpScema,
      onSubmit: (values, action) => {
        register(values, () => {
          action.resetForm();
          toast.success("User Register successfully");
          navigate("/login");
        });
      },
    });

  return (
    <div className="registerContainer">
      <div className="registerTitle">Register</div>
      <div className="registerWrapper">
        <div className="errorInputWrapper">
          <input
            type="text"
            placeholder="Username*"
            className="registerInput"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<Error touch={touched.username} error={errors.username} />}
        </div>
        <div className="errorInputWrapper">
          <input
            type="text"
            placeholder="Name*"
            name="name"
            className="registerInput"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<Error touch={touched.name} error={errors.name} />}
        </div>
        <div className="errorInputWrapper">
          <input
            type="email"
            placeholder="Email*"
            name="email"
            className="registerInput"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<Error touch={touched.email} error={errors.email} />}
        </div>
        <div className="errorInputWrapper">
          <input
            type="password"
            placeholder="Password*"
            name="password"
            className="registerInput"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<Error touch={touched.password} error={errors.password} />}
        </div>
        <div className="errorInputWrapper">
          <input
            type="text"
            placeholder="Organization Name*"
            name="organizationname"
            className="registerInput"
            value={values.organizationname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {
            <Error
              touch={touched.organizationname}
              error={errors.organizationname}
            />
          }
        </div>
        <div className="errorInputWrapper">
          <select
            name="plan"
            className="registerSelect"
            id=""
            value={values.plan}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value=""> Select Plan*</option>
            {planId?.map((item) => (
              <option key={item?.planID} value={item?.planID}>
                {item?.planName}
              </option>
            ))}
          </select>
          {<Error touch={touched.plan} error={errors.plan} />}
        </div>
      </div>
      <input
        type="button"
        value="Register"
        className="registerButton"
        onClick={handleSubmit}
      />
      <div className="goToLogin">
        Do have an account ? <Link to="/login">sign in</Link>
      </div>
    </div>
  );
};

export default Register;
