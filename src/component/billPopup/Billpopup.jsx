import React from "react";
import close from "../../image/close.svg";
import "./Billpopup.css";
import makeRequesInstance from "../../makeRequest";
import { useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { billScema } from "../../scemas";
import Error from "../error/Error.jsx";
const Billpopup = ({
  setOpen,
  item,
  setItem,
  setChange,
  change,
  open
}) => {
  const Id = useLocation().search.split("?")[1].split("=")[1];
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();

  const handleClose = () => {
    setOpen('');
    setItem({ name: "", invoiceDate: "", typeBill: "", status: "" });
  };

  const addFormik = useFormik({
    initialValues: item,
    validationSchema: billScema,
    onSubmit: (value, action) => {
      const handleAdd = async () => {
        try {
          const res = await makeRequest.post("/Bill", {
            id: "00000000-0000-0000-0000-000000000000",
            invoiceNo: "INV-2023080428",
            name: value?.name,
            invoiceDate: value?.invoiceDate,
            typeBill: parseInt(value?.typeBill),
            status: parseInt(value?.status),
            projectId: Id,
          });
          if (res.status === 204) {
            alert.show("Data Added Sucessfully", { type: "success" });
            action.resetForm();
            setOpen('');
            setChange(!change);
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
      };
      handleAdd();
    },
  });

  const updateFormik = useFormik({
    initialValues: item,
    validationSchema: billScema,
    onSubmit: (value, action) => {
      const handleUpdate = async () => {
        try {
          const res = await makeRequest.put("/Bill", {
            id: value?.id,
            invoiceNo: value?.invoiceNo,
            name: value?.name,
            invoiceDate: value?.invoiceDate,
            typeBill: parseInt(value?.typeBill),
            status: parseInt(value?.status),
            projectId: Id,
          });
          if (res.status === 204) {
            alert.show("Data Updated Sucessfully", { type: "success" });
            action.resetForm();
            setOpen('');
            setItem({ name: "", invoiceDate: "", typeBill: "", status: "" });
            setChange(!change);
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
      };

      handleUpdate();
    },
  });
  return (
    <div className="bill-popup-container">
      <h3 className="bill-popup-title">{open==='update' ? "Update" : "Add"} Bill</h3>
      <div className="bill-popup-wrapper">
        <label htmlFor="projectName" className="bill-popup-label">
          Bill Name <span>*</span>
        </label>
        <input
          type="text"
          id="name"
          className="bill-popup-input"
          name="name"
          value={open==='update' ? updateFormik.values.name : addFormik.values.name}
          onChange={open==='update' ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={open==='update' ? updateFormik.handleBlur : addFormik.handleBlur}
        />
        {open==='update' ? (
          <Error
            touch={updateFormik.touched.name}
            error={updateFormik.errors.name}
          />
        ) : (
          <Error
            touch={addFormik.touched.name}
            error={addFormik.errors.name}
          />
        )}
      </div>
      <div className="bill-popup-wrapper">
        <label htmlFor="invoiceDate" className="bill-popup-label">
          Invoice Date <span>*</span>
        </label>
        <input
          type="date"
          name="invoiceDate"
          id="invoiceDate"
          className="bill-popup-input"
          value={
            open==='update'
              ? updateFormik.values.invoiceDate?.split("T")[0]
              : addFormik.values.invoiceDate?.split("T")[0]
          }
          onChange={open==='update' ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={open==='update' ? updateFormik.handleBlur : addFormik.handleBlur}
        />
        {open==='update' ? (
          <Error
            touch={updateFormik.touched.invoiceDate}
            error={updateFormik.errors.invoiceDate}
          />
        ) : (
          <Error
            touch={addFormik.touched.invoiceDate}
            error={addFormik.errors.invoiceDate}
          />
        )}
      </div>
      <div className="bill-popup-wrapper">
        <label htmlFor="typeBill" className="bill-popup-label">
          Type <span>*</span>
        </label>
        <select
          name="typeBill"
          className="bill-popup-select"
          id=""
          value={
            open==='update' ? updateFormik.values.typeBill : addFormik.values.typeBill
          }
          onChange={open==='update' ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={open==='update' ? updateFormik.handleBlur : addFormik.handleBlur}
        >
          <option value="" disabled>select Type</option>
          <option value="1">RA</option>
          <option value="2">Final</option>
        </select>
        {open==='update' ? (
          <Error
            touch={updateFormik.touched.typeBill}
            error={updateFormik.errors.typeBill}
          />
        ) : (
          <Error
            touch={addFormik.touched.typeBill}
            error={addFormik.errors.typeBill}
          />
        )}
      </div>
      <div className="bill-popup-wrapper">
        <label htmlFor="status" className="bill-popup-label">
          Status <span>*</span>
        </label>
        <select
          name="status"
          className="bill-popup-select"
          id=""
          value={open==='update' ? updateFormik.values.status : addFormik.values.status}
          onChange={open==='update' ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={open==='update' ? updateFormik.handleBlur : addFormik.handleBlur}
        >
          <option value="" disabled>select status</option>
          <option value="1">Draft</option>
          <option value="2">Submitted</option>
          <option value="3">Accepted</option>
        </select>
        {open==='update' ? (
          <Error
            touch={updateFormik.touched.status}
            error={updateFormik.errors.status}
          />
        ) : (
          <Error
            touch={addFormik.touched.status}
            error={addFormik.errors.status}
          />
        )}
      </div>
      <div className="bill-popup-button">
        <input
          type="button"
          value={`${open==='update' ? "Update Bill" : "+ Add Bill"}`}
          className="bill-popup-btn"
          onClick={open==='update' ? updateFormik.handleSubmit : addFormik.handleSubmit}
        />
      </div>
      <img src={close} onClick={handleClose} alt="" className="bill-popup-close" />
    </div>
  );
};

export default Billpopup;
