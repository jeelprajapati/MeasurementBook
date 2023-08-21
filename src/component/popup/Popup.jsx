import React, { useState } from 'react'
import './Popup.css'
import close from '../../image/close.svg'
import makeRequesInstance from '../../makeRequest';
import useFetch from '../../hooks/useFetch';
import { useAlert } from 'react-alert'

const Popup = ({setPopUp,setChange,change,input,update,setUpdate}) => {
  const[element,setElement]=useState(input);
  const makeRequest=makeRequesInstance(localStorage.getItem('token'))
  const organizationId=localStorage.getItem('organizationId')
  const alert=useAlert();
  const {loding,error,data}=useFetch({url:`Client?organizationId=${organizationId}&page=${1}&pageSize=${100}`,change});

  const inputValidation=(i)=>{
    for (const key in i) {
      console.log(i)
      if(i[key]===''){
        return false
      }
    }
    return true
  }

  const added=async()=>{
    const success=inputValidation(element);
    if(success){
      const res=await makeRequest.post('/Project',{
          "id":"3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "contractNo": element?.contractNo,
          "contractDate": element?.contractDate,
          "loiNo": parseInt(element?.loiNo),
          "loiDate": element?.loiDate,
          "projectName": element?.projectName,
          "contractValidity": parseInt(element?.contractValidity),
          "workCompletion": element?.workCompletion,
          "clientId": element?.clientId,
          "members":[],
          "organizationID":organizationId
      })
      if(res.status===204){
        alert.show('Project Added Sucessfully',{type:'success'})
        setPopUp(false)
        if(change===0){
          setChange(1)  
        }
        else{
          setChange(0)  
        }
      }
    }
    else{
      alert.show('Please fill out all fields before adding',{type:'error'})
    }
}

  const handleClose=(e)=>{
    e.preventDefault()
    setPopUp(false);
    setUpdate(false)
  }

  const handleChange=(e)=>{
    setElement({...element,[e.target.name]:e.target.value})
  }

  const handleUpdate=async(e)=>{
    e.preventDefault();
    const success=inputValidation(element);
    if(success){
      const res=await makeRequest.put('/Project',{
          "id":element?.id,
          "contractNo": element?.contractNo,
          "contractDate": element?.contractDate,
          "loiNo": parseInt(element?.loiNo),
          "loiDate": element?.loiDate,
          "projectName": element?.projectName,
          "contractValidity": parseInt(element?.contractValidity),
          "workCompletion": element?.workCompletion,
          "clientId": element?.clientId,
          "members":[],
          "organizationID":element?.organizationID
      })
      if(res.status===204){
        alert.show('Project Updated Sucessfully',{type:'success'})
        setPopUp(false)
        if(change===0){
          setChange(1)  
        }
        else{
          setChange(0)  
        }
      } 
    }
    else{
      alert.show('Please fill out all fields before Updateing',{type:'error'})
    }
  }
  return (
    <div className='pop-container'>
      <h3 className="add-title">{update?'Update Project':'Add New Project'}</h3>
      <div className="name-container">
        <label htmlFor="projectName">Client Name</label>
        <br />
        <select className="pro-select" name='clientId' value={element?.clientId?element.clientId:''} onChange={handleChange}>
          <option>Select client</option>
          {!loding && data?.items.map((item)=>(<option value={`${item?.id}`}>{item?.name}</option>))}
        </select>
      </div>
      <div className="name-container">
        <label htmlFor="projectName">Project Name</label>
        <br />
        <input type="text" id='projectName' value={element?.projectName?element.projectName:''} className='Add-input' name='projectName' onChange={handleChange}/>
      </div>
      <div className="validity-container">
        <label htmlFor="contractValidity">Contract Validity</label>
        <br />
        <input type="text" id='contractValidity' value={element?.contractValidity?element.contractValidity:''} className='Add-input' name='contractValidity' onChange={handleChange}/>
      </div>
      <div className="date-and-time">
        <div>
          <label htmlFor="contractDate">contractDateAndTime</label>
          <br />
          <input type="datetime-local" id='contractDate' className='dt-input' value={element?.contractDate?element.contractDate:''} name='contractDate'onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="loiDate">loiDateAndTime</label>
          <br />
          <input type='datetime-local' id='loiDate' className='dt-input' value={element?.loiDate?element.loiDate:''} name='loiDate'onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="workCompletion">CompletionDateAndTime</label>
          <br />
          <input type='datetime-local' id='workCompletion' className='dt-input' value={element?.workCompletion?element.workCompletion:''} name='workCompletion'onChange={handleChange}/>
        </div>
      </div>
      <div className="no-container">
        <label htmlFor="contractNo">Contract No</label>
        <br />
        <input type="text" id='contractNo' value={element?.contractNo?element.contractNo:''} className='Add-input' name='contractNo' onChange={handleChange}/>
      </div>
      <div className="loi-container">
        <label htmlFor="loiNo">loi No</label>
        <br />
        <input type="text" id='loiNo' value={element?.loiNo?element.loiNo:''} className='Add-input' name='loiNo' onChange={handleChange}/>
      </div>
      {update?<button className="Add-Project" onClick={handleUpdate}>
        Update Project
      </button>:<button className="Add-Project" onClick={added}>
        + Add New Project
      </button>}
      <img src={close} onClick={handleClose} alt="" className="close" />
    </div>
  )
}

export default Popup