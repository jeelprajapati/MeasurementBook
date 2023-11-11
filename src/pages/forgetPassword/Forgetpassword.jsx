import React from "react";
import "./Forgetpassword.css";
import { useFormik } from "formik";
import { forgetPassword } from "../../scemas/index.js";
import { Link } from "react-router-dom";
import Error from "../../component/error/Error.jsx";
const Forgetpassword = () => {
  const initialValues = {
    email: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgetPassword,
      onSubmit:(values,action)=>{
        console.log(values)
      }
    });

  return (
    <div className="forget-container">
      <h3 className="forget-title">Forgot Your Password ?</h3>
      <div className="forget-input">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email*"
          className="forget-email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {<Error touch={touched.email} error={errors.email}/>}
      </div>
      <div className="forget-buttons">
        <input
          type="button"
          value="Submit"
          onClick={handleSubmit}
          className="forget-btn"
        />
        <Link to="/login" className="link" style={{ width: "100%" }}>
          <input
            type="button"
            className="forget-btn"
            value="Cancel"
            style={{ backgroundColor: "white", color: "#2e4a93" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Forgetpassword;
