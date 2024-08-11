import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useReducer } from "react";
import { formData, intialState } from "../../reducers/strSteelReducer.js";
import TableRow from "./TableRow.jsx";
import InputRow from "./InputRow.jsx";
import useFetchByPost from "../../hooks/useFetchByPost.js";
import {
  addStructMeasurementBook,
  updateStructMeasurementBook,
} from "../../actions/structMeasurementBook.js";
import { setInitialState } from "../../redux/slice/contractItemSlice.js";
import { getShape } from "../../actions/standard.js";
import { useDispatch, useSelector } from "react-redux";
import { SETINITIAL_STATE } from "../../constants/actionTypes.js";
import useInfinityScroll from "../../hooks/useInfinityScroll.js";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Table = ({ billId, contractItems, tagFilter, contractItemFilter }) => {
  const [state, dispatch] = useReducer(formData, intialState);
  const [allShape, setAllShape] = useState([]);
  const [getShapeName, setGetShapeName] = useState([]);
  const [change, setChange] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [input, setInput] = useState({ type: "", credential: false });
  const [divideBy, setDivideBy] = useState(0);
  const ref = useRef();
  const contractItem = useSelector((state) => state.contractItem.contractItem);
  const dispatchAction = useDispatch();
  const { handleInfinityScroll, page } = useInfinityScroll();

  const headerObject = [
    { label: "ContractItem", align: "start" },
    { label: "Description", align: "start" },
    { label: "shape", align: "start" },
    { label: "size", align: "start" },
    { label: "No.", align: "end" },
    { label: "L", align: "end" },
    { label: "B", align: "end" },
    { label: "Unit Wei", align: "end" },
    { label: "Total", align: "end" },
    { label: "Tags", align: "start" },
    { label: "Actions", align: "center" },
  ];

  const { data, loading,hasMore } = useFetchByPost({
    url: "StructMeasurementBook/getByBillId",
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
    getShape((data) => {
      setAllShape(data);
      setGetShapeName(
        Array.from(new Set(data.map((obj) => obj.subSection))).map((name) =>
          data.find((obj) => obj.subSection === name)
        )
      );
    });
  }, []);

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
    dispatch({ type: SETINITIAL_STATE });
    setInput({ type: "", credential: false });
    setDivideBy(0);
  };

  const handleAdd = () => {
    const { shape, ...other } = state;
    addStructMeasurementBook(
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

  const handleUpdate = () => {
    const { shape, ...other } = state;
    updateStructMeasurementBook(
      {
        ...other,
        contractItemId: contractItem.value,
        tags: state.tags.join(","),
      },
      billId,
      () => {
        handleSuccess("Updat");
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
    } else if (input.type === "UPDATE") {
      handleUpdate();
    }
  };

  return (
    <div
      className="ssTableContainer"
      ref={ref}
      onScroll={(e) => hasMore && !input.credential && handleInfinityScroll(e)}
    >
      <form onSubmit={handleSubmit}>
        <table>
          <tr className="ssTableTr">
            {headerObject?.map((item) => (
              <th key={item.label} className="ssTableTh" align={item.align}>
                {item.label}
              </th>
            ))}
          </tr>
          <TableRow
            data={data?.slice(0, divideBy)}
            allShape={allShape}
            contractItems={contractItems}
            setInput={setInput}
            setDivideBy={setDivideBy}
            dispatch={dispatch}
            setChange={setChange}
            input={input}
          />
          {input.credential && (
            <InputRow
              dispatch={dispatch}
              allShape={allShape}
              getShapeName={getShapeName}
              state={state}
              contractItems={contractItems}
              input={input}
              contractItem={contractItem}
              setInput={setInput}
              setDivideBy={setDivideBy}
            />
          )}
          <TableRow
            data={data?.slice(
              input.type === "UPDATE" ? divideBy + 1 : divideBy
            )}
            allShape={allShape}
            contractItems={contractItems}
            setInput={setInput}
            setDivideBy={setDivideBy}
            dispatch={dispatch}
            setChange={setChange}
            input={input}
          />
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
