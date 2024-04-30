import React, { useEffect, useReducer, useRef, useState } from "react";
import useFetchByPost from "../../hooks/useFetchByPost";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { SETINITIAL_STATE } from "../../constants/actionTypes.js";
import { setInitialState } from "../../redux/slice/contractItemSlice.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TableRow from "./TableRow.jsx";
import { formData, initialState } from "../../reducers/reinforcementReducer.js";
import "./style.css";
import InputRow from "./InputRow.jsx";
import { addRFMeasurementBook } from "../../actions/reinforcementBook.js";

const Table = ({ billId, contractItems, tagFilter, contractItemFilter }) => {
  const ref = useRef();
  const [change, setChange] = useState(0);
  const [divideBy, setDivideBy] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [input, setInput] = useState({ type: "", credential: false });
  const dispatchAction = useDispatch();
  const [state, dispatch] = useReducer(formData, initialState);
  const columns = [
    { label: "ContractItem", align: "start" },
    { label: "Description", align: "start" },
    { label: "Dia", align: "start" },
    { label: "No.", align: "end" },
    { label: "Shape Code", align: "start" },
    { label: "Cutting Len", align: "start" },
    { label: "Total", align: "end" },
    { label: "Tags", align: "start" },
    { label: "Actions", align: "center" },
  ];
  const { handleInfinityScroll, page } = useInfinityScroll({
    credential: input?.credential,
  });
  const contractItem = useSelector((state) => state.contractItem.contractItem);
  const { data, loading } = useFetchByPost({
    url: "RFMeasurementBook/getByBillId",
    billId,
    change,
    contractItemFilter,
    tagFilter,
    page,
  });

  useEffect(() => {
    if (data?.length === 0 && !loading) {
      setInput({ type: "ADD", credential: true });
      setDivideBy(0);
    } else {
      setInput({ type: "", credential: false });
      setDivideBy(0);
    }
  }, [data, loading]);

  useEffect(() => {
    if (ref.current && scrollValue !== 0) {
      ref.current.scrollTop = scrollValue;
    }
    //eslint-disable-next-line
  }, [data]);

  const handleSuccess = (type) => {
    toast.success(`Data ${type}ed Successfully`);
    setChange(!change);
    dispatchAction(setInitialState());
    // dispatch({ type: SETINITIAL_STATE });
    setInput({ type: "", credential: false });
    setDivideBy(0);
  };

  const handleAdd = () => {
    const { shape, ...other } = state;
    addRFMeasurementBook(
      {
        ...other,
        contractItemId: contractItem.value,
        tags: state.tags.join(","),
        billId,
      },
      divideBy,
      () => {
        handleSuccess("Add");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ref.current) {
      setScrollValue(ref.current.scrollTop);
    }
    if (input.type === "ADD") {
      handleAdd();
    }
    // else if (input.type === "UPDATE") {
    //   handleUpdate();
    // }
  };
  return (
    <div
      className="measurementContainer"
      ref={ref}
      onScroll={handleInfinityScroll}
    >
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            {/* Column Heading */}
            <tr className="measurementTableRow">
              {columns.map((item, index) => (
                <th
                  key={index}
                  className="measurementTableTh"
                  align={item?.align}
                >
                  {item?.label}
                </th>
              ))}
            </tr>
            {/* This is for rendering existing row when it comes to do crud*/}
            {
              <TableRow
                contractItems={contractItems}
                data={data?.slice(0, divideBy)}
                setDivideBy={setDivideBy}
                setInput={setInput}
                input={input}
                dispatch={dispatch}
                setChange={setChange}
              />
            }
          </tbody>

          {input?.credential && (
            <InputRow
              contractItems={contractItems}
              dispatch={dispatch}
              state={state}
              setDivideBy={setDivideBy}
              setInput={setInput}
              contractItem={contractItem}
            />
          )}
          {/* List All Rows in Table, None of the actions are working */}
          {
            <TableRow
              contractItems={contractItems}
              data={data?.slice(
                input?.type === "UPDATE" ? divideBy + 1 : divideBy
              )}
              input={input}
              setChange={setChange}
              setInput={setInput}
              setDivideBy={setDivideBy}
              dispatch={dispatch}
            />
          }
        </table>
      </form>
      {loading && (
        <div className="loader">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      )}
    </div>
  );
};

export default Table;
