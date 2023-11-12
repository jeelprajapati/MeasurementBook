import React, { useState, useRef, useEffect } from "react";
import "./Projectcard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
const Projectcard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="projectcard-con">
      <div className="projectcard-sub1" ref={ref}>
        <div
          className="dot-list"
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        {open && (
          <div className="list-item">
            <div className="item-name-img">
              <FontAwesomeIcon icon={faPencil} />
              <span>Edit</span>
            </div>
            <div className="item-name-img">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.42222V1.46667C1 1.20893 1.20893 1 1.46667 1H5.97778C6.23551 1 6.44444 1.20893 6.44444 1.46667V4.42222C6.44444 4.67995 6.23551 4.88889 5.97778 4.88889H1.46667C1.20893 4.88889 1 4.67995 1 4.42222Z"
                  stroke="black"
                />
                <path
                  d="M9.55566 14.5333V11.5778C9.55566 11.32 9.76458 11.1111 10.0223 11.1111H14.5334C14.7912 11.1111 15.0001 11.32 15.0001 11.5778V14.5333C15.0001 14.7911 14.7912 15 14.5334 15H10.0223C9.76458 15 9.55566 14.7911 9.55566 14.5333Z"
                  stroke="black"
                />
                <path
                  d="M9.55566 8.31111V1.46667C9.55566 1.20893 9.76458 1 10.0223 1H14.5334C14.7912 1 15.0001 1.20893 15.0001 1.46667V8.31111C15.0001 8.56887 14.7912 8.77778 14.5334 8.77778H10.0223C9.76458 8.77778 9.55566 8.56887 9.55566 8.31111Z"
                  stroke="black"
                />
                <path
                  d="M1 14.5333V7.68883C1 7.43108 1.20893 7.22217 1.46667 7.22217H5.97778C6.23551 7.22217 6.44444 7.43108 6.44444 7.68883V14.5333C6.44444 14.791 6.23551 14.9999 5.97778 14.9999H1.46667C1.20893 14.9999 1 14.791 1 14.5333Z"
                  stroke="black"
                />
              </svg>
              <span>Reports</span>
            </div>
          </div>
        )}
      </div>
      <div className="projectcard-sub2">
        <div className="projectcard-top">
          <h3>
            {item?.projectName?.length > 23
              ? `${item?.projectName?.slice(0, 24)}..`
              : item?.projectName}
          </h3>
          <div className="projectcard-desc">
            AGC at uelarn to cequcem, aerae, & ceseresn
          </div>
        </div>
        <div className="label-value">
          <div className="projectcard-label">Project Value</div>
          <div className="projectcard-value">₹ {item?.projectValue.toFixed(2)}</div>
        </div>
        <div className="label-value">
          <div className="projectcard-label">Executed Value</div>
          <div className="projectcard-value">₹ {item?.executedValue.toFixed(2)}</div>
        </div>
        <div className="projectcard-button">
          <Link
            to={`/project/${item?.id}`}
            className="link"
            style={{ width: "100%" }}
          >
            <button>
              Work on project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projectcard;
