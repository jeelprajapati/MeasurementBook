import React from "react";
import "./Billtable.css";
import edit from "../../image/edit.svg";
import deleteicon from "../../image/delete.svg";
import filesvg from "../../image/file.svg";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import makeRequesInstance from "../../makeRequest";
import { useAlert } from "react-alert";
const Billtable = ({ setOpen, change, setInput, setItem, setChange ,open }) => {
  const Id = useLocation().search.split("?")[1].split("=")[1];
  const alert = useAlert();
  const projectname = useLocation().search.split("?")[2].split("=")[1];
  const makeRequest = makeRequesInstance(localStorage.getItem("token"));
  const { loding, error, data } = useFetch({
    url: `/Bill/GetByProjectId?page=${1}&pageSize=${100}&projectId=${Id}`,
    change,
  });
  const handleUpdate = (e) => {
    setOpen(true);
    setInput(true);
    setItem(e);
  };
  const handleDelete = async (id) => {
    try {
      const res = await makeRequest.delete(`Bill/${id}`);
      if (res.status === 200) {
        alert.show("Deleted Sucessfully", { type: "success" });
        if (change === 0) {
          setChange(1);
        } else {
          setChange(0);
        }
      }
    } catch (error) {
      alert.show("First delete measurebook record related to this bill", {
        type: "info",
      });
    }
  };
  return (
    <div className="bill-table-container">
      <table>
        <tr className="bill-tr">
          <th className="bill-th">Bill Name</th>
          <th className="bill-th">Date</th>
          <th className="bill-th">TypeBill</th>
          <th className="bill-th">Inv No.</th>
          <th className="bill-th">Status</th>
          <th className="bill-th">Action</th>
        </tr>
        {!loding &&
          data?.items?.map((item) => (
            <tr className="bill-tr">
              <td className="bill-td">
                <span>{item?.name}</span>
              </td>
              <td className="bill-td">
                <span>{item?.invoiceDate}</span>
              </td>
              <td className="bill-td">
                <span>{item?.typeBill === 1 ? "RA" : "Final"}</span>
              </td>
              <td className="bill-td">
                <span>{item?.invoiceNo}</span>
              </td>
              <td className="bill-td">
                <span>
                  {item?.status === 1
                    ? "Draft"
                    : item?.status === 2
                    ? "Submitted"
                    : "Accepted"}
                </span>
              </td>
              <td className="bill-td">
                <button onClick={() => handleUpdate(item)} style={{margin:'0',padding:'0',backgroundColor:'transparent',border:'none'}} disabled={open}>
                 <img
                  src={edit}
                  alt=""
                  className="svg"
                  style={{width:'22px',height:'22px',cursor:'pointer'}}
                 />
                </button>
                <button  onClick={() => handleDelete(item?.id)} style={{margin:'0',padding:'0',backgroundColor:'transparent',border:'none'}} disabled={open}>
                  <img
                   src={deleteicon}
                   alt=""
                   className="svg"
                   style={{width:'22px',height:'22px',cursor:'pointer'}}
                 />
                </button>
                <Link
                  to={`/measurementbook?billId=${item?.id}?projectId=${Id}?projectname=${projectname}?billname=${item?.name}`}
                  className="link"
                >
                  <button style={{margin:'0',padding:'0',backgroundColor:'rgb(5, 187, 5)',border:'none'}}>
                   <img src={filesvg} style={{width:'22px',height:'22px',filter:'invert(1)',cursor:'pointer'}} alt="" className="svg" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Billtable;
