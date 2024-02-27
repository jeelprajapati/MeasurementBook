import React from "react";
import "./account.css";
import Detail from "./Detail";

const Account = ({ data,setReload }) => {
  const detail = [
    {
      id: 1,
      label: "Name",
      value: data.name,
      type: "name",
      edit: true,
    },
    {
      id: 2,
      label: "Email",
      value: data.email,
      type: "email",
      edit: false,
    },
    {
      id: 3,
      label: "Phone Number",
      value: data.phoneNumber,
      type: "phoneNumber",
      edit: true,
    },
    {
      id: 4,
      label: "Address",
      value: data.address,
      type: "address",
      edit: true,
    },
  ];

  return (
    <div className="accountContainer">
      <div className="accountWrapper">
        <Detail detail={detail} data={data} setReload={setReload} />
      </div>
    </div>
  );
};

export default Account;
