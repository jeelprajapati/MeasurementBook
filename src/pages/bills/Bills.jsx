import React, { useState } from "react";
import "./bills.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Billpopup from "../../component/billPopup/BillPopup.jsx";
import { Link, useLocation } from "react-router-dom";
import Billcard from "../../component/billCard/BillCard.jsx";
import useFetch from "../../hooks/useFetch";

const Bills = () => {
  const search = new URLSearchParams(useLocation()?.search);
  const projectId = search?.get("projectid");
  const projectName = search?.get("projectname");
  const [open, setOpen] = useState("");
  const [change, setChange] = useState(0);
  const [item, setItem] = useState({
    name: "",
    invoiceDate: "",
    typeBill: "",
    status: "",
  });
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
            <div className={`bill-top ${open !== "" && "blur"}`}>
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
              <div className={`bill-middle ${open !== "" && "blur"}`}>
                <div
                  className={`bill-wrapper  ${
                    data?.items?.length >= 3 ? "grid" : "flexbox"
                  }`}
                >
                  <div className="add-card" onClick={() => setOpen("add")}>
                    +
                  </div>
                  {data?.items?.map((item) => (
                    <Billcard
                      key={item?.id}
                      setOpen={setOpen}
                      setItem={setItem}
                      item={item}
                      projectName={projectName}
                      Id={projectId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {(open === "update" || open === "add") && (
            <Billpopup
              setOpen={setOpen}
              item={item}
              setItem={setItem}
              setChange={setChange}
              change={change}
              open={open}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;
