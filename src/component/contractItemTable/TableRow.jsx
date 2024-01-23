import React, { useState } from "react";
import {
  faCheck,
  faCopy,
  faPencil,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import makeRequesInstance from "../../utils/makeRequest";
import { useAlert } from "react-alert";
import Content from "../content/Content";

const TableRow = ({
  items,
  unit,
  setInputType,
  setDivideBy,
  inputType,
  dispatch,
  setChange,
  change,
  handleScrollValue
}) => {
  const [isDelete, setIsDelete] = useState({id:"",credential:false});
  const alert=useAlert();
  const handleAdd = (e, index) => {
    e.preventDefault();
    setDivideBy(index + 1);
    setInputType({ type: "ADD", credential: true });
  };

  const handleUpdate = (e, index, item) => {
    e.preventDefault();
    setDivideBy(index);
    const { projectId, ...other } = item;
    dispatch({ type: "HANDLE_STATE", payload: other });
    setInputType({ type: "UPDATE", credential: true });
  };

  const handleCopy=(e, index, item)=>{
    e.preventDefault();
    setDivideBy(index+1);
    const { projectId, ...other } = item;
    dispatch({ type: "HANDLE_STATE", payload: other });
    setInputType({ type: "ADD", credential: true });
  }

  const handleDelete=async(e)=>{
    e.preventDefault();
    handleScrollValue();
    try {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.delete(
        `/ContractItem?contractItemId=${isDelete?.id}`
      );
      if (res.status === 204) {
        alert.show("Data Deleted Sucessfully", { type: "success" });
        setChange(!change);
        setIsDelete({id:"",credential:false});
      }
    } catch (error) {
      alert.show("something went wrong", { type: "info" });
    }
  }

  return (
    <>
      {items?.map((item, index) => (
        <tr className="tr" key={item?.id}>
          <td className="td" style={{ textAlign: "start" }}>
            {item?.sorNo}
          </td>
          <td className="td" style={{ textAlign: "start" }}>
          <Content text={item?.item} index={index} min={60}/>
          </td>
          <td className="td" style={{ textAlign: "start" }}>
            {item?.poQty?.toFixed(2)}
          </td>
          <td className="td">
            {unit?.filter((i) => i?.id === item?.stdUnitId)[0]?.name}
          </td>
          <td className="td" style={{ textAlign: "center" }}>
            {item?.unit}
          </td>
          <td className="td" style={{ textAlign: "end" }}>
            {item?.rate?.toFixed(2)}
          </td>
          <td className="td" style={{ textAlign: "end" }}>
            {item?.hsn?.toFixed(2)}
          </td>
          {isDelete?.id === item?.id && isDelete?.credential ? (
            <td className="td" style={{ textAlign: "center" }}>
              <button className="contractButton" onClick={handleDelete}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="contractButton">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </td>
          ) : (
            <td className="td" style={{ textAlign: "center" }}>
              <button
                className="contractButton"
                disabled={inputType.credential}
                onClick={(e) => handleAdd(e, index)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="contractButton"
                disabled={inputType.credential}
                onClick={(e) => handleUpdate(e, index, item)}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                className="contractButton"
                disabled={inputType.credential}
                onClick={(e) => handleCopy(e, index, item)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                className="contractButton"
                disabled={inputType.credential}
                onClick={()=>{setIsDelete({id:item?.id,credential:true})}}
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
