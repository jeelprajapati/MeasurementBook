import React, { useEffect, useRef } from "react";
import "./style.css";
import Tag from "../tag/Tag";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../select/Select.jsx";

const InputRow = ({
  contractItems,
  projectId,
  dispatch,
  state,
  handleClose,
  input,
  contractItemValues,
  setContractItemValues,
  allTag
}) => {
  const ref=useRef();
  const options = contractItems?.map((i) => ({
    value: i.id,
    label: i.item,
    unit: i.unit,
    stdUnit: i.stdUnitId,
  }));

  useEffect(()=>{
    if(ref.current){
      ref.current.scrollIntoView({ block: 'nearest', inline: 'start', behavior:'smooth'});
    }
  },[input?.credential])

  const handleSelect = (e) => {
    setContractItemValues({...e,exist:true});
    dispatch({type:"CHANGE_CONTRCTITEM",payload:{stdUnitId:e.stdUnit}})
  };

  return (
    <>
      <tr className="measurementTableRow" style={{ height: "90px" }} ref={ref}>
          <td className="measurementTableTd" style={{ position: "relative" }}>
            <Select
              onChange={(e) => handleSelect(e)}
              options={options}
              value={contractItemValues}
            />
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <textarea
                name="description"
                className="measurementTableInput"
                value={state?.description}
                required
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_INPUT",
                    payload: {
                      name: "description",
                      value: e.target.value,
                    },
                  });
                }}
              ></textarea>
            )}
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <input
                type="number"
                name="no"
                required
                value={state?.no}
                className="measurementTableInput alignItemEnd"
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_NUMBER",
                    payload: {
                      name: "no",
                      value: e.target.value,
                    },
                  });
                }}
              />
            )}
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <input
                type="number"
                name="l"
                value={state?.l?.value}
                disabled={!state?.l?.required}
                className="measurementTableInput alignItemEnd"
                required={state?.l?.required}
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_L_B_H",
                    payload: {
                      name: "l",
                      value: e.target.value,
                    },
                  });
                }}
              />
            )}
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <input
                type="number"
                name="b"
                value={state?.b?.value}
                disabled={!state?.b?.required}
                className="measurementTableInput alignItemEnd"
                required={state?.b?.required}
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_L_B_H",
                    payload: {
                      name: "b",
                      value: e.target.value,
                    },
                  });
                }}
              />
            )}
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <input
                type="number"
                name="d_H"
                value={state?.h?.value}
                disabled={!state?.h?.required}
                className="measurementTableInput alignItemEnd"
                required={state?.h?.required}
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_L_B_H",
                    payload: {
                      name: "h",
                      value: e.target.value,
                    },
                  });
                }}
              />
            )}
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <div className="totalContainer" disabled>
                <span>{state?.subtotal?.toFixed(3)}</span>
                <span className="unitName">{contractItemValues?.unit}</span>
              </div>
            )}
          </td>
          <td className="measurementTableTd">
            {contractItemValues?.exist && (
              <Tag
                projectId={projectId}
                dispatch={dispatch}
                tags={state?.tags}
                allTag={allTag}
              />
            )}
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
    </>
  );
};

export default InputRow;
