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

const Table = ({
  projectId,
  billId,
  contractItems,
  contractItemValues,
  setContractItemValues,
  initialState,
  allTag,
  tagFilter,
  contractItemFilter
}) => {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [state, dispatch] = useReducer(inputReducer, INITIAL_STATE);
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const [input, setInput] = useState({ type: "", credential: false });
  const [page, setPage] = useState(1);
  const [divideBy, setDivideBy] = useState(0);
  const alert = useAlert();
  const ref = useRef();

  useEffect(() => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const getData = async () => {
      const res = await makeRequest.post("MeasurementBook/GetByBillId", {
        billId,
        page: 1,
        pageSize: page*10,
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
        else{
          setInput({ type: "", credential:false });
          setDivideBy(0);
        }
      }
    };
    getData();
  }, [billId, change, contractItemFilter,tagFilter,page]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data,scrollValue]);

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

  //set scrollvalue for when data ADD || UPDATED we can scroll Table
  const handleScrollValue = () => {
    if (ref.current) {
      setScrollValue(ref.current.scrollTop);
    }
  };

  const handleInfinityScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight <= clientHeight + scrollTop + 1) {
      setPage((prev) => prev + 1);
      setScrollValue(scrollTop);
    }
  };

  const handleAdd = async (e) => {
    try {
      const values = arrangeValues();
      const res = await makeRequest.post("MeasurementBook", {
        measurementBookDto: {
          ...values,
        },
        index:divideBy,
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

  const handleClose = (e) => {
    e.preventDefault();
    handleScrollValue();
    setInput({ type: "", credential: false });
    setDivideBy(0);
    dispatch({ type: "INITIAL_STATE" });
    setContractItemValues(initialState);
  };

  return (
    <>
      <div className="measurementContainer" ref={ref} onScroll={handleInfinityScroll}>
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
            {
              <TableRow
                contractItems={contractItems}
                data={data?.slice(0, divideBy)}
                setDivideBy={setDivideBy}
                setInput={setInput}
                input={input}
                dispatch={dispatch}
                handleScrollValue={handleScrollValue}
                setChange={setChange}
                change={change}
                setContractItemValues={setContractItemValues}
              />
            }

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

            {
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
                handleScrollValue={handleScrollValue}
                setChange={setChange}
                change={change}
                setContractItemValues={setContractItemValues}
              />
            }
          </table>
        </form>
      </div>
    </>
  );
};

export default Table;
