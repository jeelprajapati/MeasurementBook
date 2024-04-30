import React, { useState } from "react";
import Content from "../content/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faPencil,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteRFMeasurementBook } from "../../actions/reinforcementBook";
import { addcontractItem } from "../../redux/slice/contractItemSlice";
import { CHANGE_ALLSTATE } from "../../constants/actionTypes";
import toast from "react-hot-toast";
import "./style.css";
import RFShape from "./RFShapes";
import { ReactComponent as InfoIcon } from "../../assets/image/icons8-info.svg";
import { UncontrolledTooltip } from "reactstrap";

const TableRow = (props) => {
  const {
    contractItems,
    data,
    input,
    setChange,
    setInput,
    setDivideBy,
    dispatch,
  } = props;
  const [isDeleted, setIsDeleted] = useState({ id: "", credential: false });
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(InfoIcon);
  const dispatchAction = useDispatch();

  const handleAdd = (e, index) => {
    e.preventDefault();
    setDivideBy(index + 1);
    setInput({ type: "ADD", credential: true });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteRFMeasurementBook(isDeleted.id, () => {
      toast.success("Data Deleted Successfully");
      setChange((prev) => !prev);
      setIsDeleted({ id: "", credential: false });
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsDeleted({ id: "", credential: false });
  };

  const handleContractItem = (contractItem) => {
    dispatchAction(
      addcontractItem({
        item: {
          value: contractItem?.id,
          unit: contractItem?.unit,
          label: contractItem?.item,
          stdUnit: contractItem?.stdUnitId,
          exist: true,
        },
      })
    );
  };

  const handleState = (item) => {
    const { contractItemId, ...other } = item;
    const contractItem = contractItems?.find((i) => i?.id === contractItemId);
    handleContractItem(contractItem);
    dispatch({ type: CHANGE_ALLSTATE, payload: other });
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

  return (
    <>
      {data.map((item, index) => (
        <tr className="measurementTableRow" key={item.id}>
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
          <td className="measurementTableTd" align="start">
            {item.diameterBar}
          </td>
          <td className="measurementTableTd" align="start">
            {item.no}
          </td>
          <td className="measurementTableTd" align="center">
            {/* Shape code in API*/}
            <InfoIcon id="shape-icon" />
            <UncontrolledTooltip
              target={"shape-icon"}
              placement="top"
              className="info-icon-tooltip"
            >
              <img
                src={`${process.env.REACT_APP_STATIC_URL}/${item.shapeImagePath}`}
                alt="Shape Info"
              />
            </UncontrolledTooltip>
          </td>
          <td className="measurementTableTd" align="center">
            {item?.cuttingLength}
          </td>
          <td className="measurementTableTd" align="end">
            {item?.subtotal?.toFixed(3)}
            <span className="measurementtotal">
              {contractItems?.find((i) => i.id === item?.contractItemId)?.unit}
            </span>{" "}
            Total
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
              <button className="actionType">
                onClick={handleDelete}
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="actionType">
                onClick={handleCancel}
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
