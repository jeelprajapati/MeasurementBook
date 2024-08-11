import React from "react";
import "./account.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { addressShcema } from "../../utils/scemas";
import Error from "../error/Error";
import { updateUserInfo } from "../../actions/account";
import toast from "react-hot-toast";

const AddressPopup = ({ handleClose, data, setReload, country, state }) => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: data,
      validationSchema: addressShcema,
      onSubmit: (value) => {
        updateUserInfo(
          {
            ...value,
            countryId: parseInt(value.countryId),
            stateId: parseInt(value.stateId),
          },
          () => {
            toast.success("Address Saved Successfully");
            setReload((prev) => !prev);
            handleClose();
          }
        );
      },
    });

  return (
    <div className="addressContainer">
      <h4 className="addressTitle">Edit address</h4>
      <div className="addressWrapper">
        <label htmlFor="address">
          Street Address <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="address"
          value={values.address ? values.address : ""}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Error error={errors.address} touch={touched.address} />
      </div>
      <div className="twoAddressWrapper">
        <div className="addressWrapper" style={{ flex: "1" }}>
          <label htmlFor="city">
            City <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={values.city ? values.city : ""}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Error error={errors.city} touch={touched.city} />
        </div>
        <div className="addressWrapper">
          <label htmlFor="countryId">
            Country <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="countryId"
            value={values.countryId ? values.countryId : ""}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="" disabled>
              Setect Country
            </option>
            {country.map((item) => (
              <option key={item.id} value={item.id}>
                {item.countryName}
              </option>
            ))}
          </select>
          <Error error={errors.countryId} touch={touched.countryId} />
        </div>
      </div>
      <div className="twoAddressWrapper">
        <div className="addressWrapper">
          <label htmlFor="stateId">
            State <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="stateId"
            value={values.stateId ? values.stateId : ""}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="" disabled>
              Setect State
            </option>
            {state
              .filter(
                (item) =>
                  toString(item.countryCode) === toString(values?.countryId)
              )
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.stateName}
                </option>
              ))}
          </select>
          <Error error={errors.state} touch={touched.state} />
        </div>
        <div className="addressWrapper" style={{ flex: "1" }}>
          <label htmlFor="postalCode">
            Postal Code <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode ? values.postalCode : ""}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Error error={errors.postalCode} touch={touched.postalCode} />
        </div>
      </div>
      <div className="addressButton">
        <button className="addressSave" onClick={handleSubmit}>
          Save
        </button>
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        className="addressClose"
        onClick={handleClose}
      />
    </div>
  );
};

export default AddressPopup;
