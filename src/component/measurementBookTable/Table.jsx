import React, { useEffect, useReducer, useRef, useState } from "react";
import "./style.css";
import TableRow from "./TableRow";
import InputRow from "./InputRow";
import useFetchByPost from "../../hooks/useFetchByPost.js";
import {
  addMeasurementBook,
  updateMeasurementBook,
} from "../../actions/measurementBook.js";
import { formData, intialState } from "../../reducers/measurementReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../../redux/slice/contractItemSlice.js";
import { SETINITIAL_STATE } from "../../constants/actionTypes.js";
import useInfinityScroll from "../../hooks/useInfinityScroll.js";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Table = ({ billId, contractItems, tagFilter, contractItemFilter }) => {
  const [change, setChange] = useState(0);
  const [input, setInput] = useState({ type: "", credential: false });
  const [divideBy, setDivideBy] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const ref = useRef();
  const [state, dispatch] = useReducer(formData, intialState);
  const dispatchAction = useDispatch();
  const contractItem = useSelector((state) => state.contractItem.contractItem);
  const { handleInfinityScroll, page } = useInfinityScroll();

  const headerObject = [
    { label: "ContractItem*", align: "start" },
    { label: "Description*", align: "start" },
    { label: "No.*", align: "end" },
    { label: "L", align: "end" },
    { label: "B", align: "end" },
    { label: "H", align: "end" },
    { label: "Total", align: "end" },
    { label: "Tags", align: "start" },
    { label: "Actions", align: "center" },
  ];

  const { data, loading,hasMore } = useFetchByPost({
    url: "MeasurementBook/getByBillId",
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
    dispatch({ type: SETINITIAL_STATE });
    setInput({ type: "", credential: false });
    setDivideBy(0);
  };

  const handleAdd = () => {
    addMeasurementBook(
      {
        ...state,
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
    updateMeasurementBook(
      {
        ...state,
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
    <>
      <div
        className="measurementContainer"
        ref={ref}
        onScroll={(e)=> hasMore && !input.credential && handleInfinityScroll(e)}
      >

        <form onSubmit={handleSubmit}>
          <table>
            <tr className="measurementTableRow">
              {headerObject?.map((item, index) => (
                <th
                  key={index}
                  className="measurementTableTh"
                  align={item?.align}
                >
                  {item?.label}
                </th>
              ))}
            </tr>
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

            {
              <TableRow
                contractItems={contractItems}
                data={data?.slice(
                  input?.type === "UPDATE" ? divideBy + 1 : divideBy
                )}
                setDivideBy={setDivideBy}
                setInput={setInput}
                input={input}
                dispatch={dispatch}
                setChange={setChange}
              />
            }
          </table>
        </form>
        {loading && <div className="loader">
          <FontAwesomeIcon icon={faSpinner} />
        </div>}
      </div>
    </>
  );
};

export default Table;
