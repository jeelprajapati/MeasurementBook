import React, { useEffect, useRef, useState } from "react";
import "./Table.css";
import edit from "../../image/edit1.svg";
import deleteicon from "../../image/delete1.svg";
import add from "../../image/plus.svg";
import copy from "../../image/copy-icon1.svg";
import useFetch from "../../hooks/useFetch";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { contractTable } from "../../scemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
const Table = ({ Id, change, setChange, unit }) => {
  const [element, setElement] = useState({
    sorNo: "",
    item: "",
    poQty: "",
    stdUnitId: "",
    hsn: "",
    unit: "",
    rate: "",
  });
  const [array, setArray] = useState(null);
  const [number, setNumber] = useState(-1);
  const [load, setLoad] = useState(false);
  const [input, setInput] = useState(false);
  const [update, setUpdate] = useState(false);
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const [tail, setTail] = useState("00000000-0000-0000-0000-000000000000");
  const [isDelete,setIsDelete]=useState(null);
  const [scrollValue,setScrollValue]=useState(0);
  const alert = useAlert();
  const tableRef=useRef();
  const ref=useRef();
  const { loding, data } = useFetch({
    url: `/ContractItem/GetByProjectId?projectId=${Id}&page=${1}&pageSize=${100}`,
    change,
  });
  useEffect(() => {
    setLoad(loding);
    if(data?.items?.length===0){
      setInput(true);
      setHead("00000000-0000-0000-0000-000000000000");
      setTail("00000000-0000-0000-0000-000000000000");
    }
    else{
      setInput(false);
    }
    setArray(data?.items);
  }, [loding, data]);

  useEffect(()=>{
    if(tableRef.current){
      tableRef.current.scrollTop=scrollValue;
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[array])

  const addFormik = useFormik({
    initialValues: element,
    validationSchema: contractTable,
    onSubmit: (value, action) => {
      const handleAdd = async () => {
        try {
          const makeRequest = makeRequesInstance(localStorage.getItem("token"));
          const responce = await makeRequest.post("/ContractItem", {
            contractItemDTO: {
              id: "00000000-0000-0000-0000-000000000000",
              sorNo: parseInt(value?.sorNo || 0),
              item: value?.item,
              hsn: parseInt(value?.hsn || 0),
              poQty: parseInt(value?.poQty),
              stdUnitId: parseInt(value?.stdUnitId),
              unit: value?.unit,
              rate: parseInt(value?.rate || 0),
              projectId: Id,
            },
            head: head,
            tail: tail,
          });
          if (responce.status === 204) {
            alert.show("Data Added Sucessfully", { type: "success" });
            action.resetForm();
            setElement(null);
            setInput(false);
            if (change === 0) {
              setChange(1);
            } else {
              setChange(0);
            }
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "error" });
          } else {
            alert.show("something went wrong", { type: "info" });
          }
        }
      };
      handleAdd();
    },
  });

  const updateFormik = useFormik({
    initialValues: element,
    validationSchema: contractTable,
    onSubmit: (value, action) => {
      const handleUpdate = async () => {
        try {
          const makeRequest = makeRequesInstance(localStorage.getItem("token"));
          const responce = await makeRequest.put("/ContractItem", {
            id: value?.id,
            sorNo: parseInt(value?.sorNo || 0),
            item: value?.item,
            hsn: parseInt(value?.hsn || 0),
            poQty: parseInt(value?.poQty),
            stdUnitId: parseInt(value?.stdUnitId),
            unit: value?.unit,
            rate: parseInt(value?.rate || 0),
            projectId: value?.projectId,
          });
          if (responce.status === 204) {
            alert.show("Data Update Sucessfully", { type: "success" });
            action.resetForm();
            setElement(null);
            setUpdate(false);
            if (change === 0) {
              setChange(1);
            } else {
              setChange(0);
            }
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "error" });
          } else {
            alert.show("something went wrong", { type: "info" });
          }
        }
      };
      handleUpdate();
    },
  });

  // set index using index we can divide array into two part & set head and tail;
  const handleInput = (i, id) => {
    setInput(true);
    setNumber(i);
    setHead(id);
    setScrollValue(tableRef.current.scrollTop);
    if (array.length > i + 1) {
      setTail(array[i + 1]?.id);
    } else if (array.length === i + 1) {
      setTail("00000000-0000-0000-0000-000000000000");
    }
  };

  // update element
  const handleUpdate = (i, item) => {
    setLoad(true);
    setUpdate(true);
    setScrollValue(tableRef.current.scrollTop);
    array.splice(i, 1);
    setNumber(i - 1);
    setElement(item);
    setLoad(false);
  };

  // delete element
  const handleDelete = async () => {
    try {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.delete(
        `/ContractItem?contractItemId=${isDelete}`
      );
      if (res.status === 204) {
        alert.show("Data Deleted Sucessfully", { type: "success" });
        setChange(!change)
      }
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "error" });
      } else {
        alert.show("something went wrong", { type: "info" });
      }
    }
    setIsDelete(null);
  };

  const handleCopy = (index, item) => {
    setLoad(true);
    setHead(item?.id);
    setScrollValue(tableRef.current.scrollTop);
    setTail(array[index + 1]?.id);
    setNumber(index);
    addFormik.setValues(item);
    setInput(true);
    setLoad(false);
  };

  useEffect(()=>{
    if(ref.current){
      ref.current.scrollIntoView({ block: 'nearest', inline: 'start', behavior:'smooth'});
    }
  },[input,update])

  return (
    <div className="table" ref={tableRef}>
      <table className="tb">
        <tr className="tr">
          <th className="th">Item Code</th>
          <th className="th" colSpan={3}>Description*</th>
          <th className="th" colSpan={2}>Work Order Quantity*</th>
          <th className="th" colSpan={2}>Measure Type*</th>
          <th className="th" colSpan={2}>UOM*</th>
          <th className="th" colSpan={2}>Rate</th>
          <th className="th">HSN</th>
          <th className="th" colSpan={3} style={{textAlign:'center'}}>Actions</th>
        </tr>
        {!load &&
          array?.slice(0, number + 1)?.map((item, index) => (
            <tr className="tr" key={index}>
              <td className="td">
                <span>{item?.sorNo}</span>
              </td>
              <td className="td" colSpan={3}>
                <span>{item?.item}</span>
              </td>
              <td className="td" colSpan={2}>
                <span>{item?.poQty.toFixed(2)}</span>
              </td>
              <td className="td" colSpan={2}>
                <span>
                  {unit?.filter((i) => i?.id === item?.stdUnitId)[0]?.name}
                </span>
              </td>
              <td className="td" colSpan={2}>
                <span>{item?.unit}</span>
              </td>
              <td className="td" colSpan={2} >
                <span>{item?.rate.toFixed(2)}</span>
              </td>
              <td className="td">
                <span>{item?.hsn}</span>
              </td>
              {isDelete===item?.id?<td className="td" colSpan={3} style={{textAlign:'center'}}>
                <button className="contract-yes" onClick={handleDelete}><FontAwesomeIcon className="true-btn" icon={faCheck} /></button>
                <button className="contract-no" onClick={()=>{setIsDelete(null)}}><FontAwesomeIcon icon={faXmark} className="false-btn"/></button>
                </td>:<td className="td" colSpan={3} style={{textAlign:'center'}}>
                <button
                  className="btn-disabled"
                  onClick={() => handleInput(index, item?.id)}
                  disabled={input || update}
                >
                  <img src={add} className="svg" alt="" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() => {
                    handleUpdate(index, item);
                    updateFormik.setValues(item);
                  }}
                  disabled={input || update}
                >
                  <img src={edit} alt="" className="svg" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() => handleCopy(index, item)}
                  disabled={input || update}
                >
                  <img src={copy} alt="" className="svg" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() => {setIsDelete(item?.id)}}
                  disabled={input || update}
                >
                  <img src={deleteicon} alt="" className="svg" />
                </button>
              </td>}
            </tr>
          ))}

        {/* input form row */}
        {(input || update) && (
          <tr className="tr" ref={ref}>
            <td className="td">
              <input
                type="number"
                name="sorNo"
                className="purple-border"
                value={
                  update ? updateFormik.values.sorNo : addFormik.values.sorNo
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td" colSpan={3}>
              <input
                type="text"
                name="item"
                className={`${
                  (updateFormik.errors.item && updateFormik.touched.item) ||
                  (addFormik.errors.item && addFormik.touched.item)
                    ? "warning"
                    : "purple-border"
                }`}
                value={
                  update ? updateFormik.values.item : addFormik.values.item
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td" colSpan={2}>
              <input
                type="number"
                step="any"
                min={0}
                name="poQty"
                className={`${
                  (updateFormik.errors.poQty && updateFormik.touched.poQty) ||
                  (addFormik.errors.poQty && addFormik.touched.poQty)
                    ? "warning"
                    : "purple-border"
                }`}
                value={
                  update ? updateFormik.values.poQty : addFormik.values.poQty
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td" colSpan={2}>
              <select
                name="stdUnitId"
                className={`${
                  (updateFormik.errors.stdUnitId &&
                    updateFormik.touched.stdUnitId) ||
                  (addFormik.errors.stdUnitId && addFormik.touched.stdUnitId)
                    ? "warning"
                    : "purple-border"
                }`}
                value={
                  update
                    ? updateFormik.values.stdUnitId
                    : addFormik.values.stdUnitId
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              >
                <option value="" disabled>
                  select
                </option>
                {!load &&
                  unit?.map((item) => (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  ))}
              </select>
            </td>
            <td className="td" colSpan={2}>
              <input
                type="text"
                name="unit"
                className={`${
                  (updateFormik.errors.unit && updateFormik.touched.unit) ||
                  (addFormik.errors.unit && addFormik.touched.unit)
                    ? "warning"
                    : "purple-border"
                }`}
                value={
                  update ? updateFormik.values.unit : addFormik.values.unit
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td" colSpan={2}>
              <input
                type="number"
                step="any"
                min={0}
                name="rate"
                className={`${
                  (updateFormik.errors.rate && updateFormik.touched.rate) ||
                  (addFormik.errors.rate && addFormik.touched.rate)
                    ? "warning"
                    : "purple-border"
                }`}
                value={
                  update ? updateFormik.values.rate : addFormik.values.rate
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td">
              <input
                type="number"
                name="hsn"
                className={`${
                  (updateFormik.errors.hsn && updateFormik.touched.hsn) ||
                  (addFormik.errors.hsn && addFormik.touched.hsn)
                    ? "warning"
                    : "purple-border"
                }`}
                value={update ? updateFormik.values.hsn : addFormik.values.hsn}
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td" colSpan={3} style={{textAlign:'center'}}>
                <button className="contract-yes" onClick={update ? updateFormik.handleSubmit : addFormik.handleSubmit}>
                  <FontAwesomeIcon className="true-btn" icon={faCheck} />
                </button>
                <button
                className="contract-no"
                disabled={array?.length===0}
                onClick={() => {
                  setInput(false);
                  setElement({
                    sorNo: "",
                    item: "",
                    poQty: "",
                    stdUnitId: "",
                    hsn: "",
                    unit: "",
                    rate: "",
                  });
                  addFormik.resetForm();
                  setHead(null);
                  setTail(null);
                  setNumber(-1);
                  if (update) {
                    updateFormik.resetForm();
                    if (change === 1) {
                      setChange(0);
                    } else {
                      setChange(1);
                    }
                    setUpdate(false);
                  }
                }}
              >
                <FontAwesomeIcon icon={faXmark} className="false-btn"/>
              </button>
            </td>
          </tr>
        )}

        {/* array two */}
        {!load &&
          array?.slice(number + 1)?.map((item, index) => (
            <tr className="tr" key={index}>
              <td className="td">
                <span>{item?.sorNo}</span>
              </td>
              <td className="td" colSpan={3}>
                <span>{item?.item}</span>
              </td>
              <td className="td" colSpan={2}>
                <span>{item?.poQty.toFixed(2)}</span>
              </td>
              <td className="td" colSpan={2}>
                <span>
                  {unit?.filter((i) => i?.id === item?.stdUnitId)[0]?.name}
                </span>
              </td>
              <td className="td" colSpan={2}>
                <span>{item?.unit}</span>
              </td>
              <td className="td" colSpan={2}>
                <span>{item?.rate.toFixed(2)}</span>
              </td>
              <td className="td">
                <span>{item?.hsn}</span>
              </td>
              {isDelete===item?.id?<td className="td" colSpan={3} style={{textAlign:'center'}}>
                <button className="contract-yes" onClick={handleDelete}><FontAwesomeIcon className="true-btn" icon={faCheck} /></button>
                <button className="contract-no" onClick={()=>{setIsDelete(null)}}><FontAwesomeIcon icon={faXmark} className="false-btn"/></button>
                </td>:<td className="td" colSpan={3} style={{textAlign:'center'}}>
                <button
                  className="btn-disabled"
                  onClick={() =>
                    handleInput(
                      array?.slice(0, number + 1).length + index,
                      item?.id
                    )
                  }
                  disabled={input || update}
                >
                  <img src={add} className="svg" alt="" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() => {
                    handleUpdate(
                      array?.slice(0, number + 1).length + index,
                      item
                    );
                    updateFormik.setValues(item);
                  }}
                  disabled={input || update}
                >
                  <img src={edit} alt="" className="svg" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() =>
                    handleCopy(array?.slice(0, number + 1).length + index, item)
                  }
                  disabled={input || update}
                >
                  <img src={copy} alt="" className="svg" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() => {setIsDelete(item?.id)}}
                  disabled={input || update}
                >
                  <img src={deleteicon} alt="" className="svg" />
                </button>
              </td>}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Table;
