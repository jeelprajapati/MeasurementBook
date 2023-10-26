import React, { useEffect, useRef, useState } from "react";
import "./Measure.css";
import edit from "../../image/edit1.svg";
import deleteicon from "../../image/delete1.svg";
import add from "../../image/plus.svg";
import copy from "../../image/copy-icon1.svg";
import { useLocation } from "react-router-dom";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { measureTable } from "../../scemas";
import Filter from "../filter/Filter.jsx";
import Select from "../select/Select";
import yes from "../../image/yes1.svg";
import no from "../../image/no1.svg";
import MultiFilter from "../filter/MultiFilter";
const Measure = () => {
  const location = useLocation().search.split("?");
  const billId = location[1].split("=")[1];
  const projectId = location[2].split("=")[1];
  const [filter, setFilter] = useState([]);
  const [filter1, setFilter1] = useState([]);
  const [filterTag, setFilterTag] = useState([]);
  const [load, setLoad] = useState(false);
  const [array, setArray] = useState([]);
  const [change, setChange] = useState(0);
  const [input, setInput] = useState("");
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const [number, setNumber] = useState(0);
  const [contractItem, setContractItem] = useState([]);
  const inputRef = useRef(null);
  const [usedTag, setUsedTag] = useState(false);
  const [chip, setChip] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [contractContentId,setContractContentId]=useState(null);
  const [descriptionId,setDescriptionId]=useState(null);
  const [scrollValue,setScrollValue]=useState(0);
  const alert = useAlert();
  const tableRef=useRef();
  const ref=useRef();
  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.post("/MeasurementBook/GetByBillId", {
          billId: billId,
          page: 1,
          pageSize: 100,
          filter:[
            ...(filter1.length !== 0
              ? [
                  {
                    filterColumn: 1,
                    filterValue: filter1[0],
                  },
                ]
              : []),
            ...(filter.length !== 0
              ? [
                  {
                    filterColumn: 2,
                    filterValue: filter.join(","),
                  },
                ]
              : [])
          ],
        });
        setArray(res.data.items);
        if (res.data.items.length === 0 && filter?.length===0 && filter?.length === 0) {
          setInput("add");
        }
      setLoad(false); 
      };
      getData();

  }, [change, billId, filter, filter1]);
  
  useEffect(()=>{
    if(tableRef.current){
      tableRef.current.scrollTop=scrollValue;
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[array])

  useEffect(() => {
    const getContractItem = async () => {
      setLoad(true);
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get(
        `/ContractItem/GetByProjectId?projectId=${projectId}&page=${1}&pageSize=${100}`
      );
      setContractItem(res.data?.items);
      setLoad(false);
    };
    getContractItem();
  }, [change, projectId]);

  useEffect(() => {
    const getTag = async () => {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get(
        `/MeasurementBook/GetTagsByProjectId?projectId=${projectId}`
      );
      setFilterTag(res.data);
    };
    getTag();
  }, [change, projectId]);

  const addFormik = useFormik({
    initialValues: {
      description: "",
      no: "",
      l: "",
      b: "",
      d_H: "",
      contractItemId: "",
      tags: "",
    },
    validationSchema: measureTable,
    onSubmit: (value) => {
      const handleAdd = async () => {
        try {
          const makeRequest = makeRequesInstance(localStorage.getItem("token"));
          const res = await makeRequest.post("/MeasurementBook", {
            measurementBookDTO: {
              id: "00000000-0000-0000-0000-000000000000",
              description: value?.description,
              no: parseFloat(value?.no) || 0,
              l: contractItem?.find((item) => item?.id === value?.contractItemId)
                 ?.stdUnitId === 4 
                 ? 0 
                 : parseFloat(value?.l) || 0,
              b:
                contractItem?.find((item) => item?.id === value?.contractItemId)
                  ?.stdUnitId === 1 ||
                  contractItem?.find((item) => item?.id === value?.contractItemId)
                  ?.stdUnitId === 4
                  ? 0
                  : parseFloat(value?.b) || 0,
              d_H:
                contractItem?.find((item) => item?.id === value.contractItemId)
                  ?.stdUnitId === 1 ||
                contractItem?.find((item) => item?.id === value?.contractItemId)
                  ?.stdUnitId === 2 ||
                contractItem?.find((item) => item?.id === value?.contractItemId)
                  ?.stdUnitId === 4
                  ? 0
                  : parseFloat(value?.d_H) || 0,
              subtotal: 0,
              remark: "string",
              contractItemId: value.contractItemId,
              tags: tags,
              billId: billId,
            },
            head: head
          });
          if (res.status === 204) {
            alert.show("Data Added Sucessfully", { type: "success" });
            addFormik.resetForm();
            setInput("");
            setSelectedOption(null);
            setTags("");
            setNumber(0);
            if (change === 1) {
              setChange(0);
            } else {
              setChange(1);
            }
          }
        } catch (error) {
        
          if (error.response?.data.title) {
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
            alert.show(error.message, { type: "error" });
          } else if (error.code === "ERR_BAD_REQUEST") {
            alert.show(error.message, { type: "error" });
          } else {
            alert.show("Iternal server error", { type: "error" });
          }
        }
      };
      handleAdd();
    },
  });
  
  const updateFormik = useFormik({
    initialValues: {
      description: "",
      no: "",
      l: "",
      b: "",
      d_H: "",
      contractItemId: "",
      tags: "",
    },
    validationSchema: measureTable,
    onSubmit: (value) => {
      const handleUpdate = async () => {
        try {
          const makeRequest = makeRequesInstance(localStorage.getItem("token"));
          const res = await makeRequest.put("/MeasurementBook", {
            id: value?.id,
            description: value?.description,
            no: parseFloat(value?.no),
            l: contractItem?.find((item) => item?.id === value?.contractItemId)
               ?.stdUnitId === 4 
               ? 0 
               : parseFloat(value?.l),
            b:
              contractItem?.find((item) => item?.id === value?.contractItemId)
                ?.stdUnitId === 1 ||
              contractItem?.find((item) => item?.id === value?.contractItemId)
                ?.stdUnitId === 4
                ? 0
                : parseFloat(value?.b) || 0,
            d_H:
              contractItem?.find((item) => item?.id === value.contractItemId)
                ?.stdUnitId === 1 ||
              contractItem?.find((item) => item?.id === value?.contractItemId)
                ?.stdUnitId === 2 ||
              contractItem?.find((item) => item?.id === value?.contractItemId)
                ?.stdUnitId === 4
                ? 0
                : parseFloat(value?.d_H) || 0,
            subtotal: parseFloat(value?.subtotal),
            remark: "string",
            contractItemId: value.contractItemId,
            tags: tags,
            billId: billId,
          });
          if (res.status === 204) {
            alert.show("Data Updated Sucessfully", { type: "success" });
            updateFormik.resetForm();
            setInput("");
            setSelectedOption(null);
            setTags("");
            setNumber(0);
            if (change === 1) {
              setChange(0);
            } else {
              setChange(1);
            }
          }
        } catch (error) {
          if (error.response) {
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
            alert.show(error.message, { type: "error" });
          } else {
            alert.show("Iternal server error", { type: "error" });
          }
        }
      };
      handleUpdate();
    },
  });

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCreateChip = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      if (tags === "") {
        setTags(chip);
      } else {
        setTags(tags.concat(",", chip));
      }
      setChip("");
      setLoading(false);
    }
  };

  const handleClickAdd = (value) => {
    setLoading(true);
    if (tags === "") {
      setTags(value);
    } else {
      setTags(tags.concat(",", value));
    }
    setLoading(false);
  };

  const handleUpdate = (item, index) => {
    setLoad(true);
    updateFormik.setValues(item);
    setTags(item?.tags);
    setSelectedOption({
      value: contractItem?.find((e) => e?.id === item?.contractItemId)?.id,
      label: contractItem?.find((e) => e?.id === item?.contractItemId)?.item,
    });
    setScrollValue(tableRef.current.scrollTop);
    setArray(array.filter((i)=>(i?.id!==item.id)));
    setNumber(index - 1);
    setInput("update");
    setLoad(false);
  };

  const handleRemove = (string, index) => {
    setLoading(true);
    if (index === 0) {
      setTags(tags.replace(`${string}`, ""));
    } else {
      setTags(tags.replace(`${string}`, ""));
    }
    setLoading(false);
  };

  const handleAdd = (index) => {
    setNumber(index);
    setInput("add");
    setScrollValue(tableRef.current.scrollTop);
    setHead(array[index - 1]?.id);
  };

  const handleClose = () => {
    if (input === "update") {
      if (change === 1) {
        setChange(0);
      } else {
        setChange(1);
      }
      updateFormik.resetForm();
    } else {
      addFormik.resetForm();
    }
    setSelectedOption(null);
    setInput("");
    setTags("");
    setNumber(0);
    setUsedTag(false);
    setHead("00000000-0000-0000-0000-000000000000");
  };

  const handleCopy = (item, index) => {
    addFormik.setValues(item);
    setNumber(index);
    setScrollValue(tableRef.current.scrollTop);
    setSelectedOption({
      value: contractItem?.find((e) => e?.id === item?.contractItemId)?.id,
      label: contractItem?.find((e) => e?.id === item?.contractItemId)?.item,
    });
    setTags(item?.tags);
    setHead(array[index - 1]?.id);
    setInput("add");
  };

  const handleDelete = async () => {
    try {
      setScrollValue(tableRef.current.scrollTop);
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.delete(
        `/MeasurementBook?measurementBookId=${isDelete}`
      );
      if (res.status === 204) {
        if (change === 0) {
          setChange(1);
        } else {
          setChange(0);
        }
        alert.show("data deleted sucessfully", { type: "success" });
      }
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "info" });
      } else if (error.code === "ERR_NETWORK") {
        alert.show(error.message, { type: "error" });
      } else {
        alert.show("Iternal server error", { type: "error" });
      }
    }
    setIsDelete(null);
  };

  const handleClear = () => {
    if (filter.length !== 0) {
      setFilter([]);
    }
    if (filter1.length !== 0) {
      setFilter1([]);
    }
  };

  useEffect(()=>{
    if(ref.current){
      ref.current.scrollIntoView({ block: 'nearest', inline: 'start', behavior:'smooth'});
    }
  },[input])
  
  return (
    <>
      <div className="measure-filter">
        <Filter
          type={"ContractItem"}
          item={contractItem}
          filter={filter1}
          setFilter={setFilter1}
          max={450}
          min={192}
          average={400}
        />
        <MultiFilter
          type={"Tags"}
          item={filterTag}
          filter={filter}
          setFilter={setFilter}
          max={360}
          min={150}
          average={190}
        />
        <span className="clear" onClick={handleClear}>
          Clear all
        </span>
      </div>
      <div className="measure-table" ref={tableRef}>
        <table>
          <tr className="measure-tr">
            <th className="measure-th" style={{ width: "2%" }}></th>
            <th
              className="measure-th"
              style={{ width: "20%", textAlign: "start" }}
            >
              ContractItem
            </th>
            <th
              className="measure-th"
              style={{
                width: "20%",
                textAlign: "start",
                padding: "0 0 0 20px",
              }}
            >
              Description
            </th>
            <th className="measure-th" align="end">
              No.
            </th>
            <th className="measure-th" align="end">
              L
            </th>
            <th className="measure-th" align="end">
              B
            </th>
            <th className="measure-th" align="end">
              H
            </th>
            <th className="measure-th" align="center">
              Total
            </th>
            <th
              className="measure-th"
              style={{ width: "15%", textAlign: "start" }}
            >
              Tags
            </th>
            <th
              className="measure-th"
              style={{ width: "12%", textAlign: "start" }}
            >
              Action
            </th>
          </tr>
          {!load &&
            array?.slice(0, number)?.map((items, index) => (
              <tr className="measure-tr" key={items?.id}>
                <td className="measure-td" style={{ width: "2%" }}>
                  <input type="checkbox" />
                </td>
                <td
                  className="measure-td"
                  style={{
                    width: "20%",
                    textAlign: "start",
                    fontWeight: "600",
                    position:'relative'
                  }}
                >
                  {contractItem?.find(
                      (value) => value?.id === items.contractItemId
                    )?.item?.length >= 70 ? 
                    (contractContentId===items?.id ?
                    <span style={{position:'absolute',backgroundColor:"white",zIndex:'2',top:'10%',width:'95%',wordWrap:'break-word'}} className="shadow">
                      {contractItem?.find((value) => value?.id === items.contractItemId)?.item} 
                      <button onBlur={()=>setContractContentId(null)} onClick={()=>setContractContentId(null)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 5px'}}>less</button>
                    </span> : 
                    <span style={{position:'absolute',backgroundColor:"white",top:'10%',width:'95%',wordWrap:'break-word'}}>
                      {`${contractItem?.find((value) => value?.id === items.contractItemId)?.item?.slice(0,70)}...`}
                       <button onClick={()=>setContractContentId(items?.id)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 0'}}>more</button>
                    </span>) 
                    : contractItem?.find((value) => value?.id === items.contractItemId)?.item} 
                </td>
                <td
                  className="measure-td"
                  style={{
                    width: "20%",
                    textAlign: "start",
                    padding: "0 0 0 20px",
                    position:'relative'
                  }}
                >
                  {items?.description?.length>=70 ? descriptionId===items?.id ? <span style={{position:'absolute',backgroundColor:"white",zIndex:'2',top:'10%',width:'100%',wordWrap:'break-word'}} className="shadow">
                      {items?.description} 
                      <button onBlur={()=>setDescriptionId(null)} onClick={()=>setDescriptionId(null)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 5px'}}>less</button>
                    </span> : <span style={{position:'absolute',backgroundColor:"white",top:'10%',width:'100%',wordWrap:'break-word'}}>
                      {`${items?.description?.slice(0,70)}...`} 
                      <button onClick={()=>setDescriptionId(items?.id)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 5px'}}>more</button>
                    </span>:items?.description} 
                </td>
                <td className="measure-td" align="end">
                  {items?.no.toFixed(2)}
                </td>
                <td className="measure-td" align="end">
                  {items?.l.toFixed(2)}
                </td>
                <td className="measure-td" align="end">
                  {items?.b.toFixed(2)}
                </td>
                <td className="measure-td" align="end">
                  {items?.d_H.toFixed(2)}
                </td>
                <td
                  className="measure-td"
                  align="center"
                  style={{ fontWeight: "600" }}
                >
                  {items?.subtotal.toFixed(3)}
                  <span
                    style={{
                      backgroundColor: "#ccc8c8",
                      margin: "0 2px",
                      padding: "3px 4px",
                      fontWeight: "600",
                      fontSize: "10px",
                    }}
                  >
                    {
                      contractItem?.find((i) => i?.id === items?.contractItemId)
                        ?.unit
                    }
                  </span>
                </td>
                <td
                  className="measure-td"
                  style={{ width: "15%", textAlign: "start" }}
                >
                  <div
                    className="tag-chip-con"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      width: "95%",
                      margin: "auto",
                    }}
                  >
                    {items?.tags
                      .split(",")
                      .filter((item) => item !== "")
                      .map((tag, index) => (
                        <div className="tag-chip" key={index}>
                          {tag}
                        </div>
                      ))}
                  </div>
                </td>
                {isDelete === items?.id ? (
                  <td
                    className="measure-td"
                    style={{ width: "12%", textAlign: "center" }}
                  >
                    <button className="measure-btn" onClick={handleDelete}>
                      <img src={yes} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => {
                        setIsDelete(null);
                      }}
                    >
                      <img src={no} alt="" />
                    </button>
                  </td>
                ) : (
                  <td
                    className="measure-td"
                    style={{ width: "12%", textAlign: "start" }}
                  >
                    <button
                      className="measure-btn"
                      onClick={() => handleAdd(index)}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={add} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => {
                        handleUpdate(items, index);
                      }}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={edit} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => handleCopy(items, index)}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={copy} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => {
                        setIsDelete(items?.id);
                      }}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={deleteicon} alt="" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          {(input === "add" || input === "update") && (
            <tr className="measure-tr" style={{ backgroundColor: "#d5d5d5",height:'110px'}} ref={ref}>
              <td className="measure-td" style={{ width: "2%" }}>
                <input type="checkbox" />
              </td>
              <td
                className="measure-td"
                style={{
                  width: "20%",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                 <Select
                    options={contractItem?.map((i) => ({
                      value: i?.id,
                      label: i?.item,
                    }))}
                    onChange={(e)=>{
                      setSelectedOption(e)
                      setSelectedOption(e);
                      if (input === "update") {
                      updateFormik.setValues({
                        ...updateFormik.values,
                        contractItemId: e?.value,
                      });
                      }else {
                      addFormik.setValues({
                        ...addFormik.values,
                        contractItemId: e?.value,
                      });
                    }
                    }}
                    error={(updateFormik.errors.contractItemId &&
                      updateFormik.touched.contractItemId) ||
                    (addFormik.errors.contractItemId &&
                      addFormik.touched.contractItemId)}
                    value={selectedOption}
                  />
              </td>
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td
                  className="measure-td"
                  style={{ width: "20%", textAlign: "center" }}
                >
                  <textarea
                    style={{
                      borderRadius: "4px",
                      width: "92%",
                      fontFamily: "Roboto",
                      fontSize: "13px",
                      padding: "7px 5px",
                    }}
                    className={`${
                      (updateFormik.errors.description &&
                        updateFormik.touched.description) ||
                      (addFormik.errors.description &&
                        addFormik.touched.description)
                        ? "measure-input warning"
                        : "measure-input"
                    }`}
                    name="description"
                    id=""
                    rows="4"
                    onChange={
                      input === "update"
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={
                      input === "update"
                        ? updateFormik.values.description
                        : addFormik.values.description
                    }
                    onBlur={
                      input === "update"
                        ? updateFormik.handleBlur
                        : addFormik.handleBlur
                    }
                  ></textarea>
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td className="measure-td">
                  <input
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: "4px",
                      textAlign: "end",
                    }}
                    type="number"
                    min={0}
                    name="no"
                    onChange={
                      input === "update"
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={
                      input === "update"
                        ? updateFormik.values.no
                        : addFormik.values.no
                    }
                    onBlur={
                      input === "update"
                        ? updateFormik.handleBlur
                        : addFormik.handleBlur
                    }
                    className={`${
                      (updateFormik.errors.no && updateFormik.touched.no) ||
                      (addFormik.errors.no && addFormik.touched.no)
                        ? "measure-input warning"
                        : "measure-input"
                    }`}
                  />
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td className="measure-td">
                  <input
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: "4px",
                      border: "none",
                      textAlign: "end",
                    }}
                    className="measure-input"
                    type="number"
                    min={0}
                    name="l"
                    disabled={
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 4
                    }
                    onChange={
                      input === "update"
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 4 ? 0 :
                      input === "update"
                        ? updateFormik.values.l
                        : addFormik.values.l
                    }
                  />
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td className="measure-td">
                  <input
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: "4px",
                      border: "none",
                      textAlign: "end",
                    }}
                    className="measure-input"
                    type="number"
                    min={0}
                    name="b"
                    disabled={
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 1 ||
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 4
                    }
                    onChange={
                      input === "update"
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 1 ||
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 4
                        ? 0
                        : input === "update"
                        ? updateFormik.values.b
                        : addFormik.values.b
                    }
                  />
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td className="measure-td">
                  <input
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: "4px",
                      border: "none",
                      textAlign: "end",
                    }}
                    className="measure-input"
                    type="number"
                    min={0}
                    name="d_H"
                    disabled={
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 1 ||
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 2 ||
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 4
                    }
                    onChange={
                      input === "update"
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 1 ||
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 2 ||
                      contractItem?.find(
                        (item) =>
                          item?.id ===
                          (input === "add"
                            ? addFormik.values.contractItemId
                            : updateFormik.values.contractItemId)
                      )?.stdUnitId === 4
                        ? 0
                        : input === "update"
                        ? updateFormik.values.d_H
                        : addFormik.values.d_H
                    }
                  />
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td className="measure-td">
                  <div className="measure-wrapper">
                    <input
                      style={{
                        width: "90%",
                        height: "40px",
                        borderRadius: "4px",
                        border: "none",
                        boxShadow: "none",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                      className="measure-input"
                      type="Number"
                      step="any"
                      min={0}
                      name="subtotal"
                      disabled
                      value={
                        input === "update"
                          ? updateFormik?.values?.subtotal
                          : addFormik?.values?.subtotal
                      }
                    />
                    <span
                      style={{
                        backgroundColor: "#333333",
                        color: "white",
                        margin: "0 5px",
                        padding: "3px 4px",
                        fontWeight: "600",
                        fontSize: "10px",
                      }}
                    >
                      {
                        contractItem?.find(
                          (i) =>
                            i?.id ===
                            (input === "add"
                              ? addFormik.values.contractItemId
                              : updateFormik.values.contractItemId)
                        )?.unit
                      }
                    </span>
                  </div>
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              {(input === "add" && addFormik.values.contractItemId !== "") ||
              input === "update" ? (
                <td
                  className="measure-td"
                  style={{
                    width: "15%",
                    textAlign: "start",
                    position: "relative",
                  }}
                >
                  <div
                    className={`${
                      usedTag ? "measure-tags" : "measure-tags-update"
                    }`}
                    onBlur={() => {
                      !usedTag && setUsedTag(false);
                    }}
                    onFocus={() => {
                      !usedTag && setUsedTag(true);
                    }}
                  >
                    <div
                      className={
                        usedTag ? "measure-tag add-line" : "measure-tag"
                      }
                      onClick={focusInput}
                    >
                      <ul className="tag-ul">
                        {!loading &&
                          tags
                            ?.split(",")
                            ?.filter((item) => item !== "")
                            ?.map((tag, index) => (
                              <li className="tag-li" key={index}>
                                <div>{tag}</div>
                                <div
                                  onClick={() => handleRemove(tag, index)}
                                  style={{
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                >
                                  X
                                </div>
                              </li>
                            ))}
                      </ul>
                      <input
                        type="text"
                        value={chip}
                        onChange={(e) => setChip(e.target.value)}
                        onKeyDown={handleCreateChip}
                        className={`${
                          usedTag ? "inner-input-used" : "inner-input"
                        }`}
                        placeholder="Add tags"
                        ref={inputRef}
                      />
                    </div>
                    {usedTag && (
                      <div className="reusable-tag">
                        <label htmlFor="">Select an Option or create one</label>
                        {usedTag && filterTag.length !== 0 && (
                          <div className="allTags">
                            {filterTag
                              ?.filter((i) =>
                                i?.toUpperCase().includes(chip.toUpperCase())
                              )
                              ?.map((tag, index) => (
                                <div
                                  className="useable-tag"
                                  onClick={() => handleClickAdd(tag)}
                                  key={index}
                                >
                                  {tag}
                                </div>
                              ))}
                          </div>
                        )}
                        <div className="tag-box">
                          Create <span className="show-chip">{chip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              ) : (
                <td className="measure-td"></td>
              )}
              <td
                className="measure-td"
                style={{ width: "12%", textAlign: "center" }}
              >
                <button
                  type="button"
                  className="measure-btn"
                  onClick={
                    input === "update"
                      ? updateFormik.handleSubmit
                      : addFormik.handleSubmit
                  }
                >
                  <img src={yes} alt="" />
                </button>
                <button className="measure-btn" onClick={handleClose}>
                  <img src={no} alt="" />
                </button>
              </td>
            </tr>
          )}
          {!load &&
            array?.slice(number)?.map((items, index) => (
              <tr className="measure-tr" key={items?.id}>
                <td className="measure-td" style={{ width: "2%" }}>
                  <input type="checkbox" />
                </td>
                <td
                  className="measure-td"
                  style={{
                    width: "20%",
                    textAlign: "start",
                    fontWeight: "600",
                    position:'relative'
                  }}
                >
                  {contractItem?.find(
                      (value) => value?.id === items.contractItemId
                    )?.item?.length >= 70 ? 
                    (contractContentId===items?.id ?
                    <span style={{position:'absolute',backgroundColor:"white",zIndex:'2',top:'10%',width:'95%',wordWrap:'break-word'}} className="shadow">
                      {contractItem?.find((value) => value?.id === items.contractItemId)?.item} 
                      <button onBlur={()=>setContractContentId(null)} onClick={()=>setContractContentId(null)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 5px'}}>less</button>
                    </span> : 
                    <span style={{position:'absolute',backgroundColor:"white",top:'10%',width:'95%',wordWrap:'break-word'}}>
                      {`${contractItem?.find((value) => value?.id === items.contractItemId)?.item?.slice(0,70)}...`}
                       <button onClick={()=>setContractContentId(items?.id)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 0'}}>more</button>
                    </span>) 
                    : contractItem?.find((value) => value?.id === items.contractItemId)?.item} 
                </td>
                <td
                  className="measure-td"
                  style={{
                    width: "20%",
                    textAlign: "start",
                    padding: "0 0 0 20px",
                    position:'relative',
                    overflowWrap: 'anywhere'
                  }}
                >
                  {items?.description?.length>=70 ? descriptionId===items?.id ? <span style={{position:'absolute',backgroundColor:"white",zIndex:'2',top:'10%',width:'100%',wordWrap:'break-word'}} className="shadow">
                      {items?.description} 
                      <button onBlur={()=>setDescriptionId(null)} onClick={()=>setDescriptionId(null)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 5px'}}>less</button>
                    </span> : <span style={{position:'absolute',backgroundColor:"white",top:'10%',width:'100%',wordWrap:'break-word'}}>
                      {`${items?.description?.slice(0,70)}...`}  
                      <button onClick={()=>setDescriptionId(items?.id)} style={{backgroundColor:'transparent',border:'none',color:'rgb(38, 38, 143)',cursor:'pointer',padding:'3px 5px'}}>more</button>
                    </span>:items?.description} 
                </td>
                <td className="measure-td" align="end">
                  {items?.no.toFixed(2)}
                </td>
                <td className="measure-td" align="end">
                  {items?.l.toFixed(2)}
                </td>
                <td className="measure-td" align="end">
                  {items?.b.toFixed(2)}
                </td>
                <td className="measure-td" align="end">
                  {items?.d_H.toFixed(2)}
                </td>
                <td
                  className="measure-td"
                  align="center"
                  style={{ fontWeight: "600"}}
                >
                  {items?.subtotal.toFixed(3)}
                  <span
                    style={{
                      backgroundColor: "#ccc8c8",
                      padding: "3px 4px",
                      margin: "0 2px",
                      fontWeight: "600",
                      fontSize: "10px",
                    }}
                  >
                    {
                      contractItem?.find((i) => i?.id === items?.contractItemId)
                        ?.unit
                    }
                  </span>
                </td>
                <td
                  className="measure-td"
                  style={{ width: "15%", textAlign: "start" }}
                >
                  <div
                    className="tag-chip-con"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      width: "95%",
                      margin: "auto",
                    }}
                  >
                    {items?.tags
                      .split(",")
                      .filter((item) => item !== "")
                      .map((tag, index) => (
                        <div className="tag-chip" key={index}>
                          {tag}
                        </div>
                      ))}
                  </div>
                </td>
                {isDelete === items?.id ? (
                  <td
                    className="measure-td"
                    style={{ width: "12%", textAlign: "center" }}
                  >
                    <button className="measure-btn" onClick={handleDelete}>
                      <img src={yes} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => {
                        setIsDelete(null);
                      }}
                    >
                      <img src={no} alt="" />
                    </button>
                  </td>
                ) : (
                  <td
                    className="measure-td"
                    style={{ width: "12%", height: "100%", textAlign: "start" }}
                  >
                    <button
                      className="measure-btn"
                      onClick={() => handleAdd(number + index + 1)}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={add} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => {
                        handleUpdate(items, number + index + 1);
                      }}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={edit} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => handleCopy(items, number + index + 1)}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={copy} alt="" />
                    </button>
                    <button
                      className="measure-btn"
                      onClick={() => {
                        setIsDelete(items?.id);
                      }}
                      disabled={input === "add" || input === "update"}
                    >
                      <img src={deleteicon} alt="" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default Measure;
