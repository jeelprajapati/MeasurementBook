import React, { useEffect, useState } from "react";
import "./singleProject.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Table from "../../component/contractItem/ContractItem.jsx";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Excel from "../../component/excel/Excel";
import makeRequesInstance from "../../utils/makeRequest.js";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SingleProject = () => {
  const [open, setOpen] = useState(false);
  // const [Update, setUpdate] = useState(false);
  const [change, setChange] = useState(0);
  const [client, setClient] = useState(null);
  const [unit,setUnit]=useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const Id = localStorage.getItem("organizationId");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  }, [navigate, token, Id]);
  const id = useLocation().pathname.split("/")[2];
  const { loding, data } = useFetch({ url: `/Project/${id}`, change });
  useEffect(() => {
    const getClient = async () => {
      const orgId = localStorage.getItem("organizationId");
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get(
        `Client?page=${1}&pageSize=${100}&organizationId=${orgId}`
      );
      setClient(res.data.items);
    };
    getClient();
  }, []);

  useEffect(() => {
    const getUnit = async () => {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get("/Standard/GetStandardUnit");
      setUnit(res.data);
    };
    getUnit();
  }, []);

  return (
    <div>
      <div className="single-container">
        <div className="single-left">
          <Sidebar id={2} />
        </div>
        <div className="single-right">
          <div className="contract-top">
            <div className="path">
              <Link to={`/project`} className="bill-link">
                Projects/
              </Link>
              {data?.projectName[0]?.toUpperCase() +
                data?.projectName?.slice(1)}
            </div>
          </div>
          <div className="contract-middle">
            <div className="title-icon-wrapper">
              <h3 className={`contract-title ${open && "blur"}`}>
                Project Detail
              </h3>
            </div>
            {!loding && (
              <div className={`detail-box ${open && "blur"}`}>
                <div className="entity">
                  <span style={{flex:'0.8'}}>Project</span>
                  <span style={{flex:'0.1'}}>:</span>
                  <span style={{flex:'8'}}>{data?.projectName}</span>
                </div>
                <div className="entity">
                  <span style={{flex:'0.8'}}>Client</span>
                  <span style={{flex:'0.1'}}>:</span>
                  <span style={{flex:'9'}}>
                    {
                      client?.filter((item) => item?.id === data?.clientId)[0]
                        ?.name
                    }
                  </span>
                </div>
              </div>
            )}
            <div className="goto">
              <Link
                to={`/bills?projectid=${data?.id}&projectname=${data?.projectName}`}
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
          <div className="contract-footer">
            <div className="table-container">
              <div className="single-page-container">
                <h3 className="table-title">Contract Item</h3>
                <button
                  className="excel-btn"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add Excel
                </button>
              </div>
                <Table Id={id} change={change} setChange={setChange} unit={unit} />
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
