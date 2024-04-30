import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Tag from "../tag/Tag";
import { faCheck, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DescriptionSelect from "../select/Select.jsx";
import { useDispatch } from "react-redux";
import {
  addcontractItem,
  setInitialState,
} from "../../redux/slice/contractItemSlice.js";
import {
  CHANGE_NUMBER,
  CHANGE_TEXT,
  SETINITIAL_STATE,
} from "../../constants/actionTypes.js";
import Select from "react-select";
import RFShape from "./RFShapes/index.jsx";
import { ReactComponent as PencilIcon } from "../../assets/image/pencil-icon.svg";

const InputRow = ({
  contractItems,
  dispatch,
  state,
  input,
  setDivideBy,
  setInput,
  contractItem,
}) => {
  const ref = useRef();
  const dispatchAction = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const options = contractItems?.map((i) => ({
    value: i.id,
    label: i.item,
    unit: i.unit,
    stdUnit: i.stdUnitId,
  }));

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  }, [input?.credential]);

  const handleSelect = (e) => {
    dispatchAction(addcontractItem({ item: { ...e, exist: true } }));
  };

  const handleChange = (e, type) => {
    dispatch({
      type,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatchAction(setInitialState());
    dispatch({ type: SETINITIAL_STATE });
    setInput({ type: "", credential: false });
    setDivideBy(0);
  };
  // let diaMeterOptions = [
  //   { value: 6, label: "6" },
  //   { value: 8, label: "8" },
  //   { value: 10, label: "10" },
  //   { value: 12, label: "12" },
  //   { value: 16, label: "16" },
  //   { value: 20, label: "20" },
  //   { value: 25, label: "25" },
  //   { value: 32, label: "32" },
  //   { value: 40, label: "40" },
  // ];
  return (
    <>
      <tr className="measurementTableRow" style={{ height: "90px" }} ref={ref}>
        <td className="measurementTableTd" style={{ position: "relative" }}>
          <DescriptionSelect
            onChange={(e) => handleSelect(e)}
            options={options}
            value={contractItem}
          />
        </td>
        <td className="measurementTableTd">
          {contractItem.exist && (
            <textarea
              name="description"
              className="measurementTableInput"
              required
              value={state.description}
              onChange={(e) => handleChange(e, CHANGE_TEXT)}
            ></textarea>
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem.exist && (
            // <Select
            //   className="measurementTableInput diameter-select"
            //   options={diaMeterOptions}
            //   isDisabled={true}
            //   value={state.diameterBar}
            //   placeholder="dia"
            //   name="diameterBar"
            // />
            <input
              disabled
              type="number"
              name="diameterBar"
              className="measurementTableInput alignItemEnd"
              value={state.diameterBar}
            />
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem.exist && (
            <input
              type="number"
              name="no"
              className="measurementTableInput alignItemEnd"
              step="any"
              min={0}
              required
              value={state.no === 0 ? "" : state.no}
              onChange={(e) => handleChange(e, CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="measurementTableTd"></td>
        <td className="measurementTableTd">
          {contractItem?.exist && (
            <div className="cutting-len-input-box">
              <div className="icon">
                <PencilIcon
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              </div>
              <input
                type="number"
                step="any"
                min={0}
                required
                className="measurementTableInput alignItemEnd"
                disabled
                value={state?.cuttingLength}
              />
            </div>
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem?.exist && (
            <div className="totalContainer" disabled>
              <span>{state.subtotal === 0 ? "" : state.subtotal}</span>
              <span className="unitName">{contractItem?.unit}</span>
            </div>
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem?.exist && <Tag tags={state.tags} dispatch={dispatch} />}
        </td>
        <td className="measurementTableTd" align="center">
          <button className="actionType" type="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="actionType" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </td>
      </tr>
      {/* Diameter or Cutting Length */}
      <RFShape
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        item={{
          cuttingLength: state.cuttingLength,
          diameterBar: state.diameterBar,
          rfShapeId: state.rfShapeId,
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default InputRow;
