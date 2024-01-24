import React from "react";
import "./popup.css";
import makeRequesInstance from "../../utils/makeRequest.js";
import useFetch from "../../hooks/useFetch";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { projectScema } from "../../scemas";
import Error from "../error/Error.jsx";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Popup = ({
  initialValues,
  setChange,
  change,
  initialState,
  setInitialValues,
  inputType,
  setInputType,
}) => {
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const organizationId = localStorage.getItem("organizationId");
  const alert = useAlert();
  const { loding, data } = useFetch({
    url: `Client?organizationId=${organizationId}&page=${1}&pageSize=${50000}`,
    change,
  });

  const handleClose = () => {
    setInputType({ type: "", credential: false });
  };

  const calculateDate = ({ date, days }) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate(parseInt(days || 0)));
    return newDate;
  };

  const arrangeValues = (value) => {
    return {
      ...value,
      loiNo: parseInt(value?.loiNo),
      contractValidity: parseInt(value?.contractValidity || 0),
      members: [],
      organizationID: organizationId,
      clientName: data?.items?.find((i) => i.id === value?.clientId)?.name,
    };
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues,
    validationSchema: projectScema,
    onSubmit: (value, action) => {
      const cDate = calculateDate({
        date: value?.loiDate,
        days: value?.contractValidity,
      });
      const values = arrangeValues({
        ...value,
        workCompletion: cDate?.toISOString().split("T")[0],
      });
      const getResponse = async () => {
        if (inputType?.type === "ADD") {
          return await makeRequest.post("Project", values);
        } else if (inputType?.type === "UPDATE") {
          return await makeRequest.put("Project", values);
        }
      };
      getResponse()
        .then((res) => {
          if (res.status === 204) {
            alert.show(
              `Data ${
                inputType?.type === "UPDATE" ? "updated" : "added"
              } sucessfully`,
              { type: "success" }
            );
            setChange(!change);
            setInitialValues(initialState);
            setInputType({ type: "", credential: false });
            action.resetForm();
          }
        })
        .catch(() => {
          alert.show("Something Went Wrong!", { type: "info" });
        });
    },
  });

  return (
    <div className="popupContainer">
      <h3 className="popupTitle">
        {inputType.type === "UPDATE" && "Update Project"}
        {inputType.type === "ADD" && "Add New Project"}
      </h3>
      <div className="popupWrapper">
        <label htmlFor="projectName" className="popupLabel">
          Client Name <span className="redStar">*</span>
        </label>
        <select
          className="popupSelect"
          name="clientId"
          value={values?.clientId}
          onChange={handleChange}
          onBlur={handleBlur}
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
        <Error error={errors.clientId} touch={touched.clientId} />
      </div>
      <div className="popupWrapper">
        <label htmlFor="projectName" className="popupLabel">
          Project Name <span className="redStar">*</span>
        </label>
        <input
          type="text"
          className="popupInput"
          name="projectName"
          value={values?.projectName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error error={errors.projectName} touch={touched.projectName} />
      </div>
      <div className="popupTwoInputWrapper">
        <div>
          <label htmlFor="contractNo" className="popupLabel">
            Contract No <span className="redStar">*</span>
          </label>
          <input
            type="text"
            className="popupInput"
            name="contractNo"
            value={values?.contractNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.contractNo} touch={touched.contractNo} />
        </div>
        <div>
          <label htmlFor="contractDate" className="popupLabel">
            Date of Contract <span className="redStar">*</span>
          </label>
          <input
            type="date"
            className="popupInput"
            name="contractDate"
            value={values?.contractDate?.split("T")[0]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.contractDate} touch={touched.contractDate} />
        </div>
      </div>
      <div className="popupTwoInputWrapper">
        <div>
          <label htmlFor="contractValidity" className="popupLabel">
            Duration (in days)
          </label>
          <input
            type="text"
            className="popupInput"
            name="contractValidity"
            value={values?.contractValidity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label htmlFor="loiDate" className="popupLabel">
            Project Start Date <span className="redStar">*</span>
          </label>
          <input
            type="date"
            className="popupInput"
            name="loiDate"
            value={values?.loiDate?.split("T")[0]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Error error={errors.loiDate} touch={touched.loiDate} />
        </div>
      </div>
      <div className="popupWrapper">
        <label htmlFor="loiNo" className="popupLabel">
          LOI Details
        </label>
        <input
          type="number"
          className="popupInput"
          title="Enter Number Only"
          name="loiNo"
          value={values?.loiNo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="popupButton">
        <input
          type="button"
          value={
            inputType.type === "UPDATE" ? "Update Project" : "+ Add New Project"
          }
          onClick={handleSubmit}
        />
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        className="popupClose"
        onClick={handleClose}
      />
    </div>
  );
};

export default Popup;
