import React, { useState } from "react";
import "./Bills.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Billpopup from "../../component/billPopup/Billpopup";
import { Link, useLocation } from "react-router-dom";
import Billcard from "../../component/billCard/Billcard";
import useFetch from "../../hooks/useFetch";

const Bills = () => {
  const loaction = useLocation().search.split("?");
  const projectId = loaction[1].split("=")[1];
  const projectname = loaction[2].split("=")[1].replaceAll("%20", " ");
  const [open, setOpen] = useState("");
  const [change, setChange] = useState(0);
  const [item, setItem] = useState({
    name: "",
    invoiceDate: "",
    typeBill: "",
    status: "",
  });
  const { loding, data } = useFetch({
    url: `/Bill/GetByProjectId?page=${1}&pageSize=${100}&projectId=${projectId}`,
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
                  {projectname[0].toUpperCase() + projectname.slice(1)} /{" "}
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
                      projectname={projectname}
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
