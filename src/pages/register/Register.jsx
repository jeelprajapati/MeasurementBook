import React, { useEffect, useState } from "react";
import "./Register.css";
import makeRequesInstance from "../../makeRequest";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { signUpScema } from "../../scemas";
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
          "https://dev-api.measurekaro.com/api/Standard/GetPlans"
        );
        setPlanID(res.data);
      } catch (error) {
        console.log(error);
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
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
            alert.show(error.message, { type: "error" });
          } else {
            alert.show("Iternal server error", { type: "error" });
          }
        }
      }
      register();
    }
  })

  return (
          <div className="main-register-container">
            <div className="sub-container">
              <div className="register-title">Register</div>
              <div className="register-container">
                <div>
                  <input
                    type="text"
                    placeholder="Username*"
                    className="register-input"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    errors.username && touched.username?<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}
                    >
                      {errors.username}
                    </p>:<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                    </p>
                  }
                  <br />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Name*"
                    name="name"
                    className="register-input"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                     errors.name && touched.name?<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                      {errors.name}
                    </p>:<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                    </p>
                  }
                  <br />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email*"
                    name="email"
                    className="register-input"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                     errors.email && touched.email?<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}
                    >
                      {errors.email}
                    </p>:<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                    </p>
                  }
                  <br />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password*"
                    name="password"
                    className="register-input"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                     errors.password && touched.password?<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}
                    >
                      {errors.password}
                    </p>:<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                    </p>
                  }
                  <br />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Organization Name*"
                    name="organizationname"
                    className="register-input"
                    value={values.organizationname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                     errors.organizationname && touched.organizationname?<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}
                    >
                      {errors.organizationname}
                    </p>:<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                    </p>
                  }
                  <br />
                </div>
                <div>
                  <select
                    name="plan"
                    className="register-select"
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
                  {
                     errors.plan && touched.plan?<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}
                    >
                      {errors.plan}
                    </p>:<p
                      style={{
                        margin: "0 0 0 8px",
                        fontSize: "13px",
                        fontFamily:"'Roboto'",
                        color: "red",
                        width: "200px",
                      }}>
                    </p>
                  }
                </div>
              </div>
              <input type='button' value='Register' className="register-button" onClick={handleSubmit} />
              <div className="link-login">
                Do have an account ? <Link to="/login">sign in</Link>
              </div>
            </div>
          </div>
  );
};

export default Register;
