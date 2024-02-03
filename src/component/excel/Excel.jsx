import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./excel.css";
import { Link } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addContractItemRange } from "../../actions/contractItem.js";
import toast from "react-hot-toast";
const Excel = ({ setOpen, projectId, setChange, change, unit }) => {
  const [data, setData] = useState(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (file && fileType.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        setData(e.target.result);
      };
    } else {
      alert.show("please select excel file", { type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data !== null) {
      const workbook = XLSX.read(data, { type: "buffer" });
      const workSheetname = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[workSheetname];
      const items = XLSX.utils.sheet_to_json(worksheet);
      items.forEach((element) => {
        element.id = "cd6e4169-6b5d-4178-86cc-a4a9ec317439";
        element.sortedAfter = "cd6e4169-6b5d-4178-86cc-a4a9ec317439";
        element.projectId = `${projectId}`;
      });
      const newarray = items.map((obj) => {
        const { __rowNum__, ...other } = obj;
        return {
          sorNo: other["Item Code"],
          item: other["Description*"],
          hsn: other["HSN"] || 0,
          poQty: other["Work Order Quantity*"],
          stdUnitId: unit.find((i) => i?.name === other["Measure Type*"])?.id,
          unit: other["UOM*"],
          rate: other["Rate"] || 0,
          projectId: `${projectId}`,
        };
      });
      
      addContractItemRange(newarray,projectId,()=>{
        toast.success("Data Added Successfully");
        setOpen(false);
        setChange(!change);
      })
    }
  };
  return (
    <div className="excel-container">
      <label className="excel-label">Select Excel File </label>
      <input type="file" onChange={handleFile} className="excel-input" />
      <div className="excel-button-container">
        <button className="excel-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <span className="excel-red">
        Download Reference Excel Format:{" "}
        <Link to="https://docs.google.com/spreadsheets/d/e/2PACX-1vQtekg2bf5eHdBdmpD2pWtDykbjJ7-3aX9aheH2jRR89zflLKIVvnfCKTedsqu9IwaJ0LzW5JNrCeof/pub?output=xlsx">
          https://docs.google.com/spreadsheets/d/e/2PACX-1vQtekg2bf5eHdBdmpD2pWtDykbjJ7-3aX9aheH2jRR89zflLKIVvnfCKTedsqu9IwaJ0LzW5JNrCeof/pub?output=xlsx
        </Link>
      </span>
      <FontAwesomeIcon
        icon={faXmark}
        className="excel-img"
        onClick={() => setOpen(false)}
      />
    </div>
  );
};

export default Excel;
