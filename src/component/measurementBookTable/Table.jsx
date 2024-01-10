import React, { useEffect, useReducer, useRef, useState } from "react";
import "./style.css";
import TableRow from "./TableRow";
import InputRow from "./InputRow";
import makeRequesInstance from "../../utils/makeRequest";
import {
  inputReducer,
  INITIAL_STATE,
} from "../../reducers/measurementbookReducer.js";
import { useAlert } from "react-alert";
import ContractItemFilter from "../filter/ContractItemFilter.jsx";
import TagFilter from "../filter/TagFilter.jsx";

const Table = ({
  projectId,
  billId,
  contractItems,
  contractItemValues,
  setContractItemValues,
  initialState,
  allTag,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [head, setHead] = useState("00000000-0000-0000-0000-000000000000");
  const [change, setChange] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [state, dispatch] = useReducer(inputReducer, INITIAL_STATE);
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const [input, setInput] = useState({ type: "", credential: false });
  const [divideBy, setDivideBy] = useState(0);
  const [contractItemFilter, setContractItemFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const alert = useAlert();
  const ref = useRef();

  useEffect(() => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const getData = async () => {
      setLoading(true);
      const res = await makeRequest.post("MeasurementBook/GetByBillId", {
        billId,
        page: 1,
        pageSize: 50000,
        filter: [
          ...(contractItemFilter.length !== 0
            ? [
                {
                  filterColumn: 1,
                  filterValue: contractItemFilter[0],
                },
              ]
            : []),
          ...(tagFilter.length !== 0
            ? [
                {
                  filterColumn: 2,
                  filterValue: tagFilter.join(","),
                },
              ]
            : []),
        ],
      });
      if (res.status === 200) {
        setData(res.data?.items);
        if (res.data.items?.length === 0) {
          setInput({ type: "ADD", credential: true });
          setDivideBy(0);
        }
      }
      setLoading(false);
    };
    getData();
  }, [billId, change, contractItemFilter,tagFilter]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClose = (e) => {
    e.preventDefault();
    setInput({ type: "", credential: false });
    setHead("00000000-0000-0000-0000-000000000000");
    setDivideBy(0);
    dispatch({ type: "INITIAL_STATE" });
    setContractItemValues(initialState);
  };

  const arrangeValues = () => {
    return {
      id: state?.id,
      description: state?.description,
      no: parseFloat(state?.no),
      l: parseFloat(state?.l?.value) || 0,
      b: parseFloat(state?.b?.value) || 0,
      d_H: parseFloat(state?.h?.value) || 0,
      subtotal: state?.subtotal,
      remark: "string",
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
      const res = await makeRequest.post("MeasurementBook", {
        measurementBookDto: {
          ...values,
        },
        head,
      });
      if (res.status === 204) {
        setChange(!change);
        alert.show("Data Added Sucessfully", { type: "success" });
        handleClose(e);
      }
    } catch (error) {
      alert.show("somthing went wrong!", { type: "info" });
    }
  };

  const handleUpdate = async (e) => {
    try {
      const values = arrangeValues();
      const res = await makeRequest.put("MeasurementBook", {
        ...values,
        billId,
      });
      if (res.status === 204) {
        setChange(!change);
        alert.show("Data Updated Sucessfully", { type: "success" });
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

  const handleClear = () => {
    if (tagFilter.length !== 0 || contractItemFilter.length !== 0) {
      setTagFilter([]);
      setContractItemFilter([]);
    }
  };

  return (
    <>
      <div className="measurementFilter">
        <ContractItemFilter
          item={contractItems}
          filter={contractItemFilter}
          setFilter={setContractItemFilter}
        />
        <TagFilter item={allTag} filter={tagFilter} setFilter={setTagFilter} />
        <span className="clear" onClick={handleClear}>
          Clear All
        </span>
      </div>
      <div className="measurementContainer" ref={ref}>
        <form onSubmit={handleSubmit}>
          <table>
            <tr className="measurementTableRow">
              <th className="measurementTableTh" align="start">
                ContractItem*
              </th>
              <th className="measurementTableTh" align="start">
                Description*
              </th>
              <th className="measurementTableTh" align="end">
                No.*
              </th>
              <th className="measurementTableTh" align="end">
                L
              </th>
              <th className="measurementTableTh" align="end">
                B
              </th>
              <th className="measurementTableTh" align="end">
                H
              </th>
              <th className="measurementTableTh" align="end">
                Total
              </th>
              <th className="measurementTableTh" align="start">
                Tags
              </th>
              <th className="measurementTableTh" align="start">
                Actions
              </th>
            </tr>
            {!loading && (
              <TableRow
                contractItems={contractItems}
                data={data?.slice(0, divideBy)}
                setDivideBy={setDivideBy}
                setInput={setInput}
                input={input}
                dispatch={dispatch}
                setHead={setHead}
                handleScrollValue={handleScrollValue}
                setChange={setChange}
                change={change}
                setContractItemValues={setContractItemValues}
              />
            )}

            {/* input row */}
            {input?.credential && (
              <InputRow
                contractItems={contractItems}
                projectId={projectId}
                dispatch={dispatch}
                state={state}
                handleClose={handleClose}
                input={input}
                contractItemValues={contractItemValues}
                setContractItemValues={setContractItemValues}
                allTag={allTag}
              />
            )}

            {!loading && (
              <TableRow
                contractItems={contractItems}
                data={
                  input?.type === "UPDATE"
                    ? data?.slice(divideBy + 1)
                    : data?.slice(divideBy)
                }
                setDivideBy={setDivideBy}
                setInput={setInput}
                input={input}
                dispatch={dispatch}
                setHead={setHead}
                handleScrollValue={handleScrollValue}
                setChange={setChange}
                change={change}
                setContractItemValues={setContractItemValues}
              />
            )}
          </table>
        </form>
      </div>
    </>
  );
};

export default Table;
