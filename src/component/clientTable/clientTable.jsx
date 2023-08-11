import React from 'react'
import './clientTable.css'
import edit from '../../image/edit.svg'
import deleteicon from '../../image/delete.svg'
import useFetch from '../../hooks/useFetch'
import makeRequesInstance from '../../makeRequest'
import { useAlert } from 'react-alert'
const ClientTable = ({setInput,setItem,setUpdate,change,setChange,setCountry,setState}) => {
  const Id=localStorage.getItem('organizationId');
  const makeRequest=makeRequesInstance(localStorage.getItem('token'));
  const alert=useAlert();
  const {loding,error,data}=useFetch({url:`Client?page=${1}&pageSize=${100}&organizationId=${Id}`,change})
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
    const res=await makeRequest.delete(`/Client/${e}?organizationId=${Id}`)
    if(res.status===200){
      alert.show('Data Deleted sucessfully',{type:'success'})
      if(change===1){
        setChange(0)
      }
      else{
        setChange(1)
      }
    }
  }
  return (
    <div>
      <button className='client-add-button' onClick={handleAdd}>+ Add Client</button>
      <table className="client-table">
        {/* ROW-1 */}
            <tr className="client-tr">
              <th className="client-th">Name</th>
              <th className="client-th">Email</th>
              <th className="client-th">Phone No</th>
              <th className="client-th">Gst In</th>
              <th className="client-th">Pan</th>
              <th className="client-th">Address</th>
              <th className="client-th">city</th>
              <th className="client-th">stateid</th>
              <th className="client-th">countryid</th>
              <th className="client-th">postalcode</th>
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
              <td className='client-td'><span>{item.stateId}</span></td>
              <td className='client-td'><span>{item.countryId}</span></td>
              <td className='client-td'><span>{item.postalCode}</span></td>
              <td className='client-td'>
                <img src={edit} onClick={()=>{handleUpdate(item)}} alt="" className='client-svg'  />
                <img src={deleteicon} onClick={()=>handleDelete(item?.id)} alt="" className='client-svg' />
              </td>
            </tr>)))}  
          </table>
    </div>
  )
}

export default ClientTable
