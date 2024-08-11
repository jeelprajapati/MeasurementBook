import React, { useEffect, useState } from "react";
import "./singleProject.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Table from "../../component/contractItemTable/Table.jsx";
import { Link, useLocation } from "react-router-dom";
import Excel from "../../component/excel/Excel";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
import { getUnit } from "../../actions/standard.js";
import { getProject } from "../../actions/project.js";
import useRedirect from "../../hooks/useRedirect.js";
const SingleProject = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(0);
  const [unit, setUnit] = useState([]);
  const id = useLocation().pathname.split("/")[2];
  
  //redirect to login when token and organizationId is Not exist
  useRedirect();
  
  useEffect(() => {
    getProject(id, (data) => {
      setData(data);
    });
  }, [id]);

  useEffect(() => {
    getUnit((data) => {
      setUnit(data);
    });
  }, []);

  return (
    <div>
      <div className="singleProjectContainer">
        <div className="singleProjectLeft">
          <Sidebar id={2} />
        </div>
        <div className="singleProjectRight">
          <div className="contractItemTop">
            <BreadCrumbs type={"conractItem"} />
          </div>
          <div className="contractItemMiddle">
            <div className="titleIconWrapper">
              <h3 className={`contractItemTitle ${open && "blur"}`}>
                Project Detail
              </h3>
            </div>
            {
              <div className={`detailBox ${open && "blur"}`}>
                <div className="entity">
                  <span style={{ flex: "0.8" }}>Project</span>
                  <span style={{ flex: "0.1" }}>:</span>
                  <span style={{ flex: "8" }}>{data?.projectName}</span>
                </div>
                <div className="entity">
                  <span style={{ flex: "0.8" }}>Client</span>
                  <span style={{ flex: "0.1" }}>:</span>
                  <span style={{ flex: "9" }}>{data?.clientName}</span>
                </div>
              </div>
            }
            <div className="goto">
              <Link
                to={`/bills?projectId=${data?.id}&projectName=${data?.projectName}`}
                className="link"
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <span>Goto Bills</span>
                  <FontAwesomeIcon icon={faArrowRightLong} className="arrow" />
                </button>
              </Link>
            </div>
          </div>
          <div className="contractItemFooter">
            <div className="contractItemTableContainer">
              <div className="singleProjectWrapper">
                <h3>Contract Item</h3>
                <button
                  className="addExcelButton"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add Excel
                </button>
              </div>
              <Table
                projectId={id}
                change={change}
                setChange={setChange}
                unit={unit}
              />
            </div>
          </div>
          {open && (
            <Excel
              setOpen={setOpen}
              projectId={id}
              setChange={setChange}
              change={change}
              unit={unit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
