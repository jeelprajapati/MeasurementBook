import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Select from "../select/Select";
import Tag from "../tag/Tag";
import { useDispatch } from "react-redux";
import { addcontractItem, setInitialState } from "../../redux/slice/contractItemSlice";
import { CHANGE_NUMBER, CHANGE_SHAPE, CHANGE_TEXT, SETINITIAL_STATE } from "../../constants/actionTypes";

const InputRow = ({
  dispatch,
  state,
  allShape,
  contractItems,
  getShapeName,
  input,
  contractItem,
  setDivideBy,
  setInput
}) => {
  const ref = useRef();
  const dispatchAction = useDispatch();
  const [noOfParameter,setNoOfParameter]=useState(0);

  useEffect(()=>{
    const setParameter=()=>{
      const res= allShape.find((i)=>(i.id===state.structShapeId))?.noOfParameter;
      setNoOfParameter(res);
    }
    if(state.structShapeId!==""){
      setParameter();
    }
  },[allShape,state.structShapeId]);

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
    dispatchAction(addcontractItem({ item: {...e, exist:true} }));
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
      <tr className="ssTableTr" style={{ height: "90px" }} ref={ref}>
        <td className="ssTableTd select-Wrapper">
          <Select value={contractItem} onChange={(e) => handleSelect(e)} options={options} />
        </td>
        <td className="ssTableTd">
          {contractItem?.exist && (
            <textarea
              name="description"
              className="ssTableTextarea"
              value={state?.description}
              required
              onChange={(e) => handleChange(e, CHANGE_TEXT)}
            ></textarea>
          )}
        </td>
        <td className="ssTableTd">
          {contractItem?.exist && (
            <select
              name="shape"
              value={state.shape}
              className="ssTableInput"
              required
              onChange={(e) => handleChange(e, CHANGE_SHAPE)}
            >
              <option value="" disabled>
                Select Shape
              </option>
              {getShapeName.map((item) => (
                <option value={item.subSection}>{item.subSection}</option>
              ))}
            </select>
          )}
        </td>
        <td className="ssTableTd">
          {contractItem?.exist && (
            <select
              name="structShapeId"
              value={state.structShapeId}
              className="ssTableInput"
              required
              onChange={(e) => handleChange(e, CHANGE_TEXT)}
            >
              <option value="" disabled>
                Select Size
              </option>
              {allShape
                .filter((s) => s.subSection === state.shape)
                .map((item) => (
                  <option value={item.id}>{item.size}</option>
                ))}
            </select>
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId !== "" && (
            <input
              type="number"
              name="no"
              className="ssTableInput alignment"
              value={state.no === 0 ? "" : state.no}
              required
              onChange={(e) => handleChange(e, CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId !== "" && (
            <input
              type="number"
              name="l1"
              className="ssTableInput alignment"
              required
              value={state.l1}
              onChange={(e) => handleChange(e,CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId !== "" && (
            <input
              type="number"
              name="l2"
              className="ssTableInput alignment"
              disabled={noOfParameter!==2}
              required={noOfParameter===2}
              value={state.l2}
              onChange={(e) => handleChange(e,CHANGE_NUMBER)}
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId !== "" && (
            <input
              type="number"
              className="ssTableInput alignment"
              value={allShape
                ?.find((i) => i.id === state.structShapeId)
                ?.unitWeight?.toFixed(2)}
              disabled
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId !== "" && (
            <div className="subtotal">
              <span>{state?.subtotal?.toFixed(2)}</span>
              <span className="unitClass">{contractItem?.unit}</span>
            </div>
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId !== "" && (
            <Tag tags={state.tags} dispatch={dispatch} />
          )}
        </td>
        <td className="ssTableTd" align="center">
          <button className="actions" type="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="actions" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default InputRow;
