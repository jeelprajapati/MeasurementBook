import React from "react";
import close from "../../image/close.svg";
import "./Billpopup.css";
import makeRequesInstance from "../../makeRequest";
import { useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { billScema } from "../../scemas";
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
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();

  const handleClose = () => {
    setInput(false);
    setOpen(false);
    setItem({name:'',invoiceDate:'',typeBill:'',status:''});
  };

  const addFormik=useFormik({
    initialValues:item,
    validationSchema:billScema,
    onSubmit:(value,action)=>{
      const handleAdd=async()=>{
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
            setOpen(false);
            if (change === 1) {
              setChange(0);
            } else {
              setChange(1);
            }
          }
        } catch (error) {
  
          if(error.response){
            alert.show(error.response.data.title,{type:'info'})
          }
          else if(error.code==='ERR_NETWORK'){
            alert.show(error.message,{type:'error'})
          }
          else{
            alert.show('Iternal server error',{type:'error'})
          }
        }
      }
      handleAdd();
    }
  })

  const updateFormik=useFormik({
    initialValues:item,
    validationSchema:billScema,
    onSubmit:(value,action)=>{
      const handleUpdate=async()=>{
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
            setInput(false);
            setOpen(false);
            setItem({name:'',invoiceDate:'',typeBill:'',status:''});
            if (change === 1) {
              setChange(0);
            } else {
              setChange(1);
            }
          }
        } catch (error) {
         if(error.response){
           alert.show(error.response.data.title,{type:'info'})
         }
         else if(error.code==='ERR_NETWORK'){
           alert.show(error.message,{type:'error'})
         }
         else{
           alert.show('Iternal server error',{type:'error'})
         }
        } 
      }
      console.log(value)
      handleUpdate();
    }
  })
  return (
    <div className="bill-pop-container">
      <h3 className="add-title">{input ? "Update" : "Add"} Bill</h3>

      <div className="name-container">
        <label style={{fontFamily:"'Roboto'",fontSize:'14px'}} htmlFor="projectName">Bill Name <span style={{color:'red',fontSize:'14px'}}>*</span></label>
        <br />
        <input
          type="text"
          id="name"
          className="Add-input"
          name="name"
          value={input?updateFormik.values.name:addFormik.values.name}
          onChange={input?updateFormik.handleChange:addFormik.handleChange}
          onBlur={input?updateFormik.handleBlur:addFormik.handleBlur}
        />
        {input ? (
            updateFormik.touched.name && updateFormik.errors.name ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.name}</p>
            ) : null
          ) : addFormik.touched.name && addFormik.errors.name ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.name}</p>
          ) : null}
      </div>
      <div className="bill-dt">
        <label htmlFor="invoiceDate">Invoice Date <span style={{color:'red',fontSize:'14px'}}>*</span></label>
        <br />
        <input
          type="date"
          name="invoiceDate"
          id="invoiceDate"
          className="invoice-input"
          value={input?updateFormik.values.invoiceDate?.split('T')[0]:addFormik.values.invoiceDate?.split('T')[0]}
          onChange={input?updateFormik.handleChange:addFormik.handleChange}
          onBlur={input?updateFormik.handleBlur:addFormik.handleBlur}
        />
        {input ? (
            updateFormik.touched.invoiceDate && updateFormik.errors.invoiceDate ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.invoiceDate}</p>
            ) : null
          ) : addFormik.touched.invoiceDate && addFormik.errors.invoiceDate ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.invoiceDate}</p>
          ) : null}
      </div>
      <div className="no-container">
        <label style={{fontFamily:"'Roboto'",fontSize:'14px'}} htmlFor="typeBill">Type <span style={{color:'red',fontSize:'14px'}}>*</span></label>
        <br />
        <select
          name="typeBill"
          className="pro-select"
          id=""
          value={input?updateFormik.values.typeBill:addFormik.values.typeBill}
          onChange={input?updateFormik.handleChange:addFormik.handleChange}
          onBlur={input?updateFormik.handleBlur:addFormik.handleBlur}
        >
          <option value="">select Type</option>
          <option value="1">RA</option>
          <option value="2">Final</option>
        </select>
        {input ? (
            updateFormik.touched.typeBill && updateFormik.errors.typeBill ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.typeBill}</p>
            ) : null
          ) : addFormik.touched.typeBill && addFormik.errors.typeBill ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.typeBill}</p>
          ) : null}
      </div>
      <div className="loi-container">
        <label style={{fontFamily:"'Roboto'",fontSize:'14px'}} htmlFor="status">Status <span style={{color:'red',fontSize:'14px'}}>*</span></label>
        <br />
        <select
          name="status"
          className="pro-select"
          id=""
          value={input?updateFormik.values.status:addFormik.values.status}
          onChange={input?updateFormik.handleChange:addFormik.handleChange}
          onBlur={input?updateFormik.handleBlur:addFormik.handleBlur}
        >
          <option value="">select status</option>
          <option value="1">Draft</option>
          <option value="2">Submitted</option>
          <option value="3">Accepted</option>
        </select>
        {input ? (
            updateFormik.touched.status && updateFormik.errors.status ? (
              <p
                style={{
                  margin:'3px 0 0 0',
                  fontSize: "13px",
                  fontFamily:"'Roboto'",
                  color: "red",
                  width: "200px",
                }}
              >{updateFormik.errors.status}</p>
            ) : null
          ) : addFormik.touched.status && addFormik.errors.status ? (
            <p
              style={{
                margin:'3px 0 0 0',
                fontSize: "13px",
                fontFamily:"'Roboto'",
                color: "red",
                width: "200px",
              }}
            >{addFormik.errors.status}</p>
          ) : null}
      </div>
      {input ? (
        <input type="button" value='Update Bill' className="Add-Project" onClick={updateFormik.handleSubmit}/>
      ) : (
        <input type="button" value='+ Add Bill' className="Add-Project" onClick={addFormik.handleSubmit}/>
      )}
      <img src={close} onClick={handleClose} alt="" className="close" />
    </div>
  );
};

export default Billpopup;
