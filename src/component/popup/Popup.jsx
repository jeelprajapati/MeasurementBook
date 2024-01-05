import React from "react";
import "./popup.css";
import close from "../../image/close.svg";
import makeRequesInstance from "../../utils/makeRequest.js";
import useFetch from "../../hooks/useFetch";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { projectScema } from "../../scemas";
import Error from "../error/Error.jsx";

const Popup = ({ setPopUp, setChange, change, input, update, setUpdate }) => {
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const organizationId = localStorage.getItem("organizationId");
  const alert = useAlert();
  const { loding, data } = useFetch({
    url: `Client?organizationId=${organizationId}&page=${1}&pageSize=${100}`,
    change,
  });

  const handleClose = (e) => {
    e.preventDefault();
    setPopUp(false);
    setUpdate(false);
  };

  const addFormik = useFormik({
    initialValues: input,
    validationSchema: projectScema,
    onSubmit: (value, action) => {
      const handleAdd = async () => {
        const cDate = new Date(value?.loiDate);
        cDate.setDate(cDate.getDate() + parseInt(value?.contractValidity || 0));
        try {
          const res = await makeRequest.post("/Project", {
            id: "00000000-0000-0000-0000-000000000000",
            contractNo: value?.contractNo,
            contractDate: value?.contractDate,
            loiNo: parseInt(value?.loiNo),
            loiDate: value?.loiDate,
            projectName: value?.projectName,
            contractValidity: parseInt(value?.contractValidity || 0),
            workCompletion: cDate?.toISOString().split("T")[0],
            clientId: value?.clientId,
            members: [],
            organizationID: organizationId,
          });
          if (res.status === 204) {
            alert.show("Project Added Sucessfully", { type: "success" });
            action.resetForm();
            setPopUp(false);
            if (change === 0) {
              setChange(1);
            } else {
              setChange(0);
            }
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "error" });
          } else {
            alert.show("something went wrong", { type: "info" });
          }
        }
      };
      handleAdd();
    },
  });

  const updateFormik = useFormik({
    initialValues: input,
    validationSchema: projectScema,
    onSubmit: (value, action) => {
      const handleUpdate = async () => {
        const cDate = new Date(value?.loiDate);
        cDate.setDate(cDate.getDate() + parseInt(value?.contractValidity || 0));
        try {
          const res = await makeRequest.put("/Project", {
            id: value?.id,
            contractNo: value?.contractNo,
            contractDate: value?.contractDate,
            loiNo: parseInt(value?.loiNo),
            loiDate: value?.loiDate,
            projectName: value?.projectName,
            contractValidity: parseInt(value?.contractValidity || 0),
            workCompletion: cDate?.toISOString().split("T")[0],
            clientId: value?.clientId,
            members: [],
            organizationID: value?.organizationID,
          });
          if (res.status === 204) {
            alert.show("Project Updated Sucessfully", { type: "success" });
            setPopUp(false);
            action.resetForm();
            if (change === 0) {
              setChange(1);
            } else {
              setChange(0);
            }
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "error" });
          } else {
            alert.show("something went wrong", { type: "info" });
          }
        }
      };
      handleUpdate();
    },
  });

  return (
    <div className="popup-container">
      <h3 className="popup-title">
        {update ? "Update Project" : "Add New Project"}
      </h3>
      <div className="popup-wrapper">
        <label htmlFor="projectName" className="popup-label">
          Client Name <span className="red-star">*</span>
        </label>
        <select
          className="popup-select"
          name="clientId"
          value={
            update ? updateFormik.values.clientId : addFormik.values.clientId
          }
          onChange={update ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
        >
          <option value="" disabled>
            Select Client
          </option>
          {!loding &&
            data?.items.map((item) => (
              <option value={`${item?.id}`} key={item?.id}>
                {item?.name}
              </option>
            ))}
        </select>
        {update ? (
          <Error
            touch={updateFormik.touched.clientId}
            error={updateFormik.errors.clientId}
          />
        ) : (
          <Error
            touch={addFormik.touched.clientId}
            error={addFormik.errors.clientId}
          />
        )}
      </div>
      <div className="popup-wrapper">
        <label htmlFor="projectName" className="popup-label">
          Project Name <span className="red-star">*</span>
        </label>
        <input
          type="text"
          id="projectName"
          className="popup-input"
          name="projectName"
          value={
            update
              ? updateFormik.values.projectName
              : addFormik.values.projectName
          }
          onChange={update ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
        />
        {update ? (
          <Error
            touch={updateFormik.touched.projectName}
            error={updateFormik.errors.projectName}
          />
        ) : (
          <Error
            touch={addFormik.touched.projectName}
            error={addFormik.errors.projectName}
          />
        )}
      </div>
      <div className="popup-two-input-wrapper">
        <div>
          <label htmlFor="contractNo" className="popup-label">
            Contract No{" "}
            <span className="red-star">*</span>
          </label>
          <input
            type="text"
            id="contractNo"
            className="popup-input"
            name="contractNo"
            value={
              update
                ? updateFormik.values.contractNo
                : addFormik.values.contractNo
            }
            onChange={
              update ? updateFormik.handleChange : addFormik.handleChange
            }
            onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
          />
          {update ? (
          <Error
            touch={updateFormik.touched.contractNo}
            error={updateFormik.errors.contractNo}
          />
        ) : (
          <Error
            touch={addFormik.touched.contractNo}
            error={addFormik.errors.contractNo}
          />
        )}
        </div>
        <div>
          <label htmlFor="contractDate" className="popup-label">
            Date of Contract{" "}
            <span className="red-star">*</span>
          </label>
          <input
            type="date"
            id="contractDate"
            className="popup-input"
            name="contractDate"
            value={
              update
                ? updateFormik.values.contractDate?.split("T")[0]
                : addFormik.values.contractDate?.split("T")[0]
            }
            onChange={
              update ? updateFormik.handleChange : addFormik.handleChange
            }
            onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
          />
          {update ? (
          <Error
            touch={updateFormik.touched.contractDate}
            error={updateFormik.errors.contractDate}
          />
        ) : (
          <Error
            touch={addFormik.touched.contractDate}
            error={addFormik.errors.contractDate}
          />
        )}
        </div>
      </div>
      <div className="popup-two-input-wrapper">
        <div>
          <label htmlFor="contractValidity" className="popup-label">
            Duration (in days)
          </label>
          <input
            type="text"
            id="contractValidity"
            className="popup-input"
            name="contractValidity"
            value={
              update
                ? updateFormik.values.contractValidity
                : addFormik.values.contractValidity
            }
            onChange={
              update ? updateFormik.handleChange : addFormik.handleChange
            }
            onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
          />
        </div>
        <div>
          <label htmlFor="loiDate" className="popup-label">
            Project Start Date{" "}
            <span className="red-star">*</span>
          </label>
          <input
            type="date"
            id="loiDate"
            className="popup-input"
            name="loiDate"
            value={
              update
                ? updateFormik.values.loiDate?.split("T")[0]
                : addFormik.values.loiDate?.split("T")[0]
            }
            onChange={
              update ? updateFormik.handleChange : addFormik.handleChange
            }
            onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
          />
          {update ? (
          <Error
            touch={updateFormik.touched.loiDate}
            error={updateFormik.errors.loiDate}
          />
        ) : (
          <Error
            touch={addFormik.touched.loiDate}
            error={addFormik.errors.loiDate}
          />
        )}
        </div>
      </div>
      <div className="popup-wrapper">
        <label htmlFor="loiNo" className="popup-label">
          LOI Details
        </label>
        <input
          type="number"
          id="loiNo"
          className="popup-input"
          title="Enter Number Only"
          name="loiNo"
          value={update ? updateFormik.values.loiNo : addFormik.values.loiNo}
          onChange={update ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
        />
      </div>
      <div className="popup-buttons">
        <input
          type="button"
          value={`${update ? "Update Project" : "+ Add New Project"}`}
          className="popup-btn"
          onClick={update ? updateFormik.handleSubmit : addFormik.handleSubmit}
        />
      </div>
      <img src={close} onClick={handleClose} alt="" className="popup-close" />
    </div>
  );
};

export default Popup;
