import React from "react";
import "./changePassword.css";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../utils/scemas/index.js";
import Error from "../error/Error.jsx";
import { changePassword } from "../../actions/authentication.js";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        currentPassword: "",
        newPassword: "",
        cNewPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: (values, action) => {
        changePassword(
          values.email,
          values.currentPassword,
          values.newPassword,
          () => {
            toast.success("Password changed successfully.");
            action.resetForm();
          }
        );
      },
    });
  return (
    <div className="changePasswordContainer">
      <div className="changePasswordTitle">Change Password</div>
      <div className="changePasswordForm">
        <div className="changePasswordWrapper">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.email} touch={touched.email} />
        </div>
        <div className="changePasswordWrapper">
          <label htmlFor="currentPassword">
            Current Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error
            error={errors.currentPassword}
            touch={touched.currentPassword}
          />
        </div>
        <div className="changePasswordWrapper">
          <label htmlFor="newPassword">
            New Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.newPassword} touch={touched.newPassword} />
        </div>
        <div className="changePasswordWrapper">
          <label htmlFor="cNewPassword">
            Confirm New Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="cNewPassword"
            value={values.cNewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.cNewPassword} touch={touched.cNewPassword} />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
