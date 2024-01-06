import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useReducer } from "react";
import { INITIAL_STATE, inputReducer } from "../../reducers/strSteelReducer.js";
import makeRequesInstance from "../../utils/makeRequest.js";
import { useAlert } from "react-alert";
import TableRow from "./TableRow.jsx";
import InputRow from "./InputRow.jsx";

const Table = ({
  projectId,
  billId,
  contractItems,
  contractItemValues,
  setContractItemValues,
  initialState,
}) => {
  const [state, dispatch] = useReducer(inputReducer, INITIAL_STATE);
  const alert = useAlert();
  const [array, setArray] = useState([]);
  const [allShape, setAllShape] = useState([]);
  const [getShapeName, setGetShapeName] = useState([]);
  const [load, setLoad] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const [change, setChange] = useState(0);
  const [input, setInput] = useState({ type: "", credential: false });
  const [divideBy, setDivideBy] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const getData = async () => {
      try {
        const res = await makeRequest.get(
          `StructMeasurementBook/GetByBillId?billId=${billId}&page=${1}&pageSize=${50000}`
        );
        if (res.status === 200) {
          setArray(res.data.items);
          if (res.data.items?.length === 0) {
            setInput({ type: "ADD", credential: true });
            setDivideBy(0);
          }
        }
      } catch (error) {
        alert.show("somthing went wrong!", { type: "info" });
      }
    };
    getData();
  }, [alert, billId, change]);

  useEffect(() => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const getShape = async () => {
      setLoad(true);
      try {
        const res = await makeRequest.get("Standard/GetStructShape");
        if (res.status === 200) {
          setAllShape(res.data);
          setGetShapeName(
            Array.from(new Set(res.data.map((obj) => obj.subSection))).map(
              (name) => res.data.find((obj) => obj.subSection === name)
            )
          );
        }
      } catch (error) {
        alert.show("somthing went wrong!", { type: "info" });
      }
      setLoad(false);
    };
    getShape();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array]);

  const handleClose = (e) => {
    e.preventDefault();
    setInput({ type: "", credential: false });
    dispatch({ type: "INITIAL_STATE" });
    setContractItemValues(initialState);
    setDivideBy(0);
  };

  const arrangeValues = () => {
    return {
      id: state?.id,
      description: state?.description,
      structShapeId: state.structShapeId?.id,
      no: state?.no,
      l1: state.l?.value,
      l2: state.b?.value,
      subtotal: state.subtotal,
      contractItemId: contractItemValues?.value,
      tags: state?.tags?.join(","),
      billId,
    };
  };

  const handleScrollValue = () => {
    if (ref.current) {
      setScrollValue(ref.current.scrollTop);
    }
  };

  const handleAdd = async (e) => {
    try {
      const values = arrangeValues();
      const res = await makeRequest.post("StructMeasurementBook", {
        structMeasurementBookDto: {
          ...values,
        },
        head,
      });
      if (res.status === 204) {
        alert.show("Data Added Sucessfully", { type: "success" });
        setChange(!change);
        handleClose(e);
      }
    } catch (error) {
      alert.show("somthing went wrong!", { type: "info" });
    }
  };

  const handleUpdate = async (e) => {
    try {
      const values = arrangeValues();
      const res = await makeRequest.put("StructMeasurementBook", { ...values });
      if (res.status === 204) {
        alert.show("Data Updated Sucessfully", { type: "success" });
        setChange(!change);
        handleClose(e);
      }
    } catch (error) {
      alert.show("somthing went wrong!", { type: "info" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleScrollValue();
    if (input?.type === "ADD") {
      handleAdd(e);
    } else if (input?.type === "UPDATE") {
      handleUpdate(e);
    }
  };
  return (
    <div className="ssTableContainer">
      <form onSubmit={handleSubmit}>
        <table>
          <tr className="ssTableTr">
            <th className="ssTableTh" align="start">
              Contract Item
            </th>
            <th className="ssTableTh" align="start">
              Description
            </th>
            <th className="ssTableTh" align="start">
              Shape
            </th>
            <th className="ssTableTh" align="start">
              Size
            </th>
            <th className="ssTableTh" align="end">
              No.
            </th>
            <th className="ssTableTh" align="end">
              L
            </th>
            <th className="ssTableTh" align="end">
              B
            </th>
            <th className="ssTableTh" align="end">
              Unit Wei
            </th>
            <th className="ssTableTh" align="end">
              Subtotal
            </th>
            <th className="ssTableTh" align="start">
              Tags
            </th>
            <th className="ssTableTh" align="start">
              Actions
            </th>
          </tr>
          <TableRow
            data={array?.slice(0, divideBy)}
            allShape={allShape}
            contractItems={contractItems}
            setInput={setInput}
            setDivideBy={setDivideBy}
            dispatch={dispatch}
            setHead={setHead}
            setChange={setChange}
            change={change}
            setContractItemValues={setContractItemValues}
          />
          {input.credential && (
            <InputRow
              dispatch={dispatch}
              handleClose={handleClose}
              allShape={allShape}
              getShapeName={getShapeName}
              projectId={projectId}
              state={state}
              contractItems={contractItems}
              load={load}
              input={input}
              contractItemValues={contractItemValues}
              setContractItemValues={setContractItemValues}
            />
          )}
          <TableRow
            data={
              input?.type === "UPDATE"
                ? array?.slice(divideBy + 1)
                : array?.slice(divideBy)
            }
            allShape={allShape}
            contractItems={contractItems}
            setInput={setInput}
            setDivideBy={setDivideBy}
            dispatch={dispatch}
            setHead={setHead}
            setChange={setChange}
            change={change}
            setContractItemValues={setContractItemValues}
          />
        </table>
      </form>
    </div>
  );
};

export default Table;
