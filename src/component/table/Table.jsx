import React,{useEffect, useState} from 'react'
import './Table.css'
import add from '../../image/add.svg'
import edit from '../../image/edit.svg'
import deleteicon from '../../image/delete.svg'
import useFetch from '../../hooks/useFetch'
import makeRequesInstance from '../../makeRequest'
import { useAlert } from 'react-alert'
const Table = ({Id,change,setChange}) => {
    const [element, setElement] = useState(null);
    const [array, setArray] = useState(null);
    const [number, setNumber] = useState(-1);
    const [load,setLoad]=useState(false)
    const [input, setInput] = useState(false);
    const [update, setUpdate] = useState(false);
    const [head,setHead]=useState('00000000-0000-0000-0000-000000000000');
    const [tail,setTail]=useState('00000000-0000-0000-0000-000000000000');
    const makeRequest=makeRequesInstance(localStorage.getItem('token'))
    const alert=useAlert();
    const {loding,error,data}=useFetch({url:`/ContractItem/GetByProjectId?projectId=${Id}&page=${1}&pageSize=${100}`,change})
    useEffect(()=>{
      setLoad(loding)
      setArray(data?.items)
    },[loding,data])

    // set input data
    const handleChange = (e) => {
       setElement({ ...element, [e.target.name]: e.target.value });
    };

    const handleFirstElement=()=>{
      setInput(true);
      setNumber(-1);
      setHead('00000000-0000-0000-0000-000000000000');
      if(array){
        setTail(array[0]?.id)
      }
      else{
        setTail('00000000-0000-0000-0000-000000000000')
      }
    }
  
    // set index using index we can divide array into two part & set head and tail;
    const handleInput = (i,id) => {
      setInput(true);
      setNumber(i);
      setHead(id);
  
      if(array.length>i+1){
        setTail(array[i+1]?.id)
      }
      else if(array.length==i+1){
        setTail('00000000-0000-0000-0000-000000000000')
      }
    };
  
    // add element
    const handleAdd = async() => {
      const responce=await makeRequest.post('/ContractItem',
        {
          "contractItemDTO": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "sorNo":parseInt(element?.sorNo),
            "item": element?.item,
            "hsn": parseInt(element?.hsn),
            "poQty": parseInt(element?.poQty),
            "stdUnitId": parseInt(element?.stdUnitId),
            "unit": element?.unit,
            "rate": parseInt(element?.rate),
            "projectId": Id
          },
          "head": head,
          "tail": tail
        })
    if(responce.status===204){
      alert.show('Added Sucessful',{type:'success'})
      setElement(null)
      setInput(false)
      if(change===0){
        setChange(1)
      }
      else{
        setChange(0)
      }}
    };
  
    // update element
    const handleUpdate = (i, item) => {
      setLoad(true);
      setUpdate(true);
      console.log(item)
      array.splice(i, 1);
      setNumber(i - 1);
      setElement(item);
      setLoad(false);
    };
  
    //final Update
  
    const finalUpdata=async()=>{
      const responce=await makeRequest.put('/ContractItem',
         {
            "id": element?.id,
            "sorNo":parseInt(element?.sorNo),
            "item": element?.item,
            "hsn": parseInt(element?.hsn),
            "poQty": parseInt(element?.poQty),
            "stdUnitId": parseInt(element?.stdUnitId),
            "unit": element?.unit,
            "rate": parseInt(element?.rate),
            "projectId": element?.projectId
          })
      if(responce.status===204){
        alert.show('Update Sucessful',{type:'success'})
        setElement(null)
        setUpdate(false)
        if(change===0){
          setChange(1)
        }
        else{
          setChange(0)
        }
      }    
    }
    // delete element
    const handleDelete = async(i,id) => {
       const res=await makeRequest.delete(`/ContractItem?contractItemId=${id}`)
       if(res.status===204){
        alert.show('Deleted Sucessfully',{type:'success'})
        if(change===0){
          setChange(1)
        }
        else{
          setChange(0)
        }
       }
    };
  
  return (
    <div className="table">
      <table className='tb'>
        <tr className='tr'>
          <th className='th'>sorNo</th>
          <th className='th'>item</th>
          <th className='th'>hsn</th>
          <th className='th'>poQty</th>
          <th className='th'>stdUnitId</th>
          <th className='th'>unit</th>
          <th className='th'>rate</th>
          <th className='th'>
            <img src={add} onClick={handleFirstElement} className='svg' alt="" />
          </th>
        </tr>
        {!load && array?.slice(0, number + 1)?.map((item, index) => (
            <tr className='tr' key={index}>
              <td className='td'><span>{item?.sorNo}</span></td>
              <td className='td'><span>{item?.item}</span></td>
              <td className='td'><span>{item?.hsn}</span></td>
              <td className='td'><span>{item?.poQty}</span></td>
              <td className='td'><span>{item?.stdUnitId}</span></td>
              <td className='td'><span>{item?.unit}</span></td>
              <td className='td'><span>{item?.rate}</span></td>
              <td className='td'>
                <img onClick={() => {handleInput(index,item?.id)}} src={add} className='svg' alt="" />
                <img onClick={() => handleUpdate(index, item)} src={edit} alt="" className='svg'  />
                <img onClick={() => handleDelete(index,item?.id)} src={deleteicon} alt="" className='svg' />
              </td>
            </tr>
          ))}

      {/* input form row */}
        {(input || update) && (
          <tr className='tr'>
            <td className='td'>
              <input
                type="number"
                name="sorNo"
                value={element?.sorNo ? element.sorNo : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
              <input
                type="text"
                name="item"
                value={element?.item ?element.item : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
              <input
                type="number"
                name="hsn"
                value={element?.hsn ? element.hsn : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
              <input
                type="number"
                name="poQty"
                value={element?.poQty ? element.poQty : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
              <input
                type="number"
                name="stdUnitId"
                value={element?.stdUnitId ? element.stdUnitId : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
              <input
                type="text"
                name="unit"
                value={element?.unit ? element.unit : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
              <input
                type="number"
                name="rate"
                value={element?.rate ? element.rate : ""}
                onChange={handleChange}
              />
            </td>
            <td className='td'>
            {update && (
                <button className="btn" onClick={finalUpdata}>
                  Update
                </button>
              ) }
              {!update && (
                <button className="btn" onClick={handleAdd}>
                  {update ? "Update" : "Submit"}
                </button>
              )}
              {!update && (
                <button
                  className="btn red"
                  onClick={() => {
                    setInput(false);
                  }}>
                  close
                </button>
              )}
            </td>
          </tr>
        )}

      {/* array two */}
        {!load && array?.slice(number + 1)?.map((item, index) => (
            <tr className='tr'>
              <td className='td'><span>{item?.sorNo}</span></td>
              <td className='td'><span>{item?.item}</span></td>
              <td className='td'><span>{item?.hsn}</span></td>
              <td className='td'><span>{item?.poQty}</span></td>
              <td className='td'><span>{item?.stdUnitId}</span></td>
              <td className='td'><span>{item?.unit}</span></td>
              <td className='td'><span>{item?.rate}</span></td>
              <td className='td'>
                <img onClick={() => handleInput(array?.slice(0, number + 1).length + index,item?.id)} src={add} className='svg' alt="" />
                <img onClick={() => handleUpdate(array?.slice(0, number + 1).length + index,item)} src={edit} alt="" className='svg'  />
                <img onClick={() => handleDelete(index,item?.id)} src={deleteicon} alt="" className='svg' />
              </td>
            </tr>
          ))}
      </table>
      </div>
  )
}

export default Table
