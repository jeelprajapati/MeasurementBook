import React, { useEffect, useState } from "react";
import "./SingleProject.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Table from "../../component/table/Table";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Excel from "../../component/excel/Excel";
import Popup from "../../component/popup/Popup";
import makeRequesInstance from "../../makeRequest";
import { faArrowRightLong, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SingleProject = () => {
  const [open, setOpen] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [change, setChange] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState(null);
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

  const handlePopUP = (e) => {
    setInput(e);
    setUpdate(true);
    setPopUp(true);
  };
  return (
    <div>
      <div className="single-container">
        <div className="single-left">
          <Sidebar id={2} />
        </div>
        <div className="single-right">
          <div className={`contract-top ${popUp && "blur"}`}>
            <div className={`path ${open && "blur"}`}>
              <Link to={`/project`} className="bill-link">
                Projects/
              </Link>
              {data?.projectName[0]?.toUpperCase() +
                data?.projectName?.slice(1)}
            </div>
          </div>
          <div className={`contract-middle ${popUp && "blur"}`}>
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
            <div className={`goto ${open && "blur"}`}>
              {!popUp ? <Link
                to={`/bills?projectid=${data?.id}?projectname=${data?.projectName}`}
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
              </Link> : <button
                  disabled
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <span>Goto Bills</span>
                  <FontAwesomeIcon icon={faArrowRightLong} className="arrow" />
                </button>}
            </div>
            <div className="edit-btn">
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => handlePopUP(data)}
                />
              </div>
          </div>
          <div className={`contract-footer ${popUp && "blur"}`}>
            <div className={`table-container ${popUp && "blur"}`}>
              <div className="single-page-container">
                <h3 className="table-title">Contract Item</h3>
                <button
                  className="excel-btn"
                  disabled={popUp}
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
          {popUp && (
              <Popup
                setPopUp={setPopUp}
                setChange={setChange}
                change={change}
                input={input}
                update={Update}
                setUpdate={setUpdate}
              />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
