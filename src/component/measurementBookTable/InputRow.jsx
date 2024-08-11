import React, { useEffect, useRef } from "react";
import "./style.css";
import Tag from "../tag/Tag";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../select/Select.jsx";
import { useDispatch } from "react-redux";
import { addcontractItem, setInitialState } from "../../redux/slice/contractItemSlice.js";
import { CHANGE_NUMBER, CHANGE_TEXT, SETINITIAL_STATE } from "../../constants/actionTypes.js";

const InputRow = ({ contractItems,dispatch,state,input,setDivideBy,setInput,contractItem}) => {
  const ref = useRef();
  const dispatchAction = useDispatch();
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
    dispatchAction(addcontractItem({ item:{...e ,exist:true} }));
  };

  const handleChange = (e, type) => {
    dispatch({
      type,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleClose=(e)=>{
    e.preventDefault();
    dispatchAction(setInitialState());
    dispatch({type:SETINITIAL_STATE});
    setInput({type:"",credential:false});
    setDivideBy(0);
  }

  return (
    <>
      <tr className="measurementTableRow" style={{ height: "90px" }} ref={ref}>
        <td className="measurementTableTd" style={{ position: "relative" }}>
          <Select
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
              onChange={(e) =>handleChange(e,CHANGE_TEXT)}
            ></textarea>
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem.exist && (
            <input
              type="number"
              className="measurementTableInput alignItemEnd"
              step="any"
              min={0}
              name="no"
              required
              value={state.no === 0 ? "" : state.no}
              onChange={(e) =>handleChange(e,CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem.exist && (
            <input
              type="number"
              name="l"
              className="measurementTableInput alignItemEnd"
              step="any"
              min={0}
              required={[1,2,3].includes(contractItem.stdUnit)}
              disabled={![1,2,3].includes(contractItem.stdUnit)}
              value={state.l === 0 ? "" : state.l}
              onChange={(e) =>handleChange(e,CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem.exist && (
            <input
              type="number"
              step="any"
              min={0}
              name="b"
              required={[2,3].includes(contractItem.stdUnit)}
              disabled={![2,3].includes(contractItem.stdUnit)}
              className="measurementTableInput alignItemEnd"
              value={state.b === 0 ? "" : state.b}
              onChange={(e) =>handleChange(e,CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="measurementTableTd">
          {contractItem?.exist && (
            <input
              type="number"
              step="any"
              min={0}
              name="d_H"
              required={[3].includes(contractItem.stdUnit)}
              disabled={![3].includes(contractItem.stdUnit)}
              className="measurementTableInput alignItemEnd"
              value={state.d_H === 0 ? "" : state.d_H}
              onChange={(e) =>handleChange(e,CHANGE_NUMBER)}
            />
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
        <td className="measurementTableTd">{contractItem?.exist && <Tag tags={state.tags} dispatch={dispatch}/>}</td>
        <td className="measurementTableTd" align="center">
          <button className="actionType" type="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="actionType" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default InputRow;
