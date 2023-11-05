import React from "react";
import './Billcard.css'
import pdf from '../../image/pdf-file.svg'
import xls from '../../image/xls.svg'
import book from '../../image/Vector.svg'
import edit from '../../image/edit2.svg'
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from 'file-saver';

const Billcard = ({item,projectname,Id,setInput,setItem,setOpen}) => {
  const handleClick=()=>{
    setItem(item);
    setInput(true);
    setOpen(true)
  };

  const downloadExcelFile = (billId, billName) => {
    const token = localStorage.getItem('token');
    axios({
      method: 'get',
      url: `https://dev-api.measurekaro.com/api/Project/GenerateStandardExcelReport?billId=${billId}`,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(blob => {
        saveAs(blob.data, billName);
     })
    .catch((error) => {
    });
  };
 
  return (
    <>
    <div className="billcard-container">
      <div className="edit-wrapper">
      <div className="edit-button" onClick={handleClick}>
        <img src={edit} alt="" />
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
        <span className="card-value">{item?.invoiceNo}</span>
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
        <Link className="link" style={{width:'90%'}} to={`/measurementbook?billId=${item?.id}?projectId=${Id}?projectname=${projectname}?billname=${item?.name}`}>
        <button>Measurement Book <img src={book} alt="" /></button>
        </Link> : <button disabled title={`This bill have ${item?.status===2 ? 'submitted' : 'accepted'}`}>
          Measurement Book <img src={book} alt="" />
        </button>}
      </div>
      </div>
    </div>
    </>
  );
};

export default Billcard;
