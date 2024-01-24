import React, { useEffect, useState } from "react";
import "./register.css";
import makeRequesInstance from "../../utils/makeRequest.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { signUpScema } from "../../scemas/index.js";
import Error from "../../component/error/Error.jsx";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [planId, setPlanID] = useState(null);
  const navigate = useNavigate();
  const intialvalue={
    username: "",
    name: "",
    password: "",
    email: "",
    organizationname: "",
    plan: "",
  }

  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();
  useEffect(() => {
    const getPlanId = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/Standard/GetPlans`
        );
        setPlanID(res.data);
      } catch (error) {
        if (error.response) {
          alert.show(error.response.data.title, { type: "error" });
        } else {
          alert.show("something went wrong", { type: "info" });
        }
      }
      setLoading(false);
    };
    getPlanId();
  }, [alert]);

  const {values,handleBlur,handleChange,handleSubmit,errors,touched}=useFormik({
    initialValues:intialvalue,
    validationSchema:signUpScema,
    onSubmit:(values,action)=>{
      const register=async()=>{
        try {
          const res = await makeRequest.post(
            "/Authentication/register/subscriber",
            values
          );
          if (res.status === 200) {
            action.resetForm();
            alert.show("user register sucessfully", { type: "success" });
            navigate("/login");
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "error" });
          } else {
            alert.show("something went wrong", { type: "info" });
          }
        }
      }
      register();
    }
  })

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
                  {<Error touch={touched.username} error={errors.username}/>}
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
                   {<Error touch={touched.name} error={errors.name}/>}
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
                   {<Error touch={touched.email} error={errors.email}/>}
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
                   {<Error touch={touched.password} error={errors.password}/>}
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
                   {<Error touch={touched.organizationname} error={errors.organizationname}/>}
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
                    {!loading &&
                      planId?.map((item) => (
                        <option value={item?.planID}>{item?.planName}</option>
                      ))}
                  </select>
                  {<Error touch={touched.plan} error={errors.plan}/>}
                </div>
              </div>
              <input type='button' value='Register' className="registerButton" onClick={handleSubmit} />
              <div className="goToLogin">
                Do have an account ? <Link to="/login">sign in</Link>
              </div>
          </div>
  );
};

export default Register;
