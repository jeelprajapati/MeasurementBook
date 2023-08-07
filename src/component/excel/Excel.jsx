import React, { useState } from 'react'
import close from "../../image/close.svg";
import * as XLSX from 'xlsx'
import './Excel.css'
import makeRequesInstance from '../../makeRequest';
import { useAlert } from 'react-alert'
const Excel = ({setOpen,projectId,setChange,change}) => {
  const[data,setData]=useState(null);
  const[loding,setLoding]=useState(false)
  const[error,setError]=useState(null);
  const alert=useAlert();
  const makeRequest=makeRequesInstance(localStorage.getItem('token'));
  const handleFile=(e)=>{
     const file=e.target.files[0];
     const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
     if(file&&fileType.includes(file.type)){
       const reader= new FileReader();
       reader.readAsArrayBuffer(file);
       reader.onload=(e)=>{
         setError(null);
         setData(e.target.result)
       }
     }
     else{
       setError('please select excel file')
     } 
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(data!==null){
      const workbook=XLSX.read(data,{type:'buffer'})
      const workSheetname=workbook.SheetNames[0]
      const worksheet=workbook.Sheets[workSheetname];
      const items=XLSX.utils.sheet_to_json(worksheet);
      items.forEach((element) => {
        element.id='cd6e4169-6b5d-4178-86cc-a4a9ec317439';
        element.sortedAfter='cd6e4169-6b5d-4178-86cc-a4a9ec317439';
        element.projectId=`${projectId}`
      });
      const newarray=items.map((obj)=>{
        const {__rowNum__,...other}=obj;
        return other
      })
      const response=await makeRequest.post('/ContractItem/AddContractItemRange',{
        "contractItems":[
          ...newarray
        ],
        "projectID":`${projectId}`
      })
      if(response.status===204){
        alert.show('Data Added sucessfully',{type:'success'});
        setOpen(false)
          if(change===0){
            setChange(1)
          }
          else{
            setChange(0)
          }
      }
      else{
        setLoding(true)
        setError(response.response.data)
        setLoding(false)
      }
    }
  }
  return (
    <div className="excel-container">
        <div className="excel-input">
          <span className=''>Select Excel File </span>
          <br />
          <input type="file" onChange={handleFile}/>
          <br/>
          <button className="excel-button" onClick={handleSubmit}>submit</button>
          {loding&&<><br />
          <span>{error}</span></>}
          <br />
          <span className='excel-red'>Data title in Excel file must be: sorNo , item , hsn , poQty , stdUnitId , unit , rate</span>
        </div>
        <img src={close} onClick={()=>setOpen(false)} className='excel-img' alt="" />
    </div>
  )
}

export default Excel
