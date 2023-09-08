import React, { useState } from "react";
import close from "../../image/close.svg";
import "./Billpopup.css";
import makeRequesInstance from "../../makeRequest";
import { useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
const Billpopup = ({
  setOpen,
  input,
  item,
  setInput,
  setItem,
  setChange,
  change,
}) => {
  const Id = useLocation().search.split("?")[1].split("=")[1];
  const [data, setData] = useState(item);
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();
  const inputValidation=(i)=>{
    for (const key in i) {
      if(i[key]===''){
        return false
      }     
    }
    return true
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setInput(false);
    setOpen(false);
    setItem(null);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const success=inputValidation(data);
    if(success){
      const res = await makeRequest.post("/Bill", {
        id: "00000000-0000-0000-0000-000000000000",
        invoiceNo: "INV-2023080428",
        name: data?.name,
        invoiceDate: data?.invoiceDate,
        typeBill: parseInt(data?.typeBill),
        status: parseInt(data?.status),
        projectId: Id,
      });
      if (res.status === 204) {
        alert.show("Data Added Sucessfully", { type: "success" });
        setOpen(false);
        if (change === 1) {
          setChange(0);
        } else {
          setChange(1);
        }
      }
    }
    else{
      alert.show('Please fill out all fields before adding',{type:'error'});
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const success=inputValidation(data);
    if(success){
    const res = await makeRequest.put("/Bill", {
      id: data?.id,
      invoiceNo: data?.invoiceNo,
      name: data?.name,
      invoiceDate: data?.invoiceDate,
      typeBill: parseInt(data?.typeBill),
      status: parseInt(data?.status),
      projectId: Id,
    });
    if (res.status === 204) {
      alert.show("Data Updated Sucessfully", { type: "success" });
      setInput(false);
      setOpen(false);
      setItem(null);
      if (change === 1) {
        setChange(0);
      } else {
        setChange(1);
      }
    }
  }
  else{
    alert.show('Please fill out all fields before updateing',{type:'error'});
  }
  };
  return (
    <div className="bill-pop-container">
      <h3 className="add-title">{input ? "Update" : "Add"} Bill</h3>

      <div className="name-container">
        <label htmlFor="projectName">Name</label>
        <br />
        <input
          type="text"
          id="name"
          value={data?.name ? data.name : ""}
          className="Add-input"
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className="bill-dt">
        <label htmlFor="invoiceDate">InvoiceDateTime</label>
        <br />
        <input
          type="datetime-local"
          value={data?.invoiceDate ? data.invoiceDate : ""}
          name="invoiceDate"
          id="invoiceDate"
          className="invoice-input"
          onChange={handleChange}
        />
      </div>
      <div className="no-container">
        <label htmlFor="typeBill">typeBill</label>
        <br />
        <select
          name="typeBill"
          className="pro-select"
          value={data?.typeBill ? data.typeBill : ""}
          id=""
          onChange={handleChange}
        >
          <option value="">select typebill</option>
          <option value="1">RA</option>
          <option value="2">Final</option>
        </select>
      </div>
      <div className="loi-container">
        <label htmlFor="status">status</label>
        <br />
        <select
          name="status"
          className="pro-select"
          value={data?.status ? data.status : ""}
          id=""
          onChange={handleChange}
        >
          <option value="">select status</option>
          <option value="1">Draft</option>
          <option value="2">Submitted</option>
          <option value="3">Accepted</option>
        </select>
      </div>
      {input ? (
        <button className="Add-Project" onClick={handleUpdate}>
          Update Bill
        </button>
      ) : (
        <button className="Add-Project" onClick={handleAdd}>
          + Add Bill
        </button>
      )}
      <img src={close} onClick={handleClose} alt="" className="close" />
    </div>
  );
};

export default Billpopup;
