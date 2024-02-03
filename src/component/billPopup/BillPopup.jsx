import React from "react";
import "./billPopup.css";
import { useFormik } from "formik";
import { billScema } from "../../utils/scemas/index.js";
import Error from "../error/Error.jsx";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addBill, updateBill } from "../../actions/bill.js";
import toast from "react-hot-toast";
const Billpopup = ({
  initialState,
  setInitialValues,
  initialValues,
  inputType,
  setInputType,
  setChange,
  change,
  projectId
}) => {
  const handleClose = () => {
    setInitialValues(initialState);
    setInputType({type:"",credential:false});
  };

  const arrangeValues=(value)=>{
    return{
      ...value,
      typeBill: parseInt(value?.typeBill),
      status: parseInt(value?.status),
      projectId
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: billScema,
      onSubmit: (value, action) => {
        const values=arrangeValues(value);
          if(inputType?.type==="ADD"){
            addBill(values,()=>{
              toast.success("Data Added Successfully");
              setChange(!change);
              handleClose();
              action.resetForm();
            })
          }
          else if(inputType?.type==="UPDATE"){
            updateBill(values,()=>{
              toast.success("Data Added Successfully");
              setChange(!change);
              handleClose();
              action.resetForm();
            })
          }
      },
    });

  return (
    <div className="billPopupContainer">
      <h3 className="billPopupTitle">
        {inputType?.type === "UPDATE" ? "Update" : "Add"} Bill
      </h3>
      <div className="billPopupWrapper">
        <label htmlFor="name" className="billPopupLabel">
          Bill Name <span>*</span>
        </label>
        <input
          type="text"
          className="billPopupInput"
          name="name"
          value={values?.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Error error={errors.name} touch={touched.name} />
      </div>
      <div className="billPopupWrapper">
        <label htmlFor="invoiceDate" className="billPopupLabel">
          Invoice Date <span>*</span>
        </label>
        <input
          type="date"
          name="invoiceDate"
          className="billPopupInput"
          value={values?.invoiceDate?.split("T")[0]}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Error error={errors.invoiceDate} touch={touched.invoiceDate} />
      </div>
      <div className="billPopupWrapper">
        <label htmlFor="typeBill" className="billPopupLabel">
          Type <span>*</span>
        </label>
        <select
          name="typeBill"
          className="billPopupSelect"
          value={values?.typeBill}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option value="" disabled>
            select Type
          </option>
          <option value="1">RA</option>
          <option value="2">Final</option>
        </select>
        <Error error={errors.typeBill} touch={touched.typeBill} />
      </div>
      <div className="billPopupWrapper">
        <label htmlFor="status" className="billPopupLabel">
          Status <span>*</span>
        </label>
        <select
          name="status"
          className="billPopupSelect"
          value={values?.status}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option value="" disabled>
            select status
          </option>
          <option value="1">Draft</option>
          <option value="2">Submitted</option>
          <option value="3">Accepted</option>
        </select>
        <Error error={errors.status} touch={touched.status} />
      </div>
      <div className="billPopupButton">
        <input
          type="button"
          value={`${
            inputType?.type === "UPDATE" ? "Update Bill" : "+ Add Bill"
          }`}
          onClick={handleSubmit}
        />
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        className="billPopupClose"
        onClick={handleClose}
      />
    </div>
  );
};

export default Billpopup;
