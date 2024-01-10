import React, { useState } from "react";
import "./clientTable.css";
import useFetch from "../../hooks/useFetch";
import makeRequesInstance from "../../utils/makeRequest.js";
import { useAlert } from "react-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencil,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
  const alert = useAlert();
  const { loding, data } = useFetch({
    url: `Client?page=${1}&pageSize=${50000}&organizationId=${Id}`,
    change,
  });
  const handleUpdate = (e) => {
    setInput({ type: "UPDATE", credential: true });
    setItem(e);
  };
  const handleAdd = () => {
    setInput({ type: "ADD", credential: true });
  };
  const handleDelete = async (e) => {
    try {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      const res = await makeRequest.delete(
        `/Client/${isDelete?.id}?organizationId=${Id}`
      );
      if (res.status === 200) {
        setChange(!change);
        alert.show("Data Deleted sucessfully", { type: "success" });
      }
    } catch (error) {
      if (error.response) {
        alert.show(error.response.data.title, { type: "error" });
      } else {
        alert.show("something went wrong", { type: "info" });
      }
    }
    setIsDelete({ id: "", credential: false });
  };
  return (
    <div>
      <button className="clientAddButton" onClick={handleAdd}>
        + Add Client
      </button>
      <div className="clientTableContainer">
        <table className="clientTable">
          {/* ROW-1 */}
          <tr className="clientTr">
            <th
              className="clientTh"
              style={{ paddingLeft: "5px" }}
              colSpan={2}
            >
              Name*
            </th>
            <th className="clientTh" colSpan={2}>
              Email*
            </th>
            <th className="clientTh" colSpan={3 / 2}>
              Phone No*
            </th>
            <th className="clientTh" style={{ textAlign: "center" }}>
              GSTIN
            </th>
            <th className="clientTh">PAN</th>
            <th className="clientTh" colSpan={2}>
              Address*
            </th>
            <th className="clientTh" colSpan={3 / 2}>
              City*
            </th>
            <th className="clientTh" colSpan={3 / 2}>
              State*
            </th>
            <th className="clientTh" colSpan={3 / 2}>
              Country*
            </th>
            <th className="clientTh" colSpan={3 / 2}>
              Postal Code*
            </th>
            <th className="clientTh" style={{ textAlign: "center" }}>
              Actions
            </th>
          </tr>
          {/* ROW-2 */}
          {!loding &&
            data?.items.map((item) => (
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
