import React, { useState } from "react";
import "./resetPassword.css";
import { useFormik } from "formik";
import { resetSchema } from "../../scemas/index.js";
import Error from "../../component/error/Error.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
const Reset = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const query=new URLSearchParams(useLocation()?.search);
  const token=query?.get('token');
  const email = query?.get('email');
  
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: resetSchema,
      onSubmit: (values, action) => {
        const makeRequest = async () => {
          setLoading(true);
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/Authentication/reset-password`,
              {},
              {
                params: {
                  Email:email,
                  Token:encodeURIComponent(token),
                  Password:values.confirmPassword
                },
              }
            );
            if (res.status === 200) {
              action.resetForm();
              alert.show("password reset sucessfully", { type: "success" });
              navigate("/login");
            }
          } catch (error) {
            console.log(error);
            alert.show("something went wrong", { type: "info" });
          }
          setLoading(false);
        };
        makeRequest();
      },
    });
  return (
    <div className="resetContainer">
      <div className="resetTitle">
        <h3>Reset Password</h3>
      </div>
      <div className="resetForm">
        <div className="resetWrapper">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="resetInput"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPassword}
          />
          <Error error={errors.newPassword} touch={touched.newPassword} />
        </div>
        <div className="resetWrapper">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="resetInput"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          <Error
            error={errors.confirmPassword}
            touch={touched.confirmPassword}
          />
        </div>
      </div>
      <div className="resetButton">
        <input
          type="button"
          value="Submit"
          onClick={handleSubmit}
          className={`${loading ? "loader" : "pointer"}`}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Reset;
