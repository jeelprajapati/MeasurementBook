import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import TableRow from "./TableRow.jsx";
import InputRow from "./InputRow.jsx";
import { addContractItem, getContractItem, updateContractItem } from "../../actions/contractItem.js";
import useInfinityScroll from "../../hooks/useInfinityScroll.js";
import { contractItemInitialState } from "../../constants/initialState.js";
import toast from "react-hot-toast";

const Table = ({ change, setChange, unit, projectId }) => {
  const [array, setArray] = useState([]);
  const [divideBy, setDivideBy] = useState(0);
  const [inputType, setInputType] = useState({ type: "", credential: false });
  const [scrollValue, setScrollValue] = useState(0);
  const ref = useRef();
  const [formData,setFormData]=useState(contractItemInitialState);
  const {handleInfinityScroll,page}=useInfinityScroll({credential:inputType?.credential});

  useEffect(() => {
      getContractItem(projectId, page, (data) => {
        setArray(data.items);
        if (data.items?.length === 0) {
          setInputType({ type: "ADD", credential: true });
          setDivideBy(0);
        }
      });
  }, [projectId, page, change]);

  useEffect(() => {
    if (ref.current && scrollValue !== 0) {
      ref.current.scrollTop = scrollValue;
    }
    //eslint-disable-next-line
  }, [array]);

  const handleSuccess=(type)=>{
    toast.success(`Data ${type}ed Successfully`);
    setChange(!change);
    setFormData(contractItemInitialState);
    setInputType({type:"",credential:false});
    setDivideBy(0);
  }

  const handleAdd=()=>{
    addContractItem({...formData,projectId},divideBy,()=>{
      handleSuccess("Add");
    })
  }

  const handleUpdate=()=>{
    updateContractItem(formData,projectId,()=>{
      handleSuccess("Updat");
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(ref.current){
      setScrollValue(ref.current.scrollTop);
    }
    if(inputType.type==="ADD"){
      handleAdd()
    }else if(inputType.type==="UPDATE"){
      handleUpdate();
    }
  }

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
              setChange={setChange}
              setFormData={setFormData}
            />
          }
          {inputType?.credential && (
            <InputRow
              unit={unit}
              setInputType={setInputType}
              setDivideBy={setDivideBy}
              inputType={inputType}
              formData={formData}
              setFormData={setFormData}
              contractItemInitialState={contractItemInitialState}
            />
          )}
          {
            <TableRow
              items={array?.slice(
                inputType.type === "UPDATE" ? divideBy + 1 : divideBy
              )}
              unit={unit}
              setInputType={setInputType}
              setDivideBy={setDivideBy}
              inputType={inputType}
              setChange={setChange}
              setFormData={setFormData}
            />
          }
        </table>
      </form>
    </div>
  );
};

export default Table;
