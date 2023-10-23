import React from "react";
import './Billcard.css'
import pdf from '../../image/pdf-file.svg'
import xls from '../../image/xls.svg'
import book from '../../image/book.svg'
import edit from '../../image/edit.svg'
const Billcard = ({item}) => {
  return (
    <div className="billcard-container">
      <div className="card-top">
        <div className="card-title-batch">
          <h3>{item?.name}</h3>
          <span className="batch">{item?.status===1 ? "Draft" : item?.status===2 ? "Submitted" : "Accepted"}</span>
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
          <img src={xls} alt="" />
        </div>
      </div>
      <div className="measurement-button">
        <button>Measurement Book <img src={book} alt="" /></button>
      </div>
      <div className="edit-button">
        <img src={edit} alt="" />
      </div>
    </div>
  );
};

export default Billcard;
