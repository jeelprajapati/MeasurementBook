import React, { useEffect, useState } from "react";
import "./Measure.css";
import edit from "../../image/edit.svg";
import deleteicon from "../../image/delete.svg";
import add from "../../image/add.svg";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import makeRequesInstance from "../../makeRequest";
import Contractitem from "../../hooks/Contractitem";
import { useAlert } from 'react-alert';
const Measure = () => {
  const location = useLocation().search.split("?");
  const billId=location[1].split('=')[1];
  const projectId=location[2].split('=')[1];
  const [element, setElement] = useState(null);
  const [number, setNumber] = useState(-1);
  const [input, setInput] = useState(false);
  const [update, setUpdate] = useState(false);
  const [array, setArray] = useState(null);
  const [change,setChange]=useState(0)
  const [contractItemId,setContractItemId]=useState(null);
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const [tail, setTail] = useState("00000000-0000-0000-0000-000000000000");
  const [load, setLoad] = useState(false);
  const alert=useAlert();
  const makeRequest=makeRequesInstance(localStorage.getItem('token'))
  const { loding, error, data } = useFetch({
    url: `/MeasurementBook/GetByBillId?page=${1}&pageSize=${100}&billId=${billId}`,
    change,
  });
  useEffect(()=>{
   if(data?.items.length==0){
     setInput(true)
   }
  },[data])

  useEffect(() => {
    setLoad(loding);
    setArray(data?.items);
  }, [loding, data]);

  const handleChange = (e) => {
    setElement({ ...element, [e.target.name]: e.target.value });
  };

  const handleInput = (i, id) => {
    setInput(true);
    setNumber(i);
    setHead(id);
    if (array.length > i + 1) {
      setTail(array[i + 1]?.id);
    } else if (array.length == i + 1) {
      setTail("00000000-0000-0000-0000-000000000000");
    }
  };

  const handleUpdate = (i, item) => {
    setLoad(true);
    setElement(item);
    setContractItemId(item?.contractItemId)
    setUpdate(true);
    array.splice(i, 1);
    setNumber(i - 1);
    setLoad(false);
  };

  const handleAdd=async(e)=>{
    e.preventDefault();
    const res=await makeRequest.post('/MeasurementBook',{
      "measurementBookDTO":{
        "id":"00000000-0000-0000-0000-000000000000",
        "description":element?.description,
        "no":parseInt(element?.no),
        "l":parseInt(element?.l),
        "b":parseInt(element?.b),
        "d_H":parseInt(element?.d_H),
        "subtotal":parseInt(element?.subtotal),
        "remark":"string",
        "contractItemId":contractItemId,
        "tags":element?.tags,
        "billId":billId
      },
      "head":head,
      "tail":tail
    })
    if(res.status===204){
       alert.show('Data Added Sucessfully',{type:'success'})
       setInput(false)
       setElement(null)
       setContractItemId(null)
       if(change===1){
        setChange(0)
       }
       else{
        setChange(1)
       }
    }
  }

  const handelFinalUpdata=async(e)=>{
    e.preventDefault();
    const res=await makeRequest.put('/MeasurementBook',{
        "id":element?.id,
        "description":element?.description,
        "no":parseInt(element?.no),
        "l":parseInt(element?.l),
        "b":parseInt(element?.b),
        "d_H":parseInt(element?.d_H),
        "subtotal":parseInt(element?.subtotal),
        "remark":"string",
        "contractItemId":contractItemId,
        "tags":element?.tags,
        "billId":billId
    })
    if(res.status===204){
      alert.show('Data Updated Sucessfully',{type:'success'})
      setUpdate(false)
      setElement(null)
      setNumber(-1)
      if(change===1){
       setChange(0)
      }
      else{
       setChange(1)
      }
   }
  }

  const handleDelete=async(id)=>{
    const res=await makeRequest.delete(`MeasurementBook?measurementBookId=${id}`);
    if(res.status===204){
      alert.show('Data Deleted Sucessfully',{type:'success'})
       if(change===0){
         setChange(1)
       }
       else{
         setChange(0)
       }
    }
 }
  return (
    <div className="measure-table-container">
      <table>
        <tr className="measure-tr">
          <th className="measure-th">Contract Item</th>
          <th className="measure-th">Drsscription</th>
          <th className="measure-th">No</th>
          <th className="measure-th">L</th>
          <th className="measure-th">B</th>
          <th className="measure-th">D/H</th>
          <th className="measure-th">Subtotal</th>
          <th className="measure-th">Tags</th>
          <th className="measure-th">Action</th>
        </tr>
        {!load &&
          array?.slice(0, number + 1)?.map((item, index) => (
            <tr className="measure-tr" key={item?.id}>
              <td className="measure-td">
                <Contractitem projectId={projectId} setContractItemId={null} table={true} contractItemId={item?.contractItemId}/>
              </td>
              <td className="measure-td">
                <span>{item?.description}</span>
              </td>
              <td className="measure-td">
                <span>{item?.no}</span>
              </td>
              <td className="measure-td">
                <span>{item?.l}</span>
              </td>
              <td className="measure-td">
                <span>{item?.b}</span>
              </td>
              <td className="measure-td">
                <span>{item?.d_H}</span>
              </td>
              <td className="measure-td">
                <span>{item?.subtotal}</span>
              </td>
              <td className="measure-td">
                <span>{item?.tags}</span>
              </td>
              <td className="measure-td">
                <img
                  src={add}
                  onClick={() => {
                    handleInput(index, item?.id);
                  }}
                  alt=""
                  className="svg"
                />
                <img
                  src={edit}
                  onClick={() => handleUpdate(index, item)}
                  alt=""
                  className="svg"
                />
                <img src={deleteicon} onClick={()=>handleDelete(item?.id)} alt="" className="svg" />
              </td>
            </tr>
          ))}
        {!load && (input || update) && (
          <tr>
            <td className="measure-td">
              <Contractitem projectId={projectId} setContractItemId={setContractItemId} table={false} contractItemId={contractItemId}/>
            </td>
            <td className="measure-td">
              <input
                type="text"
                name="description"
                value={element?.description ? element.description : ""}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              <input
                type="number"
                name="no"
                value={element?.no ? element.no : 0}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              <input
                type="number"
                name="l"
                value={element?.l? element.l : 0}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              <input
                type="number"
                name="b"
                value={element?.b ? element.b : 0}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              <input
                type="number"
                name="d_H"
                value={element?.d_H ? element.d_H : 0}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              <input
                type="number"
                name="subtotal"
                value={element?.subtotal ? element.subtotal: 0}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              <input
                type="text"
                name="tags"
                value={element?.tags ? element.tags : ""}
                onChange={handleChange}
                className="measure-input"
              />
            </td>
            <td className="measure-td">
              {update ? (
                <button className="btn" onClick={handelFinalUpdata}>Update</button>
              ) : (
                <button className="btn" onClick={handleAdd}>Add</button>
              )}
              {!(array.length===0||update) &&<button
                className="btn red"
                onClick={() => {
                  setInput(false);
                  setUpdate(false);
                }}
              >
                close
              </button>}
            </td>
          </tr>
        )}
        {!load &&
          array?.slice(number + 1)?.map((item, index) => (
            <tr className="measure-tr" key={item?.id}>
              <td className="measure-td">
               <Contractitem projectId={projectId} setContractItemId={null} table={true} contractItemId={item?.contractItemId}/>
              </td>
              <td className="measure-td">
                <span>{item?.description}</span>
              </td>
              <td className="measure-td">
                <span>{item?.no}</span>
              </td>
              <td className="measure-td">
                <span>{item?.l}</span>
              </td>
              <td className="measure-td">
                <span>{item?.b}</span>
              </td>
              <td className="measure-td">
                <span>{item?.d_H}</span>
              </td>
              <td className="measure-td">
                <span>{item?.subtotal}</span>
              </td>
              <td className="measure-td">
                <span>{item?.tags}</span>
              </td>
              <td className="measure-td">
                <img
                  src={add}
                  onClick={() => {
                    handleInput(
                      array?.slice(0, number + 1).length + index,
                      item?.id
                    );
                  }}
                  alt=""
                  className="svg"
                />
                <img
                  src={edit}
                  onClick={() =>
                    handleUpdate(
                      array?.slice(0, number + 1).length + index,
                      item
                    )
                  }
                  alt=""
                  className="svg"
                />
                <img src={deleteicon} onClick={()=>handleDelete(item?.id)} alt="" className="svg" />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Measure;
