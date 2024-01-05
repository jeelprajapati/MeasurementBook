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
import makeRequesInstance from "../../utils/makeRequest";
import { useAlert } from "react-alert";

const TableRow = ({
  data,
  allShape,
  contractItems,
  setDivideBy,
  setInput,
  dispatch,
  setHead,
  setChange,
  change,
  setContractItemValues
}) => {
  const [isDeleted, setIsDeleted] = useState({ id: "", credential: false });
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const alert = useAlert();

  const handleContrcctItemValues=(contractItem)=>{
    setContractItemValues({
      value:contractItem?.id,
      unit: contractItem?.unit,
      label: contractItem?.item,
      stdUnit: contractItem?.stdUnitId,
      exist: true
    })
  }

  const handleAdd = (e, index, id) => {
    e.preventDefault();
    setDivideBy(index + 1);
    setHead(id);
    setInput({ type: "ADD", credential: true });
  };

  const handleUpdate = (e, index, item) => {
    e.preventDefault();
    const { contractItemId, structShapeId, billId, ...other } = item;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    const shape = allShape.find((i) => i?.id === structShapeId);
    handleContrcctItemValues(contractItem);
    dispatch({
      type: "HANDLE_STATE",
      payload: { ...other, shape, structShapeId },
    });
    setDivideBy(index);
    setInput({ type: "UPDATE", credential: true });
  };

  const handleCopy = (e, index, item) => {
    e.preventDefault();
    const { contractItemId, structShapeId, billId, ...other } = item;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    const shape = allShape.find((i) => i?.id === structShapeId);
    handleContrcctItemValues(contractItem);
    dispatch({
      type: "HANDLE_STATE",
      payload: { ...other, shape, structShapeId },
    });
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
    setHead(item?.id);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await makeRequest.delete(
        `StructMeasurementBook/${isDeleted?.id}`
      );
      if (res.status === 200) {
        alert.show("Data Deleted Sucessfully", { type: "success" });
        setIsDeleted({ id: "", credential: false });
        setChange(!change);
      }
    } catch (error) {
      alert.show("something went wrong!", { type: "info" });
    }
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
            <td className="ssTableTd" align="start">
              <button
                className="addAction actions"
                onClick={(e) => handleAdd(e, index, item?.id)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="updateAction actions"
                onClick={(e) => handleUpdate(e, index, item)}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                className="copyAction actions"
                onClick={(e) => handleCopy(e, index, item)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                className="deleteAction actions"
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
