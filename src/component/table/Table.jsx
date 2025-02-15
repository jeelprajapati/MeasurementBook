import React, { useEffect, useState } from "react";
import "./Table.css";
import add from "../../image/add.svg";
import edit from "../../image/edit.svg";
import deleteicon from "../../image/delete.svg";
import copy from "../../image/copy-icon.svg";
import useFetch from "../../hooks/useFetch";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { contractTable } from "../../scemas";
const Table = ({ Id, change, setChange }) => {
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
  const [unit, setUnit] = useState(null);
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const [tail, setTail] = useState("00000000-0000-0000-0000-000000000000");
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();
  const { loding, data } = useFetch({
    url: `/ContractItem/GetByProjectId?projectId=${Id}&page=${1}&pageSize=${100}`,
    change,
  });
  useEffect(() => {
    setLoad(loding);
    setArray(data?.items);
  }, [loding, data]);

  useEffect(() => {
    const getUnit = async () => {
      setLoad(true);
      const res = await makeRequest.get("/Standard/GetStandardUnit");
      setUnit(res.data);
      setLoad(false);
    };
    getUnit();
  }, []);

  const handleFirstElement = () => {
    setInput(true);
    setNumber(-1);
    setHead("00000000-0000-0000-0000-000000000000");
    if (array) {
      setTail(array[0]?.id);
    } else {
      setTail("00000000-0000-0000-0000-000000000000");
    }
  };

  // set index using index we can divide array into two part & set head and tail;
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

  // update element
  const handleUpdate = (i, item) => {
    setLoad(true);
    setUpdate(true);
    array.splice(i, 1);
    setNumber(i - 1);
    setElement(item);
    setLoad(false);
  };

  // delete element
  const handleDelete = async (i, id) => {
    try {
      const res = await makeRequest.delete(
        `/ContractItem?contractItemId=${id}`
      );
      if (res.status === 204) {
        alert.show("Deleted Sucessfully", { type: "success" });
        if (change === 0) {
          setChange(1);
        } else {
          setChange(0);
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

  const handleCopy = (index, item) => {
    setLoad(true);
    setHead(item?.id);
    setTail(array[index + 1]?.id);
    setNumber(index);
    setElement(item);
    setInput(true);
    setLoad(false);
  };

  const addFormik = useFormik({
    initialValues: element,
    validationSchema: contractTable,
    onSubmit: (value, action) => {
      const handleAdd = async () => {
        try {
          const responce = await makeRequest.post("/ContractItem", {
            contractItemDTO: {
              id: "00000000-0000-0000-0000-000000000000",
              sorNo: parseInt(value?.sorNo||0),
              item: value?.item,
              hsn: parseInt(value?.hsn||0),
              poQty: parseInt(value?.poQty),
              stdUnitId: parseInt(value?.stdUnitId),
              unit: value?.unit,
              rate: parseInt(value?.rate||0),
              projectId: Id,
            },
            head: head,
            tail: tail,
          });
          if (responce.status === 204) {
            alert.show("Added Sucessful", { type: "success" });
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
            alert.show(error.response.data.title, { type: "info" });
          } else if (error.code === "ERR_NETWORK") {
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
    validationSchema: contractTable,
    onSubmit: (value, action) => {
      const handleUpdate = async () => {
        try {
          const responce = await makeRequest.put("/ContractItem", {
            id: value?.id,
            sorNo: parseInt(value?.sorNo||0),
            item: value?.item,
            hsn: parseInt(value?.hsn||0),
            poQty: parseInt(value?.poQty),
            stdUnitId: parseInt(value?.stdUnitId),
            unit: value?.unit,
            rate: parseInt(value?.rate||0),
            projectId: value?.projectId,
          });
          if (responce.status === 204) {
            alert.show("Update Sucessful", { type: "success" });
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
  return (
    <div className="table">
      <table className="tb">
        <tr className="tr">
          <th className="th">Item Code</th>
          <th className="th">Description *</th>
          <th className="th">Work Order Quantity *</th>
          <th className="th">Measure Type *</th>
          <th className="th">UOM *</th>
          <th className="th">Rate</th>
          <th className="th">HSN</th>
          <th className="th">
            <img
              src={add}
              onClick={handleFirstElement}
              className="svg"
              alt=""
            />
          </th>
        </tr>
        {!load &&
          array?.slice(0, number + 1)?.map((item, index) => (
            <tr className="tr" key={index}>
              <td className="td">
                <span>{item?.sorNo}</span>
              </td>
              <td className="td">
                <span>{item?.item}</span>
              </td>
              <td className="td">
                <span>{item?.poQty.toFixed(2)}</span>
              </td>
              <td className="td">
                <span>
                  {unit?.filter((i) => i?.id === item?.stdUnitId)[0]?.name}
                </span>
              </td>
              <td className="td">
                <span>{item?.unit}</span>
              </td>
              <td className="td">
                <span>{item?.rate.toFixed(2)}</span>
              </td>
              <td className="td">
                <span>{item?.hsn}</span>
              </td>
              <td className="td">
                <button
                  className="btn-disabled"
                  onClick={() => handleInput(index, item?.id)}
                  disabled={input || update}
                >
                  <img src={add} className="svg" alt="" />
                </button>
                <button
                  className="btn-disabled"
                  onClick={() => {handleUpdate(index, item);updateFormik.setValues(item);}}
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
                  onClick={() => handleDelete(index, item?.id)}
                  disabled={input || update}
                >
                  <img src={deleteicon} alt="" className="svg" />
                </button>
              </td>
            </tr>
          ))}

        {/* input form row */}
        {(input || update) && (
          <tr className="tr">
            <td className="td">
              <input
                type="number"
                name="sorNo"
                className={`${
                  ((updateFormik.errors.sorNo && updateFormik.touched.sorNo) ||
                    (addFormik.errors.sorNo && addFormik.touched.sorNo)) ?
                  "warning":"purple-border"
                }`}
                value={
                  update ? updateFormik.values.sorNo : addFormik.values.sorNo
                }
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td">
              <input
                type="text"
                name="item"
                className={`${
                  ((updateFormik.errors.item && updateFormik.touched.item) ||
                    (addFormik.errors.item && addFormik.touched.item)) ?
                  "warning":"purple-border"
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
            <td className="td">
              <input
                type="number"
                step="any"
                min={0}
                name="poQty"
                className={`${
                  ((updateFormik.errors.poQty && updateFormik.touched.poQty) ||
                    (addFormik.errors.poQty && addFormik.touched.poQty)) ?
                  "warning":"purple-border"
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
            <td className="td">
              <select
                name="stdUnitId"
                className={`${
                  ((updateFormik.errors.stdUnitId &&
                    updateFormik.touched.stdUnitId) ||
                    (addFormik.errors.stdUnitId &&
                      addFormik.touched.stdUnitId)) ?
                  "warning":"purple-border"
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
            <td className="td">
              <input
                type="text"
                name="unit"
                className={`${
                  ((updateFormik.errors.unit && updateFormik.touched.unit) ||
                    (addFormik.errors.unit && addFormik.touched.unit)) ?
                  "warning":"purple-border"
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
            <td className="td">
              <input
                type="number"
                step="any"
                min={0}
                name="rate"
                className={`${
                  ((updateFormik.errors.rate && updateFormik.touched.rate) ||
                    (addFormik.errors.rate && addFormik.touched.rate)) ?
                  "warning":"purple-border"
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
                  ((updateFormik.errors.hsn && updateFormik.touched.hsn) ||
                    (addFormik.errors.hsn && addFormik.touched.hsn)) ?
                  "warning":"purple-border"
                }`}
                value={update ? updateFormik.values.hsn : addFormik.values.hsn}
                onChange={
                  update ? updateFormik.handleChange : addFormik.handleChange
                }
                onBlur={update ? updateFormik.handleBlur : addFormik.handleBlur}
              />
            </td>
            <td className="td">
              {update ? (
                <button className="btn" onClick={updateFormik.handleSubmit}>
                  Update
                </button>
              ) : (
                <button className="btn" onClick={addFormik.handleSubmit}>
                  Submit
                </button>
              )}
              <button
                className="btn"
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
                    updateFormik.resetForm()
                    if (change === 1) {
                      setChange(0);
                    } else {
                      setChange(1);
                    }
                    setUpdate(false);
                  }
                }}
              >
                close
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
              <td className="td">
                <span>{item?.item}</span>
              </td>
              <td className="td">
                <span>{item?.poQty.toFixed(2)}</span>
              </td>
              <td className="td">
                <span>
                  {unit?.filter((i) => i?.id === item?.stdUnitId)[0]?.name}
                </span>
              </td>
              <td className="td">
                <span>{item?.unit}</span>
              </td>
              <td className="td">
                <span>{item?.rate.toFixed(2)}</span>
              </td>
              <td className="td">
                <span>{item?.hsn}</span>
              </td>
              <td className="td">
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
                  onClick={() => handleDelete(index, item?.id)}
                  disabled={input || update}
                >
                  <img src={deleteicon} alt="" className="svg" />
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Table;
