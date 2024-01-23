import { useState } from "react";
import "./forgetPassword.css";
import { useFormik } from "formik";
import { forgetPassword } from "../../scemas/index.js";
import { Link } from "react-router-dom";
import Error from "../../component/error/Error.jsx";
import axios from "axios";
import { useAlert } from "react-alert";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Forgetpassword = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const initialValues = {
    email: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgetPassword,
      onSubmit: (values) => {
        const makeRequest = async () => {
          setLoading(true);
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/Authentication/forgot-password`,
              values
            );
            if (res.status === 200) {
              setSuccess(true);
            }
          } catch (error) {
            if (error.response) {
              if (error.response.data.status === 404) {
                alert.show("invalid email address", { type: "error" });
              } else {
                alert.show(error.response.data.title, { type: "error" });
              }
            } else {
              alert.show("something went wrong", { type: "info" });
            }
          }
          setLoading(false);
        };
        makeRequest();
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
