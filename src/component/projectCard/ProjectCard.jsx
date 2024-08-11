import React, { useState, useRef } from "react";
import "./projectCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import report from '../../assets/image/report.svg'
import useClickOutside from "../../hooks/useclickOutside";
const Projectcard = ({ item,setInitialValues,setInputType }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useClickOutside(ref,()=>{
    if(open){
      setOpen(false)
    }
  })

  const handleUpdate=()=>{
    setInitialValues(item);
    setInputType({type:"UPDATE",credential:true});
  }

  return (
    <div className="projectCardContainer">
      <div className="projectCardSetting" ref={ref}>
        <div
          className="settingIcon"
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        {open && (
          <div className="listItems">
            <div className="itemName" onClick={handleUpdate}>
              <FontAwesomeIcon icon={faPencil} />
              <span>Edit</span>
            </div>
            <div className="itemName">
              <img src={report} alt="" />
              <span>Reports</span>
            </div>
          </div>
        )}
      </div>
      <div className="projectCardBody">
        <div className="projectCardTop">
          <h3>
            {item?.projectName?.length > 23
              ? `${item?.projectName?.slice(0, 24)}..`
              : item?.projectName}
          </h3>
          <div className="projectCardDesc">
            {item?.clientName?.length > 30
              ? `${item?.clientName?.slice(0, 31)}..`
              : item?.clientName}
          </div>
        </div>
        <div className="projectCardWrapper">
          <div className="projectCardLabel">Project Value</div>
          <div className="projectCardValue">
            ₹{" "}
            {item?.projectValue?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="projectCardWrapper">
          <div className="projectCardLabel">Executed Value</div>
          <div className="projectCardValue">
            ₹{" "}
            {item?.executedValue?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="projectCardButton">
          <Link
            to={`/project/${item?.id}?projectName=${item?.projectName}`}
            className="link"
            style={{ width: "100%" }}
          >
            <button>Work on project</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projectcard;
