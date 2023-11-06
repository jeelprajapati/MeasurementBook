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
      const orgId=localStorage.getItem("organizationId");
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.get(
        `Client?page=${1}&pageSize=${100}&organizationId=${orgId}`
      );
      setClient(res.data.items);
    };
    getClient();
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
        <div className='single-right'>
          <div className={`${popUp?'contract-top blur':'contract-top'}`}>
            <div className={`${open ? "path blur" : "path"}`}>
              <Link to={`/project`} className="bill-link">
                Projects/
              </Link>
              {data?.projectName[0]?.toUpperCase()+(data?.projectName)?.slice(1)}
            </div>
          </div>
          <div className={`${popUp?'contract-middle blur':'contract-middle'}`}>
            <h3 className={`${open ? "contract-title blur" : "contract-title"}`}>
              Project Detail
            </h3>
            {!loding && (
              <div className={`${open ? "detail-box blur" : "detail-box"}`}>
                <div className="entity">
                  <span>Project</span>
                  <span>:</span>
                  <span>{data?.projectName}</span>
                </div>
                <div className="entity">
                  <span>Client</span>
                  <span>:</span>
                  <span>
                    {
                      client?.filter((item) => item?.id === data?.clientId)[0]
                        ?.name
                    }
                  </span>
                </div>
                <div className="edit-btn">
                 <FontAwesomeIcon icon={faPencil} onClick={() => handlePopUP(data)}/>
                </div>
              </div>
            )}
            <div className={`${open ? "goto blur" : "goto"}`}>
              <Link
                to={`/bills?projectid=${data?.id}?projectname=${data?.projectName}`}
                className="link"
              >
                <button style={{display:'flex',alignItems:'center',gap:'3px'}}>
                  <span>Goto Bills</span>
                  <FontAwesomeIcon icon={faArrowRightLong} className="arrow" />
                </button>
              </Link>
            </div>
          </div>
          <div className={`${popUp?'contract-footer blur':'contract-footer'}`}>
            <div
              className={`${open ? "table-container blur" : "table-container"}`}
            >
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
              <div className="table">
                <Table Id={id} change={change} setChange={setChange} />
              </div>
            </div>
          </div>
          {open && (
            <div className="excel-popup">
              <Excel
                setOpen={setOpen}
                projectId={id}
                setChange={setChange}
                change={change}
              />
            </div>
          )}
          {popUp && (
            <div className="popup">
              <Popup
                setPopUp={setPopUp}
                setChange={setChange}
                change={change}
                input={input}
                update={Update}
                setUpdate={setUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
