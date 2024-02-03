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
import { deleteMeasurementBook } from "../../actions/measurementBook.js";
import { useDispatch } from "react-redux";
import { addcontractItem } from "../../redux/slice/contractItemSlice.js";
import { CHANGE_ALLSTATE } from "../../constants/actionTypes.js";
import toast from "react-hot-toast";
const TableRow = ({
  data,
  setDivideBy,
  setInput,
  contractItems,
  input,
  setChange,
  dispatch
}) => {
  const [isDeleted, setIsDeleted] = useState({ id: "", credential: false });
  const dispatchAction = useDispatch();
  const handleAdd = (e, index) => {
    e.preventDefault();
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
  };

  const handleContractItem = (contractItem) => {
    dispatchAction(
      addcontractItem({
        item: {
          value: contractItem?.id,
          unit: contractItem?.unit,
          label: contractItem?.item,
          stdUnit: contractItem?.stdUnitId,
          exist:true
        },
      })
    );
  };

  const handleState=(item)=>{
    const { contractItemId, ...other } = item;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    handleContractItem(contractItem);
    dispatch({ type: CHANGE_ALLSTATE, payload: other });
  }

  const handleUpdate = (e, index, item) => {
    e.preventDefault();
    setDivideBy(index);
    setInput({ type: "UPDATE", credential: true });
    handleState(item);
  };

  const handleCopy = (e, index, item) => {
    e.preventDefault();
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
    handleState(item);
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setIsDeleted({ id: "", credential: false });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteMeasurementBook(isDeleted.id, () => {
      toast.success("Data Deleted Successfully");
      setChange((prev) => !prev);
      setIsDeleted({ id: "", credential: false });
    });
  };

  return (
    <>
      {data.map((item, index) => (
        <tr className="measurementTableRow" key={index}>
          <td className="measurementTableTd" style={{ fontWeight: 600 }}>
            <Content
              text={
                contractItems?.find((i) => i.id === item?.contractItemId)?.item
              }
              index={index}
              min={65}
            />
          </td>
          <td className="measurementTableTd">
            <Content text={item?.description} index={index} min={65} />
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
            <td className="measurementTableTd" align="center">
              <button
                className="actionType"
                disabled={input.credential}
                onClick={(e) => handleAdd(e, index)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="actionType"
                disabled={input.credential}
                onClick={(e) => handleUpdate(e, index, item)}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                className="actionType"
                disabled={input.credential}
                onClick={(e) => handleCopy(e, index, item)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                className="actionType"
                disabled={input.credential}
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
