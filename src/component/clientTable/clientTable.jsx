import React, { useState } from 'react'
import './clientTable.css'
import edit from '../../image/edit.svg'
import deleteicon from '../../image/delete.svg'
import useFetch from '../../hooks/useFetch'
import makeRequesInstance from '../../makeRequest'
import { useAlert } from 'react-alert'
import Warning from '../warning/Warning'
import { useEffect } from 'react'
const ClientTable = ({setInput,setItem,setUpdate,change,setChange,country,state}) => {
  const Id=localStorage.getItem('organizationId');
  const[isDelete,setIsDelete]=useState(false);
  const[deleteId,setDeleteId]=useState(null);
  const [warn,setWarn]=useState(false)
  const alert=useAlert();
  const {loding,data}=useFetch({url:`Client?page=${1}&pageSize=${100}&organizationId=${Id}`,change})
  
  useEffect(()=>{
    const deleteData=async()=>{
      try { 
        const makeRequest=makeRequesInstance(localStorage.getItem('token'));
        const res=await makeRequest.delete(`/Client/${deleteId}?organizationId=${Id}`)
        if(res.status===200){
          setIsDelete(false);
          setWarn(false);
          alert.show('Data Deleted sucessfully',{type:'success'})
          if(change===1){
            setChange(0)
          }
          else{
            setChange(1)
          }
        }
      } catch (error) {
        setIsDelete(false);
        setWarn(false);
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
  if(isDelete){
    deleteData();
  }
  },[isDelete,Id,alert,deleteId,change,setChange])
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
    setDeleteId(e);
    setWarn(true);
  }
  return (
    <div>
      <button className='client-add-button' onClick={handleAdd}>+ Add Client</button>
      <div className="client-table-con">
      <table className="client-table">
        {/* ROW-1 */}
            <tr className="client-tr">
              <th className="client-th" colSpan={2} >Name *</th>
              <th className="client-th" colSpan={2}>Email *</th>
              <th className="client-th" colSpan={3/2}>Phone No *</th>
              <th className="client-th">GSTIN</th>
              <th className="client-th">PAN</th>
              <th className="client-th" colSpan={2}>Address *</th>
              <th className="client-th"colSpan={3/2}>City *</th>
              <th className="client-th"colSpan={3/2}>State *</th>
              <th className="client-th"colSpan={3/2}>Country *</th>
              <th className="client-th"colSpan={3/2}>Postal Code *</th>
              <th className="client-th">Actions</th>
            </tr>
          {/* ROW-2 */}
            {!loding && (data?.items.map((item)=>(<tr className='tr' key={item?.id}>
              <td className='client-td' colSpan={2}><span>{item.name}</span></td>
              <td className='client-td' colSpan={2}><span>{item.email}</span></td>
              <td className='client-td' colSpan={3/2}><span>{item.phoneNumber}</span></td>
              <td className='client-td'><span>{item.gstin}</span></td>
              <td className='client-td'><span>{item.pan}</span></td>
              <td className='client-td' colSpan={2}><span>{item.address}</span></td>
              <td className='client-td' colSpan={3/2}><span>{item.city}</span></td>
              <td className='client-td' colSpan={3/2}><span>{state?.filter((s)=>(s.id===item.stateId))[0].stateName}</span></td>
              <td className='client-td' colSpan={3/2}><span>{country?.filter((c)=>(c.id===item.countryId))[0].countryName}</span></td>
              <td className='client-td' colSpan={3/2}><span>{item.postalCode}</span></td>
              <td className='client-td'>
                <img src={edit} onClick={()=>{handleUpdate(item)}} alt="" className='client-svg'  />
                <img src={deleteicon} onClick={()=>handleDelete(item?.id)} alt="" className='client-svg' />
              </td>
            </tr>)))}  
          </table>
          </div>
          {warn && <Warning setIsDelete={setIsDelete} setWarn={setWarn}/>}
    </div>
  )
}

export default ClientTable
