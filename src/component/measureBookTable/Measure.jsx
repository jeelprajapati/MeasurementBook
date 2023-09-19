import React, { useEffect, useState } from "react";
import "./Measure.css";
import edit from "../../image/edit.svg";
import deleteicon from "../../image/delete.svg";
import add from "../../image/add.svg";
import copy from "../../image/copy-icon.svg";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import Tag from "../tagChips/Tag";
import Warning from "../warning/Warning";
import { useFormik } from "formik";
import { measureTable } from "../../scemas";
const Measure = () => {
  const location = useLocation().search.split("?");
  const billId = location[1].split("=")[1];
  const projectId = location[2].split("=")[1];
  const [element, setElement] = useState({description:'',no:'',contractItemId:''});
  const [number, setNumber] = useState(-1);
  const [input, setInput] = useState(false);
  const [update, setUpdate] = useState(false);
  const [array, setArray] = useState(null);
  const [change, setChange] = useState(0);
  const [tags, setTags] = useState("");
  const [clickIndex, setClickIndex] = useState(-1);
  const [content, setContent] = useState(false);
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const [tail, setTail] = useState("00000000-0000-0000-0000-000000000000");
  const [load, setLoad] = useState(false);
  const [l, setL] = useState(false);
  const [b, setB] = useState(false);
  const [h, setH] = useState(false);
  const [contractItem, setContractItem] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [contractName, setContractName] = useState("");
  const [loadInput, setLoadInput] = useState(false);
  const [show,setShow]=useState(false)
  const[isDelete,setIsDelete]=useState(false);
  const[deleteId,setDeleteId]=useState(null);
  const [warn,setWarn]=useState(false)
  const alert = useAlert();
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const { loding, data } = useFetch({
    url: `/MeasurementBook/GetByBillId?page=${1}&pageSize=${100}&billId=${billId}`,
    change,
  });

  useEffect(() => {
    const getContractItem = async () => {
      setLoadInput(true);  
      const res = await makeRequest.get(
        `/ContractItem/GetByProjectId?projectId=${projectId}&page=${1}&pageSize=${100}`
      );
      setContractItem(res.data?.items);
      setLoadInput(false);
    };
      getContractItem();
  }, []);
  
  useEffect(()=>{
   setLoadInput(true) 
   const unit=contractItem?.filter((i)=>(i?.id===contractId))[0]?.stdUnitId;
   if(unit===1){
    setL(true);
    setB(false);
    setH(false);
   }
   else if(unit===2){
    setL(true);
    setB(true);
    setH(false);
   }
   else if(unit===3){
    setL(true);
    setB(true);
    setH(true);
   }
   else{
    setL(false);
    setB(false);
    setH(false);
   }
   setLoadInput(false) 
  },[contractId])

  useEffect(() => {
    if (data?.items.length == 0) {
      setInput(true);
    }
  }, [data]);

  useEffect(() => {
    setLoad(loding);
    setArray(data?.items);
  }, [loding, data]);
  
  useEffect(()=>{
    const deleteData=async()=>{
      try {
        const res = await makeRequest.delete(
          `MeasurementBook?measurementBookId=${deleteId}`
        );
        if (res.status === 204) {
          setIsDelete(false);
          setWarn(false);
          alert.show("Data Deleted Sucessfully", { type: "success" });
          if (change === 0) {
            setChange(1);
          } else {
            setChange(0);
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
  const inputValidation=(i)=>{
    for (const key in i) {
      if(i[key]===''){
        return false
      }     
    }
    return true
  }
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
    setUpdate(true);
    setTags(item?.tags);
    setContractId(item?.contractItemId);
    setContractName(
      contractItem?.filter((i) => i?.id === item?.contractItemId)[0]?.item
    );
    array.splice(i, 1);
    setNumber(i - 1);
    setLoad(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const success1=inputValidation(element)
    const success2=inputValidation(contractId)
    if(success1&&success2){
     
    }
    else{
      alert.show('Please fill out all fields before submitting',{type:'error'});
    }
  };

  const handelFinalUpdata = async (e) => {
    e.preventDefault();
    const success1=inputValidation(element)
    const success2=inputValidation(contractId)
    if(success1&&success2){
      
  }
  else{
    alert.show('Please fill out all fields before updateing',{type:'error'});
  }
};
  const handleDelete = async (id) => {
    setDeleteId(id);
    setWarn(true);
  };

  const handleCopy = (index, item) => {
    setElement(item);
    setNumber(index);
    setTags(item?.tags);
    setHead(item?.id);
    setContractId(item?.contractItemId);
    setContractName(contractItem?.filter((i) => i?.id === item?.contractItemId)[0]?.item);
    setTail(array[index + 1]?.id);
    setInput(true);
  };

  const handleContractItem = (i) => {
    setContractId(i?.id);
    setContractName(i?.item);
    setShow(false)
  };

  const addFormik=useFormik({
    initialValues:element,
    validationSchema:measureTable,
    onSubmit:(value)=>{
       const handleAdd=async()=>{
        try {
          const res = await makeRequest.post("/MeasurementBook", {
            measurementBookDTO: {
              id: "00000000-0000-0000-0000-000000000000",
              description: value?.description,
              no: parseFloat(value?.no)||0,
              l: parseFloat(value?.l)||0,
              b: parseFloat(value?.b)||0,
              d_H: parseFloat(value?.d_H)||0,
              subtotal: 0,
              remark: "string",
              contractItemId: value.contractItemId,
              tags: tags,
              billId: billId,
            },
            head: head,
            tail: tail,
          });
          if (res.status === 204) {
            alert.show("Data Added Sucessfully", { type: "success" });
            setInput(false);
            setElement(null);
            setTags("");
            setNumber(-1);
            setContractId(null);
            setContractName("");
            if (change === 1) {
              setChange(0);
            } else {
              setChange(1);
            }
          }
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
       handleAdd();
    }
  })

  const updateFormik=useFormik({
    initialValues:element,
    validationSchema:measureTable,
    onSubmit:(value)=>{
      const handleUpdate=async()=>{
        try { 
          const res = await makeRequest.put("/MeasurementBook", {
            id: value?.id,
            description: value?.description,
            no: parseFloat(value?.no),
            l: parseFloat(element?.l),
            b: parseFloat(element?.b),
            d_H: parseFloat(element?.d_H),
            subtotal: parseFloat(element?.subtotal),
            remark: "string",
            contractItemId: value.contractItemId,
            tags: tags,
            billId: billId,
          });
          if (res.status === 204) {
            alert.show("Data Updated Sucessfully", { type: "success" });
            setUpdate(false);
            setElement(null);
            setTags("");
            setNumber(-1);
            setContractId(null);
            setContractName("");
            if (change === 1) {
              setChange(0);
            } else {
              setChange(1);
            }
          }
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
      handleUpdate();
    }
  })
  return (
    <div className="measure-table-container">
      <table>
        <tr className="measure-tr">
          <th className="measure-th">Contract Item</th>
          <th className="measure-th">Description</th>
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
                {contractItem
                  ?.filter((i) => i?.id === item?.contractItemId)
                  ?.map((e) => (
                    <span>{e?.item}</span>
                  ))}
              </td>
              <td className="measure-td">
                <span
                  style={
                    (content && clickIndex === index)
                      ? { overflow: "inherit", height: "ft-content" }
                      : {}
                  }
                >
                  <ul className="measure-ul">
                    <li>{(content && (clickIndex===index))?item?.description:item?.description.slice(0,50)}
                    {item?.description?.length >= 50 && (<p style={{display:'inline-block',margin:'0 10px',borderBottom:'1px solid #b974b9',color:'#b974b9',cursor:'pointer'}} onClick={()=>{(content && (clickIndex===index))?setContent(false):setContent(true);setClickIndex(index)}}>{(content && (clickIndex===index))?'Read less':'Read more'}</p>)}
                    </li>
                  </ul>
                </span>
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
                <span>{item?.subtotal.toFixed(3)}</span>
              </td>
              <td className="measure-td">
                <Tag table={true} tags={item?.tags} setTags={setTags} />
              </td>
              <td className="measure-td">
                <button
                  className="measure-img-btn"
                  onClick={() => {
                    handleInput(index, item?.id);
                  }}
                  disabled={input || update}
                >
                  <img src={add} alt="" className="svg" />
                </button>
                <button
                  className="measure-img-btn"
                  onClick={() => {handleUpdate(index, item);updateFormik.setValues(item);}}
                  disabled={input || update}
                >
                  <img src={edit} alt="" className="svg" />
                </button>
                <button
                  className="measure-img-btn"
                  onClick={() => handleCopy(index, item)}
                  disabled={input || update}
                >
                  <img src={copy} alt="" className="svg" />
                </button>
                <button
                  className="measure-img-btn"
                  onClick={() => handleDelete(item?.id)}
                  disabled={input || update}
                >
                  <img src={deleteicon} alt="" className="svg" />
                </button>
              </td>
            </tr>
          ))}
        {!load && (input || update) && (
          <tr>
            <td className="measure-td" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="search.."
                value={contractName}
                onChange={(e) => {
                  setContractName(e.target.value);
                  setShow(true);
                }}
                className={`${
                  ((updateFormik.errors.contractItemId && updateFormik.touched.contractItemId) ||
                    (addFormik.errors.contractItemId && addFormik.touched.contractItemId)) ?
                  "measure-input warning":"measure-input purple-border"
                }`}
              />
               {(!load && show) && <ul
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "0",
                  padding: "0",
                  width: "93%",
                  top: "88%",
                  zIndex:'2',
                  border: "1px solid rgb(172, 97, 247)",
                }}>
                  {contractItem?.filter((e) => e?.item?.toUpperCase().includes(contractName.toUpperCase()))
                    ?.map((i) => (
                      <li
                        className="measure-li"
                        onClick={() => {
                          handleContractItem(i);
                          update?updateFormik.setValues({...updateFormik.values,contractItemId:i?.id}):addFormik.setValues({...addFormik.values,contractItemId:i?.id})
                        }}
                      >
                        {i?.item}
                      </li>
                    ))}
              </ul>}
            </td>
            <td className="measure-td">
              <textarea
                type="text"
                name="description"
                className={`${
                  ((updateFormik.errors.description && updateFormik.touched.description) ||
                    (addFormik.errors.description && addFormik.touched.description)) ?
                  "desc-input warning":"desc-input purple-border"
                }`}
                onChange={update?updateFormik.handleChange:addFormik.handleChange}
                value={update?updateFormik.values.description:addFormik.values.description}
                onBlur={update?updateFormik.handleBlur:addFormik.handleBlur}
              ></textarea>
            </td>
            <td className="measure-td">
              <input
                type="number"
                name="no"
                min={0}
                onChange={update?updateFormik.handleChange:addFormik.handleChange}
                value={update?updateFormik.values.no:addFormik.values.no}
                onBlur={update?updateFormik.handleBlur:addFormik.handleBlur}
                className={`${
                  ((updateFormik.errors.no && updateFormik.touched.no) ||
                    (addFormik.errors.no && addFormik.touched.no)) ?
                  "measure-input warning":"measure-input purple-border"
                }`}
              />
            </td>
            <td className="measure-td">
              {!loadInput && (
                <input
                  type="number"
                  step='any'
                  min={0}
                  name="l"
                  value={element?.l ? element.l : ''}
                  onChange={handleChange}
                  className="measure-input purple-border"
                  disabled={!l}
                />
              )}
            </td>
            <td className="measure-td">
              {!loadInput && (
                <input
                  type="number"
                  name="b"
                  step='any'
                  min={0}
                  value={element?.b ? element.b : ''}
                  onChange={handleChange}
                  className="measure-input purple-border"
                  disabled={!b}
                />
              )}
            </td>
            <td className="measure-td">
              {!loadInput && (
                <input
                  type="number"
                  name="d_H"
                  step='any'
                  min={0}
                  value={element?.d_H ? element.d_H : ''}
                  onChange={handleChange}
                  className="measure-input purple-border"
                  disabled={!h}
                />
              )}
            </td>
            <td className="measure-td">
              <input
                type="number"
                step='any'
                min={0}
                name="subtotal"
                disabled
                value={element?.subtotal ? element.subtotal : 0}
                onChange={handleChange}
                className="measure-input purple-border"
              />
            </td>
            <td className="measure-td">
              <Tag 
              table={false} 
              tags={tags} 
              setTags={setTags} 
              />
            </td>
            <td className="measure-td">
              {update ? (
                <input type="button" value='Update' className="btn" onClick={updateFormik.handleSubmit}/>
              ) : (
                <input type="button" value='Add' className="btn" onClick={addFormik.handleSubmit}/>
              )}
              {!(array.length === 0) && (
                <button
                  className="btn"
                  onClick={() => {
                    setInput(false);
                    setTags("");
                    setContractId(null);
                    setNumber(-1);
                    setElement(null);
                    setContractName("");
                    setShow(false);
                    setL(false);
                    setB(false);
                    setH(false);
                    addFormik.resetForm();
                    if(update){
                      updateFormik.resetForm();
                      setUpdate(false);
                      if(change===1){
                        setChange(0);
                      }
                      else{
                        setChange(1)
                      }
                    }
                  }}>
                  close
                </button>
              )}
            </td>
          </tr>
        )}
        {!load &&
          array?.slice(number + 1)?.map((item, index) => (
            <tr className="measure-tr" key={item?.id}>
              <td className="measure-td">
                {contractItem
                  ?.filter((i) => i?.id === item?.contractItemId)
                  ?.map((e) => (
                    <span>{e?.item}</span>
                  ))}
              </td>
              <td className="measure-td">
                <span
                  style={
                    content && clickIndex === index
                      ? { overflow: "inherit", height: "fit-content" }
                      : {}
                  }
                >
                  <ul className="measure-ul">
                    <li>{(content && (clickIndex===index))?item?.description:item?.description.slice(0,50)}
                    {item?.description?.length >= 50 && (<p style={{display:'inline-block',margin:'0 10px',borderBottom:'1px solid #b974b9',color:'#b974b9',cursor:'pointer'}} onClick={()=>{content?setContent(false):setContent(true);setClickIndex(index)}}>{(content && (clickIndex===index))?'Read less':'Read more'}</p>)}
                    </li>
                  </ul>
                </span>
              </td>
              <td className="measure-td">
                <span>{item?.no}</span>
              </td>
              <td className="measure-td">
                <span>{item?.l.toFixed(3)}</span>
              </td>
              <td className="measure-td">
                <span>{item?.b.toFixed(3)}</span>
              </td>
              <td className="measure-td">
                <span>{item?.d_H.toFixed(3)}</span>
              </td>
              <td className="measure-td">
                <span>{item?.subtotal.toFixed(3)}</span>
              </td>
              <td className="measure-td">
                <Tag table={true} tags={item?.tags} setTags={setTags} />
              </td>
              <td className="measure-td">
                <button
                  className="measure-img-btn"
                  onClick={() => {
                    handleInput(
                      array?.slice(0, number + 1).length + index,
                      item?.id
                    );
                  }}
                  disabled={input || update}
                >
                  <img src={add} alt="" className="svg" />
                </button>
                <button
                  className="measure-img-btn"
                  onClick={() =>{
                    handleUpdate(
                      array?.slice(0, number + 1).length + index,
                      item
                    )
                    updateFormik.setValues(item);
                  }
                  }
                  disabled={input || update}
                >
                  <img src={edit} alt="" className="svg" />
                </button>
                <button
                  className="measure-img-btn"
                  onClick={() =>
                    handleCopy(array?.slice(0, number + 1).length + index, item)
                  }
                  disabled={input || update}
                >
                  <img src={copy} alt="" className="svg" />
                </button>
                <button
                  className="measure-img-btn"
                  onClick={() => handleDelete(item?.id)}
                  disabled={input || update}
                >
                  <img src={deleteicon} alt="" className="svg" />
                </button>
              </td>
            </tr>
          ))}
      </table>
      {warn && <Warning setIsDelete={setIsDelete} setWarn={setWarn}/>}
    </div>
  );
};

export default Measure;
