import React, { useState } from "react";
import "./clientPopUp.css";
import close from "../../image/close.svg";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";

const ClientPopUp = ({ setInput,change,setChange, item, setItem, setUpdate, update,country,state }) => {
  const [data, setData] = useState(item);
  const Id=localStorage.getItem('organizationId');
  const [countryCode,setCountryCode]=useState(item?.countryId);
  const [loading,setLoading]=useState(false)
  const [stateCode,setStateCode]=useState(item?.stateId);
  const alert=useAlert();
  const makeRequest=makeRequesInstance(localStorage.getItem('token'))
  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  };
  const handleUpdate=async(e)=>{
    e.preventDefault();
    const responce= await makeRequest.put('/Client',{
      'id':data?.id,
      'name':data?.name,
      'email':data?.email,
      'phoneNumber':data?.phoneNumber,
      'gstin':data?.gstin,
      'pan':data?.pan,
      'address':data?.address,
      'city':data?.city,
      'stateId':parseInt(stateCode),
      'countryId':parseInt(countryCode),
      'postalCode':data?.postalCode,
      'organizationID':Id
    })
    if(responce.status===204){
      alert.show('Data Updated Suceefully',{type:'success'})
      setUpdate(false)
      setItem(null)
      setInput(false);
      if(change===0){
        setChange(1)
      }
      else{
        setChange(0)
      }
    }
  }

  const handleAdd=async(e)=>{
    e.preventDefault();
    const responce= await makeRequest.post('/Client',{
      'id':'ffdbd863-31ef-4054-c85c-08db84fefbf1',
      'name':data?.name,
      'email':data?.email,
      'phoneNumber':data?.phoneNumber,
      'gstin':data?.gstin,
      'pan':data?.pan,
      'address':data?.address,
      'city':data?.city,
      'stateId':parseInt(stateCode),
      'countryId':parseInt(countryCode),
      'postalCode':data?.postalCode,
      'organizationID':Id
    })
    if(responce.status===204){
      alert.show('Data Added Suceefully',{type:'success'})
      setCountryCode(null)
      setInput(false);
      setData(null);
      setStateCode(null)
      if(change===0){
        setChange(1)
      }
      else{
        setChange(0)
      }
    }
  }
  const handleSetCode=(e)=>{
    setLoading(true)
    setCountryCode(e.target.value);
    setLoading(false)
  }
  return (
    <div className="client-pop-container">
      <h3 className="client-pop-title">{update?'Update Client':'Add New Client'}</h3>
      <div className="flex-container">
        <div className="client-container">
          <input
            type="text"
            id="clientName"
            placeholder="client Name"
            className="client-Add-input"
            value={data?.name?data.name:''}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <input
            type="email"
            id="email"
            placeholder="email"
            value={data?.email?data.email:''}
            className="client-Add-input"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <input
            type="text"
            id="phoneNumber"
            placeholder="phoneNumber"
            value={data?.phoneNumber?data.phoneNumber:''}
            className="client-Add-input"
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <input
            type="text"
            id="gstin"
            placeholder="Gatin"
            value={data?.gstin?data.gstin:''}
            className="client-Add-input"
            name="gstin"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <input
            type="text"
            id="pan"
            placeholder="pan"
            value={data?.pan?data.pan:''}
            className="client-Add-input"
            name="pan"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={data?.address?data.address:''}
            className="client-Add-input"
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <input
            type="text"
            id="city"
            placeholder="City"
            value={data?.city?data.city:''}
            className="client-Add-input"
            name="city"
            onChange={handleChange}
          />
        </div>
        <div className="client-container">
          <select name="countryId" value={countryCode?countryCode:''}  onChange={handleSetCode} className="client-select" id="">
            <option value="">select country</option>
            {country?.map((item)=>(<option value={item?.id}>{item?.countryName}</option>))}
          </select>
        </div>
        <div className="client-container">
          {!loading && <select name="stateId" value={stateCode?stateCode:''} onChange={(e)=>setStateCode(e.target.value)} className="client-select" id="">
            {state?.filter((e)=>(e?.countryCode==countryCode)).map((item)=>(<option value={item?.id}>{item?.stateName}</option>))}
          </select>}
            </div>
        <div className="client-container">
          <input
            type="text"
            id="postalCode"
            placeholder="postalCode"
            value={data?.postalCode?data.postalCode:''}
            className="client-Add-input"
            name="postalCode"
            onChange={handleChange}
          />
        </div>
      </div>
      {update ? (
        <button onClick={handleUpdate} className="client-btn">Update</button>
      ) : (
        <button onClick={handleAdd} className="client-btn">submit</button>
      )}
      <img
        src={close}
        onClick={() => {setInput(false);setItem(null)}}
        alt=""
        className="client-close"
      />
    </div>
  );
};

export default ClientPopUp;
