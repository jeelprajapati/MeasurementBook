import {
  faCheck,
  faCopy,
  faPencil,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Content from "../content/Content";
import { deleteStructMeasurementBook } from "../../actions/structMeasurementBook";
import { addcontractItem } from "../../redux/slice/contractItemSlice";
import { useDispatch } from "react-redux";
import { CHANGE_ALLSTATE } from "../../constants/actionTypes";
import toast from "react-hot-toast";

const TableRow = ({
  data,
  allShape,
  contractItems,
  setDivideBy,
  setInput,
  dispatch,
  setChange,
  input
}) => {
  const [isDeleted, setIsDeleted] = useState({ id: "", credential: false });
  const dispatchAction=useDispatch();

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
    const { contractItemId, structShapeId, billId, ...other } = item;
    const shape = allShape.find((i) => i?.id === structShapeId)?.subSection;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    handleContractItem(contractItem);
    dispatch({ type: CHANGE_ALLSTATE, payload: {...other,shape,structShapeId} });
  }

  const handleAdd = (e, index, id) => {
    e.preventDefault();
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
  };


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

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteStructMeasurementBook(isDeleted.id,()=>{
      toast.success("Data Deleted Successfully");
      setIsDeleted({ id: "", credential: false });
      setChange((prev)=>!prev);
    })
  };

  return (
    <>
      {data?.map((item, index) => (
        <tr key={item.id} className="ssTableTr">
          <td className="ssTableTd" align="start" style={{ fontWeight: 600 }}>
            <Content
              text={
                contractItems?.find((i) => i?.id === item.contractItemId)?.item
              }
              index={index}
              min={85}
            />
          </td>
          <td className="ssTableTd" align="start">
            <Content text={item?.description} index={index} min={85} />
          </td>
          <td className="ssTableTd" align="start">
            {allShape?.find((i) => i.id === item?.structShapeId)?.subSection}
          </td>
          <td className="ssTableTd" align="start">
            {allShape?.find((i) => i.id === item?.structShapeId)?.size}
          </td>
          <td className="ssTableTd" align="end">
            {item.no}
          </td>
          <td className="ssTableTd" align="end">
            {item.l1 ? item.l1.toFixed(2) : 0.0}
          </td>
          <td className="ssTableTd" align="end">
            {item.l2 ? item.l2.toFixed(2) : "0.00"}
          </td>
          <td className="ssTableTd" align="end">
            {allShape
              ?.find((i) => i.id === item?.structShapeId)
              ?.unitWeight.toFixed(2)}
          </td>
          <td className="ssTableTd" align="end">
            {item.subtotal?.toFixed(2)}
            <span
              style={{
                backgroundColor: "black",
                padding: "2px 3px",
                color: "#fdfdfd",
                fontSize: "10px",
                margin: "0 2px",
              }}
            >
              {contractItems?.find((i) => i?.id === item.contractItemId)?.unit}
            </span>
          </td>
          <td className="ssTableTd">
            <div className="ssTableWrapper">
              {item.tags
                .split(",")
                ?.filter((i) => i !== "")
                .map((tag) => (
                  <span className="tagName">{tag}</span>
                ))}
            </div>
          </td>
          {isDeleted?.credential && item?.id===isDeleted?.id ? (
            <td className="ssTableTd" align="center">
              <button className="actionType" onClick={handleDelete} >
                <FontAwesomeIcon icon={faCheck}/>
              </button>
              <button
                className="actionType"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleted({ id: "", credential: false });
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </td>
          ) : (
            <td className="ssTableTd" align="center">
              <button
                className="addAction actions"
                onClick={(e) => handleAdd(e, index, item?.id)}
                disabled={input.credential}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="updateAction actions"
                onClick={(e) => handleUpdate(e, index, item)}
                disabled={input.credential}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                className="copyAction actions"
                onClick={(e) => handleCopy(e, index, item)}
                disabled={input.credential}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                className="deleteAction actions"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleted({ id: item?.id, credential: true });
                }}
                disabled={input.credential}
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
