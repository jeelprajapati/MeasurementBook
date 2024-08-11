import { useState } from "react";
import "./forgetPassword.css";
import { useFormik } from "formik";
import { forgetPasswordSchema } from "../../utils/scemas/index.js";
import { Link } from "react-router-dom";
import Error from "../../component/error/Error.jsx";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forgetPassword } from "../../actions/authentication.js";
const Forgetpassword = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgetPasswordSchema,
      onSubmit: (values) => {
        setLoading(true);
        forgetPassword(values,()=>{
          setSuccess(true);
        })
        setLoading(false);
      },
    });
  
  return (
    <>
      {!success ? (
        <div className="forgetContainer">
          <h3 className="forgetTitle">Forgot Your Password ?</h3>
          <div className="forgetInput">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email*"
              className="forgetEmail"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {<Error touch={touched.email} error={errors.email} />}
          </div>
          <div className="forgetButtons">
            <input
              type="button"
              value="Submit"
              onClick={handleSubmit}
              className="forgetBtn"
            />
            <Link to="/login" className="link" style={{ width: "100%" }}>
              <input
                type="button"
                className="forgetBtn"
                value="Cancel"
                style={{ backgroundColor: "white", color: "#2e4a93" }}
              />
            </Link>
          </div>
        </div>
      ) : (
        <div className="textContainer">
          <h3>Reset Password</h3>
          <span>
            An email has been sent to{" "}
            <b>
              <a href="https://mail.google.com/mail/u/0/#inbox">
                {values.email}
              </a>
            </b>{" "}
            with link for resetting your password.
          </span>
        </div>
      )}
      {loading && <div className="box">
        <FontAwesomeIcon icon={faSpinner} spin className="loading" /> 
      </div>}
    </>
  );
};

export default Forgetpassword;
