import React,{useEffect, useState} from 'react'
import './Table.css'
import add from '../../image/add.svg'
import edit from '../../image/edit.svg'
import deleteicon from '../../image/delete.svg'
import copy from "../../image/copy-icon.svg";
import useFetch from '../../hooks/useFetch'
import makeRequesInstance from '../../makeRequest'
import { useAlert } from 'react-alert'
const Table = ({Id,change,setChange}) => {
    const [element, setElement] = useState({sorNo:'',item:'',hsn:'',stdUnitId:'',unit:'',rate:''});
    const [array, setArray] = useState(null);
    const [number, setNumber] = useState(-1);
    const [load,setLoad]=useState(false)
    const [input, setInput] = useState(false);
    const [update, setUpdate] = useState(false);
    const [unit,setUnit]=useState(null);
    const [head,setHead]=useState('00000000-0000-0000-0000-000000000000');
    const [tail,setTail]=useState('00000000-0000-0000-0000-000000000000');
    const makeRequest=makeRequesInstance(localStorage.getItem('token'))
    const alert=useAlert();
    const {loding,error,data}=useFetch({url:`/ContractItem/GetByProjectId?projectId=${Id}&page=${1}&pageSize=${100}`,change})
    useEffect(()=>{
      setLoad(loding)
      setArray(data?.items)
    },[loding,data])
   
    useEffect(()=>{
      const getUnit=async()=>{
        setLoad(true);
        const res=await makeRequest.get('/Standard/GetStandardUnit');
        setUnit(res.data);
        setLoad(false);
      }
        getUnit();
    },[])

    const inputValidation=(i)=>{
      for (const key in i) {
        console.log(i)
        if(i[key]===''){
          return false
        }
      }
      return true
    }

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
      const success=inputValidation(element);
      if(success){
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
      }
      else{
        alert.show('Please fill out all fields before submitting',{type:'error'})
      }
    };
  
    // update element
    const handleUpdate = (i, item) => {
      setLoad(true);
      setUpdate(true);
      array.splice(i, 1);
      setNumber(i - 1);
      setElement(item);
      setLoad(false);
    };
  
    //final Update
    const finalUpdata=async()=>{
      const success=inputValidation(element);
      if(success){

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
      else{
        alert.show('Please fill out all fields before update',{type:'error'})
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

  const handleCopy=(index,item)=>{
      setLoad(true);
      setHead(item?.id);
      setTail(array[index+1]?.id);
      setNumber(index);
      setElement(item);
      setInput(true);
      setLoad(false);
  }
  
  return (
    <div className="table">
      <table className='tb'>
        <tr className='tr'>
          <th className='th'>sorNo</th>
          <th className='th'>item</th>
          <th className='th'>hsn</th>
          <th className='th'>poQty</th>
          <th className='th'>stdUnit</th>
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
              <td className='td'><span>{unit?.filter((i)=>(i?.id===item?.stdUnitId))[0]?.name}</span></td>
              <td className='td'><span>{item?.unit}</span></td>
              <td className='td'><span>{item?.rate}</span></td>
              <td className='td'>
              <button className='btn-disabled' onClick={() => handleInput(index,item?.id)} disabled={(input||update)}><img src={add} className='svg' alt="" /></button>
              <button className='btn-disabled' onClick={() => handleUpdate(index, item)} disabled={(input||update)}><img src={edit} alt="" className='svg'  /></button>
              <button className='btn-disabled' onClick={()=>handleCopy(index,item)} disabled={(input||update)}><img src={copy} alt="" className='svg' /></button>
              <button className='btn-disabled' onClick={() => handleDelete(index,item?.id)} disabled={(input||update)}><img src={deleteicon} alt="" className='svg' /></button>
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

              <select name="stdUnitId" value={element?.stdUnitId ? element.stdUnitId : ""} onChange={handleChange} id="">
                <option value="" disabled>select stdUnitId</option>  
                {!load && (unit?.map((item)=>(<option value={item?.id} key={item?.id}>{item?.name}</option>)))}
              </select>
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
                    setElement(null);
                    setHead(null);
                    setTail(null);
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
              <td className='td'><span>{unit?.filter((i)=>(i?.id===item?.stdUnitId))[0]?.name}</span></td>
              <td className='td'><span>{item?.unit}</span></td>
              <td className='td'><span>{item?.rate}</span></td>
              <td className='td'>
                <button className='btn-disabled' onClick={() => handleInput(array?.slice(0, number + 1).length + index,item?.id)} disabled={(input||update)}><img src={add} className='svg' alt="" /></button>
                <button className='btn-disabled' onClick={() => handleUpdate(array?.slice(0, number + 1).length + index,item)} disabled={(input||update)}><img src={edit} alt="" className='svg'  /></button>
                <button className='btn-disabled' onClick={() => handleCopy(array?.slice(0, number + 1).length + index,item)} disabled={(input||update)}><img src={copy} alt="" className='svg' /></button>
                <button className='btn-disabled' onClick={() => handleDelete(index,item?.id)} disabled={(input||update)}><img src={deleteicon} alt="" className='svg' /></button>
              </td>
            </tr>
          ))}
      </table>
      </div>
  )
}

export default Table
