import React, { useEffect, useState } from "react";
import "./Measure.css";
import edit from "../../image/edit.svg";
import deleteicon from "../../image/delete.svg";
import add from "../../image/add.svg";
import copy from "../../image/copy-icon.svg";
import { useLocation } from "react-router-dom";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import Tag from "../tagChips/Tag";
import { useFormik } from "formik";
import { measureTable } from "../../scemas";
import Filter from "../filter/Filter.jsx";
import Select from "react-select";
import yes from "../../image/yes.svg"
import no from "../../image/no.svg"
const Measure = () => {
  const location = useLocation().search.split("?");
  const billId = location[1].split("=")[1];
  const projectId = location[2].split("=")[1];
  const [element, setElement] = useState({
    contractItemId:"",
    description: "",
    no: "",
    l: "",
    b: "",
    d_H: "",
  });
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
  const [loadInput, setLoadInput] = useState(false);
  const [filter, setFilter] = useState([]);
  const [filterTag, setFiltertag] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDelete,setIsDelete]=useState(null);
  const alert = useAlert();
  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.post("/MeasurementBook/GetByBillId", {
        billId: billId,
        page: 1,
        pageSize: 100,
        filter: filter,
      });
      if (res.data.items.length === 0 && filter.length === 0) {
        setInput(true);
      }
      setArray(res.data.items);
      setLoad(false);
    };
    getData();
  }, [filter, change, billId]);

  useEffect(() => {
    const getTag = async () => {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get(
        `/MeasurementBook/GetTagsByProjectId?projectId=${projectId}`
      );
      setFiltertag(res.data);
    };
    getTag();
  }, [change, projectId]);

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

  const addFormik = useFormik({
    initialValues: element,
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
              l: parseFloat(value?.l) || 0,
              b: parseFloat(value?.b) || 0,
              d_H: parseFloat(value?.d_H) || 0,
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
            addFormik.resetForm();
            setInput(false);
            setElement(null);
            setSelectedOption(null);
            setTags("");
            setNumber(-1);
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
    initialValues: element,
    validationSchema: measureTable,
    onSubmit: (value) => {
      const handleUpdate = async () => {
        try {
          const makeRequest = makeRequesInstance(localStorage.getItem("token"));
          const res = await makeRequest.put("/MeasurementBook", {
            id: value?.id,
            description: value?.description,
            no: parseFloat(value?.no),
            l: parseFloat(value?.l),
            b: parseFloat(value?.b),
            d_H: parseFloat(value?.d_H),
            subtotal: parseFloat(value?.subtotal),
            remark: "string",
            contractItemId: value.contractItemId,
            tags: tags,
            billId: billId,
          });
          if (res.status === 204) {
            alert.show("Data Updated Sucessfully", { type: "success" });
            updateFormik.resetForm();
            setUpdate(false);
            setElement(null);
            setSelectedOption(null);
            setTags("");
            setNumber(-1);
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

  useEffect(() => {
    setLoadInput(true);
    const unit = contractItem?.filter((i) => i?.id === (update?updateFormik.values.contractItemId:addFormik.values.contractItemId))[0]
      ?.stdUnitId;
    if (unit === 1) {
      setL(true);
      setB(false);
      setH(false);
    } else if (unit === 2) {
      setL(true);
      setB(true);
      setH(false);
    } else if (unit === 3) {
      setL(true);
      setB(true);
      setH(true);
    } else {
      setL(false);
      setB(false);
      setH(false);
    }
    setLoadInput(false);
  }, [addFormik.values.contractItemId,updateFormik.values.contractItemId,update,contractItem]);

  const handleInput = (i, id) => {
    setInput(true);
    setNumber(i);
    setHead(id);
    if (array.length > i + 1) {
      setTail(array[i + 1]?.id);
    } else if (array.length === i + 1) {
      setTail("00000000-0000-0000-0000-000000000000");
    }
  };

  const handleUpdate = (i, item) => {
    setLoad(true);
    setElement(item);
    setUpdate(true);
    setSelectedOption({value:contractItem?.filter((e)=>(e?.id!==item?.id))[0]?.id,label:contractItem?.filter((e)=>(e?.id!==item?.id))[0]?.item})
    setTags(item?.tags);
    array.splice(i, 1);
    setNumber(i - 1);
    setLoad(false);
  };

  const handleCopy = (index, item) => {
    setElement(item);
    addFormik.setValues(item);
    setNumber(index);
    setSelectedOption({value:contractItem?.filter((e)=>(e?.id!==item?.id))[0]?.id,label:contractItem?.filter((e)=>(e?.id!==item?.id))[0]?.item})
    setTags(item?.tags);
    setHead(item?.id);
    if (array[index + 1]?.id) {
      setTail(array[index + 1]?.id);
    } else {
      setTail("00000000-0000-0000-0000-000000000000");
    }
    setInput(true);
  };

  const handleClear = () => {
    if (filter.length !== 0) {
      setFilter([]);
    }
  };
  const handleSelect=(e)=>{
    setSelectedOption(e);
    if(update){
      updateFormik.setValues({...updateFormik.values,contractItemId:e?.value})
    }
    else{
      addFormik.setValues({...addFormik.values,contractItemId:e?.value})
    }
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0
      },
      height: '100%',
    }),
  };

  const handleDelete=async()=>{
    try {
      const makeRequest=makeRequesInstance(localStorage.getItem('token'))
      const res=await makeRequest.delete(`/MeasurementBook?measurementBookId=${isDelete}`);
      if(res.status===204){
        if(change===0){
          setChange(1);
        }
        else{
          setChange(0);
        }
        alert.show('data deleted sucessfully',{type:'success'})
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
  }
  return (
    <>
      <div className="measure-filter">
        <Filter
          type={"ContractItem"}
          item={contractItem}
          filter={filter}
          setFilter={setFilter}
          filterColumn={1}
          max={360}
          min={192}
          average={240}
        />
        <Filter
          type={"Tags"}
          item={filterTag}
          filter={filter}
          setFilter={setFilter}
          filterColumn={2}
          max={360}
          min={150}
          average={190}
        />
        <span className="clear" onClick={handleClear}>
          Clear all
        </span>
      </div>
      <div className="measure-table-container">
        <table>
          <tr className="measure-tr">
            <th className="measure-th" colSpan={2}>
              Contract Item *
            </th>
            <th className="measure-th" colSpan={2}>
              Description *
            </th>
            <th className="measure-th">No *</th>
            <th className="measure-th">L</th>
            <th className="measure-th">B</th>
            <th className="measure-th">D/H</th>
            <th className="measure-th">Subtotal</th>
            <th className="measure-th" colSpan={2}>
              Tags
            </th>
            <th className="measure-th" colSpan={3 / 2}>
              Action
            </th>
          </tr>
          {!load &&
            array?.slice(0, number + 1)?.map((item, index) => (
              <tr className="measure-tr" key={item?.id}>
                <td className="measure-td" colSpan={2}>
                  {contractItem
                    ?.filter((i) => i?.id === item?.contractItemId)
                    ?.map((e) => (
                      <span>{e?.item}</span>
                    ))}
                </td>
                <td className="measure-td" colSpan={2}>
                  <span
                    style={
                      content && clickIndex === index
                        ? { overflow: "inherit", height: "ft-content" }
                        : {}
                    }
                  >
                    <ul className="measure-ul">
                      <li>
                        {content && clickIndex === index
                          ? item?.description
                          : item?.description.slice(0, 50)}
                        {item?.description?.length >= 50 && (
                          <p
                            style={{
                              display: "inline-block",
                              margin: "0 10px",
                              borderBottom: "1px solid #b974b9",
                              color: "#b974b9",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              content && clickIndex === index
                                ? setContent(false)
                                : setContent(true);
                              setClickIndex(index);
                            }}
                          >
                            {content && clickIndex === index
                              ? "Read less"
                              : "Read more"}
                          </p>
                        )}
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
                <td className="measure-td" colSpan={2}>
                  <Tag table={true} tags={item?.tags} setTags={setTags} />
                </td>
                {isDelete===item?.id?<td className="measure-td" style={{}} colSpan={3 / 2}>
                  <button className="measure-yes" onClick={handleDelete}><img src={yes} alt="" /></button>
                  <button className="measure-no" onClick={()=>{setIsDelete(null)}}><img src={no} alt="" /></button>
                </td>:<td className="measure-td" colSpan={3 / 2}>
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
                    onClick={() => {
                      handleUpdate(index, item);
                      updateFormik.setValues(item);
                    }}
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
                    // onClick={() => handleDelete(item?.id)}
                    disabled={input || update}
                  >
                    <img src={deleteicon} alt="" className="svg" />
                  </button>
                </td>}
              </tr>
            ))}
          {!load && (input || update) && (
            <tr>
              <td
                className="measure-td"
                style={{ position: "relative" }}
                colSpan={2}
              >
                <Select
                  name="contractItemId"
                  className={`${
                    (updateFormik.errors.contractItemId && updateFormik.touched.contractItemId) ||
                    (addFormik.errors.contractItemId && addFormik.touched.contractItemId)
                      ? "measure-select warning"
                      : "measure-select purple-border"
                  }`}
                  value={selectedOption}
                  onChange={handleSelect}
                  styles={customStyles}
                  onBlur={
                    update ? updateFormik.handleBlur : addFormik.handleBlur
                  }
                  options={contractItem?.map((i) => ({
                    value: i?.id,
                    label: i?.item,
                  }))}
                  isSearchable={true}
                  placeholder="Search for a contractItem..."
                />
              </td>
              <td className="measure-td" colSpan={2}>
                <input
                  type="text"
                  name="description"
                  className={`${
                    (updateFormik.errors.description &&
                      updateFormik.touched.description) ||
                    (addFormik.errors.description &&
                      addFormik.touched.description)
                      ? "measure-input warning"
                      : "measure-input purple-border"
                  }`}
                  onChange={
                    update ? updateFormik.handleChange : addFormik.handleChange
                  }
                  value={
                    update
                      ? updateFormik.values.description
                      : addFormik.values.description
                  }
                  onBlur={
                    update ? updateFormik.handleBlur : addFormik.handleBlur
                  }
                />
              </td>
              <td className="measure-td">
                <input
                  type="number"
                  name="no"
                  min={0}
                  onChange={
                    update ? updateFormik.handleChange : addFormik.handleChange
                  }
                  value={update ? updateFormik.values.no : addFormik.values.no}
                  onBlur={
                    update ? updateFormik.handleBlur : addFormik.handleBlur
                  }
                  className={`${
                    (updateFormik.errors.no && updateFormik.touched.no) ||
                    (addFormik.errors.no && addFormik.touched.no)
                      ? "measure-input warning"
                      : "measure-input purple-border"
                  }`}
                />
              </td>
              <td className="measure-td">
                {!loadInput && (
                  <input
                    type="number"
                    step="any"
                    min={0}
                    name="l"
                    onChange={
                      update
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={update ? updateFormik.values.l : addFormik.values.l}
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
                    step="any"
                    min={0}
                    onChange={
                      update
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={update ? updateFormik.values.b : addFormik.values.b}
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
                    step="any"
                    min={0}
                    onChange={
                      update
                        ? updateFormik.handleChange
                        : addFormik.handleChange
                    }
                    value={
                      update ? updateFormik.values.d_H : addFormik.values.d_H
                    }
                    className="measure-input purple-border"
                    disabled={!h}
                  />
                )}
              </td>
              <td className="measure-td">
                <input
                  type="number"
                  step="any"
                  min={0}
                  name="subtotal"
                  disabled
                  value={element?.subtotal ? element.subtotal : 0}
                  className="measure-input purple-border"
                />
              </td>
              <td className="measure-td" colSpan={2}>
                <Tag table={false} tags={tags} setTags={setTags} />
              </td>
              <td className="measure-td" colSpan={3 / 2}>
                {update ? (
                  <input
                    type="button"
                    value="Update"
                    className="btn"
                    onClick={updateFormik.handleSubmit}
                  />
                ) : (
                  <input
                    type="button"
                    value="Add"
                    className="btn"
                    onClick={addFormik.handleSubmit}
                  />
                )}
                {!(array.length === 0) && (
                  <button
                    className="btn-cancle"
                    onClick={() => {
                      setInput(false);
                      setTags("");
                      setNumber(-1);
                      setElement(null);
                      setSelectedOption(null);
                      setL(false);
                      setB(false);
                      setH(false);
                      addFormik.resetForm();
                      if (update) {
                        updateFormik.resetForm();
                        setUpdate(false);
                        if (change === 1) {
                          setChange(0);
                        } else {
                          setChange(1);
                        }
                      }
                    }}
                  >
                    close
                  </button>
                )}
              </td>
            </tr>
          )}
          {!load &&
            array?.slice(number + 1)?.map((item, index) => (
              <tr className="measure-tr" key={item?.id}>
                <td className="measure-td" colSpan={2}>
                  {contractItem
                    ?.filter((i) => i?.id === item?.contractItemId)
                    ?.map((e) => (
                      <span>{e?.item}</span>
                    ))}
                </td>
                <td className="measure-td" colSpan={2}>
                  <span
                    style={
                      content && clickIndex === index
                        ? { overflow: "inherit", height: "fit-content" }
                        : {}
                    }
                  >
                    <ul className="measure-ul">
                      <li>
                        {content && clickIndex === index
                          ? item?.description
                          : item?.description.slice(0, 50)}
                        {item?.description?.length >= 50 && (
                          <p
                            style={{
                              display: "inline-block",
                              margin: "0 10px",
                              borderBottom: "1px solid #b974b9",
                              color: "#b974b9",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              content ? setContent(false) : setContent(true);
                              setClickIndex(index);
                            }}
                          >
                            {content && clickIndex === index
                              ? "Read less"
                              : "Read more"}
                          </p>
                        )}
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
                <td className="measure-td" colSpan={2}>
                  <Tag table={true} tags={item?.tags} setTags={setTags} />
                </td>
                {isDelete===item?.id?<td className="measure-td" style={{}} colSpan={3 / 2}>
                  <button className="measure-yes" onClick={handleDelete}><img src={yes} alt="" /></button>
                  <button className="measure-no" onClick={()=>{setIsDelete(null)}}><img src={no} alt="" /></button>
                </td>:<td className="measure-td" colSpan={3 / 2}>
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
                    className="measure-img-btn"
                    onClick={() =>
                      handleCopy(
                        array?.slice(0, number + 1).length + index,
                        item
                      )
                    }
                    disabled={input || update}
                  >
                    <img src={copy} alt="" className="svg" />
                  </button>
                  <button
                    className="measure-img-btn"
                    onClick={() =>{setIsDelete(item?.id)}}
                    disabled={input || update}
                  >
                    <img src={deleteicon} alt="" className="svg" />
                  </button>
                </td>}
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default Measure;
