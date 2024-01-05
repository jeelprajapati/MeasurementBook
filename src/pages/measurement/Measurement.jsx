import React, { useContext, useEffect, useState } from "react";
import "./measurement.css";
import Sidebar from "../../component/sidebar/Sidebar";
import MeasurementBook from "../../component/measurementBookTable/Table.jsx";
import StructuralSteelTable from "../../component/structuralSteelTable/Table.jsx";
import { Link, useLocation } from "react-router-dom";
import makeRequesInstance from "../../utils/makeRequest.js";
import { Context } from "../../context/Context.js";
const Measurement = () => {
  const search = new URLSearchParams(useLocation().search);
  const [contractItems, setContractItems] = useState([]);
  const projectName = search.get("projectname");
  const projectId = search.get("projectId");
  const billname = search.get("billName");
  const billId = search.get("billId");
  const initialState = {
    value: "",
    unit: "",
    label: "",
    stdUnit: 0,
    exist: false,
  };
  const { type, setType, contractItemValues, setContractItemValues } =
    useContext(Context);

  useEffect(() => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    const getContractItems = async () => {
      const res = await makeRequest.get(
        `ContractItem/GetByProjectId?projectId=${projectId}&page=${1}&pageSize=${100}`
      );
      if (res.status === 200) {
        setContractItems(res.data.items);
      }
    };
    getContractItems();
  }, [projectId]);

  useEffect(() => {
    const initialState={
      value: "",
      unit: "",
      label: "",
      stdUnit: 0,
      exist: false
    }
    if (contractItemValues?.stdUnit === 7 && type !== 3) {
      setType(3);
      setContractItemValues(initialState);
    } else if (
      (contractItemValues?.stdUnit === 1 ||
        contractItemValues?.stdUnit === 2 ||
        contractItemValues?.stdUnit === 3) &&
      type !== 1
    ) {
      setType(1);
      setContractItemValues(initialState);
    }
  }, [contractItemValues?.stdUnit, type, setType,setContractItemValues]);

  return (
    <div>
      <div className="measurement-main-container">
        <div className="measurement-left">
          <Sidebar id={2} />
        </div>
        <div className="measurement-right">
          <div className="measurement-top">
            <div className="measurement-path">
              <Link to={`/project`} className="bill-link">
                Projects/
              </Link>
              <Link to={`/project/${projectId}`} className="bill-link">
                {projectName[0].toUpperCase() + projectName.slice(1)}{" "}
              </Link>
              /
              <Link
                to={`/bills?projectid=${projectId}?projectname=${projectName}`}
                className="bill-link"
              >
                Bills/
              </Link>
              <span>{billname[0].toUpperCase() + billname.slice(1)}</span>
            </div>
          </div>
          <div className="measurement-middle">
            <div className="types-con">
              <div
                className={`type ${type === 1 && "selected"}`}
                onClick={() => {
                  setType(1);
                  setContractItemValues(initialState);
                }}
              >
                MeasurementBook
              </div>
              <div className={`type ${type === 2 && "selected"}`}>
                R/F Steel MeasurementBook
              </div>
              <div
                className={`type ${type === 3 && "selected"}`}
                onClick={() => {
                  setType(3);
                  setContractItemValues(initialState);
                }}
              >
                Structural Steel MeasurementBook
              </div>
            </div>
          </div>
          <div className="measurement-footer">
            {type === 1 && (
              <MeasurementBook
                billId={billId}
                projectId={projectId}
                contractItems={contractItems}
                contractItemValues={contractItemValues}
                setContractItemValues={setContractItemValues}
                initialState={initialState}
              />
            )}
            {/* {type === 2 && (
              <MeasurementBook billId={billId} projectId={projectId} />
            )} */}
            {type === 3 && (
              <StructuralSteelTable
                billId={billId}
                projectId={projectId}
                contractItems={contractItems}
                contractItemValues={contractItemValues}
                setContractItemValues={setContractItemValues}
                initialState={initialState}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurement;
