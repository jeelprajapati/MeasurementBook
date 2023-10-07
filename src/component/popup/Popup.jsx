import React from "react";
import "./Popup.css";
import close from "../../image/close.svg";
import makeRequesInstance from "../../makeRequest";
import useFetch from "../../hooks/useFetch";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import {projectScema} from "../../scemas"

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
    validationSchema:projectScema,
    onSubmit: (value,action) => {
      const handleAdd=async()=>{
        const cDate = new Date(value?.loiDate);
        cDate.setDate(cDate.getDate() + parseInt(value?.contractValidity||0));
        try {
          const res = await makeRequest.post("/Project", {
            id: "00000000-0000-0000-0000-000000000000",
            contractNo: value?.contractNo,
            contractDate: value?.contractDate,
            loiNo: parseInt(value?.loiNo),
            loiDate: value?.loiDate,
            projectName: value?.projectName,
            contractValidity: parseInt(value?.contractValidity||0),
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
          console.log(error)
          if (error.response) {
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
            alert.show(error.message, { type: "error" });
          } else {
            alert.show("Iternal server error", { type: "error" });
          }
        }
      }
      handleAdd();
    },
  });

  const updateFormik = useFormik({
    initialValues: input,
    validationSchema:projectScema,
    onSubmit: (value,action) => {
      const handleUpdate=async()=>{
        const cDate = new Date(value?.loiDate);
        cDate.setDate(cDate.getDate() + parseInt(value?.contractValidity||0));
        try {
          const res = await makeRequest.put("/Project", {
            id: value?.id,
            contractNo: value?.contractNo,
            contractDate: value?.contractDate,
            loiNo: parseInt(value?.loiNo),
            loiDate: value?.loiDate,
            projectName: value?.projectName,
            contractValidity: parseInt(value?.contractValidity||0),
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
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
            alert.show(error.message, { type: "error" });
          } else {
            alert.show("Internal server error", { type: "error" });
          }
        }
      }
      handleUpdate();
    },
  });
  return (
    <div className="pop-container">
      <h3 className="add-title">
        {update ? "Update Project" : "Add New Project"}
      </h3>
      <div className="name-container">
        <label htmlFor="projectName" className="project-lable">
          Client Name <span style={{color:'red',fontSize:'14px'}}>*</span>
        </label>
        <br />
        <select
          className="pro-select"
          name="clientId"
          value={
            update ? updateFormik.values.clientId : addFormik.values.clientId
          }
          onChange={update ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
        >
          <option value="" disabled>Select Client</option>
          {!loding &&
            data?.items.map((item) => (
              <option value={`${item?.id}`} key={item?.id}>
                {item?.name}
              </option>
            ))}
        </select>
        {update ? (
            updateFormik.touched.clientId && updateFormik.errors.clientId ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "14px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.clientId}</p>
            ) : null
          ) : addFormik.touched.clientId && addFormik.errors.clientId ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "14px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.clientId}</p>
          ) : null}
      </div>
      <div className="name-container">
        <label htmlFor="projectName" className="project-lable">
          Project Name <span style={{color:'red',fontSize:'14px'}}>*</span>
        </label>
        <br />
        <input
          type="text"
          id="projectName"
          className="Add-input"
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
            updateFormik.touched.projectName && updateFormik.errors.projectName ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "14px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.projectName}</p>
            ) : null
          ) : addFormik.touched.projectName && addFormik.errors.projectName ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "14px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.projectName}</p>
          ) : null}
      </div>

      <div className="date-and-time">
        <div>
          <label htmlFor="contractNo" className="project-lable">
            Contract No <span style={{color:'red',fontSize:'14px'}}>*</span>
          </label>
          <br />
          <input
            type="text"
            id="contractNo"
            className="dt-input"
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
            updateFormik.touched.contractNo && updateFormik.errors.contractNo ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "14px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.contractNo}</p>
            ) : null
          ) : addFormik.touched.contractNo && addFormik.errors.contractNo ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "14px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.contractNo}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contractDate" className="project-lable">
            Date of Contract <span style={{color:'red',fontSize:'14px'}}>*</span>
          </label>
          <br />
          <input
            type="date"
            id="contractDate"
            className="dt-input"
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
            updateFormik.touched.contractDate && updateFormik.errors.contractDate ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "14px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.contractDate}</p>
            ) : null
          ) : addFormik.touched.contractDate && addFormik.errors.contractDate ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "14px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.contractDate}</p>
          ) : null}
        </div>
      </div>
      <div className="date-and-time">
        <div>
          <label htmlFor="contractValidity" className="project-lable">
            Duration (in days)
          </label>
          <br />
          <input
            type="text"
            id="contractValidity"
            className="dt-input"
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
          <label htmlFor="loiDate" className="project-lable">
            Project Start Date <span style={{color:'red',fontSize:'14px'}}>*</span>
          </label>
          <br />
          <input
            type="date"
            id="loiDate"
            className="dt-input"
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
            updateFormik.touched.loiDate && updateFormik.errors.loiDate ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "14px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.loiDate}</p>
            ) : null
          ) : addFormik.touched.loiDate && addFormik.errors.loiDate ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "14px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.loiDate}</p>
          ) : null}
        </div>
      </div>
      <div className="loi-container">
        <label htmlFor="loiNo" className="project-lable">
          LOI Details
        </label>
        <br />
        <input
          type="text"
          id="loiNo"
          className="Add-input"
          name="loiNo"
          value={update ? updateFormik.values.loiNo : addFormik.values.loiNo}
          onChange={update ? updateFormik.handleChange : addFormik.handleChange}
          onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
        />
      </div>
      {update ? (
        <input
          type="button"
          value="Update Project"
          className="Add-Project"
          onClick={updateFormik.handleSubmit}
        />
      ) : (
        <input
          type="button"
          value="+ Add New Project"
          className="Add-Project"
          onClick={addFormik.handleSubmit}
        />
      )}
      <img src={close} onClick={handleClose} alt="" className="close" />
    </div>
  );
};

export default Popup;
