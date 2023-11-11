import React from "react";
import "./clientPopUp.css";
import close from "../../image/close.svg";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { clientScema } from "../../scemas";
import Error from "../error/Error.jsx";

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
    onSubmit: (value, action) => {
      const handleAdd = async () => {
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
      };
      handleAdd();
    },
  });
  const upadteRequest = useFormik({
    initialValues: item,
    validationSchema: clientScema,
    onSubmit: (value, action) => {
      const handleUpdate = async () => {
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
            setInput(false);
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
    <div className="client-popup-container">
      <h3 className="client-popup-title">
        {update ? "Update Client" : "Add New Client"}
      </h3>
      <div className="client-popup-wrapper">
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="clientName"
            placeholder="Client Name *"
            className="client-popup-input"
            name="name"
            value={update ? upadteRequest.values.name : addRequest.values.name}
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            <Error
              touch={upadteRequest.touched.name}
              error={upadteRequest.errors.name}
            />
          ) : (
            <Error
              touch={addRequest.touched.name}
              error={addRequest.errors.name}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="email"
            id="email"
            placeholder="Email *"
            className="client-popup-input"
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
            <Error
              touch={upadteRequest.touched.email}
              error={upadteRequest.errors.email}
            />
          ) : (
            <Error
              touch={addRequest.touched.email}
              error={addRequest.errors.email}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number *"
            className="client-popup-input"
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
            <Error
              touch={upadteRequest.touched.phoneNumber}
              error={upadteRequest.errors.phoneNumber}
            />
          ) : (
            <Error
              touch={addRequest.touched.phoneNumber}
              error={addRequest.errors.phoneNumber}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="gstin"
            placeholder="GSTIN"
            className="client-popup-input"
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
            <Error
              touch={upadteRequest.touched.gstin}
              error={upadteRequest.errors.gstin}
            />
          ) : (
            <Error
              touch={addRequest.touched.gstin}
              error={addRequest.errors.gstin}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="pan"
            placeholder="PAN No."
            className="client-popup-input"
            name="pan"
            value={update ? upadteRequest.values.pan : addRequest.values.pan}
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            <Error
              touch={upadteRequest.touched.pan}
              error={upadteRequest.errors.pan}
            />
          ) : (
            <Error
              touch={addRequest.touched.pan}
              error={addRequest.errors.pan}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="address"
            placeholder="Address *"
            className="client-popup-input"
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
            <Error
              touch={upadteRequest.touched.address}
              error={upadteRequest.errors.address}
            />
          ) : (
            <Error
              touch={addRequest.touched.address}
              error={addRequest.errors.address}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="city"
            placeholder="City *"
            className="client-popup-input"
            name="city"
            value={update ? upadteRequest.values.city : addRequest.values.city}
            onChange={
              update ? upadteRequest.handleChange : addRequest.handleChange
            }
            onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
          />
          {update ? (
            <Error
              touch={upadteRequest.touched.city}
              error={upadteRequest.errors.city}
            />
          ) : (
            <Error
              touch={addRequest.touched.city}
              error={addRequest.errors.city}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
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
            className="client-popup-select"
            id=""
          >
            <option value="" disabled>
              Select Country *
            </option>
            {country?.map((item) => (
              <option value={item?.id} key={item?.id}>
                {item?.countryName}
              </option>
            ))}
          </select>
          {update ? (
            <Error
              touch={upadteRequest.touched.countryId}
              error={upadteRequest.errors.countryId}
            />
          ) : (
            <Error
              touch={addRequest.touched.countryId}
              error={addRequest.errors.countryId}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          {
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
              onBlur={update ? upadteRequest.handleBlur : addRequest.handleBlur}
              className="client-popup-select"
              id=""
              disabled={
                update
                  ? upadteRequest.values.countryId === ""
                  : addRequest.values.countryId === ""
              }
              title={(update
                ? upadteRequest.values.countryId === ""
                : addRequest.values.countryId === "") && "select country first"}
            >
              <option value="" disabled>
                Select State *
              </option>
              {state
                ?.filter(
                  (e) =>
                    e?.countryCode?.toString() ===
                    (update
                      ? upadteRequest.values.countryId
                      : addRequest.values.countryId
                    )?.toString()
                )
                .map((item) => (
                  <option value={item?.id} key={item?.id}>
                    {item?.stateName}
                  </option>
                ))}
            </select>
          }
          {update ? (
            <Error
              touch={upadteRequest.touched.stateId}
              error={upadteRequest.errors.stateId}
            />
          ) : (
            <Error
              touch={addRequest.touched.stateId}
              error={addRequest.errors.stateId}
            />
          )}
        </div>
        <div className="client-input-error-wrapper">
          <input
            type="text"
            id="postalCode"
            placeholder="Postal Code *"
            className="client-popup-input"
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
            <Error
              touch={upadteRequest.touched.postalCode}
              error={upadteRequest.errors.postalCode}
            />
          ) : (
            <Error
              touch={addRequest.touched.postalCode}
              error={addRequest.errors.postalCode}
            />
          )}
        </div>
      </div>
      <input
        type="button"
        value={`${update ? "Update" : "Submit"}`}
        onClick={
          update ? upadteRequest.handleSubmit : addRequest.handleSubmit
        }
        className="client-btn"
      />
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
        className="client-popup-close"
      />
    </div>
  );
};

export default ClientPopUp;
