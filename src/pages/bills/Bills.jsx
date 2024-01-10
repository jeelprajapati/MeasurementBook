import React, { useState } from "react";
import "./bills.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Billpopup from "../../component/billPopup/BillPopup.jsx";
import { Link, useLocation } from "react-router-dom";
import Billcard from "../../component/billCard/BillCard.jsx";
import useFetch from "../../hooks/useFetch";
const initialState={
  id:"00000000-0000-0000-0000-000000000000",
  invoiceNo: "INV-2023080428",
  name: "",
  invoiceDate: "",
  typeBill: "",
  status: "",
  invoiceValue: 0
}

const Bills = () => {
  const search = new URLSearchParams(useLocation()?.search);
  const projectId = search?.get("projectid");
  const projectName = search?.get("projectname");
  const [inputType, setInputType] = useState({type:"",credential:false});
  const [initialValues,setInitialValues]=useState(initialState);
  const [change, setChange] = useState(0);
  const { loding, data } = useFetch({
    url: `/Bill/GetByProjectId?page=${1}&pageSize=${50000}&projectId=${projectId}`,
    change,
  });
  return (
    <div>
      <div className="bill-main-container">
        <div className="bill-left">
          <Sidebar id={2} />
        </div>
        <div className="bill-right">
          <div className="right-content-wrapper">
            <div className={`bill-top ${inputType?.credential && "blur"}`}>
              <div className="bill-path">
                <Link to={`/project`} className="bill-link">
                  Projects
                </Link>
                /
                <Link to={`/project/${projectId}`} className="bill-link">
                  {projectName[0]?.toUpperCase() + projectName?.slice(1)} /{" "}
                </Link>{" "}
                <span>Bills</span>
              </div>
            </div>
            {!loding && (
              <div className={`bill-middle ${inputType?.credential && "blur"}`}>
                <div
                  className={`bill-wrapper  ${
                    data?.items?.length >= 3 ? "grid" : "flexbox"
                  }`}
                >
                  <div className="add-card" onClick={() => setInputType({type:"ADD",credential:true})}>
                    +
                  </div>
                  {data?.items?.map((item) => (
                    <Billcard
                      key={item?.id}
                      setInputType={setInputType}
                      setInitialValues={setInitialValues}
                      item={item}
                      projectName={projectName}
                      projectId={projectId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {inputType?.credential && (
            <Billpopup
              setInputType={setInputType}
              setInitialValues={setInitialValues}
              initialValues={initialValues}
              initialState={initialState}
              setChange={setChange}
              change={change}
              inputType={inputType}
              projectId={projectId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;
