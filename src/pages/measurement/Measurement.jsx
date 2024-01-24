import React, { useContext, useEffect, useState } from "react";
import "./measurement.css";
import Sidebar from "../../component/sidebar/Sidebar";
import MeasurementBook from "../../component/measurementBookTable/Table.jsx";
import StructuralSteelTable from "../../component/structuralSteelTable/Table.jsx";
import { useLocation } from "react-router-dom";
import makeRequesInstance from "../../utils/makeRequest.js";
import { Context } from "../../context/Context.js";
import useFetch from "../../hooks/useFetch.js";
import ContractItemFilter from "../../component/filter/ContractItemFilter.jsx";
import TagFilter from "../../component/filter/TagFilter.jsx";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
const initialState = {
  value: "",
  unit: "",
  label: "",
  stdUnit: 0,
  exist: false,
};

const Measurement = () => {
  const search = new URLSearchParams(useLocation().search);
  const [contractItems, setContractItems] = useState([]);
  const projectName = search.get("projectname");
  const projectId = search.get("projectId");
  const billname = search.get("billName");
  const billId = search.get("billId");
  const [contractItemFilter, setContractItemFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  
  const pathData = [
    { name: "Projects", to: "/project" },
    { name: projectName, to: `/project/${projectId}` },
    {
      name: "Bills",
      to: `/bills?projectid=${projectId}&projectname=${projectName}`,
    },
    { name: billname, to: null },
  ];

  const { loding, data } = useFetch({
    url: `Project/GetTagsByProjectId?projectId=${projectId}`,
    change: 0,
  });
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
    if (contractItemValues?.stdUnit === 7 && type !== 3) {
      setType(3);
      setContractItemValues(initialState);
    } else if (
      (contractItemValues?.stdUnit === 1 ||
        contractItemValues?.stdUnit === 2 ||
        contractItemValues?.stdUnit === 3 ||
        contractItemValues?.stdUnit === 4) &&
      type !== 1
    ) {
      setType(1);
      setContractItemValues(initialState);
    }
  }, [contractItemValues?.stdUnit, type, setType, setContractItemValues]);

  const handleClear = () => {
    if (tagFilter.length !== 0 || contractItemFilter.length !== 0) {
      setTagFilter([]);
      setContractItemFilter([]);
    }
  };

  return (
    <div>
      <div className="measurementMainContainer">
        <div className="measurementLeft">
          <Sidebar id={2} />
        </div>
        <div className="measurementRight">
          <div className="measurementTop">
            <BreadCrumbs pathData={pathData}/>
          </div>
          <div className="measurementMiddle">
            <div className="typesCon">
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
          <div className="measurementFooter">
            <div className="measurementFilter">
              <ContractItemFilter
                item={contractItems}
                filter={contractItemFilter}
                setFilter={setContractItemFilter}
              />
              <TagFilter
                item={data}
                filter={tagFilter}
                setFilter={setTagFilter}
              />
              <span className="clear" onClick={handleClear}>
                Clear All
              </span>
            </div>
            {type === 1 && (
              <MeasurementBook
                billId={billId}
                projectId={projectId}
                contractItems={contractItems}
                contractItemValues={contractItemValues}
                setContractItemValues={setContractItemValues}
                initialState={initialState}
                allTag={data}
                loding={loding}
                tagFilter={tagFilter}
                contractItemFilter={contractItemFilter}
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
                allTag={data}
                loding={loding}
                tagFilter={tagFilter}
                contractItemFilter={contractItemFilter}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurement;
