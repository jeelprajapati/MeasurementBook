import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import Select from "../select/Select";
import Tag from "../tag/Tag";

const InputRow = ({
  handleClose,
  dispatch,
  state,
  allShape,
  contractItems,
  projectId,
  getShapeName,
  load,
  input,
  contractItemValues,
  setContractItemValues
}) => {
  const ref=useRef();
  const options = contractItems?.map((i) => ({
    value: i?.id,
    label: i?.item,
    unit: i?.unit,
    stdUnit: i?.stdUnitId,
  }));

  useEffect(()=>{
    if(ref.current){
      ref.current.scrollIntoView({ block: 'nearest', inline: 'start', behavior:'smooth'});
    }
  },[input?.credential])

  return (
    <>
      <tr
        className="ssTableTr"
        style={{ height: "90px"}}
        ref={ref}
      >
        <td className="ssTableTd select-Wrapper">
          <Select
            onChange={(e) => {
              setContractItemValues({...e,exist:true});
            }}
            options={options}
            value={contractItemValues}
          />
        </td>
        <td className="ssTableTd">
          {contractItemValues?.exist && (
            <textarea
              name="description"
              className="ssTableTextarea"
              value={state?.description}
              id=""
              required
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_INPUT",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            ></textarea>
          )}
        </td>
        <td className="ssTableTd">
          {contractItemValues?.exist && (
            <select
              name="shape"
              id=""
              value={state.shape?.value}
              className="ssTableInput"
              required
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_SHAPE",
                  payload: { value: e.target.value },
                });
              }}
            >
              <option value="" disabled>
                Select Shape
              </option>
              {!load &&
                getShapeName.map((item) => (
                  <option value={item.subSection}>{item.subSection}</option>
                ))}
            </select>
          )}
        </td>
        <td className="ssTableTd">
          {contractItemValues?.exist && (
            <select
              name="structShapeId"
              id=""
              value={state.structShapeId?.id}
              className="ssTableInput"
              required
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_SIZE",
                  payload: {
                    id: e.target.value,
                    no: allShape.find((i) => i.id === e.target.value)
                      ?.noOfParameter,
                  },
                });
              }}
            >
              <option value="" disabled>
                Select Size
              </option>
              {allShape
                .filter((s) => s.subSection === state.shape?.value)
                .map((item) => (
                  <option value={item.id}>{item.size}</option>
                ))}
            </select>
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId?.credential && (
            <input
              type="number"
              name="no"
              className="ssTableInput alignment"
              value={state.no}
              required
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_NUMBER",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId?.credential && (
            <input
              type="number"
              name="l"
              className="ssTableInput alignment"
              disabled={!state.l?.required}
              required={state.l?.required}
              value={state.l?.value}
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_L_B",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId?.credential && (
            <input
              type="number"
              name="b"
              className="ssTableInput alignment"
              disabled={!state.b?.required}
              value={state.b?.value}
              required={state.b?.required}
              onChange={(e) => {
                dispatch({
                  type: "CHANGE_L_B",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId?.credential && (
            <input
              type="number"
              className="ssTableInput alignment"
              value={allShape
                ?.find((i) => i.id === state.structShapeId?.id)
                ?.unitWeight?.toFixed(2)}
              disabled
            />
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId?.credential && (
            <div className="subtotal">
              <span>{state?.subtotal?.toFixed(2)}</span>
              <span className="unitClass">{contractItemValues?.unit}</span>
            </div>
          )}
        </td>
        <td className="ssTableTd">
          {state.structShapeId?.credential && (
            <Tag tags={state.tags} dispatch={dispatch} projectId={projectId} />
          )}
        </td>
        <td className="ssTableTd" align="center">
          <button className="actions" type='submit'>
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
