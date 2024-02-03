import React, { useState } from "react";
import "./resetPassword.css";
import { useFormik } from "formik";
import { resetSchema } from "../../utils/scemas/index.js";
import Error from "../../component/error/Error.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../actions/authentication.js";
const Reset = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(useLocation()?.search);
  const token = query?.get("token");
  const email = query?.get("email");

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: resetSchema,
      onSubmit: (values, action) => {
        setLoading(true);
        resetPassword(
          email,
          encodeURIComponent(token),
          values.confirmPassword,
          () => {
            action.resetForm();
            toast.success("Password Reset Successfully");
            navigate("/login");
          }
        );
        setLoading(false);
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
