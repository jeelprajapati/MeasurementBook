import React, { useEffect, useState } from "react";
import "./clientTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencil,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deleteClient, getClient } from "../../actions/client.js";
import useInfinityScroll from "../../hooks/useInfinityScroll.js";
import toast from "react-hot-toast";
const ClientTable = ({
  setInput,
  setItem,
  change,
  setChange,
  country,
  state,
}) => {
  const Id = localStorage.getItem("organizationId");
  const [isDelete, setIsDelete] = useState({ id: "", credential: false });
  const [data, setData] = useState([]);
  const {handleInfinityScroll,page}=useInfinityScroll({credential:false});

  const headerobject = [
    { label: "Name*", colSpan: 2 },
    { label: "Email*", colSpan: 2 },
    { label: "Phone No.", colSpan: 3 / 2 },
    { label: "GSTIN", align: "center" },
    { label: "PAN" },
    { label: "Address*", colSpan: 2 },
    { label: "City*", colSpan: 3 / 2 },
    { label: "State*", colSpan: 3 / 2 },
    { label: "Country*", colSpan: 3 / 2 },
    { label: "Postal Code*", colSpan: 3 / 2 },
    { label: "Actions", align: "center" },
  ];

  useEffect(() => {
    getClient(Id, page, (data) => {
      setData(data.items);
    });
  }, [page, Id, change]);

  const handleUpdate = (e) => {
    setInput({ type: "UPDATE", credential: true });
    setItem(e);
  };
  const handleAdd = () => {
    setInput({ type: "ADD", credential: true });
  };
  const handleDelete = async () => {
    deleteClient(isDelete.id, Id, () => {
      toast.success("Data Deleted Successfully");
      setChange(!change);
      setIsDelete({ id: "", credential: false });
    });
  };
  return (
    <div>
      <button className="clientAddButton" onClick={handleAdd}>
        + Add Client
      </button>
      <div className="clientTableContainer" onScroll={handleInfinityScroll}>
        <table className="clientTable">
          <tr className="clientTr">
            {headerobject.map((item, index) => (
              <th
                key={index}
                className="clientTh"
                colSpan={item?.colSpan}
                style={{ textAlign: item?.align }}
              >
                {item.label}
              </th>
            ))}
          </tr>
          {data?.map((item) => (
            <tr className="tr" key={item?.id}>
              <td
                className="clientTd"
                colSpan={2}
                style={{ paddingLeft: "5px" }}
              >
                <span>{item.name}</span>
              </td>
              <td className="clientTd" colSpan={2}>
                <span>{item.email}</span>
              </td>
              <td className="clientTd" colSpan={3 / 2}>
                <span>{item.phoneNumber}</span>
              </td>
              <td className="clientTd" style={{ textAlign: "center" }}>
                <span>{item?.gstin === "" ? "N/A" : item.gstin}</span>
              </td>
              <td className="clientTd">
                <span>{item?.pan === "" ? "N/A" : item.pan}</span>
              </td>
              <td className="clientTd" colSpan={2}>
                <span>{item.address}</span>
              </td>
              <td className="clientTd" colSpan={3 / 2}>
                <span>{item.city}</span>
              </td>
              <td className="clientTd" colSpan={3 / 2}>
                <span>
                  {state?.filter((s) => s.id === item.stateId)[0].stateName}
                </span>
              </td>
              <td className="clientTd" colSpan={3 / 2}>
                <span>
                  {
                    country?.filter((c) => c.id === item.countryId)[0]
                      .countryName
                  }
                </span>
              </td>
              <td className="clientTd" colSpan={3 / 2}>
                <span>{item.postalCode}</span>
              </td>
              {isDelete?.id === item?.id && isDelete?.credential ? (
                <td className="clientTd" style={{ textAlign: "center" }}>
                  <button className="clientButton" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="clientButton"
                    onClick={() => {
                      setIsDelete({ id: "", credential: false });
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
              ) : (
                <td className="clientTd" style={{ textAlign: "center" }}>
                  <button
                    className="clientButton"
                    onClick={() => {
                      handleUpdate(item);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button
                    className="clientButton"
                    onClick={() => {
                      setIsDelete({ id: item?.id, credential: true });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
