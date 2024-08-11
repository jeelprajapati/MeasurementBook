import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";

const InputRow = ({
  unit,
  inputType,
  setDivideBy,
  setInputType,
  formData,
  setFormData,
  contractItemInitialState
}) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  }, [inputType.credential]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = (e) => {
    e.preventDefault();
    setInputType({ type: "", credential: false });
    setFormData(contractItemInitialState);
    setDivideBy(0);
  };

  return (
    <tr className="tr" ref={ref}>
      <td className="td">
        <input
          type="number"
          name="sorNo"
          value={formData.sorNo === 0 ? "" : formData.sorNo}
          onChange={(e) =>
            handleChange(e.target.name, parseInt(e.target.value || 0))
          }
        />
      </td>
      <td className="td">
        <textarea
          name="item"
          value={formData.item}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        ></textarea>
      </td>
      <td className="td">
        <input
          type="number"
          step="any"
          min={0}
          name="poQty"
          value={formData.poQty === 0 ? "" : formData.poQty}
          onChange={(e) =>
            handleChange(e.target.name, parseFloat(e.target.value || 0))
          }
          required
        />
      </td>
      <td className="td">
        <select
          name="stdUnitId"
          value={formData.stdUnitId}
          onChange={(e) => handleChange(e.target.name, parseInt(e.target.value))}
          required
        >
          <option value={0} disabled>
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
          value={formData.unit}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
      </td>
      <td className="td">
        <input
          type="number"
          style={{ textAlign: "end" }}
          step="any"
          min={0}
          name="rate"
          value={formData.rate === 0 ? "" : formData.rate}
          onChange={(e) =>
            handleChange(e.target.name, parseFloat(e.target.value || 0))
          }
        />
      </td>
      <td className="td">
        <input
          type="number"
          style={{ textAlign: "end" }}
          name="hsn"
          step="any"
          min={0}
          value={formData.hsn === 0 ? "" : formData.hsn}
          onChange={(e) =>
            handleChange(e.target.name, parseInt(e.target.value || 0))
          }
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
