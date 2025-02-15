import React, { useEffect, useState } from 'react'
import './Client.css'
import Sidebar from '../../component/sidebar/Sidebar.jsx'
import ClientTable from '../../component/clientTable/clientTable.jsx'
import ClientPopUp from '../../component/clientPopUp/clientPopUp'
import { useNavigate } from 'react-router-dom'
import makeRequesInstance from '../../makeRequest'
const Client = () => {
  const [input,setInput]=useState(false);
  const [item,setItem]=useState({name:'',email:'',phoneNumber:'',gstin:'',pan:'',address:'',city:'',countryId:'',stateId:'',postalCode:''});
  const [country,setCountry]=useState(null);
  const [state,setState]=useState(null);
  const [update,setUpdate]=useState(false)
  const [change,setChange]=useState(0);
  const navigate=useNavigate();
  const Id=localStorage.getItem('organizationId');
  const token=localStorage.getItem('token')
  const makeRequest=makeRequesInstance(localStorage.getItem('token'));
  useEffect(()=>{
    if(!(token && Id)){
         navigate('/login')
    }
  },[navigate,token,Id])

  useEffect(()=>{
    const getCountry=async()=>{
      try {
        const res=await makeRequest.get('/Standard/GetCountries');
        setCountry(res.data)
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
    const getStates=async()=>{
      try {
        const res=await makeRequest.get('/Standard/GetStates');
        setState(res.data)
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
      getCountry();
      getStates();
  },[])

  return (
    <div>
      <div className="client-main-container">
        <div className="client-left"><Sidebar id={3}/></div>
        <div className="client-right">
          <div className={`${input ? 'client-path blur':'client-path'}`}>client/</div>
          <h3 className={`${input ? 'client-title blur':'client-title'}`}>Client</h3>
          <div className={`${input && 'blur'}`}>
            <ClientTable setInput={setInput} change={change} setItem={setItem} setUpdate={setUpdate} setChange={setChange} country={country} state={state}/>
          </div>
          {input && (<div className="clientpopup">
            <ClientPopUp setInput={setInput} change={change} setChange={setChange} setItem={setItem} item={item} setUpdate={setUpdate} update={update} country={country} state={state}/>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Client
