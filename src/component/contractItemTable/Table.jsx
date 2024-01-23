import React, { useEffect, useReducer, useRef, useState } from "react";
import "./style.css";
import makeRequesInstance from "../../utils/makeRequest.js";
import { useAlert } from "react-alert";
import TableRow from "./TableRow.jsx";
import InputRow from "./InputRow.jsx";
import {
  INITIAL_STATE,
  inputReducer,
} from "../../reducers/contractItemReducer.js";
const Table = ({ change, setChange, unit, projectId }) => {
  const [array, setArray] = useState([]);
  const [divideBy, setDivideBy] = useState(0);
  const [inputType, setInputType] = useState({ type: "", credential: false });
  const [scrollValue, setScrollValue] = useState(0);
  const ref = useRef();
  const alert = useAlert();
  const [page, setPage] = useState(1);
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const [state, dispatch] = useReducer(inputReducer, INITIAL_STATE);

  useEffect(() => {
    const getData = async () => {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get(
        `/ContractItem/GetByProjectId?projectId=${projectId}&page=1&pageSize=${
          page * 9
        }`
      );
      if (res.status === 200) {
        setArray(res.data.items);
        if (res.data.items?.length === 0) {
          setInputType({ type: "ADD", credential: true });
          setDivideBy(0);
        }
      }
    };
    getData();
  }, [projectId, page,change]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array]);

  const handleInfinityScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight <= clientHeight + scrollTop + 1) {
      setPage((prev) => prev + 1);
      setScrollValue(scrollTop);
    }
  };

  //set scrollvalue for when data ADD || UPDATED we can scroll Table
  const handleScrollValue = () => {
    if (ref.current) {
      setScrollValue(ref.current.scrollTop);
    }
  };

  const arrangeValues = () => {
    return {
      ...state,
      sorNo: parseFloat(state.sorNo) || 0,
      hsn: parseFloat(state.hsn) || 0,
      poQty: parseFloat(state.poQty) || 0,
      stdUnitId: parseInt(state.stdUnitId) || 0,
      rate: parseFloat(state.rate) || 0,
      projectId,
    };
  };

  const handleAdd = async () => {
    try {
      const values = arrangeValues();
      const res = await makeRequest.post("ContractItem", {
        contractItemDto: {
          ...values,
        },
        index: divideBy,
      });
      if (res.status === 204) {
        alert.show("data added successfully", { type: "success" });
        setDivideBy(0);
        setChange(!change);
        dispatch({ type: "INITIAL_STATE" });
        setInputType({ type: "", credential: false });
      }
    } catch (error) {
      alert.show("somthing went Wrong!", { type: "info" });
    }
  };

  const handleUpdate = async () => {
    try {
      const values = arrangeValues();
      const res = await makeRequest.put("ContractItem", {
        ...values,
        projectId,
      });
      if (res.status === 204) {
        alert.show("data updated successfully", { type: "success" });
        setChange(!change);
        setDivideBy(0);
        dispatch({ type: "INITIAL_STATE" });
        setInputType({ type: "", credential: false });
      }
    } catch (error) {
      alert.show("somthing went Wrong!", { type: "info" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleScrollValue();
    if (inputType.type === "ADD") {
      handleAdd();
    } else if (inputType.type === "UPDATE") {
      handleUpdate();
    }
  };

  return (
    <div
      className="contractTableContainer"
      ref={ref}
      onScroll={handleInfinityScroll}
    >
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tr className="tr">
            <th className="th" style={{ textAlign: "start" }}>
              Item Code
            </th>
            <th className="th" style={{ textAlign: "start" }}>
              Description*
            </th>
            <th className="th" style={{ textAlign: "start" }}>
              Work Order Quantity*
            </th>
            <th className="th" style={{ textAlign: "start" }}>
              Measure Type*
            </th>
            <th className="th" style={{ textAlign: "center" }}>
              UOM*
            </th>
            <th className="th" style={{ textAlign: "end" }}>
              Rate
            </th>
            <th className="th" style={{ textAlign: "end" }}>
              HSN
            </th>
            <th className="th" style={{ textAlign: "center" }}>
              Actions
            </th>
          </tr>
          {
            <TableRow
              items={array?.slice(0, divideBy)}
              unit={unit}
              setInputType={setInputType}
              setDivideBy={setDivideBy}
              inputType={inputType}
              dispatch={dispatch}
              change={change}
              setChange={setChange}
            />
          }
          {inputType?.credential && (
            <InputRow
              unit={unit}
              setInputType={setInputType}
              setDivideBy={setDivideBy}
              state={state}
              dispatch={dispatch}
              inputType={inputType}
              handleScrollValue={handleScrollValue}
            />
          )}
          {
            <TableRow
              items={array?.slice(
                inputType?.type === "UPDATE" ? divideBy + 1 : divideBy
              )}
              unit={unit}
              setInputType={setInputType}
              setDivideBy={setDivideBy}
              inputType={inputType}
              dispatch={dispatch}
              change={change}
              setChange={setChange}
              handleScrollValue={handleScrollValue}
            />
          }
        </table>
      </form>
    </div>
  );
};

export default Table;
