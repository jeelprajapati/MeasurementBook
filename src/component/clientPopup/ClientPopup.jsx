import React from "react";
import "./clientPopup.css";
import { useFormik } from "formik";
import { clientScema } from "../../scemas";
import Error from "../error/Error";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import makeRequesInstance from "../../utils/makeRequest";
import { useAlert } from "react-alert";

const ClientPopup = ({
  item,
  country,
  state,
  setItem,
  initialState,
  setInput,
  input,
  setChange,
  change,
}) => {
  const organizationID = localStorage.getItem("organizationId");
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();
  const arrangeValues = (values) => {
    return {
      ...values,
      stateId: parseInt(values.stateId),
      countryId: parseInt(values.countryId),
      organizationID,
    };
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: item,
    validationSchema: clientScema,
    onSubmit: (value, action) => {
      const values = arrangeValues(value);
      const getResponse = async () => {
        if (input?.type === "ADD") {
          return await makeRequest.post("Client", values);
        } else if (input?.type === "UPDATE") {
          return await makeRequest.put("Client", values);
        }
      };
      getResponse()
        .then((res) => {
          if (res.status === 204) {
            alert.show(
              `Data ${input === "ADD" ? "Added" : "Updated"} Sucessfully`,
              { type: "success" }
            );
            setChange(!change);
            setItem(initialState);
            setInput({ type: "", credential: false });
            action.resetForm();
          }
        })
        .catch(() => {
          alert.show("Something Went Wrong!", { type: "info" });
        });
    },
  });
  const handleClose = () => {
    setItem(initialState);
    setValues(initialState);
    setInput({ type: "", credential: false });
  };
  return (
    <div className="clientPopupContainer">
      <h3>
        {input?.type === "ADD" && "Add New Client"}
        {input?.type === "UPDATE" && "Update Client"}
      </h3>
      <div className="formContainer">
        <div className="clientInputWrapper">
          <label htmlFor="name">
            Client Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.name} touch={touched.name} />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="email">
            Email <span style={{ color: "red" }}>*</span>
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
        <div className="clientInputWrapper">
          <label htmlFor="phoneNumber">
            Phone Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.phoneNumber} touch={touched.phoneNumber} />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="gstin">GSTIN</label>
          <input
            type="text"
            name="gstin"
            value={values.gstin}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="pan">PAN No.</label>
          <input
            type="text"
            name="pan"
            value={values.pan}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="address">
            Address <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.address} touch={touched.address} />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="city">
            City <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.city} touch={touched.city} />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="conutryId">
            Country <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="countryId"
            value={values.countryId}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled>
              Select Country
            </option>
            {country?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.countryName}
              </option>
            ))}
          </select>
          <Error error={errors.countryId} touch={touched.countryId} />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="stateId">
            State <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="stateId"
            value={values.stateId}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled>
              Select State
            </option>
            {state
              ?.filter(
                (item) =>
                  item?.countryCode.toString() === values?.countryId.toString()
              )
              ?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.stateName}
                </option>
              ))}
          </select>
          <Error error={errors.stateId} touch={touched.stateId} />
        </div>
        <div className="clientInputWrapper">
          <label htmlFor="postalCode">
            Postal Code <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.postalCode} touch={touched.postalCode} />
        </div>
      </div>
      <button
        type="submit"
        className="clientPopupButton"
        onClick={handleSubmit}
      >
        {input?.type === "ADD" && "Submit"}
        {input?.type === "UPDATE" && "Update"}
      </button>
      <FontAwesomeIcon
        icon={faXmark}
        className="clientPopupClose"
        onClick={handleClose}
      />
    </div>
  );
};

export default ClientPopup;
