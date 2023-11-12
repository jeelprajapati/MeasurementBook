import React from "react";
import './Billcard.css'
import makeRequesInstance from "../../makeRequest";
import pdf from '../../image/pdf-file.svg'
import xls from '../../image/xls.svg'
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';
import { faArrowRightToBracket, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "react-alert";

const Billcard = ({item,projectname,Id,setItem,setOpen}) => {
  const alert=useAlert();
  const handleClick=()=>{
    setItem(item);
    setOpen('update');
  };

  const downloadExcelFile = async(billId, billName) => {
    const makeRequest=makeRequesInstance(localStorage.getItem('token'))
    try {
      const res=await makeRequest.get(`Project/GenerateStandardExcelReport?billId=${billId}`,{responseType:'blob'});
      saveAs(res.data, billName);
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "error" });
      } else {
        alert.show("something went wrong", { type: "info" });
      }
    } 
  }
 
  return (
    <>
    <div className="billcard-container">
      <div className="edit-wrapper">
      <div className="edit-button" onClick={handleClick}>
        <FontAwesomeIcon icon={faPencil} />
      </div>
      </div>
      <div className="wrapper-card">
      <div className="card-top">
        <div className="card-title-batch">
          <h3>{item?.name?.length>=15 ? `${item?.name?.slice(0,15)}...` : item?.name}</h3>
          <span className={`${item?.status===1 ? 'batch' : item?.status===2 ? 'batch submit' : 'batch accept'}`}>{item?.status===1 ? "Draft" : item?.status===2 ? "Submitted" : "Accepted"}</span>
        </div>
        <span className="desc">Phase 1 work till plinth level for block A,B & G</span>
      </div>
      <div className="card-date">
        <span className="card-label">Invoice Date</span>
        <span className="card-value">{item?.invoiceDate?.split('T')[0].split('-')?.slice(0).reverse()?.join('.')}</span>
      </div>
      <div className="card-date">
        <span className="card-label">Invoice Value</span>
        <span className="card-value">₹ {item?.invoiceValue.toFixed(2)}</span>
      </div>
      <div className="reports">
        <span className="card-label">Reports</span>
        <div className="pdf-type">
          <img src={pdf} alt="" />
          <img src={xls} alt="" onClick={() => downloadExcelFile(item?.id, item?.name)}/>
        </div>
      </div>
      <div className="measurement-button">
        {item?.status===1 ? 
        <Link className="link" style={{width:'100%'}} to={`/measurementbook?billId=${item?.id}?projectId=${Id}?projectname=${projectname}?billname=${item?.name}`}>
        <button>Measurement <FontAwesomeIcon icon={faArrowRightToBracket} /></button>
        </Link> : <button disabled title={`This bill have ${item?.status===2 ? 'submitted' : 'accepted'}`}>
          Measurement<FontAwesomeIcon icon={faArrowRightToBracket} />
        </button>}
      </div>
      </div>
    </div>
    </>
  );
};

export default Billcard;
