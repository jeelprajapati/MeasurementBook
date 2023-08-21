import React, { useEffect, useState } from "react";
import "./SingleProject.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import pencil from "../../image/edit.svg";
import arrow from "../../image/arrow.svg";
import Table from "../../component/table/Table";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Excel from "../../component/excel/Excel";
import Popup from "../../component/popup/Popup";
const SingleProject = () => {
  const [open, setOpen] = useState(false);
  const [Update,setUpdate]=useState(false)
  const [change, setChange] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const Id = localStorage.getItem("organizationId");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  }, [navigate, token, Id]);
  const id = useLocation().pathname.split("/")[2];
  const { loding, error, data } = useFetch({ url: `/Project/${id}`, change });

  const handlePopUP = (e) => {
    setInput(e);
    setUpdate(true)
    setPopUp(true);
  };
  return (
    <div>
      <div className="single-container">
        <div className="single-left">
          <Sidebar id={2} />
        </div>
        <div className="single-right">
          <div className={`${open ? "path blur" : "path"}`}>
            <Link to={`/project`} className="bill-link">
              PROJECT/
            </Link>
            {data?.projectName?.toUpperCase()}
          </div>
          <h3 className={`${open ? "pro-title blur" : "pro-title"}`}>
            Project Detail
          </h3>
          {!loding && (
            <div className={`${open ? "detail-box blur" : "detail-box"}`}>
              <div className="entity">
                <span>Contract No</span>
                <span>:</span>
                <span>{data?.contractNo}</span>
              </div>
              <div className="entity">
                <span>Project</span>
                <span>:</span>
                <span>{data?.projectName}</span>
              </div>
              <div className="entity">
                <span>Client</span>
                <span>:</span>
                <span>{data?.clientId}</span>
              </div>
              <div className="entity">
                <span>Contract Date</span>
                <span>:</span>
                <span>{data?.contractDate}</span>
              </div>
              <div className="entity">
                <span>Contract Validity</span>
                <span>:</span>
                <span>{data?.contractValidity} Days</span>
              </div>
              <div className="edit-btn">
                <img
                  className="edit-img"
                  onClick={() => handlePopUP(data)}
                  src={pencil}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className={`${open ? "goto blur" : "goto"}`}>
            <Link
              to={`/bills?projectid=${data?.id}?projectname=${data?.projectName}`}
              className="link">
              <button>
                Goto bills
                <img src={arrow} className="arrow" alt="" />
              </button>
            </Link>
          </div>
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
              <Table Id={id} change={change} setChange={setChange}/>
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
