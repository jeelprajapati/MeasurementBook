import React, { useState } from 'react'
import './clientTable.css'
import edit from "../../image/edit1.svg";
import deleteicon from "../../image/delete1.svg";
import useFetch from '../../hooks/useFetch'
import makeRequesInstance from '../../makeRequest'
import { useAlert } from 'react-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
const ClientTable = ({setInput,setItem,setUpdate,change,setChange,country,state}) => {
  const Id=localStorage.getItem('organizationId');
  const[isDelete,setIsDelete]=useState(null);
  const alert=useAlert();
  const {loding,data}=useFetch({url:`Client?page=${1}&pageSize=${100}&organizationId=${Id}`,change})
  const handleUpdate=(e)=>{
    setInput(true)
    setItem(e);
    setUpdate(true)
  }
  const handleAdd=(e)=>{
    e.preventDefault();
    setInput(true);
  }
  const handleDelete=async(e)=>{
    try { 
      const makeRequest=makeRequesInstance(localStorage.getItem('token'));
      const res=await makeRequest.delete(`/Client/${isDelete}?organizationId=${Id}`)
      if(res.status===200){
        setChange(!change)
        alert.show('Data Deleted sucessfully',{type:'success'})
      }
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "error" });
      } else {
        alert.show("something went wrong", { type: "info" });
      }
    }
    setIsDelete(null);
  }
  return (
    <div>
      <button className='client-add-button' onClick={handleAdd}>+ Add Client</button>
      <div className="client-table-con">
      <table className="client-table">
        {/* ROW-1 */}
            <tr className="client-tr">
              <th className="client-th" style={{paddingLeft:'5px'}} colSpan={2} >Name*</th>
              <th className="client-th" colSpan={2}>Email*</th>
              <th className="client-th" colSpan={3/2}>Phone No*</th>
              <th className="client-th" style={{textAlign:'center'}}>GSTIN</th>
              <th className="client-th">PAN</th>
              <th className="client-th" colSpan={2}>Address*</th>
              <th className="client-th"colSpan={3/2}>City*</th>
              <th className="client-th"colSpan={3/2}>State*</th>
              <th className="client-th"colSpan={3/2}>Country*</th>
              <th className="client-th"colSpan={3/2}>Postal Code*</th>
              <th className="client-th" style={{textAlign:'center'}}>Actions</th>
            </tr>
          {/* ROW-2 */}
            {!loding && (data?.items.map((item)=>(<tr className='tr' key={item?.id}>
              <td className='client-td' colSpan={2} style={{paddingLeft:'5px'}}><span>{item.name}</span></td>
              <td className='client-td' colSpan={2}><span>{item.email}</span></td>
              <td className='client-td' colSpan={3/2}><span>{item.phoneNumber}</span></td>
              <td className='client-td' style={{textAlign:'center'}}><span>{item?.gstin === '' ? 'N/A' : item.gstin}</span></td>
              <td className='client-td'><span>{item?.pan === '' ? 'N/A' : item.pan}</span></td>
              <td className='client-td' colSpan={2}><span>{item.address}</span></td>
              <td className='client-td' colSpan={3/2}><span>{item.city}</span></td>
              <td className='client-td' colSpan={3/2}><span>{state?.filter((s)=>(s.id===item.stateId))[0].stateName}</span></td>
              <td className='client-td' colSpan={3/2}><span>{country?.filter((c)=>(c.id===item.countryId))[0].countryName}</span></td>
              <td className='client-td' colSpan={3/2}><span>{item.postalCode}</span></td>
              {isDelete===item?.id?<td className='client-td' style={{textAlign:'center'}}>
                 <button className='client-yes' onClick={handleDelete}><FontAwesomeIcon className="true-btn" icon={faCheck} /></button>
                 <button className='client-no' onClick={()=>{setIsDelete(null)}}><FontAwesomeIcon icon={faXmark} className="false-btn"/></button>
                </td>:<td className='client-td' style={{textAlign:'center'}}>
                  <button className='client-button' onClick={()=>{handleUpdate(item)}}>
                    <img src={edit} alt="" className='client-svg'  />
                  </button>
                  <button className='client-button' onClick={()=>{setIsDelete(item?.id)}}>
                    <img src={deleteicon} alt="" className='client-svg' />
                  </button>
              </td>}
            </tr>)))}  
          </table>
          </div>
    </div>
  )
}

export default ClientTable
