import React from "react";
import "./billCard.css";
import makeRequesInstance from "../../utils/makeRequest";
import xls from "../../assets/image/xls.svg";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import {
  faArrowRightToBracket,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "react-alert";

const Billcard = ({ item, projectName, projectId, setInputType,setInitialValues }) => {
  const alert = useAlert();
  const handleClick = () => {
    setInitialValues(item);
    setInputType({type:"UPDATE",credential:true});
  };

  const downloadExcelFile = async (billId, billName) => {
    const makeRequest = makeRequesInstance(localStorage.getItem("token"));
    try {
      const res = await makeRequest.get(
        `Project/GenerateStandardExcelReport?billId=${billId}`,
        { responseType: "blob" }
      );
      saveAs(res.data, billName);
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "error" });
      } else {
        alert.show("something went wrong", { type: "info" });
      }
    }
  };

  return (
    <>
      <div className="billCardContainer">
        <div className="editWrapper">
          <div className="editButton" onClick={handleClick}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
        <div className="billCardWrapper">
          <div className="billCardTop">
            <div className="billCardBatch">
              <h3>{item.typeBill === 1 ? "RA" : "Final"}</h3>
              <span
                className={`${
                  item?.status === 1
                    ? "batch"
                    : item?.status === 2
                    ? "batch submit"
                    : "batch accept"
                }`}
              >
                {item?.status === 1
                  ? "Draft"
                  : item?.status === 2
                  ? "Submitted"
                  : "Accepted"}
              </span>
            </div>
            <span className="billCardDesc">
              {item?.name?.length >= 15
                ? `${item?.name?.slice(0, 15)}...`
                : item?.name}
            </span>
          </div>
          <div className="billCardDate">
            <span className="billCardLabel">Invoice Date</span>
            <span className="billCardValue">
              {item?.invoiceDate
                ?.split("T")[0]
                ?.split("-")
                ?.slice(0)
                ?.reverse()
                ?.join(".")}
            </span>
          </div>
          <div className="billCardDate">
            <span className="billCardLabel">Invoice Value</span>
            <span className="billCardValue">
              ₹{" "}
              {item?.invoiceValue?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="reports">
            <span className="billCardLabel">Reports</span>
            <div className="reportType">
              <img
                src={xls}
                alt=""
                onClick={() => downloadExcelFile(item?.id, item?.name)}
              />
            </div>
          </div>
          <div className="billCardButton">
            {item?.status === 1 ? (
              <Link
                className="link"
                style={{ width: "100%" }}
                to={`/measurementbook?billId=${item?.id}&projectId=${projectId}&projectname=${projectName}&billName=${item?.name}`}
              >
                <button>
                  Measurement <FontAwesomeIcon icon={faArrowRightToBracket} />
                </button>
              </Link>
            ) : (
              <button
                disabled
                title={`This bill have ${
                  item?.status === 2 ? "submitted" : "accepted"
                }`}
              >
                Measurement
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Billcard;
