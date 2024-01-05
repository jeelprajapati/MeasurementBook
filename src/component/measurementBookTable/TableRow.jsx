import React, { useState } from "react";
import "./style.css";
import Content from "../content/Content.jsx";
import {
  faCheck,
  faCopy,
  faPencil,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "react-alert";
import makeRequesInstance from "../../utils/makeRequest.js";
const TableRow = ({
  data,
  setDivideBy,
  setInput,
  contractItems,
  input,
  dispatch,
  setHead,
  handleScrollValue,
  setChange,
  change,
  setContractItemValues
}) => {
  const [isDeleted, setIsDeleted] = useState({ id: "", credential: false });
  const alert = useAlert();
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const handleAdd = (e, index, id) => {
    e.preventDefault();
    setHead(id);
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
  };

  const handleContrcctItemValues=(contractItem)=>{
    setContractItemValues({
      value:contractItem?.id,
      unit: contractItem?.unit,
      label: contractItem?.item,
      stdUnit: contractItem?.stdUnitId,
      exist: true
    })
  }

  const handleUpdate = (e, index, item) => {
    e.preventDefault();
    setDivideBy(index);
    setInput({ type: "UPDATE", credential: true });
    const { contractItemId, ...other } = item;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    handleContrcctItemValues(contractItem);
    dispatch({ type: "HANDLE_STATE", payload: { ...other, stdUnitId:contractItem?.stdUnitId } });
  };

  const handleCopy = (e, index, item) => {
    e.preventDefault();
    setHead(item?.id);
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
    const { contractItemId, ...other } = item;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    handleContrcctItemValues(contractItem);
    dispatch({ type: "HANDLE_STATE", payload: { ...other, stdUnitId:contractItem?.stdUnitId } });
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setIsDeleted({ id: "", credential: false });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    handleScrollValue();
    try {
      const res = await makeRequest.delete(
        `MeasurementBook?measurementBookId=${isDeleted?.id}`
      );
      if(res.status===204){
        alert.show("Data Deleted Sucessfully", { type: "success" });
        setChange(!change);
        setIsDeleted({id:"",credential:false});
      }
    } catch (error) {
      alert.show("somthing went Wrong!", { type: "info" });
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <tr className="measurementTableRow" key={index}>
          <td className="measurementTableTd" style={{fontWeight:600}}>
            <Content
              text={
                contractItems?.find((i) => i.id === item?.contractItemId)?.item
              }
              index={index}
              min={65}
            />
          </td>
          <td className="measurementTableTd">
            <Content text={item?.description} index={index} min={65}/>
          </td>
          <td className="measurementTableTd" align="end">
            {item?.no}
          </td>
          <td className="measurementTableTd" align="end">
            {item?.l?.toFixed(2)}
          </td>
          <td className="measurementTableTd" align="end">
            {item?.b?.toFixed(2)}
          </td>
          <td className="measurementTableTd" align="end">
            {item?.d_H?.toFixed(2)}
          </td>
          <td className="measurementTableTd" align="end">
            {item?.subtotal?.toFixed(3)}
            <span className="measurementtotal">
              {contractItems?.find((i) => i.id === item?.contractItemId)?.unit}
            </span>
          </td>
          <td className="measurementTableTd measurementWrapper">
            {item?.tags
              ?.split(",")
              ?.filter((i) => i !== "")
              .map((tag) => (
                <span key={tag} className="measurementTag">
                  {tag}
                </span>
              ))}
          </td>
            {isDeleted?.credential && item?.id === isDeleted?.id ? (
              <td className="measurementTableTd" align="center">
                <button className="actionType" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="actionType" onClick={handleCancle}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </td>
            ) : (
              <td className="measurementTableTd">
                <button
                  className="actionType"
                  disabled={input?.credential}
                  onClick={(e) => handleAdd(e, index, item?.id)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  className="actionType"
                  disabled={input?.credential}
                  onClick={(e) => handleUpdate(e, index, item)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  className="actionType"
                  disabled={input?.credential}
                  onClick={(e) => handleCopy(e, index, item)}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
                <button
                  className="actionType"
                  disabled={input?.credential}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDeleted({ id: item?.id, credential: true });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                </td>
            )}
        </tr>
      ))}
    </>
  );
};

export default TableRow;
