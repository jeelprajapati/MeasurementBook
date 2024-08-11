import React, { useEffect, useState } from "react";
import "./measurement.css";
import Sidebar from "../../component/sidebar/Sidebar";
import MeasurementBook from "../../component/measurementBookTable/Table.jsx";
import StructuralSteelTable from "../../component/structuralSteelTable/Table.jsx";
import { useLocation } from "react-router-dom";
import ContractItemFilter from "../../component/filter/ContractItemFilter.jsx";
import TagFilter from "../../component/filter/TagFilter.jsx";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
import useRedirect from "../../hooks/useRedirect.js";
import { getContractItem } from "../../actions/contractItem.js";
import { getTagsByProject } from "../../actions/project.js";
import { useDispatch, useSelector } from "react-redux";
import { addTags } from "../../redux/slice/tagSlice.js";
import { setInitialState } from "../../redux/slice/contractItemSlice.js";

const Measurement = () => {
  const search = new URLSearchParams(useLocation().search);
  const [contractItems, setContractItems] = useState([]);
  const projectId = search.get("projectId");
  const billId = search.get("billId");
  const [contractItemFilter, setContractItemFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [type, setType] = useState(1);
  const dispatch = useDispatch();
  const contractItem=useSelector((state)=>state.contractItem.contractItem);

  //redirect to login when token and organizationId is Not exist
  useRedirect();

  useEffect(()=>{
    dispatch(setInitialState());
  },[dispatch])
  
  useEffect(()=>{
    if([1,2,3,4].includes(contractItem?.stdUnit) && type!==1){
      setType(1);
    }else if(contractItem?.stdUnit===7 && type!==2){
      setType(3)
    }
  },[contractItem?.stdUnit,type])

  useEffect(() => {
    getContractItem(projectId, 100, (data) => {
      setContractItems(data.items);
    });
  }, [projectId]);

  useEffect(() => {
    getTagsByProject(projectId, (data) => {
      dispatch(addTags({ tags: data }));
    });
  }, [projectId, dispatch]);

  const handleClear = () => {
    if (tagFilter.length !== 0 || contractItemFilter.length !== 0) {
      setTagFilter([]);
      setContractItemFilter([]);
    }
  };

  const handleType = (type) => {
    setType(type);
    dispatch(setInitialState());
    handleClear();
  };
  
  return (
    <div>
      <div className="measurementMainContainer">
        <div className="measurementLeft">
          <Sidebar id={2} />
        </div>
        <div className="measurementRight">
          <div className="measurementTop">
            <BreadCrumbs type={"measurementBook"} />
          </div>
          <div className="measurementMiddle">
            <div className="typesCon">
              <div
                className={`type ${type === 1 && "selected"}`}
                onClick={() => handleType(1)}
              >
                MeasurementBook
              </div>
              <div className={`type ${type === 2 && "selected"}`}>
                R/F Steel MeasurementBook
              </div>
              <div
                className={`type ${type === 3 && "selected"}`}
                onClick={() => handleType(3)}
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
                contractItems={contractItems}
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
                contractItems={contractItems}
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
