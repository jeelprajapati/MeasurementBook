import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";

const InputRow = ({ unit,inputType, setDivideBy, setInputType, state, dispatch }) => {
  const ref=useRef();
  const handleClose = (e) => {
    e.preventDefault();
    setInputType({ type: "", credential: false });
    dispatch({ type: "INITIAL_STATE" });
    setDivideBy(0);
  };

  const handleDispatch = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  }, [inputType?.credential]);

  return (
    <tr className="tr" ref={ref}>
      <td className="td">
        <input
          type="number"
          name="sorNo"
          value={state.sorNo}
          onChange={(e) => handleDispatch(e)}
        />
      </td>
      <td className="td">
        <textarea
          name="item"
          value={state.item}
          onChange={(e) => handleDispatch(e)}
          required
        ></textarea>
      </td>
      <td className="td">
        <input
          type="number"
          step="any"
          min={0}
          name="poQty"
          value={state.poQty}
          required
          onChange={(e) => handleDispatch(e)}
        />
      </td>
      <td className="td">
        <select
          name="stdUnitId"
          value={state.stdUnitId}
          required
          onChange={(e) => handleDispatch(e)}
        >
          <option value="" disabled>
            select
          </option>
          {unit?.map((item) => (
            <option value={item?.id} key={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
      </td>
      <td className="td">
        <input
          type="text"
          name="unit"
          value={state.unit}
          required
          onChange={(e) => handleDispatch(e)}
        />
      </td>
      <td className="td">
        <input
          type="number"
          step="any"
          min={0}
          name="rate"
          style={{ textAlign: "end" }}
          value={state.rate}
          onChange={(e) => handleDispatch(e)}
        />
      </td>
      <td className="td">
        <input
          type="number"
          name="hsn"
          step="any"
          min={0}
          style={{ textAlign: "end" }}
          value={state.hsn}
          onChange={(e) => handleDispatch(e)}
        />
      </td>
      <td className="td" style={{ textAlign: "center" }}>
        <button type="submit" className="contractButton">
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button className="contractButton" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </tr>
  );
};

export default InputRow;
