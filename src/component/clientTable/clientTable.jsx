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
  const makeRequest=makeRequesInstance(localStorage.getItem('token'));
  const alert=useAlert();
  const {loding,data}=useFetch({url:`Client?page=${1}&pageSize=${100}&organizationId=${Id}`,change})
  
  useEffect(()=>{
    const deleteData=async()=>{
      try { 
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
  },[isDelete])
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
              <th className="client-th">Name *</th>
              <th className="client-th">Email *</th>
              <th className="client-th">Phone No *</th>
              <th className="client-th">GSTIN</th>
              <th className="client-th">PAN</th>
              <th className="client-th">Address *</th>
              <th className="client-th">City *</th>
              <th className="client-th">State *</th>
              <th className="client-th">Country *</th>
              <th className="client-th">Postal Code *</th>
              <th className="client-th"></th>
            </tr>
          {/* ROW-2 */}
            {!loding && (data?.items.map((item)=>(<tr className='tr' key={item?.id}>
              <td className='client-td'><span>{item.name}</span></td>
              <td className='client-td'><span>{item.email}</span></td>
              <td className='client-td'><span>{item.phoneNumber}</span></td>
              <td className='client-td'><span>{item.gstin}</span></td>
              <td className='client-td'><span>{item.pan}</span></td>
              <td className='client-td'><span>{item.address}</span></td>
              <td className='client-td'><span>{item.city}</span></td>
              <td className='client-td'><span>{state?.filter((s)=>(s.id===item.stateId))[0].stateName}</span></td>
              <td className='client-td'><span>{country?.filter((c)=>(c.id===item.countryId))[0].countryName}</span></td>
              <td className='client-td'><span>{item.postalCode}</span></td>
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
