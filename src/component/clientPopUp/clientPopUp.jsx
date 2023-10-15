import React from "react";
import "./clientPopUp.css";
import close from "../../image/close.svg";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { clientScema } from "../../scemas";

const ClientPopUp = ({
  setInput,
  change,
  setChange,
  item,
  setItem,
  setUpdate,
  update,
  country,
  state,
}) => {
  const Id = localStorage.getItem("organizationId");
  const alert = useAlert();
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const addRequest = useFormik({
    initialValues: item,
    validationSchema: clientScema,
    onSubmit: (value,action) => {
      const handleAdd=async()=>{
        try {
          const responce = await makeRequest.post("/Client", {
            id: "00000000-0000-0000-0000-000000000000",
            name: value?.name,
            email: value?.email,
            phoneNumber: value?.phoneNumber,
            gstin: value?.gstin,
            pan: value?.pan,
            address: value?.address,
            city: value?.city,
            stateId: parseInt(value?.stateId),
            countryId: parseInt(value?.countryId),
            postalCode: value?.postalCode,
            organizationID: Id,
          });
          if (responce.status === 204) {
            alert.show("Data Added Suceefully", { type: "success" });
            action.resetForm();
            setInput(false);
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
            alert.show("Iternal server error", { type: "error" });
          }
        }
      }
      handleAdd();
    },
  });
  const upadteRequest = useFormik({
    initialValues: item,
    validationSchema: clientScema,
    onSubmit: (value,action) => {
      const handleUpdate=async()=>{
        try {
          const responce = await makeRequest.put("/Client", {
            id: value?.id,
            name: value?.name,
            email: value?.email,
            phoneNumber: value?.phoneNumber,
            gstin: value?.gstin,
            pan: value?.pan,
            address: value?.address,
            city: value?.city,
            stateId: parseInt(value?.stateId),
            countryId: parseInt(value?.countryId),
            postalCode: value?.postalCode,
            organizationID: Id,
          });
          if (responce.status === 204) {
            alert.show("Data Updated Suceefully", { type: "success" });
            action.resetForm();
            setItem({name:'',email:'',phoneNumber:'',gstin:'',pan:'',address:'',city:'',countryId:'',stateId:'',postalCode:''});
            setUpdate(false);
            setInput(false)
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
            alert.show("Iternal server error", { type: "error" });
          }
        }
      }
      handleUpdate();
    },
  });
  return (
    <div className="client-pop-container">
      <h3 className="client-pop-title">
        {update ? "Update Client" : "Add New Client"}
      </h3>
      <div className="flex-container">
        <div className="client-container">
          <input
            type="text"
            id="clientName"
            placeholder="Client Name *"
            className="client-Add-input"
            name="name"
            value={update ? upadteRequest.values.name : addRequest.values.name}
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.name && upadteRequest.errors.name ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.name}</p>
            ) : null
          ) : addRequest.touched.name && addRequest.errors.name ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.name}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="email"
            id="email"
            placeholder="Email *"
            className="client-Add-input"
            name="email"
            value={
              update ? upadteRequest.values.email : addRequest.values.email
            }
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.email && upadteRequest.errors.email ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.email}</p>
            ) : null
          ) : addRequest.touched.email && addRequest.errors.email ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.email}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number *"
            className="client-Add-input"
            name="phoneNumber"
            value={
              update
                ? upadteRequest.values.phoneNumber
                : addRequest.values.phoneNumber
            }
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.phoneNumber &&
            upadteRequest.errors.phoneNumber ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.phoneNumber}</p>
            ) : null
          ) : addRequest.touched.phoneNumber &&
            addRequest.errors.phoneNumber ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.phoneNumber}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="text"
            id="gstin"
            placeholder="GSTIN"
            className="client-Add-input"
            name="gstin"
            value={
              update ? upadteRequest.values.gstin : addRequest.values.gstin
            }
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.gstin && upadteRequest.errors.gstin ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.gstin}</p>
            ) : null
          ) : addRequest.touched.gstin && addRequest.errors.gstin ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.gstin}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="text"
            id="pan"
            placeholder="PAN No."
            className="client-Add-input"
            name="pan"
            value={update ? upadteRequest.values.pan : addRequest.values.pan}
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.pan && upadteRequest.errors.pan ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.pan}</p>
            ) : null
          ) : addRequest.touched.pan && addRequest.errors.pan ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.pan}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="text"
            id="address"
            placeholder="Address *"
            className="client-Add-input"
            name="address"
            value={
              update ? upadteRequest.values.address : addRequest.values.address
            }
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.address && upadteRequest.errors.address ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.address}</p>
            ) : null
          ) : addRequest.touched.address && addRequest.errors.address ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.address}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="text"
            id="city"
            placeholder="City *"
            className="client-Add-input"
            name="city"
            value={update ? upadteRequest.values.city : addRequest.values.city}
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.city && upadteRequest.errors.city ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.city}</p>
            ) : null
          ) : addRequest.touched.city && addRequest.errors.city ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.city}</p>
          ) : null}
        </div>
        <div className="client-container">
          <select
            name="countryId"
            value={
              update
                ? upadteRequest.values.countryId
                : addRequest.values.countryId
            }
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
            className="client-select"
            id=""
          >
            <option value="" disabled>Select Country *</option>
            {country?.map((item) => (
              <option value={item?.id} key={item?.id}>
                {item?.countryName}
              </option>
            ))}
          </select>

          {update ? (
            upadteRequest.touched.countryId &&
            upadteRequest.errors.countryId ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.countryId}</p>
            ) : null
          ) : addRequest.touched.countryId && addRequest.errors.countryId ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.countryId}</p>
          ) : null}
        </div>
        <div className="client-container">
          { (
            <select
              name="stateId"
              value={
                update
                  ? upadteRequest.values.stateId
                  : addRequest.values.stateId
              }
              onChange={
                update ? upadteRequest.handleChange : addRequest.handleChange
              }
              onBlur={
                update ? upadteRequest.handleBlur : addRequest.handleBlur
              }
              className="client-select"
              id=""
              disabled={update
                ? upadteRequest.values.countryId===''
                : addRequest.values.countryId===''}
            >
              <option value="" disabled>Select State *</option>
              {state
                ?.filter(
                  (e) =>
                    e?.countryCode?.toString() ===
                    (update
                      ? upadteRequest.values.countryId
                      : addRequest.values.countryId)
                )
                .map((item) => (
                  <option value={item?.id} key={item?.id}>
                    {item?.stateName}
                  </option>
                ))}
            </select>
          )}
          {update ? (
            upadteRequest.touched.stateId && upadteRequest.errors.stateId ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.stateId}</p>
            ) : null
          ) : addRequest.touched.stateId && addRequest.errors.stateId ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.stateId}</p>
          ) : null}
        </div>
        <div className="client-container">
          <input
            type="text"
            id="postalCode"
            placeholder="Postal Code *"
            className="client-Add-input"
            name="postalCode"
            value={
              update
                ? upadteRequest.values.postalCode
                : addRequest.values.postalCode
            }
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            upadteRequest.touched.postalCode &&
            upadteRequest.errors.postalCode ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{upadteRequest.errors.postalCode}</p>
            ) : null
          ) : addRequest.touched.postalCode && addRequest.errors.postalCode ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addRequest.errors.postalCode}</p>
          ) : null}
        </div>
      </div>
      {update ? (
        <input type="button" value='Update' onClick={upadteRequest.handleSubmit} className="client-btn"/>
      ) : (
        <input type="button" value='Submit' onClick={addRequest.handleSubmit} className="client-btn"/>
      )}
      <img
        src={close}
        onClick={() => {
          setInput(false);
          setItem({
            name: "",
            email: "",
            phoneNumber: "",
            gstin: "",
            pan: "",
            address: "",
            city: "",
            countryId: "",
            stateId: "",
            postalCode: "",
          });
          setUpdate(false);
        }}
        alt=""
        className="client-close"
      />
    </div>
  );
};

export default ClientPopUp;
